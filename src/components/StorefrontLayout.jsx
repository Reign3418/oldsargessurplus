import React, { useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import { STOCK_BADGE_MAP } from '../data/surplusData';
import {
  ShieldAlert,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Search,
  Scissors,
  PackageCheck,
  Calculator,
  Plus,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Filter,
  Sliders,
  Tv,
  FileText,
  Compass,
  Navigation,
  Car,
  Copy,
  Star
} from 'lucide-react';

export default function StorefrontLayout() {
  const {
    storeInfo,
    themeVersion,
    inventoryBays,
    sewingStatus,
    featuredDrops,
    addToHoldList,
    holdItemCount,
    holdTotalSavings,
    setIsHoldDrawerOpen,
    setIsDisambiguationModalOpen,
    setIsCifCalculatorOpen,
    setIsAdminModalOpen,
    setIsTvBoardOpen,
    setIsWhitePaperOpen,
    searchQuery,
    setSearchQuery,
    activeBayId,
    setActiveBayId,
    cifOnlyFilter,
    setCifOnlyFilter
  } = useSurplus();

  const isDaylight = themeVersion === 'daylight';
  const isOlive = themeVersion === 'olivedrab';
  const [copiedWayfinding, setCopiedWayfinding] = useState(false);

  const handleCopyWayfinding = async () => {
    try {
      await navigator.clipboard.writeText(
        `${storeInfo.name} — ${storeInfo.address} (${storeInfo.phone}) • ${storeInfo.googleMapsDirectionsUrl}`
      );
      setCopiedWayfinding(true);
      setTimeout(() => setCopiedWayfinding(false), 2000);
    } catch {
      // ignore
    }
  };

  // Theme-adaptive surface classes
  const cardBg = isDaylight
    ? 'bg-white border-[#D6D0C4] text-[#171614]'
    : isOlive
    ? 'bg-[#171E14] border-[#33422B] text-[#F1EFE6]'
    : 'bg-[#12161F] border-[#262F40] text-[#F4F4F0]';

  const subtleBg = isDaylight
    ? 'bg-[#EFECE4] border-[#D6D0C4] text-[#3F3C36]'
    : isOlive
    ? 'bg-[#10150E] border-[#293622] text-[#C8C5B8]'
    : 'bg-[#0B0E14] border-[#1F2735] text-zinc-300';

  const accentBtn = isDaylight
    ? 'bg-[#B45309] hover:bg-[#92400E] text-white'
    : 'bg-yellow-400 hover:bg-yellow-300 text-black';

  // Filter bays and items
  const filteredBays = inventoryBays
    .filter((bay) => activeBayId === 'all' || bay.id === activeBayId)
    .map((bay) => {
      const matchingItems = bay.items.filter((item) => {
        if (cifOnlyFilter && !item.cifEssential) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.nsn.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          bay.name.toLowerCase().includes(q)
        );
      });
      return { ...bay, items: matchingItems };
    })
    .filter((bay) => bay.items.length > 0);

  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden">
      {/* ================================================================= */}
      {/* 1. ENTITY DISAMBIGUATION & REPUTATION SHIELD BANNER               */}
      {/* ================================================================= */}
      <section
        aria-label="Official Storefront Verification & Disambiguation Notice"
        className="bg-gradient-to-r from-rose-950 via-[#1D1115] to-[#131822] border-b-2 border-yellow-400/70 text-white py-2.5 px-3 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center gap-2.5 text-xs">
            <span className="bg-yellow-400 text-black font-mono font-black px-2 py-0.5 text-[10px] uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0">
              OFFICIAL NC STOREFRONT
            </span>
            <p className="text-zinc-100 leading-snug">
              <strong>240 S Bragg Blvd, Spring Lake, NC 28390</strong> (Outside Fort Bragg) • We have{' '}
              <strong className="text-yellow-300 underline">ZERO affiliation</strong> with{' '}
              <em>&ldquo;Old Sarge&apos;s Drop Zone&rdquo;</em> in Westfield, NY.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1.5 border border-rose-300 shrink-0 cursor-pointer shadow"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Missing a NY Website Order? Click Before Reviewing →</span>
          </button>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. HERO COMMAND HEADER                                            */}
      {/* ================================================================= */}
      <header
        className={`border-b ${
          isDaylight
            ? 'bg-[#FAF8F2] border-[#D6D0C4]'
            : isOlive
            ? 'od-canvas-bg border-[#2D3B26]'
            : 'hangar-steel-bg border-[#252E3E]'
        } py-6 sm:py-10 px-4 sm:px-6`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Official Hangar & Helicopter Logo + Store Identity */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <img
                src="./images/storelogo.jpg"
                alt="Old Sarge's Surplus Official Logo — Corrugated Hangar & Gold Utility Helicopter"
                className="w-44 sm:w-52 h-auto object-contain bg-black border-2 border-yellow-400 p-1.5 shadow-2xl"
              />
              <span className="absolute -bottom-2.5 left-2 bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase tracking-wider border border-black">
                EST. 30+ YRS • BRAGG BLVD
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="bg-yellow-400/15 border border-yellow-500/50 text-yellow-400 px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-widest">
                  FORT BRAGG / SPRING LAKE, NC
                </span>
                <span className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-widest">
                  ★ 4.3 GOOGLE MAPS (35+ HELPFUL STAFF)
                </span>
              </div>

              <h1
                className={`text-4xl sm:text-5xl font-black uppercase font-['Bebas_Neue'] tracking-wider leading-none ${
                  isDaylight ? 'text-[#141311]' : 'text-white'
                }`}
              >
                Old Sarge&apos;s Surplus
              </h1>

              <p
                className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                  isDaylight ? 'text-[#4A463F]' : 'text-zinc-300'
                }`}
              >
                Authentic USGI Military Surplus, CIF Turn-In &amp; Packing List Replacements, Rucksacks, MOLLE II Pouches, Poncho Liners (Woobies), Combat Boots, Ammo Cans &amp;{' '}
                <strong>In-House Uniform Sewing / Ruck Repair</strong> right outside Fort Bragg.
              </p>

              {/* Action Buttons Row */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${storeInfo.phoneRaw}`}
                  className={`inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider px-4 py-3 shadow-lg ${accentBtn}`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Counter: {storeInfo.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCifCalculatorOpen(true)}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider px-4 py-3 border border-emerald-400 shadow-lg cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>CIF Savings Calculator</span>
                </button>

                <a
                  href="#wayfinding"
                  className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider px-4 py-3 border border-sky-400 shadow-lg"
                >
                  <Compass className="w-4 h-4" />
                  <span>Don&apos;t Miss Our Turn (GPS Guide)</span>
                </a>

                <a
                  href={storeInfo.ebayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider px-3.5 py-3 border ${cardBg} hover:border-yellow-400`}
                >
                  <span>eBay Vault ({storeInfo.ebayHandle})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-yellow-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Storefront Command Card (Address, Hours & Live Sewing Status) */}
          <div className="lg:col-span-5">
            <div className={`border-2 border-yellow-400/80 p-4 sm:p-5 space-y-3.5 shadow-xl ${cardBg}`}>
              {/* Live On-Site Sewing Turnaround Indicator */}
              <div className="bg-emerald-950/80 border border-emerald-500/60 p-3 text-white flex items-start gap-2.5">
                <Scissors className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-mono font-black text-emerald-300 uppercase tracking-wider">
                    {sewingStatus.label}
                  </div>
                  <p className="text-zinc-200 text-[11px] mt-0.5">{sewingStatus.subtext}</p>
                  <p className="text-yellow-300 font-mono text-[10px] mt-1 font-bold uppercase">
                    • {sewingStatus.cutoffTime}
                  </p>
                </div>
              </div>

              {/* Address & Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 border ${subtleBg}`}>
                  <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-yellow-500 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bragg Blvd Storefront</span>
                  </div>
                  <p className="font-bold">{storeInfo.address}</p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    Minutes from Fort Bragg Gates
                  </p>
                  <a
                    href={storeInfo.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-yellow-500 hover:underline font-mono font-bold text-[11px] mt-1.5"
                  >
                    <span>Open in Google Maps →</span>
                  </a>
                </div>

                <div className={`p-3 border ${subtleBg}`}>
                  <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-yellow-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Store &amp; Sewing Hours</span>
                  </div>
                  <ul className="space-y-1 text-[11px]">
                    {storeInfo.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-2">
                        <span className="font-semibold">{h.days}:</span>
                        <span className="font-mono font-bold">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Pull-Sheet Status Bar */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-700/40">
                <div className="text-[11px] font-mono">
                  {holdItemCount > 0 ? (
                    <span className="text-emerald-400 font-bold">
                      🎒 {holdItemCount} Item(s) on Pull-Sheet (Est. CIF Savings: ${holdTotalSavings})
                    </span>
                  ) : (
                    <span className="opacity-75">
                      Build a 24-Hr Counter Hold List below &amp; text/call ahead
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsHoldDrawerOpen(true)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-yellow-300 border border-yellow-500/40 px-2.5 py-1 text-[11px] font-mono font-bold uppercase cursor-pointer shrink-0"
                >
                  View Hold List ({holdItemCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 3. FRESH CRATE ARRIVALS & CIF TURN-IN SAVERS RAIL                 */}
      {/* ================================================================= */}
      <section
        aria-label="Fresh Fort Bragg Surplus Crate Arrivals"
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bragg Blvd Floor Spotlight • Updated in Real Time</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide mt-0.5">
              Fresh Crate Arrivals &amp; CIF Statement-of-Charges Savers
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-3 py-1.5 border border-yellow-500/40 text-yellow-500 hover:bg-yellow-400 hover:text-black transition cursor-pointer self-start sm:self-auto"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Owner: Update Crate Status in 10s</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDrops.map((drop) => {
            const savings = Math.max(0, drop.cifCharge - drop.storePrice);
            const badgeStyle = STOCK_BADGE_MAP[drop.stockState] || STOCK_BADGE_MAP.IN_STOCK;
            return (
              <div
                key={drop.id}
                className={`border-2 border-yellow-500/40 p-4 flex flex-col justify-between gap-3 shadow-md ${cardBg}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                      {drop.badge}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                    >
                      <span className={`w-1.5 h-1.5 ${badgeStyle.dot}`} />
                      {badgeStyle.shortLabel}
                    </span>
                  </div>

                  <h3 className="font-bold text-base leading-snug">{drop.title}</h3>
                  <p className="font-mono text-[11px] opacity-75">
                    NSN: {drop.nsn} • {drop.condition}
                  </p>
                  <p className="text-xs opacity-85 leading-relaxed">{drop.notes}</p>
                </div>

                <div className="pt-3 border-t border-zinc-700/40 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs opacity-70 block">Old Sarge Price:</span>
                      <span className="text-2xl font-black font-mono text-yellow-500">
                        ${drop.storePrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] line-through opacity-60 block font-mono">
                        CIF Charge: ${drop.cifCharge}
                      </span>
                      <span className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-extrabold px-1.5 py-0.5">
                        SAVE ${savings}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToHoldList(
                        {
                          id: drop.id,
                          name: drop.title,
                          nsn: drop.nsn,
                          price: drop.storePrice,
                          cifCharge: drop.cifCharge
                        },
                        'Featured Crate Drop'
                      )
                    }
                    className={`w-full py-2 px-3 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${accentBtn}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to 24-Hr Counter Hold</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. LIVE 8-BAY INVENTORY & NSN SEARCH ENGINE                       */}
      {/* ================================================================= */}
      <section
        id="inventory-matrix"
        aria-label="Live 8-Bay Surplus Inventory and NSN Search"
        className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6"
      >
        {/* Search & Filter Control Box */}
        <div className={`border-2 p-4 sm:p-5 space-y-4 shadow-lg ${cardBg}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                Live Storefront Inventory &amp; NSN Locker Matrix (8 Tactical Bays)
              </h2>
              <p className="text-xs opacity-80">
                Search by gear name, NSN (e.g., <code className="font-mono">8465-01-641-6331</code>), or filter by CIF Turn-In essentials. Add items to your pull-sheet to hold at the counter.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCifOnlyFilter(!cifOnlyFilter)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                  cifOnlyFilter
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                    : `${subtleBg} hover:border-yellow-400`
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{cifOnlyFilter ? '✓ Showing CIF Essentials Only' : 'Filter: CIF Turn-In Gear Only'}</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-yellow-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search USGI gear, NSN (8465-...), 'Woobie', 'MOLLE II Ruck', 'Gore-Tex', 'Ammo Can', 'Sewing'..."
              aria-label="Search store inventory by keyword or NSN"
              className={`w-full pl-10 pr-4 py-3 text-sm font-sans border-2 focus:outline-none focus:border-yellow-400 ${subtleBg}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono underline text-yellow-500 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* 8 Tactical Bay Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setActiveBayId('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                activeBayId === 'all'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                  : `${subtleBg} hover:border-yellow-500/50`
              }`}
            >
              All 8 Bays ({inventoryBays.reduce((acc, b) => acc + b.items.length, 0)})
            </button>
            {inventoryBays.map((bay) => {
              const active = activeBayId === bay.id;
              return (
                <button
                  key={bay.id}
                  type="button"
                  onClick={() => setActiveBayId(bay.id)}
                  className={`px-2.5 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                    active
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                      : `${subtleBg} hover:border-yellow-500/50`
                  }`}
                >
                  {bay.code}: {bay.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bay Sections */}
        {filteredBays.length === 0 ? (
          <div className={`border p-8 text-center space-y-3 ${cardBg}`}>
            <p className="text-lg font-bold">
              No surplus items matched &ldquo;{searchQuery}&rdquo; in the current filter.
            </p>
            <p className="text-xs opacity-80 max-w-xl mx-auto">
              Our 240 S Bragg Blvd floor holds thousands of uncatalogued USGI surplus pieces and rotating military crates. Call the counter directly and we will check the shelves for you!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveBayId('all');
                  setCifOnlyFilter(false);
                }}
                className="px-4 py-2 bg-yellow-400 text-black font-black text-xs uppercase cursor-pointer"
              >
                Reset All Filters
              </button>
              <a
                href={`tel:${storeInfo.phoneRaw}`}
                className="px-4 py-2 bg-emerald-600 text-white font-black text-xs uppercase"
              >
                Call Counter: {storeInfo.phone}
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredBays.map((bay) => (
              <div key={bay.id} className="space-y-3">
                <div className="border-b-2 border-yellow-500/50 pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-black font-mono text-xs font-black px-2 py-0.5 uppercase">
                      {bay.code}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                      {bay.name}
                    </h3>
                  </div>
                  <p className="text-xs opacity-75">{bay.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bay.items.map((item) => {
                    const badge = STOCK_BADGE_MAP[item.stockStatus] || STOCK_BADGE_MAP.IN_STOCK;
                    const cifSavings = Math.max(0, (item.cifCharge || 0) - item.price);
                    const isSoldOut = item.stockStatus === 'SOLD_OUT';

                    return (
                      <div
                        key={item.id}
                        className={`border p-4 flex flex-col justify-between gap-3 transition hover:border-yellow-400/70 ${cardBg}`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold border ${badge.bg} ${badge.border} ${badge.text}`}
                            >
                              <span className={`w-1.5 h-1.5 ${badge.dot}`} />
                              {badge.label}
                            </span>

                            {item.cifEssential && (
                              <span className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
                                ✓ CIF Layout Item
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-base leading-snug">{item.name}</h4>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono opacity-80">
                            <span className="px-1.5 py-0.5 bg-black/30 border border-zinc-700">
                              NSN: {item.nsn}
                            </span>
                            <span>• {item.condition}</span>
                          </div>

                          <p className="text-xs opacity-85 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="pt-3 border-t border-zinc-700/40 space-y-2.5">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-[11px] opacity-70 block">Store Price:</span>
                              <span className="text-2xl font-black font-mono text-yellow-500">
                                ${item.price}
                              </span>
                            </div>

                            {cifSavings > 0 && (
                              <div className="text-right">
                                <span className="text-[10px] line-through opacity-60 block font-mono">
                                  CIF / Retail: ${item.cifCharge}
                                </span>
                                <span className="text-emerald-400 font-mono text-xs font-extrabold">
                                  Save ${cifSavings}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isSoldOut}
                              onClick={() => addToHoldList(item, bay.shortName)}
                              className={`flex-1 py-2 px-3 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                                isSoldOut
                                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                                  : accentBtn
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isSoldOut ? 'Sold Out' : 'Add to Hold List'}</span>
                            </button>

                            <a
                              href={`${storeInfo.ebayUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`py-2 px-2.5 text-[11px] font-mono font-bold uppercase border ${subtleBg} hover:border-yellow-400`}
                              title="Check our verified eBay store for mail-order stock"
                            >
                              eBay ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================================================= */}
      {/* 5. ON-SITE UNIFORM SEWING & RUCK REPAIR SHOWCASE                  */}
      {/* ================================================================= */}
      <section
        aria-label="On-Site Uniform Sewing and Alterations Department"
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6"
      >
        <div className={`border-2 border-yellow-400/70 p-5 sm:p-8 ${cardBg}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-mono text-xs font-black px-2.5 py-0.5 uppercase">
                <Scissors className="w-3.5 h-3.5" />
                <span>In-House Sewing Department • 240 S Bragg Blvd</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                AR 670-1 Uniform Sewing, Name Tapes &amp; Heavy Rucksack Repair
              </h2>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                Whether you have a change-of-command inspection tomorrow morning, need fresh OCP name tapes and Airborne/Air Assault/Ranger badges sewn to exact regulation tolerances, or blew out a zipper on your MOLLE II ruck before field recovery—our on-site seamstresses and walking-foot machines get you squared away fast.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className={`p-3 border ${subtleBg}`}>
                  <div className="font-mono font-bold text-xs text-yellow-500 uppercase">
                    ✓ Full OCP Coat Setup ($22)
                  </div>
                  <p className="text-[11px] mt-1">
                    Name tape, U.S. Army tape, centered rank, and up to 2 skill badges stitched straight and regulation-compliant.
                  </p>
                </div>
                <div className={`p-3 border ${subtleBg}`}>
                  <div className="font-mono font-bold text-xs text-yellow-500 uppercase">
                    ✓ Heavy Cordura &amp; Ruck Repair ($20+)
                  </div>
                  <p className="text-[11px] mt-1">
                    Industrial needle repair for torn rucksack shoulder straps, Sustainment pouch buckles, and sleeping bag bivy zippers.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className={`p-4 border-2 border-emerald-500/60 ${subtleBg} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black uppercase text-emerald-400">
                    Current Sewing Desk Status
                  </span>
                  <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                    Live Board
                  </span>
                </div>
                <p className="font-bold text-base">{sewingStatus.label}</p>
                <p className="text-xs opacity-85">{sewingStatus.subtext}</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`tel:${storeInfo.phoneRaw}`}
                    className="flex-1 text-center bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-2.5 px-3"
                  >
                    Call Sewing Desk: {storeInfo.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsTvBoardOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-yellow-300 border border-yellow-500/40 font-mono font-bold text-xs uppercase py-2.5 px-3 cursor-pointer"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Open 1080p Counter TV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5.5. BRAGG BLVD WAYFINDING & "DON'T MISS OUR TURN" GPS HUB        */}
      {/* ================================================================= */}
      <section
        id="wayfinding"
        aria-label="240 S Bragg Blvd Turn-by-Turn Wayfinding and GPS Navigation"
        className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6"
      >
        <div className={`border-2 border-yellow-400 p-5 sm:p-8 shadow-2xl ${cardBg}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: GPS Launchers & 4 Approach Cues */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-mono text-xs font-black px-2.5 py-0.5 uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Fast 45 MPH Corridor Navigation • Don&apos;t Blow Past Our Turn!</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide mt-2">
                  How to Spot &amp; Turn Into 240 S Bragg Blvd Without Passing Us
                </h2>
                <p className="text-xs sm:text-sm opacity-85 mt-1 leading-relaxed">
                  Traffic moves fast coming off Fort Bragg onto S Bragg Blvd (NC-24 / NC-87), and first-time visitors can easily drive past our storefront if they are in the wrong lane. Lock in our exact rooftop pin below and check your approach lane before you roll:
                </p>
              </div>

              {/* 3 Giant 1-Tap GPS App Launchers + Copy Pin */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={storeInfo.appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-3 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md ${accentBtn}`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Apple Maps (CarPlay)</span>
                </a>

                <a
                  href={storeInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Google Maps Route</span>
                </a>

                <a
                  href={storeInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-3 border font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${subtleBg} hover:border-yellow-400`}
                >
                  <Car className="w-4 h-4 text-sky-400" />
                  <span>Launch Waze</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyWayfinding}
                  className={`px-3.5 py-3 border font-mono font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer ${subtleBg} hover:border-yellow-400`}
                >
                  <Copy className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{copiedWayfinding ? '✓ Copied GPS Pin!' : 'Copy Pin for Squad'}</span>
                </button>
              </div>

              {/* 4 Numbered Approach & Lane Cues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {storeInfo.wayfindingLandmarks.map((w, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border border-yellow-500/30 flex flex-col justify-between gap-2 ${subtleBg}`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                          {idx + 1}. {w.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm leading-snug">
                        {w.direction}
                      </h3>
                      <p className="text-xs opacity-85 leading-relaxed">{w.cue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Rooftop GPS Telemetry, Store Hours & 5-Star Fort Bragg Reviews */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`p-5 border-2 border-yellow-500/50 space-y-4 ${subtleBg}`}>
                <div className="flex items-center justify-between border-b border-zinc-700/50 pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-yellow-500 block">
                      ROOFTOP GPS TELEMETRY PIN
                    </span>
                    <h3 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                      240 S Bragg Blvd • Spring Lake, NC 28390
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 font-bold">
                    35.1636° N, -78.9728° W
                  </span>
                </div>

                {/* Hours Schedule */}
                <div className="space-y-2 text-xs">
                  <div className="font-mono font-bold uppercase text-yellow-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Verified Store &amp; Sewing Hours</span>
                  </div>
                  {storeInfo.hours.map((row) => (
                    <div
                      key={row.days}
                      className="flex justify-between py-1.5 border-b border-zinc-700/30 last:border-none"
                    >
                      <span className="font-semibold">{row.days}</span>
                      <span className="font-mono font-bold">{row.time}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Fort Bragg Reviews */}
                <div className="space-y-2 pt-2 border-t border-zinc-700/50">
                  <div className="font-mono text-[11px] font-bold uppercase text-yellow-500">
                    ★ Verified Fort Bragg &amp; Local Guide Feedback
                  </div>
                  {storeInfo.customerReviews.slice(0, 2).map((rev) => (
                    <div key={rev.id} className={`p-3 border ${cardBg} space-y-1`}>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-yellow-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono opacity-70">{rev.author}</span>
                      </div>
                      <div className="text-xs font-bold">{rev.highlight}</div>
                      <p className="text-[11px] opacity-85 leading-relaxed">&ldquo;{rev.quote}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. FOOTER & PROJECT AEGIS COMPLIANCE                              */}
      {/* ================================================================= */}
      <footer className="bg-[#06080B] border-t-2 border-yellow-400/50 text-zinc-400 py-8 px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-3">
              <img
                src="./images/storelogo.jpg"
                alt="Old Sarge's Surplus"
                className="w-20 h-14 object-contain bg-black border border-yellow-400/60 p-1"
              />
              <div>
                <h3 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
                  Old Sarge&apos;s Surplus
                </h3>
                <p className="text-xs text-yellow-400 font-mono">
                  {storeInfo.address} • {storeInfo.phone}
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Family-owned and operated in Spring Lake, North Carolina outside Fort Bragg. All trademarks, NSN references, and USGI nomenclature are used strictly for surplus identification.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <h4 className="font-mono font-bold uppercase text-white tracking-wider">
              Entity Disambiguation &amp; Consumer Protection
            </h4>
            <p className="leading-relaxed text-zinc-400">
              <strong>Old Sarge&apos;s Surplus (Spring Lake, NC)</strong> is an independent North Carolina retail business and is <strong>not affiliated</strong> with <em>Old Sarge&apos;s Drop Zone</em> (<code className="text-zinc-300">oldsargesdropzone.com</code>, Westfield, NY).
            </p>
            <button
              type="button"
              onClick={() => setIsDisambiguationModalOpen(true)}
              className="text-yellow-400 hover:underline font-mono font-bold text-[11px] cursor-pointer"
            >
              Read Official Disambiguation Notice →
            </button>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-mono font-bold uppercase text-white tracking-wider">
              Platform Verification
            </h4>
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-2.5 py-1 text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Aegis™ Verified • WCAG 2.1 AA</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Zero Third-Party Tracking Pixels • Sub-200ms Mobile Edge Delivery • 100% Offline USB Counter TV Ready.
            </p>
            <button
              type="button"
              onClick={() => setIsWhitePaperOpen(true)}
              className="inline-flex items-center gap-1 text-yellow-400 hover:underline font-mono font-bold text-[11px] cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>View Discovery &amp; SEO Architecture Blueprint</span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
