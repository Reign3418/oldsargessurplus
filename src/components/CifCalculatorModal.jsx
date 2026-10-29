import React, { useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  Calculator,
  X,
  CheckSquare,
  Square,
  ArrowRight,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export default function CifCalculatorModal() {
  const {
    isCifCalculatorOpen,
    setIsCifCalculatorOpen,
    inventoryBays,
    addToHoldList,
    setIsHoldDrawerOpen
  } = useSurplus();

  // Gather all CIF-essential items plus full OCP sewing package
  const cifItems = inventoryBays.flatMap((bay) =>
    bay.items
      .filter((item) => item.cifEssential || item.id === 'sew-ocp-full')
      .map((item) => ({ ...item, bayName: bay.shortName }))
  );

  const [selectedIds, setSelectedIds] = useState(['ruck-molle-lg', 'pouch-sustainment', 'woobie-poncho-liner']);

  if (!isCifCalculatorOpen) return null;

  const toggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedItems = cifItems.filter((item) => selectedIds.includes(item.id));
  const totalStorePrice = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const totalCifPenalty = selectedItems.reduce((sum, i) => sum + (i.cifCharge || i.price), 0);
  const totalSavings = Math.max(0, totalCifPenalty - totalStorePrice);

  const handleLoadToHoldSheet = () => {
    selectedItems.forEach((item) => {
      addToHoldList(item, item.bayName);
    });
    setIsCifCalculatorOpen(false);
    setIsHoldDrawerOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cif-calc-title"
    >
      <div className="bg-[#0F131A] border-2 border-emerald-400 text-[#F4F4F0] w-full max-w-4xl rounded-none shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#111D18] to-[#12161F] border-b border-emerald-500/50 p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500 text-black p-2.5 shrink-0">
              <Calculator className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mb-1">
                Fort Bragg PCS / ETS / School Packing List Readiness Tool
              </span>
              <h2
                id="cif-calc-title"
                className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white"
              >
                CIF Turn-In &amp; Statement-of-Charges Savings Calculator
              </h2>
              <p className="text-xs text-zinc-300">
                Check off any missing or damaged OCIE gear below to compare Fort Bragg CIF Statement-of-Charges deductions against our in-store Bragg Blvd replacement prices.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCifCalculatorOpen(false)}
            className="bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 p-2 cursor-pointer"
            aria-label="Close CIF calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 max-h-[78vh] overflow-y-auto">
          {/* Left Checklist */}
          <div className="lg:col-span-7 space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            {cifItems.map((item) => {
              const checked = selectedIds.includes(item.id);
              const itemSaved = Math.max(0, (item.cifCharge || 0) - item.price);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left p-3 border flex items-start justify-between gap-3 transition cursor-pointer ${
                    checked
                      ? 'bg-emerald-950/40 border-emerald-400 text-white'
                      : 'bg-[#141923] border-zinc-800 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold leading-snug">{item.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                        NSN: {item.nsn} • {item.condition}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <div className="text-sm font-black text-yellow-400">${item.price}</div>
                    <div className="text-[10px] text-emerald-400 font-bold">
                      Save ${itemSaved}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Live Savings Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141923] border-2 border-yellow-400/70 p-4 sm:p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                <span className="font-mono text-xs font-bold uppercase text-yellow-400">
                  Live CIF Layout Estimate
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  {selectedItems.length} Item(s) Checked
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 bg-rose-950/30 border border-rose-500/40 text-rose-200">
                  <span>Est. CIF Statement of Charges:</span>
                  <span className="font-black line-through">${totalCifPenalty}</span>
                </div>

                <div className="flex justify-between p-2.5 bg-zinc-900 border border-zinc-700 text-white">
                  <span>Old Sarge&apos;s Surplus Price:</span>
                  <span className="font-black text-yellow-400 text-base">${totalStorePrice}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-emerald-950/60 border-2 border-emerald-400 text-emerald-300">
                  <span className="font-black uppercase">You Keep in Your Pocket:</span>
                  <span className="text-2xl font-black text-emerald-300">${totalSavings}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed">
                <strong className="text-yellow-300">Counter Pro-Tip:</strong> Bring your CIF clothing record printout to <strong>240 S Bragg Blvd</strong>. Our staff knows the exact NSN and generation patterns Fort Bragg CIF accepts so you pass on the first turn-in.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <button
                type="button"
                disabled={selectedItems.length === 0}
                onClick={handleLoadToHoldSheet}
                className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send {selectedItems.length} Item(s) to 24-Hr Counter Hold Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inspect every buckle, strap &amp; NSN stamp in store before paying</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
