import React from 'react';
import { useSurplus } from '../context/SurplusContext';
import { STOCK_BADGE_MAP } from '../data/surplusData';
import { Smartphone, Tv, X, Wifi, Scissors, CheckCircle2 } from 'lucide-react';

export default function StoreTwinSimulatorModal() {
  const {
    isStoreTwinOpen,
    setIsStoreTwinOpen,
    inventoryBays,
    sewingStatus,
    updateItemStockStatus,
    updateSewingMode
  } = useSurplus();

  if (!isStoreTwinOpen) return null;

  const rucksBay = inventoryBays[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="twin-sim-title"
    >
      <div className="bg-[#0C1017] border-2 border-sky-400 text-white w-full max-w-6xl rounded-none shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#121824] border-b border-sky-500/40 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500 text-black p-2">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="twin-sim-title"
                className="text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wider"
              >
                Bragg Blvd Counter Digital Twin: Owner Phone ↔ 1080p Wall TV Sync
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Tap any button on the simulated phone (left) and watch the Counter Wall TV (right) update in real time.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsStoreTwinOpen(false)}
            className="p-2 bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer"
            aria-label="Close simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split Screen */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: OWNER PHONE CONTROLLER (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141B26] border-2 border-zinc-600 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase text-yellow-400">
                <Smartphone className="w-4 h-4" />
                <span>Owner Phone (Behind Counter)</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] px-2 py-0.5">
                LIVE SYNC
              </span>
            </div>

            {/* Sewing Toggle on Phone */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-zinc-400">
                1. Tap to Change Sewing Desk Turnaround:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'SAME_DAY', label: '⚡ Same-Day' },
                  { id: 'NEXT_DAY', label: '🕐 24-Hr' },
                  { id: 'RUCK_REPAIR', label: '🧵 Ruck Repair' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => updateSewingMode(m.id)}
                    className={`py-2 px-2 text-[11px] font-mono font-bold uppercase border cursor-pointer ${
                      sewingStatus.turnaroundMode === m.id
                        ? 'bg-emerald-600 text-white border-emerald-300'
                        : 'bg-[#0B0E14] text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bay 01 Rucks Stock Toggle on Phone */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase text-zinc-400">
                2. Tap to Toggle Bay 01 Rucksack Stock:
              </label>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {rucksBay.items.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0B0E14] border border-zinc-800 p-2.5 space-y-2"
                  >
                    <div className="text-xs font-bold text-white leading-snug">
                      {item.name}
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { code: 'IN_STOCK', label: '🟢 In' },
                        { code: 'LOW_STOCK', label: '🟡 Low' },
                        { code: 'FRESH_DROP', label: '🔥 Drop' },
                        { code: 'SOLD_OUT', label: '🔴 Out' }
                      ].map((st) => (
                        <button
                          key={st.code}
                          type="button"
                          onClick={() =>
                            updateItemStockStatus(rucksBay.id, item.id, st.code)
                          }
                          className={`py-1 text-[10px] font-mono font-bold uppercase border cursor-pointer ${
                            item.stockStatus === st.code
                              ? 'bg-yellow-400 text-black border-yellow-300 font-black'
                              : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIMULATED 1080P WALL TV BEHIND REGISTER (7 Cols) */}
          <div className="lg:col-span-7 bg-[#080B0F] border-4 border-yellow-400 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-yellow-400/40 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src="./images/storelogo.jpg"
                  alt="Old Sarge's Surplus"
                  className="w-20 h-14 object-contain bg-black border border-yellow-400 p-0.5"
                />
                <div>
                  <div className="font-mono text-[10px] text-yellow-400 font-bold uppercase">
                    LIVE COUNTER TV DISPLAY • 240 S BRAGG BLVD
                  </div>
                  <h3 className="text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wide">
                    Old Sarge&apos;s Surplus — Bay 01 &amp; Sewing Board
                  </h3>
                </div>
              </div>
              <Tv className="w-6 h-6 text-yellow-400 shrink-0" />
            </div>

            {/* Live Sewing Banner on TV */}
            <div className="bg-emerald-950/80 border border-emerald-400 p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <div className="font-mono text-xs font-black text-emerald-300 uppercase">
                    {sewingStatus.label}
                  </div>
                  <div className="text-[11px] text-zinc-300">{sewingStatus.cutoffTime}</div>
                </div>
              </div>
              <span className="bg-yellow-400 text-black font-mono text-xs font-black px-2 py-0.5">
                OCP FULL SEW: $22
              </span>
            </div>

            {/* Live Rucksacks Status on TV */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {rucksBay.items.slice(0, 4).map((item) => {
                const badge = STOCK_BADGE_MAP[item.stockStatus] || STOCK_BADGE_MAP.IN_STOCK;
                return (
                  <div
                    key={item.id}
                    className="bg-[#121722] border border-zinc-700 p-3 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span
                        className={`inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 border mb-1 ${badge.bg} ${badge.border} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                      <div className="text-xs font-bold text-white leading-snug">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                        NSN: {item.nsn}
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between pt-1.5 border-t border-zinc-800 font-mono">
                      <span className="text-lg font-black text-yellow-400">
                        ${item.price}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        CIF Value: ${item.cifCharge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero monthly software fees • Runs via Wi-Fi or Offline USB</span>
              </span>
              <span>(910) 497-5335</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
