import React, { useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

export default function HoldPullSheetDrawer() {
  const {
    storeInfo,
    holdList,
    removeFromHoldList,
    updateHoldQty,
    clearHoldList,
    holdItemCount,
    holdTotalCost,
    holdTotalCifValue,
    holdTotalSavings,
    isHoldDrawerOpen,
    setIsHoldDrawerOpen
  } = useSurplus();

  const [soldierName, setSoldierName] = useState('');
  const [pickupWindow, setPickupWindow] = useState('Today before 6:00 PM');
  const [copied, setCopied] = useState(false);

  if (!isHoldDrawerOpen) return null;

  const generatePullSheetText = () => {
    const header = `OLD SARGE'S SURPLUS (240 S Bragg Blvd) — 24-HR COUNTER HOLD / CIF PULL-SHEET`;
    const customerLine = soldierName.trim()
      ? `Customer / Rank & Name: ${soldierName.trim()} (${pickupWindow})`
      : `Pickup Window: ${pickupWindow}`;
    const lines = holdList.map(
      (i) => `• ${i.qty}x ${i.name} [${i.nsn}] — $${i.price * i.qty}`
    );
    const footer = `Est. Store Total: $${holdTotalCost} (CIF Charge Value: $${holdTotalCifValue} -> Est. Savings: $${holdTotalSavings})`;
    return [header, customerLine, '', ...lines, '', footer].join('\n');
  };

  const smsHref = `sms:${storeInfo.phoneRaw}?&body=${encodeURIComponent(
    generatePullSheetText()
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePullSheetText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hold-drawer-title"
    >
      <div className="bg-[#0E1219] border-l-2 border-yellow-400 text-[#F4F4F0] w-full max-w-md h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#141A24]">
          <div className="flex items-center gap-2.5">
            <div className="bg-yellow-400 text-black p-2">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="hold-drawer-title"
                className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider"
              >
                24-Hour Counter Hold &amp; CIF Pull-Sheet
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                240 S Bragg Blvd, Spring Lake • {storeInfo.phone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsHoldDrawerOpen(false)}
            className="p-2 bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer"
            aria-label="Close hold list drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {holdList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-base font-bold text-zinc-300">
                Your Counter Hold Pull-Sheet is Empty
              </p>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Add USGI rucksacks, MOLLE pouches, Woobies, or sewing packages from our 8 Tactical Bays to generate an instant in-store pull sheet and CIF savings summary.
              </p>
            </div>
          ) : (
            <>
              {/* Savings Summary Banner */}
              <div className="bg-emerald-950/60 border border-emerald-500/60 p-3 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300">CIF Statement of Charges Value:</span>
                  <span className="line-through text-zinc-400">${holdTotalCifValue}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono font-bold">
                  <span className="text-white">Old Sarge&apos;s Surplus Total:</span>
                  <span className="text-yellow-400 text-lg">${holdTotalCost}</span>
                </div>
                <div className="pt-1 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono font-black text-emerald-300">
                  <span>ESTIMATED MONEY SAVED:</span>
                  <span>+${holdTotalSavings} SAVED</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2.5">
                {holdList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#151B26] border border-zinc-700 p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-yellow-400 uppercase block">
                          {item.bayName} • {item.nsn}
                        </span>
                        <h3 className="text-xs font-bold text-white leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromHoldList(item.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateHoldQty(item.id, -1)}
                          className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold px-2">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateHoldQty(item.id, 1)}
                          className="w-6 h-6 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-sm font-black text-yellow-400">
                        ${item.price * item.qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Name & Pickup Time */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <label className="block text-[11px] font-mono uppercase text-zinc-400">
                  Your Name / Rank (For Counter Hold Tag):
                  <input
                    type="text"
                    value={soldierName}
                    onChange={(e) => setSoldierName(e.target.value)}
                    placeholder="e.g., SGT Miller — 82nd ABN"
                    className="mt-1 w-full bg-[#0B0E14] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </label>

                <label className="block text-[11px] font-mono uppercase text-zinc-400">
                  Estimated In-Store Pickup Window:
                  <select
                    value={pickupWindow}
                    onChange={(e) => setPickupWindow(e.target.value)}
                    className="mt-1 w-full bg-[#0B0E14] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="In the next 1–2 hours">In the next 1–2 hours</option>
                    <option value="Today before 6:00 PM">Today before 6:00 PM</option>
                    <option value="Tomorrow morning (9:00 AM)">Tomorrow morning (9:00 AM)</option>
                    <option value="Saturday (10:00 AM – 4:00 PM)">Saturday (10:00 AM – 4:00 PM)</option>
                  </select>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {holdList.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-[#141A24] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${storeInfo.phoneRaw}`}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-3 px-3 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Counter</span>
              </a>

              <a
                href={smsHref}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase py-3 px-3 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SMS Pull-Sheet</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 font-mono font-bold text-[11px] uppercase py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Pull-Sheet!' : 'Copy Pull-Sheet Text'}</span>
              </button>

              <button
                type="button"
                onClick={clearHoldList}
                className="bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-300 border border-zinc-700 font-mono text-[11px] uppercase py-2 px-3 cursor-pointer"
              >
                Clear ({holdItemCount})
              </button>
            </div>

            <p className="text-[10px] text-zinc-400 font-mono text-center flex items-center justify-center gap-1 pt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Zero online credit card required • Inspect gear in person at 240 S Bragg Blvd</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
