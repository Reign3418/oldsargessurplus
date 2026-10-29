import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORE_INFO,
  INITIAL_SEWING_STATUS,
  INITIAL_FEATURED_DROPS,
  INITIAL_INVENTORY_BAYS,
  EBAY_STORE_CONFIG,
  EBAY_FEED_SYNC_BATCH
} from '../data/surplusData';

const SurplusContext = createContext();

export function SurplusProvider({ children }) {
  const [themeVersion, setThemeVersion] = useState('hangar'); // 'hangar' | 'olivedrab' | 'daylight'

  // Automatic Mobile Device & Viewport Detection (Auto-switches to MobileAppView on phones)
  const detectMobileViewportOrUA = () => {
    if (typeof window === 'undefined') return false;
    const isNarrow = window.innerWidth < 768;
    const isTouchPhone = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ''
    );
    return isNarrow || isTouchPhone;
  };

  const [isAutoMobile, setIsAutoMobile] = useState(detectMobileViewportOrUA);
  const [viewModeOverride, setViewModeOverride] = useState(null); // null (auto) | 'mobile' | 'desktop'

  useEffect(() => {
    const handleResize = () => {
      setIsAutoMobile(detectMobileViewportOrUA());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileMode =
    viewModeOverride === 'mobile'
      ? true
      : viewModeOverride === 'desktop'
      ? false
      : isAutoMobile;

  // Live Inventory Bays (persisted in localStorage so owner edits survive refresh)
  const [inventoryBays, setInventoryBays] = useState(() => {
    try {
      const saved = localStorage.getItem('oldsarge_inventory_v1');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY_BAYS;
    } catch {
      return INITIAL_INVENTORY_BAYS;
    }
  });

  // Live Sewing Turnaround Status
  const [sewingStatus, setSewingStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('oldsarge_sewing_v1');
      return saved ? JSON.parse(saved) : INITIAL_SEWING_STATUS;
    } catch {
      return INITIAL_SEWING_STATUS;
    }
  });

  // Featured Crate Drops
  const [featuredDrops, setFeaturedDrops] = useState(() => {
    try {
      const saved = localStorage.getItem('oldsarge_drops_v1');
      return saved ? JSON.parse(saved) : INITIAL_FEATURED_DROPS;
    } catch {
      return INITIAL_FEATURED_DROPS;
    }
  });

  // Customer Hold / CIF Pull-Sheet Cart
  const [holdList, setHoldList] = useState([]);
  const [isHoldDrawerOpen, setIsHoldDrawerOpen] = useState(false);

  // Modals & Interactive White Papers
  const [isWhitePaperOpen, setIsWhitePaperOpen] = useState(false);
  const [isDisambiguationModalOpen, setIsDisambiguationModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCifCalculatorOpen, setIsCifCalculatorOpen] = useState(false);
  const [isSewingModalOpen, setIsSewingModalOpen] = useState(false);
  const [isEbaySyncModalOpen, setIsEbaySyncModalOpen] = useState(false);
  const [isTvBoardOpen, setIsTvBoardOpen] = useState(false);
  const [isStoreTwinOpen, setIsStoreTwinOpen] = useState(false);

  // eBay Storefront Auto-Sync Telemetry State
  const [ebaySyncMeta, setEbaySyncMeta] = useState({
    sellerHandle: EBAY_STORE_CONFIG.sellerHandle,
    autoSyncEnabled: true,
    pollIntervalMins: 15,
    lastSyncedAt: 'Just now (Live Seller Feed)',
    syncedListingsCount: 30,
    hasImportedBatch: false
  });

  // Saved Digital Sew & Alterations Tickets
  const [sewTickets, setSewTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('oldsarge_sew_tickets_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBayId, setActiveBayId] = useState('all');
  const [cifOnlyFilter, setCifOnlyFilter] = useState(false);
  const [showCifComparison, setShowCifComparison] = useState(true);

  // Persist updates to localStorage and sync to local Wi-Fi relay if running
  useEffect(() => {
    try {
      localStorage.setItem('oldsarge_inventory_v1', JSON.stringify(inventoryBays));
    } catch {
      // ignore storage quota errors
    }
  }, [inventoryBays]);

  useEffect(() => {
    try {
      localStorage.setItem('oldsarge_sewing_v1', JSON.stringify(sewingStatus));
    } catch {
      // ignore
    }
  }, [sewingStatus]);

  useEffect(() => {
    try {
      localStorage.setItem('oldsarge_drops_v1', JSON.stringify(featuredDrops));
    } catch {
      // ignore
    }
  }, [featuredDrops]);

  useEffect(() => {
    try {
      localStorage.setItem('oldsarge_sew_tickets_v1', JSON.stringify(sewTickets));
    } catch {
      // ignore
    }
  }, [sewTickets]);

  // Broadcast to local Wi-Fi Counter-to-TV relay when running locally
  const broadcastWifiSync = async (patch) => {
    try {
      await fetch('/__sarge_sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
      });
    } catch {
      // Offline or static production mode
    }
  };

  // Owner 1-Tap Stock Status Toggle
  const updateItemStockStatus = (bayId, itemId, newStatus) => {
    setInventoryBays((prev) => {
      const next = prev.map((bay) => {
        if (bay.id !== bayId) return bay;
        return {
          ...bay,
          items: bay.items.map((item) =>
            item.id === itemId ? { ...item, stockStatus: newStatus } : item
          )
        };
      });
      broadcastWifiSync({ inventory: next });
      return next;
    });
  };

  // Owner 1-Tap Price Update
  const updateItemPrice = (bayId, itemId, newPrice) => {
    const parsed = Number(newPrice);
    if (Number.isNaN(parsed) || parsed < 0) return;
    setInventoryBays((prev) => {
      const next = prev.map((bay) => {
        if (bay.id !== bayId) return bay;
        return {
          ...bay,
          items: bay.items.map((item) =>
            item.id === itemId ? { ...item, price: parsed } : item
          )
        };
      });
      broadcastWifiSync({ inventory: next });
      return next;
    });
  };

  // Owner Add New Item to a Bay
  const addNewInventoryItem = (bayId, newItem) => {
    setInventoryBays((prev) => {
      const next = prev.map((bay) => {
        if (bay.id !== bayId) return bay;
        return {
          ...bay,
          items: [
            {
              id: `custom-${Date.now()}`,
              name: newItem.name,
              nsn: newItem.nsn || 'USGI-ISSUE',
              condition: newItem.condition || 'Grade 1 Serviceable',
              price: Number(newItem.price) || 25,
              cifCharge: Number(newItem.cifCharge) || Number(newItem.price) * 2,
              cifEssential: Boolean(newItem.cifEssential),
              stockStatus: newItem.stockStatus || 'FRESH_DROP',
              description: newItem.description || 'In-store surplus arrival at 240 S Bragg Blvd.'
            },
            ...bay.items
          ]
        };
      });
      broadcastWifiSync({ inventory: next });
      return next;
    });
  };

  // Owner Update Sewing Turnaround
  const updateSewingMode = (mode) => {
    const presets = {
      SAME_DAY: {
        turnaroundMode: 'SAME_DAY',
        label: '⚡ WALK-IN & SAME-DAY SEWING OPEN',
        subtext: 'OCP Name Tapes, Rank, Skill Badges, Unit Patches & Heavy-Duty Ruck Repair on site at 240 S Bragg Blvd',
        cutoffTime: 'Drop off before 2:00 PM for same-day pickup'
      },
      NEXT_DAY: {
        turnaroundMode: 'NEXT_DAY',
        label: '🕐 24-HOUR SEWING TURNAROUND ACTIVE',
        subtext: 'High volume today — drop off uniforms or rucks anytime for guaranteed next-business-day pickup',
        cutoffTime: 'Ready by 12:00 PM next business day'
      },
      RUCK_REPAIR: {
        turnaroundMode: 'RUCK_REPAIR',
        label: '🧵 HEAVY RUCK & ZIPPER REPAIR + UNIFORM SEWING OPEN',
        subtext: 'Industrial walking-foot sewing machines running today for blown ruck zippers, straps & full OCP setups',
        cutoffTime: 'Walk-ins welcome 9:00 AM – 6:00 PM'
      },
      PARTNER_DROP: {
        turnaroundMode: 'PARTNER_DROP',
        label: '🤝 BRAGG BLVD PARTNER SEW & ALTERATIONS DROP-OFF HUB',
        subtext: 'Configure your Name Tapes, OCP Sew-Down, or Ruck Repair ticket online — drop off at 240 S Bragg Blvd',
        cutoffTime: '24-Hour Partner Stitch Turnaround'
      }
    };
    const next = presets[mode] || presets.SAME_DAY;
    setSewingStatus(next);
    broadcastWifiSync({ sewingStatus: next });
  };

  // Create & Log a Digital Sew / Alterations Ticket + Add to Customer Pull Sheet
  const submitSewTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      ticketId: ticketData.ticketId || `SEW-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSewTickets((prev) => [newTicket, ...prev]);

    // Also add as an itemized entry into the Customer Hold / Pull Sheet
    addToHoldList(
      {
        id: `sew-ticket-${newTicket.ticketId}`,
        name: `[${newTicket.ticketId}] ${newTicket.summaryTitle}`,
        nsn: `TAPE: "${newTicket.lastName}" • ${newTicket.rank}`,
        condition: newTicket.turnaroundLabel,
        price: newTicket.totalPrice,
        cifCharge: Math.round(newTicket.totalPrice * 1.65)
      },
      'On-Site Sewing & Alterations'
    );

    return newTicket;
  };

  // 1-Click Sync from @oldsargessurplus eBay Seller Feed into the 8-Bay Website Inventory
  const runEbayFeedSync = () => {
    setInventoryBays((prevBays) => {
      const next = prevBays.map((bay) => {
        const incomingForBay = EBAY_FEED_SYNC_BATCH.filter((item) => item.bayId === bay.id);
        if (incomingForBay.length === 0) return bay;
        const existingIds = new Set(bay.items.map((i) => i.id));
        const newItems = incomingForBay.filter((i) => !existingIds.has(i.id));
        return {
          ...bay,
          items: [...newItems, ...bay.items]
        };
      });
      broadcastWifiSync({ inventory: next });
      return next;
    });

    setEbaySyncMeta((prev) => ({
      ...prev,
      lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      syncedListingsCount: 30 + EBAY_FEED_SYNC_BATCH.length,
      hasImportedBatch: true
    }));
  };

  // Auto-Classify & Import a Single eBay Listing (from URL, Seller Hub Paste, or Quick Form)
  const importCustomEbayListing = ({ title, price, nsn, ebayItemNumber, bayId }) => {
    const cleanTitle = (title || 'USGI eBay Listing').trim();
    const parsedPrice = Number(price) || 45;

    // Auto-route to the matching Bay if bayId is 'auto'
    let targetBayId = bayId;
    if (!targetBayId || targetBayId === 'auto') {
      const lower = cleanTitle.toLowerCase();
      if (lower.includes('ruck') || lower.includes('pack') || lower.includes('mystery ranch') || lower.includes('alice')) {
        targetBayId = 'rucks-packs';
      } else if (lower.includes('pouch') || lower.includes('ifak') || lower.includes('vest') || lower.includes('molle')) {
        targetBayId = 'molle-pouches';
      } else if (lower.includes('woobie') || lower.includes('sleep') || lower.includes('bivy') || lower.includes('ecwcs') || lower.includes('parka')) {
        targetBayId = 'ecwcs-sleep';
      } else if (lower.includes('boot')) {
        targetBayId = 'boots-footwear';
      } else if (lower.includes('ammo') || lower.includes('can') || lower.includes('pelican') || lower.includes('hardigg')) {
        targetBayId = 'ammo-cans-hardware';
      } else if (lower.includes('helmet') || lower.includes('ach') || lower.includes('canteen')) {
        targetBayId = 'helmets-field-gear';
      } else {
        targetBayId = 'uniforms-flight';
      }
    }

    const newItem = {
      id: `ebay-custom-${Date.now()}`,
      name: cleanTitle,
      nsn: nsn || 'EBAY-SYNCED',
      condition: 'eBay Synced • Top-Rated Seller',
      price: parsedPrice,
      cifCharge: Math.round(parsedPrice * 2.1),
      cifEssential: true,
      stockStatus: 'FRESH_DROP',
      ebaySynced: true,
      ebayItemNumber: ebayItemNumber || `${Math.floor(285900000000 + Math.random() * 9999999)}`,
      ebayWatchers: Math.floor(3 + Math.random() * 14),
      ebayQuery: cleanTitle.split(' ').slice(0, 3).join(' '),
      description: 'Synced directly from @oldsargessurplus eBay listing — available for nationwide eBay shipping or local pickup at 240 S Bragg Blvd.'
    };

    setInventoryBays((prev) => {
      const next = prev.map((bay) =>
        bay.id === targetBayId ? { ...bay, items: [newItem, ...bay.items] } : bay
      );
      broadcastWifiSync({ inventory: next });
      return next;
    });

    setEbaySyncMeta((prev) => ({
      ...prev,
      lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      syncedListingsCount: prev.syncedListingsCount + 1
    }));

    return { newItem, targetBayId };
  };

  // Bulk Import eBay Seller Hub Active Listings CSV Rows
  const importEbayCsvBatch = (rows) => {
    if (!Array.isArray(rows) || rows.length === 0) return 0;
    let addedCount = 0;

    setInventoryBays((prevBays) => {
      const bayBuckets = {};
      prevBays.forEach((b) => {
        bayBuckets[b.id] = [];
      });

      rows.forEach((row, idx) => {
        const cleanTitle = (row.title || '').trim();
        if (!cleanTitle) return;
        const parsedPrice = Number(String(row.price || '35').replace(/[^0-9.]/g, '')) || 35;
        const lower = cleanTitle.toLowerCase();

        let targetBayId = 'uniforms-flight';
        if (lower.includes('ruck') || lower.includes('pack') || lower.includes('mystery ranch') || lower.includes('alice')) {
          targetBayId = 'rucks-packs';
        } else if (lower.includes('pouch') || lower.includes('ifak') || lower.includes('vest') || lower.includes('molle')) {
          targetBayId = 'molle-pouches';
        } else if (lower.includes('woobie') || lower.includes('sleep') || lower.includes('bivy') || lower.includes('ecwcs') || lower.includes('parka')) {
          targetBayId = 'ecwcs-sleep';
        } else if (lower.includes('boot')) {
          targetBayId = 'boots-footwear';
        } else if (lower.includes('ammo') || lower.includes('can') || lower.includes('pelican') || lower.includes('hardigg')) {
          targetBayId = 'ammo-cans-hardware';
        } else if (lower.includes('helmet') || lower.includes('ach') || lower.includes('canteen')) {
          targetBayId = 'helmets-field-gear';
        }

        const itemObj = {
          id: `ebay-csv-${Date.now()}-${idx}`,
          name: cleanTitle,
          nsn: row.sku || 'EBAY-CSV-SYNC',
          condition: row.condition || 'eBay Active Listing',
          price: parsedPrice,
          cifCharge: Math.round(parsedPrice * 2.05),
          cifEssential: true,
          stockStatus: Number(row.qty) === 1 ? 'LOW_STOCK' : 'IN_STOCK',
          ebaySynced: true,
          ebayItemNumber: row.itemNumber || `${285950000000 + idx}`,
          ebayWatchers: Number(row.watchers) || 5,
          ebayQuery: cleanTitle.split(' ').slice(0, 3).join(' '),
          description: `Imported from eBay Seller Hub CSV (Item #${row.itemNumber || 'Active'} • Qty: ${row.qty || 1}).`
        };

        if (bayBuckets[targetBayId]) {
          bayBuckets[targetBayId].push(itemObj);
          addedCount++;
        }
      });

      const next = prevBays.map((b) => ({
        ...b,
        items: [...(bayBuckets[b.id] || []), ...b.items]
      }));
      broadcastWifiSync({ inventory: next });
      return next;
    });

    setEbaySyncMeta((prev) => ({
      ...prev,
      lastSyncedAt: `CSV Upload (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      syncedListingsCount: prev.syncedListingsCount + rows.length,
      hasImportedBatch: true
    }));

    return addedCount;
  };

  // Reset to Default Factory Data
  const resetToFactoryDefaults = () => {
    setInventoryBays(INITIAL_INVENTORY_BAYS);
    setSewingStatus(INITIAL_SEWING_STATUS);
    setFeaturedDrops(INITIAL_FEATURED_DROPS);
    try {
      localStorage.removeItem('oldsarge_inventory_v1');
      localStorage.removeItem('oldsarge_sewing_v1');
      localStorage.removeItem('oldsarge_drops_v1');
    } catch {
      // ignore
    }
  };

  // Customer Hold / Pull-Sheet Functions
  const addToHoldList = (item, bayName = 'Surplus Bay') => {
    setHoldList((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, bayName, qty: 1 }];
    });
  };

  const removeFromHoldList = (itemId) => {
    setHoldList((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateHoldQty = (itemId, delta) => {
    setHoldList((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clearHoldList = () => setHoldList([]);

  const holdItemCount = holdList.reduce((sum, i) => sum + i.qty, 0);
  const holdTotalCost = holdList.reduce((sum, i) => sum + i.price * i.qty, 0);
  const holdTotalCifValue = holdList.reduce(
    (sum, i) => sum + (i.cifCharge || i.price) * i.qty,
    0
  );
  const holdTotalSavings = Math.max(0, holdTotalCifValue - holdTotalCost);

  return (
    <SurplusContext.Provider
      value={{
        storeInfo: STORE_INFO,
        themeVersion,
        setThemeVersion,
        isMobileMode,
        viewModeOverride,
        setViewModeOverride,
        inventoryBays,
        sewingStatus,
        featuredDrops,
        setFeaturedDrops,
        updateItemStockStatus,
        updateItemPrice,
        addNewInventoryItem,
        updateSewingMode,
        resetToFactoryDefaults,
        holdList,
        addToHoldList,
        removeFromHoldList,
        updateHoldQty,
        clearHoldList,
        holdItemCount,
        holdTotalCost,
        holdTotalCifValue,
        holdTotalSavings,
        isHoldDrawerOpen,
        setIsHoldDrawerOpen,
        isWhitePaperOpen,
        setIsWhitePaperOpen,
        isDisambiguationModalOpen,
        setIsDisambiguationModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isCifCalculatorOpen,
        setIsCifCalculatorOpen,
        isSewingModalOpen,
        setIsSewingModalOpen,
        isEbaySyncModalOpen,
        setIsEbaySyncModalOpen,
        ebaySyncMeta,
        setEbaySyncMeta,
        runEbayFeedSync,
        importCustomEbayListing,
        importEbayCsvBatch,
        sewTickets,
        submitSewTicket,
        isTvBoardOpen,
        setIsTvBoardOpen,
        isStoreTwinOpen,
        setIsStoreTwinOpen,
        searchQuery,
        setSearchQuery,
        activeBayId,
        setActiveBayId,
        cifOnlyFilter,
        setCifOnlyFilter,
        showCifComparison,
        setShowCifComparison
      }}
    >
      {children}
    </SurplusContext.Provider>
  );
}

export function useSurplus() {
  return useContext(SurplusContext);
}
