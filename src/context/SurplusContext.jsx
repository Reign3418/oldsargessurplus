import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORE_INFO,
  INITIAL_SEWING_STATUS,
  INITIAL_FEATURED_DROPS,
  INITIAL_INVENTORY_BAYS
} from '../data/surplusData';

const SurplusContext = createContext();

export function SurplusProvider({ children }) {
  const [themeVersion, setThemeVersion] = useState('hangar'); // 'hangar' | 'olivedrab' | 'daylight'

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
  const [isTvBoardOpen, setIsTvBoardOpen] = useState(false);
  const [isStoreTwinOpen, setIsStoreTwinOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBayId, setActiveBayId] = useState('all');
  const [cifOnlyFilter, setCifOnlyFilter] = useState(false);

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
      }
    };
    const next = presets[mode] || presets.SAME_DAY;
    setSewingStatus(next);
    broadcastWifiSync({ sewingStatus: next });
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
        isTvBoardOpen,
        setIsTvBoardOpen,
        isStoreTwinOpen,
        setIsStoreTwinOpen,
        searchQuery,
        setSearchQuery,
        activeBayId,
        setActiveBayId,
        cifOnlyFilter,
        setCifOnlyFilter
      }}
    >
      {children}
    </SurplusContext.Provider>
  );
}

export function useSurplus() {
  return useContext(SurplusContext);
}
