import React, { useState } from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  Sliders,
  X,
  Scissors,
  PlusCircle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function OwnerAdminModal() {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    inventoryBays,
    sewingStatus,
    updateItemStockStatus,
    updateItemPrice,
    addNewInventoryItem,
    updateSewingMode,
    resetToFactoryDefaults
  } = useSurplus();

  const [selectedBayId, setSelectedBayId] = useState('rucks-packs');
  const [newName, setNewName] = useState('');
  const [newNsn, setNewNsn] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCifCharge, setNewCifCharge] = useState('');

  if (!isAdminModalOpen) return null;

  const currentBay =
    inventoryBays.find((b) => b.id === selectedBayId) || inventoryBays[0];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addNewInventoryItem(currentBay.id, {
      name: newName.trim(),
      nsn: newNsn.trim() || 'USGI-CRATE',
      price: Number(newPrice) || 35,
      cifCharge: Number(newCifCharge) || (Number(newPrice) || 35) * 2,
      cifEssential: true,
      stockStatus: 'FRESH_DROP'
    });
    setNewName('');
    setNewNsn('');
    setNewPrice('');
    setNewCifCharge('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-admin-title"
    >
      <div className="bg-[#0E1219] border-2 border-yellow-400 text-[#F4F4F0] w-full max-w-4xl rounded-none shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#151B26] border-b border-yellow-400/50 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 text-black p-2">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="owner-admin-title"
                className="text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wider"
              >
                10-Second Owner Stock &amp; Sewing Switchboard
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                No Shopify SKU headaches • 1-Tap Stock Toggles • Syncs to Counter TV
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetToFactoryDefaults}
              className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 text-[11px] font-mono font-bold uppercase flex items-center gap-1 cursor-pointer"
              title="Reset demo inventory to default state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer"
              aria-label="Close owner admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* 1. On-Site Sewing Turnaround 1-Tap Switch */}
          <div className="bg-[#141A24] border border-zinc-700 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase text-yellow-400">
                <Scissors className="w-4 h-4" />
                <span>1-Tap Sewing Room Turnaround Status</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                Active: {sewingStatus.turnaroundMode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'SAME_DAY', label: '⚡ Walk-In / Same-Day Open' },
                { id: 'NEXT_DAY', label: '🕐 24-Hr Drop-Off Mode' },
                { id: 'RUCK_REPAIR', label: '🧵 Heavy Ruck & Zipper Mode' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => updateSewingMode(mode.id)}
                  className={`py-2.5 px-3 text-xs font-mono font-bold uppercase border cursor-pointer transition ${
                    sewingStatus.turnaroundMode === mode.id
                      ? 'bg-emerald-600 text-white border-emerald-300 shadow'
                      : 'bg-[#0C1017] text-zinc-300 border-zinc-700 hover:border-yellow-400'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Bay Selector & 1-Tap Item Stock Toggles */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {inventoryBays.map((bay) => (
                <button
                  key={bay.id}
                  type="button"
                  onClick={() => setSelectedBayId(bay.id)}
                  className={`px-2.5 py-1.5 text-xs font-mono font-bold uppercase border cursor-pointer ${
                    selectedBayId === bay.id
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                      : 'bg-[#141A24] text-zinc-300 border-zinc-700'
                  }`}
                >
                  {bay.code}: {bay.shortName}
                </button>
              ))}
            </div>

            {/* Add Quick Crate Item Form */}
            <form
              onSubmit={handleAddItem}
              className="bg-[#141A24] border border-yellow-500/40 p-3 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={`+ Add new item to ${currentBay.shortName}...`}
                className="sm:col-span-5 bg-[#0B0E14] border border-zinc-700 px-2.5 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={newNsn}
                onChange={(e) => setNewNsn(e.target.value)}
                placeholder="NSN / SKU (optional)"
                className="sm:col-span-3 bg-[#0B0E14] border border-zinc-700 px-2.5 py-2 text-xs text-white font-mono"
              />
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Price $"
                className="sm:col-span-2 bg-[#0B0E14] border border-zinc-700 px-2.5 py-2 text-xs text-white font-mono"
              />
              <button
                type="submit"
                className="sm:col-span-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-2 px-2 flex items-center justify-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Drop</span>
              </button>
            </form>

            {/* Items in Selected Bay */}
            <div className="space-y-2">
              {currentBay.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141A24] border border-zinc-800 p-3 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      NSN: {item.nsn} • Current Price: ${item.price}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Quick Price Input */}
                    <div className="flex items-center bg-[#0B0E14] border border-zinc-700 px-2 py-1 mr-1">
                      <span className="text-xs font-mono text-yellow-400 mr-1">$</span>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItemPrice(currentBay.id, item.id, e.target.value)
                        }
                        aria-label={`Price for ${item.name}`}
                        className="w-14 bg-transparent text-xs font-mono font-bold text-white focus:outline-none"
                      />
                    </div>

                    {[
                      { code: 'IN_STOCK', label: '🟢 In Stock' },
                      { code: 'LOW_STOCK', label: '🟡 Low' },
                      { code: 'FRESH_DROP', label: '🔥 Fresh' },
                      { code: 'SOLD_OUT', label: '🔴 86 Out' }
                    ].map((st) => (
                      <button
                        key={st.code}
                        type="button"
                        onClick={() =>
                          updateItemStockStatus(currentBay.id, item.id, st.code)
                        }
                        className={`px-2 py-1 text-[11px] font-mono font-bold uppercase border cursor-pointer ${
                          item.stockStatus === st.code
                            ? 'bg-yellow-400 text-black border-yellow-300 font-black'
                            : 'bg-[#0B0E14] text-zinc-400 border-zinc-700 hover:text-white'
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

          <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All stock status changes save immediately and update the 1080p Counter TV Board &amp; customer inventory view.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
