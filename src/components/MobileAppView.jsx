import React, { useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import { STOCK_BADGE_MAP } from '../data/surplusData';
import {
  Phone,
  MapPin,
  Navigation,
  Compass,
  Car,
  Search,
  Sliders,
  Plus,
  Check,
  ShoppingBag,
  ShieldAlert,
  Scissors,
  Calculator,
  ExternalLink,
  Star,
  Clock,
  Copy,
  X,
  Package,
  FileText
} from 'lucide-react';

export default function MobileAppView() {
  const {
    storeInfo,
    themeVersion,
    setThemeVersion,
    inventoryBays,
    sewingStatus,
    featuredDrops,
    addToHoldList,
    holdItemCount,
    holdTotalCost,
    holdTotalSavings,
    setIsHoldDrawerOpen,
    setIsDisambiguationModalOpen,
    setIsAdminModalOpen,
    setIsCifCalculatorOpen,
    setIsWhitePaperOpen,
    setIsTvBoardOpen
  } = useSurplus();

  // 4 Native Mobile Tabs: 'locker' | 'find' | 'sewing_cif' | 'shield'
  const [activeTab, setActiveTab] = useState('locker');
  const [activeBay, setActiveBay] = useState('rucks-packs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [addedIds, setAddedIds] = useState({});
  const [copiedAddr, setCopiedAddr] = useState(false);

  const isDaylight = themeVersion === 'daylight';
  const isOlive = themeVersion === 'olivedrab';

  const bgMain = isDaylight
    ? 'bg-[#F5F2EB] text-[#171614]'
    : isOlive
    ? 'bg-[#11160F] text-[#F1EFE6]'
    : 'bg-[#0B0D10] text-[#F4F4F0]';

  const bgHeader = isDaylight
    ? 'bg-[#FAF8F2]/95 border-[#D6D0C4]'
    : isOlive
    ? 'bg-[#141A12]/95 border-[#2D3B26]'
    : 'bg-[#0E1218]/95 border-[#262F40]';

  const bgCard = isDaylight
    ? 'bg-white border-[#D6D0C4] shadow-sm'
    : isOlive
    ? 'bg-[#171E14] border-[#33422B]'
    : 'bg-[#12161F] border-[#262F40]';

  const bgSubtle = isDaylight
    ? 'bg-[#EAE6DC] text-[#3F3C36]'
    : isOlive
    ? 'bg-[#1E271A] text-[#C8C5B8]'
    : 'bg-[#19202D] text-zinc-300';

  const accentBg = isDaylight
    ? 'bg-[#B45309] text-white'
    : 'bg-yellow-400 text-black';

  const accentText = isDaylight ? 'text-[#B45309]' : 'text-yellow-400';

  const handleAdd = (item, bayName) => {
    addToHoldList(item, bayName);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1100);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${storeInfo.name} — ${storeInfo.address} (${storeInfo.phone}) • ${storeInfo.googleMapsDirectionsUrl}`
      );
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 2000);
    } catch {
      // ignore
    }
  };

  const bayPills = [
    { id: 'rucks-packs', label: '01 Rucks' },
    { id: 'molle-pouches', label: '02 Pouches' },
    { id: 'ecwcs-sleep', label: '03 Woobies/Sleep' },
    { id: 'uniforms-flight', label: '04 Uniforms' },
    { id: 'boots-footwear', label: '05 Boots' },
    { id: 'ammo-cans-hardware', label: '06 Ammo Cans' },
    { id: 'helmets-field-gear', label: '07 Helmets' },
    { id: 'sewing-alterations', label: '08 Sewing' },
    { id: 'all', label: 'All 8 Bays' }
  ];

  const sewingBay =
    inventoryBays.find((b) => b.id === 'sewing-alterations') || inventoryBays[0];

  return (
    <div className={`min-h-screen flex flex-col pb-28 ${bgMain}`}>
      {/* ================================================================= */}
      {/* STICKY MOBILE APP TOP HEADER                                      */}
      {/* ================================================================= */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b px-3.5 py-2.5 ${bgHeader}`}>
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Live Bragg Blvd Pin */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="./images/storelogo.jpg"
              alt="Old Sarge's Surplus"
              className="w-11 h-8 object-contain bg-black border border-yellow-400 p-0.5 shrink-0"
            />
            <div className="truncate">
              <div className="font-['Bebas_Neue'] text-lg font-black uppercase tracking-wider leading-none truncate">
                Old Sarge&apos;s Surplus
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('find')}
                className="flex items-center gap-1 text-[11px] font-mono cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                <span className={`truncate underline ${accentText}`}>
                  240 S Bragg Blvd (Tap for Turn-In)
                </span>
              </button>
            </div>
          </div>

          {/* Right Controls: 01 | 02 | 03 Theme Switcher + Search + Owner Admin */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="flex items-center bg-black/30 border border-zinc-700 p-0.5">
              {[
                { id: 'hangar', label: '01' },
                { id: 'olivedrab', label: '02' },
                { id: 'daylight', label: '03' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeVersion(t.id)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-bold transition cursor-pointer ${
                    themeVersion === t.id ? accentBg : 'text-zinc-400'
                  }`}
                  title={`Switch theme ${t.label}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'locker' && (
              <button
                type="button"
                onClick={() => setShowSearch((prev) => !prev)}
                className={`w-8 h-8 flex items-center justify-center border cursor-pointer ${bgSubtle}`}
                aria-label="Search surplus inventory"
              >
                {showSearch ? <X className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className={`w-8 h-8 flex items-center justify-center border cursor-pointer ${bgSubtle}`}
              aria-label="Owner 10-Second Admin"
              title="Owner 10-Second Stock & Sewing Admin"
            >
              <Sliders className={`w-3.5 h-3.5 ${accentText}`} />
            </button>
          </div>
        </div>

        {/* Collapsible Instant Search Input */}
        {activeTab === 'locker' && showSearch && (
          <div className="pt-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-yellow-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setActiveBay('all');
                }}
                placeholder="Search NSN, MOLLE Ruck, Woobie, Boots, Sewing..."
                className={`w-full pl-8 pr-12 py-2 text-xs border focus:outline-none focus:border-yellow-400 ${bgCard}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono underline text-yellow-500"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Horizontal Swipeable Bay Pills (When on Locker Tab) */}
        {activeTab === 'locker' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 -mx-3.5 px-3.5">
            {bayPills.map((pill) => {
              const active = activeBay === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveBay(pill.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase whitespace-nowrap border cursor-pointer transition ${
                    active ? `${accentBg} border-yellow-400 font-black` : `${bgSubtle} border-transparent`
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ================================================================= */}
      {/* TAB 1: LOCKER (THUMB-FRIENDLY SURPLUS INVENTORY & QUICK WAYFIND)  */}
      {/* ================================================================= */}
      {activeTab === 'locker' && (
        <main className="px-3.5 pt-3 space-y-4">
          {/* Official NC Disambiguation Micro-Strip */}
          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="w-full text-left bg-rose-950/90 border border-yellow-400/70 p-2.5 text-white flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-[11px] font-bold truncate">
                Official Spring Lake, NC Store (Not Old Sarge&apos;s Drop Zone NY)
              </span>
            </div>
            <span className="text-[10px] font-mono text-yellow-300 font-bold shrink-0">
              Info →
            </span>
          </button>

          {/* Compact Hero Card with Easy Bragg Blvd Turn-In & 1-Tap Call */}
          <div className={`p-3.5 border-2 border-yellow-400/60 space-y-3 ${bgCard}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${accentText}`}>
                  30+ Yrs Outside Fort Bragg • 4.3★ Google
                </span>
                <h1 className="font-['Bebas_Neue'] text-2xl font-black uppercase tracking-wide leading-none">
                  USGI Surplus, CIF Gear &amp; Walk-In Uniform Sewing
                </h1>
                <p className="text-[11px] opacity-80 font-mono">
                  {sewingStatus.label}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('find')}
                className={`py-2.5 px-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${accentBg}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Bragg Blvd Turn-In</span>
              </button>

              <a
                href={`tel:${storeInfo.phoneRaw}`}
                className="py-2.5 px-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {storeInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Horizontal Swipeable Fresh Fort Bragg Crate Drops */}
          {!searchQuery && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-['Bebas_Neue'] text-xl font-black uppercase tracking-wide">
                  Fresh Fort Bragg Crates &amp; CIF Savers
                </h2>
                <span className="text-[11px] font-mono opacity-70">Swipe →</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x pb-1 -mx-3.5 px-3.5">
                {featuredDrops.map((drop) => {
                  const isAdded = addedIds[drop.id];
                  const saved = Math.max(0, drop.cifCharge - drop.storePrice);
                  return (
                    <div
                      key={drop.id}
                      className={`snap-start shrink-0 w-[245px] p-3 border flex flex-col justify-between gap-2.5 ${bgCard}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="bg-yellow-400 text-black font-mono text-[9px] font-black px-1.5 py-0.5 uppercase">
                            {drop.badge}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            Save ${saved}
                          </span>
                        </div>
                        <div className="font-bold text-xs leading-snug line-clamp-2">
                          {drop.title}
                        </div>
                        <div className="text-[10px] font-mono opacity-70">
                          NSN: {drop.nsn}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-700/40">
                        <div>
                          <span className="text-lg font-black font-mono text-yellow-500">
                            ${drop.storePrice}
                          </span>
                          <span className="text-[10px] line-through opacity-60 font-mono ml-1.5">
                            CIF ${drop.cifCharge}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleAdd(
                              {
                                id: drop.id,
                                name: drop.title,
                                nsn: drop.nsn,
                                price: drop.storePrice,
                                cifCharge: drop.cifCharge
                              },
                              'Featured Crate'
                            )
                          }
                          className={`px-2.5 py-1 text-[11px] font-mono font-black uppercase flex items-center gap-1 cursor-pointer ${
                            isAdded ? 'bg-emerald-600 text-white' : accentBg
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{isAdded ? 'Held' : 'Hold'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Bay Item List */}
          <div className="space-y-4">
            {inventoryBays
              .filter((bay) => activeBay === 'all' || bay.id === activeBay)
              .map((bay) => {
                const items = bay.items.filter((item) => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    item.name.toLowerCase().includes(q) ||
                    item.nsn.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q)
                  );
                });

                if (items.length === 0) return null;

                return (
                  <div key={bay.id} className="space-y-2">
                    <div className="border-b border-yellow-500/40 pb-1 flex items-center justify-between">
                      <h3 className="font-['Bebas_Neue'] text-xl font-black uppercase tracking-wide">
                        {bay.code}: {bay.name}
                      </h3>
                      <span className="text-[10px] font-mono opacity-75">
                        {items.length} items
                      </span>
                    </div>

                    <div className="space-y-2">
                      {items.map((item) => {
                        const isAdded = addedIds[item.id];
                        const badge =
                          STOCK_BADGE_MAP[item.stockStatus] || STOCK_BADGE_MAP.IN_STOCK;
                        const cifSavings = Math.max(0, (item.cifCharge || 0) - item.price);
                        const isSoldOut = item.stockStatus === 'SOLD_OUT';

                        return (
                          <div
                            key={item.id}
                            className={`p-3 border flex items-center justify-between gap-3 ${bgCard}`}
                          >
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border ${badge.bg} ${badge.border} ${badge.text}`}
                                >
                                  {badge.shortLabel}
                                </span>
                                <span className="text-[10px] font-mono opacity-75">
                                  {item.nsn}
                                </span>
                              </div>

                              <h4 className="font-bold text-xs leading-snug">{item.name}</h4>

                              <p className="text-[11px] opacity-80 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>

                              <div className="flex items-center gap-2 pt-0.5 font-mono">
                                <span className={`text-sm font-black ${accentText}`}>
                                  ${item.price}
                                </span>
                                {cifSavings > 0 && (
                                  <span className="text-[10px] text-emerald-400 font-bold">
                                    • Saves ${cifSavings} vs CIF (${item.cifCharge})
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={isSoldOut}
                              onClick={() => handleAdd(item, bay.shortName)}
                              className={`w-10 h-10 flex items-center justify-center shrink-0 transition cursor-pointer ${
                                isSoldOut
                                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                  : isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : accentBg
                              }`}
                              aria-label={`Add ${item.name} to 24-hour counter hold`}
                            >
                              {isAdded ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 2: FIND US (240 S BRAGG BLVD TURN-BY-TURN WAYFINDING HUB)     */}
      {/* ================================================================= */}
      {activeTab === 'find' && (
        <main className="px-3.5 pt-3.5 space-y-4">
          {/* Rooftop GPS & 1-Tap CarPlay / Maps Card */}
          <div className={`p-4 border-2 border-yellow-400 space-y-3.5 ${bgCard}`}>
            <div>
              <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                DON&apos;T BLOW PAST OUR TURN ON BRAGG BLVD!
              </span>
              <h1 className="font-['Bebas_Neue'] text-3xl font-black uppercase tracking-wide mt-1">
                240 S Bragg Blvd, Spring Lake, NC
              </h1>
              <p className="text-xs opacity-85">
                Directly on the 200 South block of S Bragg Blvd (NC-24/87) outside Fort Bragg • Dedicated Front Pull-In Parking
              </p>
            </div>

            {/* 3 Giant 1-Tap GPS App Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <a
                href={storeInfo.appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`py-3 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md ${accentBg}`}
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Apple Maps (iPhone CarPlay)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={storeInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={storeInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-2.5 px-3 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${bgSubtle}`}
                >
                  <Car className="w-3.5 h-3.5 text-sky-400" />
                  <span>Launch Waze</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className={`py-2 px-3 border text-[11px] font-mono font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer ${bgSubtle}`}
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copiedAddr
                    ? '✓ Copied Address & GPS Link!'
                    : 'Copy Address & Share Pin to Squad'}
                </span>
              </button>
            </div>
          </div>

          {/* 4 Step-by-Step Bragg Blvd Approach & Lane Cues */}
          <div className={`p-4 border space-y-3 ${bgCard}`}>
            <div className="flex items-center gap-2 border-b border-zinc-700/50 pb-2">
              <Compass className={`w-5 h-5 ${accentText}`} />
              <div>
                <h2 className="font-['Bebas_Neue'] text-xl font-black uppercase tracking-wide leading-none">
                  Lane &amp; Landmark Approach Guide
                </h2>
                <p className="text-[11px] opacity-75">
                  S Bragg Blvd traffic moves at 45+ MPH — know which lane to be in before you arrive:
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {storeInfo.wayfindingLandmarks.map((w, idx) => (
                <div key={idx} className={`p-3 border border-zinc-700/50 space-y-1 ${bgSubtle}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-yellow-400 text-black font-mono text-[9px] font-black px-1.5 py-0.5 uppercase">
                      {idx + 1}. {w.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold pt-0.5">{w.direction}</div>
                  <p className="text-[11px] opacity-90 leading-relaxed">{w.cue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Store & Sewing Desk Hours Card */}
          <div className={`p-4 border space-y-3 ${bgCard}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${accentText}`} />
                <h2 className="font-['Bebas_Neue'] text-xl font-black uppercase tracking-wide">
                  Storefront &amp; Sewing Hours
                </h2>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-bold px-2 py-0.5">
                {storeInfo.phone}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              {storeInfo.hours.map((row) => (
                <div
                  key={row.days}
                  className="flex justify-between py-1.5 border-b border-zinc-700/30 last:border-none"
                >
                  <span className="opacity-80">{row.days}</span>
                  <span className="font-mono font-bold">{row.time}</span>
                </div>
              ))}
            </div>

            <a
              href={`tel:${storeInfo.phoneRaw}`}
              className={`w-full py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 ${accentBg}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store Counter: {storeInfo.phone}</span>
            </a>
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 3: SEWING & CIF (ON-SITE SEWING + CIF SAVINGS CALCULATOR)     */}
      {/* ================================================================= */}
      {activeTab === 'sewing_cif' && (
        <main className="px-3.5 pt-3.5 space-y-4">
          {/* Fort Bragg CIF Calculator Launch Card */}
          <div className={`p-4 border-2 border-emerald-500/80 space-y-3 ${bgCard}`}>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Fort Bragg PCS / ETS / CIF Turn-In Tool</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-2xl font-black uppercase tracking-wide">
              Don&apos;t Pay Full CIF Statement of Charges
            </h1>
            <p className="text-xs opacity-85 leading-relaxed">
              Check off missing rucksacks, MOLLE pouches, wet weather bags, Gore-Tex bivy covers, or poncho liners to see your exact savings at 240 S Bragg Blvd and send a 24-Hr Hold Pull-Sheet to our counter.
            </p>
            <button
              type="button"
              onClick={() => setIsCifCalculatorOpen(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Interactive CIF Savings Calculator</span>
            </button>
          </div>

          {/* On-Site Sewing & Ruck Repair Board */}
          <div className={`p-4 border-2 border-yellow-400/70 space-y-3 ${bgCard}`}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-yellow-400 font-mono text-xs font-black uppercase">
                <Scissors className="w-4 h-4" />
                <span>On-Site Sewing Room</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-bold px-2 py-0.5">
                Walk-Ins Open
              </span>
            </div>

            <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/50 text-white text-xs">
              <div className="font-mono font-black text-emerald-300">{sewingStatus.label}</div>
              <div className="text-[11px] opacity-90 mt-0.5">{sewingStatus.cutoffTime}</div>
            </div>

            <div className="space-y-2">
              {sewingBay.items.map((item) => {
                const isAdded = addedIds[item.id];
                return (
                  <div
                    key={item.id}
                    className={`p-3 border border-zinc-700/50 flex items-center justify-between gap-2.5 ${bgSubtle}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold leading-snug">{item.name}</div>
                      <div className="text-[10px] font-mono opacity-75 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-mono text-sm font-black ${accentText}`}>
                        ${item.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdd(item, 'On-Site Sewing')}
                        className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
                          isAdded ? 'bg-emerald-600 text-white' : accentBg
                        }`}
                        aria-label={`Add ${item.name}`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* TAB 4: OFFICIAL NC SHIELD, EBAY VAULT & REVIEWS                   */}
      {/* ================================================================= */}
      {activeTab === 'shield' && (
        <main className="px-3.5 pt-3.5 space-y-4">
          {/* Official NC Storefront vs Unrelated NY Website Card */}
          <div className={`p-4 border-2 border-rose-500/80 space-y-3 ${bgCard}`}>
            <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white font-mono text-[10px] font-black px-2 py-0.5 uppercase">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Important Consumer Disambiguation</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-2xl font-black uppercase tracking-wide">
              We Are 240 S Bragg Blvd (Spring Lake, NC) — NOT &ldquo;Old Sarge&apos;s Drop Zone&rdquo; in NY
            </h1>
            <p className="text-xs opacity-85 leading-relaxed">
              If you placed a website order with <strong>Old Sarge&apos;s Drop Zone (oldsargesdropzone.com)</strong> in Westfield, New York (`716-401-2930`), please know that we have <strong>zero affiliation</strong> with that New York business.
            </p>
            <button
              type="button"
              onClick={() => setIsDisambiguationModalOpen(true)}
              className="w-full py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              View Full NY vs. NC Verification &amp; Contact Details
            </button>
          </div>

          {/* Verified eBay Storefront Card */}
          <div className={`p-4 border-2 border-yellow-400/70 space-y-2.5 ${bgCard}`}>
            <span className="font-mono text-[10px] font-bold uppercase text-yellow-500">
              Verified Mail-Order Storefront
            </span>
            <h2 className="font-['Bebas_Neue'] text-2xl font-black uppercase tracking-wide">
              Shop Our Top-Rated eBay Vault ({storeInfo.ebayHandle})
            </h2>
            <p className="text-xs opacity-85">
              Out of state or looking for rare collector surplus shipped to your door? Browse our official, top-rated eBay storefront with 100% buyer protection.
            </p>
            <a
              href={storeInfo.ebayUrl}
              target="_blank"
              rel="noreferrer"
              className={`w-full py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 ${accentBg}`}
            >
              <span>Open Official eBay Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 5-Star Fort Bragg Reviews */}
          <div className="space-y-2">
            <h2 className="font-['Bebas_Neue'] text-xl font-black uppercase tracking-wide px-0.5">
              Verified Fort Bragg &amp; Spring Lake Reviews
            </h2>
            <div className="space-y-2.5">
              {storeInfo.customerReviews.map((rev) => (
                <div key={rev.id} className={`p-3.5 border space-y-1.5 ${bgCard}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono opacity-70">{rev.location}</span>
                  </div>
                  <div className="text-xs font-bold">{rev.highlight}</div>
                  <p className="text-xs opacity-85 leading-relaxed">&ldquo;{rev.quote}&rdquo;</p>
                  <div className="text-[10px] font-mono font-bold pt-1 opacity-75">
                    — {rev.author}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owner & White Paper Tools */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsWhitePaperOpen(true)}
              className={`py-2.5 px-3 border text-[11px] font-mono font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer ${bgCard}`}
            >
              <FileText className="w-3.5 h-3.5 text-yellow-400" />
              <span>SEO White Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setIsTvBoardOpen(true)}
              className={`py-2.5 px-3 border text-[11px] font-mono font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer ${bgCard}`}
            >
              <span>🖥️ 1080p TV Mode</span>
            </button>
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* FLOATING 24-HR COUNTER HOLD BAR (WHEN ITEMS ADDED)                */}
      {/* ================================================================= */}
      {holdItemCount > 0 && (
        <div className="fixed bottom-16 left-3 right-3 z-40">
          <button
            type="button"
            onClick={() => setIsHoldDrawerOpen(true)}
            className={`w-full py-3 px-4 font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-2xl border-2 border-white cursor-pointer ${accentBg}`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>24-Hr Counter Hold ({holdItemCount})</span>
            </div>
            <span className="font-mono text-xs font-black">
              ${holdTotalCost} (Save ${holdTotalSavings}) →
            </span>
          </button>
        </div>
      )}

      {/* ================================================================= */}
      {/* NATIVE 4-TAB BOTTOM NAVIGATION BAR                                */}
      {/* ================================================================= */}
      <nav
        aria-label="Mobile Primary Navigation"
        className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-2xl px-2 py-1.5 flex items-center justify-around ${bgHeader}`}
      >
        {[
          { id: 'locker', label: '8-Bay Locker', icon: Package },
          { id: 'find', label: 'Find Turn-In', icon: Compass },
          { id: 'sewing_cif', label: 'CIF & Sewing', icon: Scissors },
          { id: 'shield', label: 'Official NC', icon: ShieldAlert }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 transition cursor-pointer ${
                active ? `${accentText} font-black` : 'opacity-65'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-mono uppercase tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
