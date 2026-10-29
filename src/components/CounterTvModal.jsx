import React, { useRef, useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import { STOCK_BADGE_MAP } from '../data/surplusData';
import html2canvas from 'html2canvas';
import { Tv, Download, X, Scissors, ShieldCheck, Sparkles } from 'lucide-react';

export default function CounterTvModal() {
  const {
    isTvBoardOpen,
    setIsTvBoardOpen,
    storeInfo,
    sewingStatus,
    featuredDrops,
    inventoryBays
  } = useSurplus();

  const boardRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  if (!isTvBoardOpen) return null;

  const sewingBay =
    inventoryBays.find((b) => b.id === 'sewing-alterations') || inventoryBays[0];

  const handleExportPng = async () => {
    if (!boardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(boardRef.current, {
        scale: 2,
        backgroundColor: '#080A0E',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = 'OldSargesSurplus-1080p-Counter-TV-Board.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // ignore export errors
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tv-board-title"
    >
      {/* Top Operator Controls */}
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2 text-white">
          <Tv className="w-5 h-5 text-yellow-400" />
          <h2 id="tv-board-title" className="font-mono text-xs sm:text-sm font-bold uppercase">
            1080p Counter &amp; Sewing Desk Digital Signage (Offline USB Ready)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPng}
            disabled={exporting}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-3 py-1.5 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Rendering 1080p PNG...' : 'Download Offline USB TV Image (.PNG)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTvBoardOpen(false)}
            className="bg-zinc-800 hover:bg-rose-700 text-white font-bold text-xs uppercase px-3 py-1.5 flex items-center gap-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close TV</span>
          </button>
        </div>
      </div>

      {/* 16:9 Widescreen Counter Display Board */}
      <div
        ref={boardRef}
        className="max-w-7xl w-full mx-auto flex-1 bg-[#090C10] border-4 border-yellow-400 p-5 sm:p-8 flex flex-col justify-between gap-6 text-white shadow-2xl"
      >
        {/* Top Row: Brand Logo + Live Sewing Banner + Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border-b-2 border-yellow-400/50 pb-4">
          <div className="lg:col-span-5 flex items-center gap-4">
            <img
              src="./images/storelogo.jpg"
              alt="Old Sarge's Surplus"
              className="w-32 h-22 object-contain bg-black border-2 border-yellow-400 p-1 shrink-0"
            />
            <div>
              <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                240 S BRAGG BLVD • SPRING LAKE, NC
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wider mt-1">
                Old Sarge&apos;s Surplus
              </h3>
              <p className="text-xs font-mono text-zinc-300">
                Counter Phone: {storeInfo.phone} • eBay: {storeInfo.ebayHandle}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-emerald-950/80 border-2 border-emerald-400 p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-yellow-300 font-mono text-xs font-black uppercase">
                <Scissors className="w-4 h-4" />
                <span>IN-HOUSE UNIFORM SEWING &amp; RUCK REPAIR DESK</span>
              </div>
              <div className="text-xl sm:text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white">
                {sewingStatus.label}
              </div>
              <p className="text-xs text-emerald-200 font-mono">{sewingStatus.cutoffTime}</p>
            </div>
            <div className="text-right font-mono shrink-0 hidden sm:block">
              <div className="text-xs text-zinc-300 uppercase">Full OCP Sew-On</div>
              <div className="text-3xl font-black text-yellow-400">$22</div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Left = Fresh Crate Arrivals & CIF Savers | Right = Sewing & Alterations Rate Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Left 7 Cols: Fresh Crate Arrivals */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-1.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-black uppercase text-yellow-400">
                <Sparkles className="w-4 h-4" />
                <span>Featured Floor Crates &amp; Fort Bragg CIF Savers</span>
              </span>
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold">
                Ask Counter for Bulk / Unit Pricing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredDrops.map((drop) => {
                const badge = STOCK_BADGE_MAP[drop.stockState] || STOCK_BADGE_MAP.IN_STOCK;
                const saved = Math.max(0, drop.cifCharge - drop.storePrice);
                return (
                  <div
                    key={drop.id}
                    className="bg-[#121722] border border-zinc-700 p-3.5 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="bg-yellow-400 text-black font-mono text-[10px] font-black px-1.5 py-0.5 uppercase">
                          {drop.badge}
                        </span>
                        <span className={`text-[10px] font-mono font-bold ${badge.text}`}>
                          ● {badge.shortLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white leading-snug">
                        {drop.title}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        NSN: {drop.nsn}
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-zinc-800">
                      <span className="text-2xl font-black font-mono text-yellow-400">
                        ${drop.storePrice}
                      </span>
                      <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold px-2 py-0.5">
                        CIF Saves ${saved}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: On-Site Sewing & Repair Rate Card */}
          <div className="lg:col-span-5 bg-[#121722] border-2 border-yellow-400/60 p-4 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="border-b border-zinc-700 pb-2 flex items-center justify-between">
                <span className="font-mono text-sm font-black uppercase text-yellow-400">
                  On-Site Sewing &amp; Repair Menu
                </span>
                <span className="font-mono text-[11px] text-zinc-400 uppercase">
                  AR 670-1 Spec
                </span>
              </div>

              <div className="space-y-2">
                {sewingBay.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0B0E14] border border-zinc-800 p-2.5 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400">
                        {item.condition}
                      </div>
                    </div>
                    <div className="text-lg font-black font-mono text-yellow-400 shrink-0">
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/60 border border-zinc-700 p-3 text-[11px] font-mono text-zinc-300 space-y-1">
              <div className="text-yellow-400 font-bold uppercase">
                ★ Official Spring Lake Storefront Notice:
              </div>
              <p>
                We are 100% family-owned at 240 S Bragg Blvd, Spring Lake, NC. Not affiliated with &ldquo;Old Sarge&apos;s Drop Zone&rdquo; in Westfield, NY.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Ticker Bar */}
        <div className="bg-yellow-400 text-black px-4 py-2 font-mono text-xs font-black uppercase flex flex-wrap items-center justify-between gap-2">
          <span>
            📍 240 S BRAGG BLVD, SPRING LAKE, NC 28390 • MON–FRI 9AM–6PM | SAT 10AM–4PM
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>OLDSARGESSURPLUS.COM • EBAY: OLDSARGESSURPLUS</span>
          </span>
        </div>
      </div>
    </div>
  );
}
