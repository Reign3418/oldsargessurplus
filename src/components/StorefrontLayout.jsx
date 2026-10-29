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
  Star,
  Award,
  Layers,
  Table,
  Store
} from 'lucide-react';

export default function StorefrontLayout() {
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
    holdTotalCifValue,
    holdTotalSavings,
    setIsHoldDrawerOpen,
    setIsDisambiguationModalOpen,
    setIsCifCalculatorOpen,
    setIsSewingModalOpen,
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

  const [copiedWayfinding, setCopiedWayfinding] = useState(false);

  const handleCopyWayfinding = async () => {
    try {
      await navigator.clipboard.writeText(
        `${storeInfo.name} — ${storeInfo.address} (${storeInfo.phone}) • ${storeInfo.googleMapsDirectionsUrl}`
      );
      setCopiedWayfinding(true);
      setTimeout(() => setCopiedWayfinding(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  // Filter bays and items across all 3 layouts
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

  const totalCatalogItems = inventoryBays.reduce((sum, b) => sum + b.items.length, 0);

  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden">
      {/* ================================================================= */}
      {/* SHARED ENTITY DISAMBIGUATION & REPUTATION SHIELD BANNER           */}
      {/* ================================================================= */}
      <section
        aria-label="Official Storefront Verification & Disambiguation Notice"
        className="bg-gradient-to-r from-rose-950 via-[#1D1115] to-[#131822] border-b border-yellow-400/70 text-white py-1.5 px-3 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center gap-2 text-xs">
            <span className="bg-yellow-400 text-black font-mono font-black px-1.5 py-0.5 text-[10px] uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0 rounded-xs">
              OFFICIAL NC STORE
            </span>
            <p className="text-zinc-100 leading-snug">
              <strong>240 S Bragg Blvd, Spring Lake, NC</strong> (Fort Bragg) •{' '}
              <strong className="text-yellow-300 underline">ZERO affiliation</strong> with{' '}
              <em>&ldquo;Old Sarge&apos;s Drop Zone&rdquo;</em> in Westfield, NY.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-[11px] uppercase tracking-wide px-2.5 py-1 border border-rose-300/80 rounded-xs shrink-0 cursor-pointer shadow"
          >
            <ShieldAlert className="w-3 h-3 shrink-0" />
            <span>Missing a NY Order? Click Before Reviewing →</span>
          </button>
        </div>
      </section>

      {/* ================================================================= */}
      {/* ARCHITECTURE 1: "TACTICAL HANGAR & CIF COMMAND CENTER" (hangar)   */}
      {/* Split Command Hero + 4-Col Bento Drops + 3-Col Tactical Cards     */}
      {/* ================================================================= */}
      {themeVersion === 'hangar' && (
        <div className="bg-[#0B0D10] text-[#F4F4F0]">
          {/* HERO COMMAND HEADER */}
          <header className="bg-[#0E1117] border-b border-[#232A38] relative overflow-hidden">
            <div className="max-w-7xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left 7 Cols: Brand Emblem + Core Value Prop */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider border bg-yellow-400/15 text-yellow-300 border-yellow-400/50">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Layout 01 • Tactical Hangar &amp; CIF Command Center</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>In-House Sewing &amp; CIF Turn-In HQ</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={`${import.meta.env.BASE_URL}images/storelogo.jpg`}
                      alt="Old Sarge's Surplus official logo featuring helicopter and corrugated steel hangar"
                      className="w-28 h-20 sm:w-36 sm:h-24 object-cover border-2 border-yellow-400 shadow-lg shrink-0 bg-black"
                    />
                    <div>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none font-['Bebas_Neue']">
                        OLD SARGE&apos;S SURPLUS
                      </h1>
                      <p className="text-sm sm:text-base font-bold text-yellow-400 mt-1">
                        Authentic USGI Military Surplus, CIF Turn-In Locker &amp; On-Site Uniform Sewing
                      </p>
                      <p className="text-xs sm:text-sm opacity-80 mt-1">
                        Floor-to-ceiling genuine issue gear at <strong>240 S Bragg Blvd, Spring Lake, NC</strong>. Save 40%–65% off Fort Bragg CIF Statement-of-Charges prices.
                      </p>
                    </div>
                  </div>

                  {/* Primary Action CTA Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsCifCalculatorOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-3 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black"
                    >
                      <Calculator className="w-4 h-4 shrink-0" />
                      <span>🎒 CIF Turn-In Savings Calculator</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSewingModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-3 font-black text-xs sm:text-sm uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black shadow-lg transition cursor-pointer"
                    >
                      <Scissors className="w-4 h-4 shrink-0" />
                      <span>🧵 Interactive Name Tape &amp; Sew Builder</span>
                    </button>

                    <a
                      href="#wayfinding"
                      className="inline-flex items-center gap-1.5 px-3.5 py-3 font-bold text-xs sm:text-sm uppercase tracking-wider border border-yellow-400/60 bg-[#0B0E14] text-zinc-200 hover:border-yellow-400 transition"
                    >
                      <Navigation className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Find Our Turn-In</span>
                    </a>
                  </div>
                </div>

                {/* Right 5 Cols: Live Store Telemetry, Hours & Sewing Turnaround Card */}
                <div className="lg:col-span-5 border-2 border-[#262F40] bg-[#12161F] p-4 sm:p-5 shadow-xl space-y-3.5">
                  <div
                    onClick={() => setIsSewingModalOpen(true)}
                    className="p-3 bg-emerald-950/70 border border-emerald-500/60 flex items-start gap-2.5 cursor-pointer hover:border-yellow-400 transition"
                  >
                    <Scissors className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-mono font-black text-emerald-300 uppercase tracking-wider">
                        {sewingStatus.label}
                      </div>
                      <p className="text-zinc-200 text-[11px] mt-0.5">{sewingStatus.subtext}</p>
                      <p className="text-yellow-300 font-mono text-[10px] mt-1 font-bold uppercase">
                        • Tap to open AR 670-1 Name Tape &amp; Sew Ticket Builder →
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 border border-[#1F2735] bg-[#0B0E14]">
                      <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-yellow-500 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Bragg Blvd Hangar</span>
                      </div>
                      <p className="font-bold">{storeInfo.address}</p>
                      <p className="text-[11px] opacity-80 mt-0.5">0.8 Mi North of Fort Bragg</p>
                      <a
                        href="#wayfinding"
                        className="inline-flex items-center gap-1 text-yellow-400 hover:underline font-mono font-bold text-[11px] mt-1.5"
                      >
                        <span>Lane &amp; Turn-In Guide →</span>
                      </a>
                    </div>

                    <div className="p-3 border border-[#1F2735] bg-[#0B0E14]">
                      <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-yellow-500 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Store &amp; Sew Hours</span>
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

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-700/40">
                    <div className="text-[11px] font-mono">
                      {holdItemCount > 0 ? (
                        <span className="text-emerald-400 font-bold">
                          🎒 {holdItemCount} Item(s) on Pull-Sheet (Save ${holdTotalSavings})
                        </span>
                      ) : (
                        <span className="opacity-75">
                          Build a 24-Hr Counter Hold List below
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsHoldDrawerOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-black font-black text-xs uppercase cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Hold Sheet ({holdItemCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* FRESH FORT BRAGG CRATE ARRIVALS (4-COL BENTO GRID) */}
          <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-yellow-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct From DRMO &amp; Tactical Lots • Updated In-Store</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                  Fresh Crate Arrivals &amp; CIF Turn-In Lifesavers
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsTvBoardOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-yellow-400 hover:underline cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>View on 1080p Counter TV Board →</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredDrops.map((drop) => {
                const badgeStyle = STOCK_BADGE_MAP[drop.stockState] || STOCK_BADGE_MAP.IN_STOCK;
                const savings = Math.max(0, drop.cifCharge - drop.storePrice);
                return (
                  <div
                    key={drop.id}
                    className="border-2 border-[#262F40] bg-[#12161F] p-4 flex flex-col justify-between gap-3 shadow-md hover:border-yellow-400 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                          {drop.badge}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                        >
                          {badgeStyle.shortLabel}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm leading-snug">{drop.title}</h3>
                      <p className="text-[11px] font-mono opacity-75">
                        NSN: {drop.nsn} • {drop.condition}
                      </p>
                      <p className="text-xs opacity-85">{drop.notes}</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-700/40 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs opacity-70 block">Old Sarge Price:</span>
                          <span className="text-2xl font-black text-yellow-400 font-mono">
                            ${drop.storePrice}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] line-through opacity-60 block font-mono">
                            CIF Charge: ${drop.cifCharge}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            Save ${savings}
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
                              condition: drop.condition,
                              price: drop.storePrice,
                              cifCharge: drop.cifCharge
                            },
                            'Featured Crate Drop'
                          )
                        }
                        className="w-full py-2 px-3 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to 24-Hr Hold Pull-Sheet</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 8-BAY TACTICAL LOCKER MATRIX */}
          <section id="inventory-matrix" className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
            <div className="border-2 border-[#262F40] bg-[#12161F] p-4 sm:p-5 space-y-4 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                    Live Storefront Inventory &amp; NSN Locker Matrix (8 Tactical Bays)
                  </h2>
                  <p className="text-xs opacity-80">
                    Search by gear name, NSN (e.g., <code className="font-mono">8465-01-641-6331</code>), or filter by CIF Turn-In essentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCifOnlyFilter(!cifOnlyFilter)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                    cifOnlyFilter
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                      : 'bg-[#0B0E14] border-[#1F2735] text-zinc-300 hover:border-yellow-400'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{cifOnlyFilter ? '✓ CIF Essentials Only' : 'Filter: CIF Turn-In Gear Only'}</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-yellow-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search USGI gear, NSN (8465-...), 'Woobie', 'MOLLE II Ruck', 'Gore-Tex', 'Ammo Can', 'Sewing'..."
                  className="w-full pl-10 pr-4 py-3 text-sm font-sans border-2 border-[#1F2735] bg-[#0B0E14] text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveBayId('all')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                    activeBayId === 'all'
                      ? 'bg-yellow-400 text-black border-white font-black'
                      : 'bg-[#0B0E14] border-[#1F2735] text-zinc-300 hover:border-yellow-400'
                  }`}
                >
                  All 8 Bays ({totalCatalogItems})
                </button>
                {inventoryBays.map((bay) => (
                  <button
                    key={bay.id}
                    type="button"
                    onClick={() => setActiveBayId(bay.id)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                      activeBayId === bay.id
                        ? 'bg-yellow-400 text-black border-white font-black'
                        : 'bg-[#0B0E14] border-[#1F2735] text-zinc-300 hover:border-yellow-400'
                    }`}
                  >
                    {bay.code}: {bay.shortName}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {filteredBays.map((bay) => (
                <div key={bay.id} className="space-y-3">
                  <div className="border-b-2 border-yellow-400/60 pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-black uppercase px-2 py-0.5 bg-yellow-400 text-black mr-2">
                        {bay.code}
                      </span>
                      <h3 className="inline text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                        {bay.name}
                      </h3>
                      <p className="text-xs opacity-80 mt-0.5">{bay.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bay.items.map((item) => {
                      const badge = STOCK_BADGE_MAP[item.stockStatus] || STOCK_BADGE_MAP.IN_STOCK;
                      const cifSavings = Math.max(0, (item.cifCharge || 0) - item.price);
                      const isSoldOut = item.stockStatus === 'SOLD_OUT';

                      return (
                        <div
                          key={item.id}
                          className="border border-[#262F40] bg-[#12161F] p-4 flex flex-col justify-between gap-3 hover:border-yellow-400 transition"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 border ${badge.bg} ${badge.border} ${badge.text}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                <span>{badge.label}</span>
                              </span>
                              {item.cifEssential && (
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-mono font-bold px-1.5 py-0.5">
                                  CIF TURN-IN
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-sm sm:text-base leading-snug">
                              {item.name}
                            </h4>

                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono opacity-80">
                              <span className="px-1.5 py-0.5 border border-[#1F2735] bg-[#0B0E14]">
                                NSN: {item.nsn}
                              </span>
                              <span>• {item.condition}</span>
                            </div>

                            <p className="text-xs opacity-85 leading-relaxed">{item.description}</p>
                          </div>

                          <div className="pt-3 border-t border-zinc-700/40 space-y-2.5">
                            <div className="flex items-baseline justify-between">
                              <div>
                                <span className="text-[10px] font-mono uppercase opacity-70 block">
                                  Store Price:
                                </span>
                                <span className="text-2xl font-black font-mono text-yellow-400">
                                  ${item.price}
                                </span>
                              </div>

                              {cifSavings > 0 && (
                                <div className="text-right">
                                  <span className="text-[11px] font-mono line-through opacity-60 block">
                                    CIF Charge: ${item.cifCharge}
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
                                    : 'bg-yellow-400 hover:bg-yellow-300 text-black'
                                }`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{isSoldOut ? 'Sold Out' : 'Add to Hold List'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ================================================================= */}
      {/* ARCHITECTURE 2: "FORT BRAGG QUARTERMASTER NSN LEDGER" (olivedrab) */}
      {/* Sticky Left Quartermaster Rail + Dense Technical NSN Supply Table */}
      {/* ================================================================= */}
      {themeVersion === 'olivedrab' && (
        <div className="bg-[#11160F] text-[#F1EFE6]">
          {/* QUARTERMASTER DISPATCH HEADER & 4-STAT TELEMETRY RIBBON */}
          <header className="bg-[#151D12] border-b-2 border-emerald-500/50">
            <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <img
                    src={`${import.meta.env.BASE_URL}images/storelogo.jpg`}
                    alt="Old Sarge's Surplus Quartermaster Emblem"
                    className="w-24 h-18 object-cover border-2 border-emerald-400 shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                        LAYOUT 02 • FORT BRAGG QUARTERMASTER NSN LEDGER
                      </span>
                      <span className="font-mono text-xs text-emerald-300">
                        STATION: 240 S BRAGG BLVD • SPRING LAKE, NC
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-[#F1EFE6] mt-0.5">
                      OLD SARGE&apos;S DIRECT SUPPORT CIF &amp; SEWING DEPOT
                    </h1>
                    <p className="text-xs font-mono text-emerald-200/80">
                      Built for soldiers holding a physical CIF Clothing Record: scan by NSN, compare Statement-of-Charges vs. Store Price, and lock in your 24-Hr Pull Sheet.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsCifCalculatorOpen(true)}
                    className="px-3.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>CIF Statement Calculator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSewingModalOpen(true)}
                    className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>AR 670-1 Sew &amp; Tape Terminal</span>
                  </button>
                </div>
              </div>

              {/* 4-Cell Quartermaster Telemetry Ribbon */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-[#0D120B] border border-emerald-500/40 p-3 font-mono">
                  <div className="text-[10px] text-emerald-400 uppercase">01 // ACTIVE SUPPLY BAYS</div>
                  <div className="text-xl font-black text-white mt-0.5">08 BAYS • {totalCatalogItems} NSNs</div>
                  <div className="text-[11px] text-zinc-400">Inspected Grade-1 &amp; Unissued</div>
                </div>
                <div className="bg-[#0D120B] border border-emerald-500/40 p-3 font-mono">
                  <div className="text-[10px] text-emerald-400 uppercase">02 // AVG CIF TURN-IN SAVINGS</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">SAVE 45% – 65%</div>
                  <div className="text-[11px] text-zinc-400">vs. Fort Bragg Statement of Charges</div>
                </div>
                <div
                  onClick={() => setIsSewingModalOpen(true)}
                  className="bg-[#0D120B] border border-amber-500/50 p-3 font-mono cursor-pointer hover:border-amber-400"
                >
                  <div className="text-[10px] text-amber-400 uppercase">03 // SEW &amp; NAME TAPE DESK</div>
                  <div className="text-sm font-black text-white mt-0.5 truncate">{sewingStatus.label}</div>
                  <div className="text-[11px] text-amber-300 underline">Click to Build Sew Ticket →</div>
                </div>
                <div className="bg-[#0D120B] border border-emerald-500/40 p-3 font-mono">
                  <div className="text-[10px] text-emerald-400 uppercase">04 // GRID COORDINATES</div>
                  <div className="text-base font-black text-white mt-0.5">240 S BRAGG BLVD</div>
                  <div className="text-[11px] text-zinc-400">Spring Lake • (910) 497-5335</div>
                </div>
              </div>
            </div>
          </header>

          {/* 2-PANE QUARTERMASTER WORKSPACE: STICKY LEFT RAIL + RIGHT NSN LEDGER TABLE */}
          <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT STICKY QUARTERMASTER SIDEBAR (3 COLS) */}
              <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-4">
                {/* Bay Index Selector */}
                <div className="bg-[#171F14] border-2 border-[#2D3B26] p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#2D3B26] pb-2">
                    <span className="font-mono text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5" />
                      <span>Supply Bay Directory</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setActiveBayId('all')}
                      className={`w-full text-left px-2.5 py-2 text-xs font-mono font-bold uppercase flex items-center justify-between border cursor-pointer ${
                        activeBayId === 'all'
                          ? 'bg-emerald-500 text-black border-white font-black'
                          : 'bg-[#10150E] text-zinc-300 border-[#293622] hover:border-emerald-400'
                      }`}
                    >
                      <span>ALL BAYS (FULL MANIFEST)</span>
                      <span>[{totalCatalogItems}]</span>
                    </button>

                    {inventoryBays.map((bay) => (
                      <button
                        key={bay.id}
                        type="button"
                        onClick={() => setActiveBayId(bay.id)}
                        className={`w-full text-left px-2.5 py-2 text-xs font-mono font-bold uppercase flex items-center justify-between border cursor-pointer ${
                          activeBayId === bay.id
                            ? 'bg-emerald-500 text-black border-white font-black'
                            : 'bg-[#10150E] text-zinc-300 border-[#293622] hover:border-emerald-400'
                        }`}
                      >
                        <span className="truncate pr-2">
                          {bay.code} • {bay.shortName}
                        </span>
                        <span className="shrink-0">[{bay.items.length}]</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Pinned CIF Pull-Sheet Clipboard */}
                <div className="bg-[#171F14] border-2 border-emerald-500/70 p-4 space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-[#2D3B26] pb-2">
                    <span className="text-xs font-black uppercase text-emerald-400">
                      📋 ACTIVE PULL-SHEET CLIPBOARD
                    </span>
                    <span className="bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5">
                      {holdItemCount} ITEMS
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">CIF Statement Value:</span>
                      <span className="line-through text-rose-400">${holdTotalCifValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Old Sarge Counter Total:</span>
                      <span className="font-bold text-white">${holdTotalCost}</span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-[#2D3B26] text-emerald-400 font-black text-sm">
                      <span>Est. Soldier Savings:</span>
                      <span>${holdTotalSavings}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsHoldDrawerOpen(true)}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer"
                  >
                    Open Counter Pull Sheet ({holdItemCount}) →
                  </button>
                </div>
              </aside>

              {/* RIGHT MAIN PANE: DENSE NSN TECHNICAL SUPPLY LEDGER TABLE (9 COLS) */}
              <div className="lg:col-span-9 space-y-4">
                {/* Search & Filter Toolbar */}
                <div className="bg-[#171F14] border-2 border-[#2D3B26] p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter Ledger by NSN (e.g. 8465-01-641-6331), Nomenclature, 'Ruck', 'Bivy', 'Boots'..."
                      className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[#0D120B] border border-[#2D3B26] text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setCifOnlyFilter(!cifOnlyFilter)}
                    className={`px-3 py-2 text-xs font-mono font-bold uppercase border cursor-pointer shrink-0 ${
                      cifOnlyFilter
                        ? 'bg-emerald-500 text-black border-white font-black'
                        : 'bg-[#0D120B] text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {cifOnlyFilter ? '✓ CIF Turn-In Items Only' : 'Filter: CIF Turn-In Only'}
                  </button>
                </div>

                {/* Dense NSN Ledger Tables by Bay */}
                {filteredBays.map((bay) => (
                  <div key={bay.id} className="bg-[#171F14] border-2 border-[#2D3B26] overflow-hidden">
                    <div className="bg-[#1F2A1B] px-4 py-2.5 border-b border-[#2D3B26] flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 mr-2">
                          {bay.code}
                        </span>
                        <h3 className="inline font-['Bebas_Neue'] text-2xl tracking-wider uppercase text-white">
                          {bay.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-300">
                        {bay.items.length} Line Item(s)
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0D120B] border-b border-[#2D3B26] text-[10px] font-mono uppercase text-emerald-400">
                            <th className="py-2.5 px-3">NSN / Stock No.</th>
                            <th className="py-2.5 px-3">Nomenclature &amp; Technical Spec</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">CIF Charge</th>
                            <th className="py-2.5 px-3 text-right">Store Price</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#25311F] text-xs">
                          {bay.items.map((item) => {
                            const badge = STOCK_BADGE_MAP[item.stockStatus] || STOCK_BADGE_MAP.IN_STOCK;
                            const savings = Math.max(0, (item.cifCharge || 0) - item.price);
                            const isSoldOut = item.stockStatus === 'SOLD_OUT';

                            return (
                              <tr key={item.id} className="hover:bg-[#1E281A] transition">
                                <td className="py-3 px-3 font-mono text-[11px] text-amber-300 whitespace-nowrap align-top">
                                  <div>{item.nsn}</div>
                                  <div className="text-[10px] text-zinc-400">{item.condition}</div>
                                </td>
                                <td className="py-3 px-3 align-top">
                                  <div className="font-bold text-white">{item.name}</div>
                                  <div className="text-[11px] text-zinc-300 mt-0.5">
                                    {item.description}
                                  </div>
                                </td>
                                <td className="py-3 px-3 align-top whitespace-nowrap">
                                  <span
                                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 border ${badge.bg} ${badge.border} ${badge.text}`}
                                  >
                                    {badge.shortLabel}
                                  </span>
                                </td>
                                <td className="py-3 px-3 font-mono text-right align-top whitespace-nowrap">
                                  <div className="line-through text-zinc-400">${item.cifCharge}</div>
                                  {savings > 0 && (
                                    <div className="text-[10px] text-emerald-400 font-bold">
                                      Save ${savings}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-3 font-mono text-right align-top whitespace-nowrap">
                                  <span className="text-lg font-black text-emerald-400">
                                    ${item.price}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right align-top whitespace-nowrap">
                                  <button
                                    type="button"
                                    disabled={isSoldOut}
                                    onClick={() => addToHoldList(item, bay.shortName)}
                                    className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase cursor-pointer ${
                                      isSoldOut
                                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                        : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                                    }`}
                                  >
                                    {isSoldOut ? 'OUT' : '+ PULL'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ================================================================= */}
      {/* ARCHITECTURE 3: "HERITAGE SHOWROOM & OUTFITTERS CATALOG" (daylight)*/}
      {/* Sunlit Department Store Masthead + Editorial Hero + 2-Col Catalog */}
      {/* ================================================================= */}
      {themeVersion === 'daylight' && (
        <div className="bg-[#F5F2EB] text-[#171614]">
          {/* CLASSIC RETAIL DEPARTMENT STORE TOP MASTHEAD */}
          <header className="bg-[#FAF8F3] border-b-2 border-[#D6D0C4]">
            {/* Top Utility Strip */}
            <div className="bg-[#EBE6DA] border-b border-[#D6D0C4] py-1.5 px-4 sm:px-6 text-xs">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 font-medium text-[#3F3C36]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#B45309]">
                    <Store className="w-3.5 h-3.5" />
                    <span>Layout 03 • Sunlit Retail Showroom &amp; Outfitters Catalog</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    <strong>240 S Bragg Blvd, Spring Lake, NC</strong> (Open Mon–Sat)
                  </span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs">
                  <a href={`tel:${storeInfo.phoneRaw}`} className="font-bold text-[#B45309] hover:underline">
                    📞 {storeInfo.phone}
                  </a>
                  <a
                    href={storeInfo.ebayUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#171614] hover:underline"
                  >
                    Verified eBay Store ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Centered Showroom Brand Header */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={`${import.meta.env.BASE_URL}images/storelogo.jpg`}
                    alt="Old Sarge's Surplus Showroom Logo"
                    className="w-28 h-20 object-cover border-2 border-[#B45309] shadow-md rounded"
                  />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B45309] font-bold">
                      SPRING LAKE &amp; FORT BRAGG&apos;S FAMILY-OWNED SURPLUS OUTFITTER
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-[#171614]">
                      OLD SARGE&apos;S MILITARY SURPLUS &amp; SEWING
                    </h1>
                    <p className="text-xs sm:text-sm text-[#4A463F]">
                      Serving Active-Duty Soldiers, Veterans, Hunters, Campers, Boy Scouts &amp; Collectors on Bragg Blvd
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsSewingModalOpen(true)}
                    className="px-4 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white font-black text-xs uppercase tracking-wider rounded shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Custom Name Tapes &amp; Sewing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCifCalculatorOpen(true)}
                    className="px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs uppercase tracking-wider rounded shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>CIF Savings Calculator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsHoldDrawerOpen(true)}
                    className="px-3.5 py-2.5 bg-[#171614] text-white font-bold text-xs uppercase rounded cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Counter Hold ({holdItemCount})</span>
                  </button>
                </div>
              </div>

              {/* 3 Showroom Department Spotlight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div
                  onClick={() => setIsCifCalculatorOpen(true)}
                  className="bg-[#EFECE4] border-2 border-[#D6D0C4] hover:border-[#B45309] p-4 rounded-lg cursor-pointer transition space-y-1.5"
                >
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#15803D] text-white rounded-xs">
                    DEPARTMENT 01 • SOLDIER CIF HQ
                  </span>
                  <h2 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                    Fort Bragg CIF Turn-In &amp; Packing List Gear
                  </h2>
                  <p className="text-xs text-[#4A463F]">
                    Missing a rucksack, Gore-Tex bivy cover, wet weather bag, or canteen cup? Save up to 65% off Statement of Charges.
                  </p>
                  <div className="text-xs font-bold text-[#B45309] pt-1">
                    Open CIF Price Comparison Tool →
                  </div>
                </div>

                <div
                  onClick={() => setIsSewingModalOpen(true)}
                  className="bg-[#EFECE4] border-2 border-[#B45309] p-4 rounded-lg cursor-pointer transition space-y-1.5 shadow-sm"
                >
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#B45309] text-white rounded-xs">
                    DEPARTMENT 02 • IN-HOUSE SEW SHOP
                  </span>
                  <h2 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                    Custom Name Tapes, Uniforms, Berets &amp; Ruck Repair
                  </h2>
                  <p className="text-xs text-[#4A463F]">
                    Preview your OCP name tape online, stack Airborne/Air Assault badges, or repair blown #10 rucksack zippers.
                  </p>
                  <div className="text-xs font-bold text-[#B45309] pt-1">
                    Launch Interactive Name Tape Builder →
                  </div>
                </div>

                <a
                  href="#wayfinding"
                  className="bg-[#EFECE4] border-2 border-[#D6D0C4] hover:border-[#B45309] p-4 rounded-lg transition space-y-1.5 block"
                >
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#171614] text-white rounded-xs">
                    DEPARTMENT 03 • CAMPING, HUNTING &amp; CANS
                  </span>
                  <h2 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                    Watertight .50 Cal Ammo Cans, Woobies &amp; Boots
                  </h2>
                  <p className="text-xs text-[#4A463F]">
                    Genuine USGI poncho liners, Hardigg overland footlockers, M65 field jackets, and Coyote combat boots.
                  </p>
                  <div className="text-xs font-bold text-[#B45309] pt-1">
                    See How to Spot Our Turn-In on Bragg Blvd →
                  </div>
                </a>
              </div>
            </div>

            {/* Department Navigation Bar */}
            <div className="bg-[#171614] text-white py-2.5 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveBayId('all')}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition ${
                      activeBayId === 'all'
                        ? 'bg-[#B45309] text-white'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    All Showroom Aisles ({totalCatalogItems})
                  </button>
                  {inventoryBays.map((bay) => (
                    <button
                      key={bay.id}
                      type="button"
                      onClick={() => setActiveBayId(bay.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition ${
                        activeBayId === bay.id
                          ? 'bg-[#B45309] text-white'
                          : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {bay.shortName}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog items or NSN..."
                    className="w-full pl-8 pr-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* 2-COLUMN RETAIL SHOWROOM CATALOG AISLES */}
          <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
            {filteredBays.map((bay) => (
              <div key={bay.id} className="bg-white border-2 border-[#D4CFC3] rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
                <div className="border-b-2 border-[#EFECE4] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#B45309]">
                      SHOWROOM AISLE • {bay.code}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-[#171614]">
                      {bay.name}
                    </h3>
                    <p className="text-xs text-[#4A463F]">{bay.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bay.items.map((item) => {
                    const cifSavings = Math.max(0, (item.cifCharge || 0) - item.price);
                    const isSoldOut = item.stockStatus === 'SOLD_OUT';

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg bg-[#FAF8F3] border border-[#DFD9CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#B45309] transition"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EFECE4] text-[#3F3C36] border border-[#D6D0C4]">
                              {item.condition}
                            </span>
                            <span className="text-[10px] font-mono text-[#6E685F]">
                              NSN: {item.nsn}
                            </span>
                            {item.cifEssential && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                CIF Turn-In Saver
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-base text-[#171614]">{item.name}</h4>
                          <p className="text-xs text-[#4A463F] leading-relaxed">{item.description}</p>
                        </div>

                        <div className="sm:text-right shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D5] flex sm:flex-col items-center sm:items-end justify-between gap-2">
                          <div>
                            <div className="text-2xl font-black font-mono text-[#B45309]">
                              ${item.price}
                            </div>
                            {cifSavings > 0 && (
                              <div className="text-[11px] font-mono text-emerald-700 font-bold">
                                Save ${cifSavings} vs CIF (${item.cifCharge})
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={isSoldOut}
                            onClick={() => addToHoldList(item, bay.shortName)}
                            className={`px-3.5 py-2 rounded font-black text-xs uppercase tracking-wider cursor-pointer ${
                              isSoldOut
                                ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                                : 'bg-[#B45309] hover:bg-[#92400E] text-white shadow-xs'
                            }`}
                          >
                            {isSoldOut ? 'Out of Stock' : '+ Hold at Counter'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {/* ================================================================= */}
      {/* SHARED INTERACTIVE SECTIONS (ADAPTIVE TO ACTIVE LAYOUT THEME)     */}
      {/* 1. AR 670-1 Sewing & Alterations Studio Showcase                  */}
      {/* 2. Bragg Blvd Wayfinding & "Don't Miss Our Turn" GPS Hub          */}
      {/* 3. Verified Fort Bragg Customer Reviews & Footer                  */}
      {/* ================================================================= */}
      <div
        className={
          themeVersion === 'daylight'
            ? 'bg-[#EFECE4] text-[#171614]'
            : themeVersion === 'olivedrab'
            ? 'bg-[#11160F] text-[#F1EFE6]'
            : 'bg-[#0B0D10] text-[#F4F4F0]'
        }
      >
        {/* ON-SITE UNIFORM SEWING & RUCK REPAIR SHOWCASE */}
        <section
          id="sewing-studio"
          aria-label="On-Site Uniform Sewing and Alterations Department"
          className="max-w-7xl mx-auto py-8 px-4 sm:px-6"
        >
          <div
            className={`border-2 border-yellow-500/80 p-5 sm:p-8 ${
              themeVersion === 'daylight'
                ? 'bg-white text-[#171614] shadow-md'
                : themeVersion === 'olivedrab'
                ? 'bg-[#171F14] text-[#F1EFE6]'
                : 'bg-[#12161F] text-[#F4F4F0]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-mono text-xs font-black px-2.5 py-0.5 uppercase">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>In-House Sewing &amp; Alterations • 240 S Bragg Blvd</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-mono text-[11px] font-bold px-2.5 py-0.5 uppercase">
                    ⚡ Live Name Tape &amp; AR 670-1 Sew Builder
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                  AR 670-1 Uniform Sewing, Name Tapes, Berets &amp; Heavy Ruck Repair
                </h2>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                  Almost no sew shop around Fort Bragg lets you preview your uniform online or verify your name tape spelling before you walk in. Use our interactive <strong>AR 670-1 Sew &amp; Name Tape Studio</strong> to type your last name, stack your Airborne / Air Assault / CIB badges, configure Patrol Cap cat-eyes or AGSU (&ldquo;Pinks &amp; Greens&rdquo;) alterations, and generate a zero-typo Counter Drop-Off Ticket.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSewingModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase py-3 px-5 shadow-lg cursor-pointer transition"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>🧵 Launch Interactive Name Tape &amp; Sew Ticket Builder</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 border-2 border-emerald-500/60 bg-zinc-950 text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase text-emerald-400">
                      Current Sewing Desk Status
                    </span>
                    <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                      Live Board
                    </span>
                  </div>
                  <p className="font-bold text-base">{sewingStatus.label}</p>
                  <p className="text-xs text-zinc-300">{sewingStatus.subtext}</p>

                  <div
                    onClick={() => setIsSewingModalOpen(true)}
                    className="p-3 bg-zinc-900 border border-zinc-700 cursor-pointer hover:border-yellow-400 transition space-y-2"
                    title="Click to customize your own Last Name & Rank"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                      <span>Interactive AR 670-1 Tape Preview</span>
                      <span className="text-yellow-400 font-bold">Tap to Type Your Name →</span>
                    </div>
                    <div className="h-9 bg-gradient-to-r from-[#5b5d44] via-[#7c7455] to-[#464935] border-2 border-[#3c3f2d] flex items-center justify-center relative">
                      <div className="absolute inset-1 border border-dashed border-black/40 pointer-events-none" />
                      <span className="font-mono font-black text-base tracking-[0.28em] text-[#141413]">
                        OLD SARGE • FT BRAGG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAGG BLVD WAYFINDING & "DON'T MISS OUR TURN" GPS HUB */}
        <section
          id="wayfinding"
          aria-label="Bragg Blvd Turn-By-Turn Wayfinding and Parking Guide"
          className="max-w-7xl mx-auto py-4 px-4 sm:px-6"
        >
          <div
            className={`border-2 border-emerald-500/70 p-5 sm:p-8 ${
              themeVersion === 'daylight'
                ? 'bg-white text-[#171614] shadow-md'
                : themeVersion === 'olivedrab'
                ? 'bg-[#171F14] text-[#F1EFE6]'
                : 'bg-[#12161F] text-[#F4F4F0]'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-700/40 pb-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-black font-mono text-xs font-black px-2.5 py-0.5 uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Bragg Blvd Corridor Wayfinding • Easy to Pass at 45 MPH!</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                  How to Spot &amp; Turn Into 240 S Bragg Blvd Without Passing Us
                </h2>
                <p className="text-xs sm:text-sm opacity-85 max-w-3xl">
                  Traffic on S Bragg Blvd (NC-24 / NC-87) moves fast coming out of Fort Bragg, and low-rise surplus buildings are easy to blow past if you are in the left through-lanes. Use our 1-tap GPS launchers and lane guide below:
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href={storeInfo.appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider shadow cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                </a>
                <a
                  href={storeInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={storeInfo.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-zinc-600 bg-zinc-900 text-white text-xs font-mono font-bold uppercase hover:border-yellow-400"
                >
                  <Car className="w-3.5 h-3.5 text-sky-400" />
                  <span>Waze</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyWayfinding}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-zinc-600 bg-zinc-900 text-zinc-200 text-xs font-mono font-bold uppercase cursor-pointer hover:border-yellow-400"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedWayfinding ? '✓ Copied!' : 'Copy GPS'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {storeInfo.wayfindingLandmarks.map((w, idx) => (
                <div
                  key={idx}
                  className={`p-4 border border-zinc-700/50 space-y-2 flex flex-col justify-between ${
                    themeVersion === 'daylight' ? 'bg-[#FAF8F3]' : 'bg-black/30'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                        STEP 0{idx + 1} • {w.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm pt-1">{w.direction}</h3>
                    <p className="text-xs opacity-85 leading-relaxed">{w.cue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED FORT BRAGG & SPRING LAKE REVIEWS */}
        <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-yellow-500">
                35+ &ldquo;Helpful Staff&rdquo; &amp; &ldquo;Gear Selection&rdquo; Local Mentions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                What Real Fort Bragg Soldiers &amp; Local Shoppers Say
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsDisambiguationModalOpen(true)}
              className="text-xs font-mono font-bold text-rose-400 hover:underline cursor-pointer text-left sm:text-right"
            >
              Why did a New York shopper leave a 1-star review by mistake? Read the Audit →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(storeInfo.customerReviews || []).map((rev, idx) => (
              <div
                key={idx}
                className={`border p-4 space-y-2.5 flex flex-col justify-between ${
                  themeVersion === 'daylight'
                    ? 'bg-white border-[#D6D0C4]'
                    : 'bg-[#12161F] border-[#262F40]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase opacity-75">
                      {rev.location}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-yellow-500">{rev.highlight}</div>
                  <p className="text-xs opacity-85 italic leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-700/30 text-[11px] font-mono font-bold">
                  — {rev.author}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800 mt-10 py-8 px-4 sm:px-6 bg-[#07090C] text-zinc-400 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-white">Old Sarge&apos;s Surplus</strong> • {storeInfo.address} • {storeInfo.phone}
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span>1. Tactical Hangar</span>
              <span>•</span>
              <span>2. Quartermaster NSN Ledger</span>
              <span>•</span>
              <span>3. Heritage Daylight Showroom</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
