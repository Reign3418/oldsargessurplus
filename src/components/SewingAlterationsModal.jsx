import React, { useState } from 'react';
import {
  X,
  Scissors,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Printer,
  ShoppingBag,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { useSurplus } from '../context/SurplusContext';
import { SEWING_STUDIO_CATALOG } from '../data/surplusData';

export default function SewingAlterationsModal() {
  const {
    isSewingModalOpen,
    setIsSewingModalOpen,
    sewingStatus,
    submitSewTicket,
    setIsHoldDrawerOpen,
    storeInfo
  } = useSurplus();

  const [lastName, setLastName] = useState('ALVARADO');
  const [selectedRank, setSelectedRank] = useState('SSG');
  const [selectedTapePattern, setSelectedTapePattern] = useState('ocp-scorpion');
  const [backingType, setBackingType] = useState('DIRECT_SEW'); // DIRECT_SEW | HOOK_VELCRO
  const [includeCatEyes, setIncludeCatEyes] = useState(true);
  const [selectedBadges, setSelectedBadges] = useState(['airborne', 'air-assault']);
  const [activeCategoryId, setActiveCategoryId] = useState('ocp-tapes');
  const [selectedServices, setSelectedServices] = useState({
    'svc-ocp-full': 1,
    'svc-pc-cateyes': 1
  });
  const [turnaroundTier, setTurnaroundTier] = useState('STANDARD_24HR'); // STANDARD_24HR | RUSH_SAMEDAY
  const [spellingConfirmed, setSpellingConfirmed] = useState(true);
  const [specialNotes, setSpecialNotes] = useState('');
  const [createdTicket, setCreatedTicket] = useState(null);

  if (!isSewingModalOpen) return null;

  const cleanLastName = (lastName || 'SOLDIER').toUpperCase().replace(/[^A-Z0-9 -]/g, '').slice(0, 16);
  const nameLetters = cleanLastName.split('');
  const activePatternObj =
    SEWING_STUDIO_CATALOG.tapePatterns.find((p) => p.id === selectedTapePattern) ||
    SEWING_STUDIO_CATALOG.tapePatterns[0];

  const toggleBadge = (badgeId) => {
    setSelectedBadges((prev) => {
      if (prev.includes(badgeId)) {
        return prev.filter((id) => id !== badgeId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), badgeId];
      }
      return [...prev, badgeId];
    });
  };

  const updateServiceQty = (svcId, delta) => {
    setSelectedServices((prev) => {
      const curr = prev[svcId] || 0;
      const next = Math.max(0, curr + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[svcId];
      } else {
        copy[svcId] = next;
      }
      return copy;
    });
  };

  // Flatten all services for calculation
  const allServicesFlat = SEWING_STUDIO_CATALOG.categories.flatMap((c) => c.services);
  const selectedServiceItems = Object.entries(selectedServices)
    .map(([svcId, qty]) => {
      const svc = allServicesFlat.find((s) => s.id === svcId);
      return svc ? { ...svc, qty } : null;
    })
    .filter(Boolean);

  // Additional badge sew-on fee if more than 2 badges selected
  const extraBadgesCount = Math.max(0, selectedBadges.length - 2);
  const extraBadgeCost = extraBadgesCount * 4;
  const rushFee = turnaroundTier === 'RUSH_SAMEDAY' ? 6 : 0;

  const servicesSubtotal = selectedServiceItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalEstimate = servicesSubtotal + extraBadgeCost + (selectedServiceItems.length > 0 ? rushFee : 0);

  const selectedBadgeObjects = selectedBadges
    .map((id) => SEWING_STUDIO_CATALOG.skillBadges.find((b) => b.id === id))
    .filter(Boolean);

  const handleGenerateTicket = () => {
    if (selectedServiceItems.length === 0) return;
    const summaryTitle =
      selectedServiceItems.length === 1
        ? `${selectedServiceItems[0].qty}x ${selectedServiceItems[0].name}`
        : `${selectedServiceItems.reduce((s, i) => s + i.qty, 0)}x Uniform Sew & Alteration Items (${cleanLastName})`;

    const ticket = submitSewTicket({
      lastName: cleanLastName,
      rank: selectedRank,
      tapePattern: activePatternObj.name,
      backingType: backingType === 'DIRECT_SEW' ? 'Strip Velcro & Sew Direct' : 'Hook Velcro Backed',
      badges: selectedBadgeObjects.map((b) => b.short),
      includeCatEyes,
      services: selectedServiceItems,
      turnaroundLabel:
        turnaroundTier === 'RUSH_SAMEDAY'
          ? '⚡ Same-Day Walk-In Rush (+$6)'
          : '🕐 Standard 24-Hr Turnaround',
      specialNotes,
      totalPrice: totalEstimate,
      summaryTitle
    });

    setCreatedTicket(ticket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-zinc-950 border-2 border-amber-500/60 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-stone-900 to-zinc-900 border-b border-amber-500/30 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-black">
                  AR 670-1 SEW & ALTERATIONS STUDIO
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                  {sewingStatus.label}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                Interactive Name Tape, OCP Uniform & Heavy Ruck Repair Builder
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsSewingModalOpen(false)}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
            aria-label="Close Sewing Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Why Digital Sew Tickets Matter Banner */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-zinc-300">
                <strong className="text-white">Zero Misspelled Name Tapes • Exact DA PAM 670-1 Placement:</strong>{' '}
                Type your last name below to preview your regulation OCP tapes and chest badge stack before dropping off at{' '}
                <span className="text-amber-400 font-semibold">{storeInfo.address}</span>.
              </p>
            </div>
            <a
              href={`tel:${storeInfo.phoneRaw}`}
              className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/40 px-3 py-1.5 rounded-lg shrink-0 hover:bg-amber-500/20"
            >
              Sew Counter: {storeInfo.phone}
            </a>
          </div>

          {/* Main 2-Column Interactive Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN (5 Cols): Live AR 670-1 Name Tape & Uniform Visualizer */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Step 1 • Live Name Tape & Rank Spec
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    1/4&quot; Reg Spacing
                  </span>
                </div>

                {/* Last Name Input + Rank Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Last Name (Stencil All-Caps)
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value.toUpperCase());
                        setCreatedTicket(null);
                      }}
                      placeholder="ENTER LAST NAME"
                      maxLength={16}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-amber-500/50 text-white font-mono font-black tracking-widest text-base focus:outline-none focus:ring-2 focus:ring-amber-400 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Rank (AR 670-1)
                    </label>
                    <select
                      value={selectedRank}
                      onChange={(e) => {
                        setSelectedRank(e.target.value);
                        setCreatedTicket(null);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono font-bold text-base focus:outline-none focus:border-amber-400"
                    >
                      {SEWING_STUDIO_CATALOG.ranks.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Zero-Typo Letter-by-Letter Stencil Verification Strip */}
                <div className="bg-zinc-950/90 border border-zinc-800 rounded-lg p-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                    <span>LETTER-BY-LETTER COUNTER SPELLING CHECK:</span>
                    <span className="text-emerald-400 font-bold">{nameLetters.length} CHARS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {nameLetters.map((char, idx) => (
                      <span
                        key={idx}
                        className="w-6 h-7 rounded bg-zinc-900 border border-amber-500/40 flex items-center justify-center font-mono font-black text-xs text-amber-300"
                      >
                        {char === ' ' ? '␣' : char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Woven Name Tape Preview */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-mono uppercase text-zinc-400 flex items-center justify-between">
                    <span>Live Embroidered Tape Preview:</span>
                    <span className="text-amber-400">{backingType === 'DIRECT_SEW' ? 'Direct Sew-Down' : 'Hook Velcro'}</span>
                  </div>

                  {/* Name Tape Strip */}
                  <div
                    className={`w-full h-12 rounded-md ${activePatternObj.bgClass} border-2 ${activePatternObj.borderClass} shadow-inner flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-1 border border-dashed border-black/40 rounded-sm pointer-events-none" />
                    <span
                      className={`font-mono font-black text-xl sm:text-2xl tracking-[0.28em] ${activePatternObj.textClass} drop-shadow-sm select-none`}
                    >
                      {cleanLastName}
                    </span>
                  </div>

                  {/* U.S. ARMY & Patrol Cap Preview Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className={`h-10 rounded-md ${activePatternObj.bgClass} border-2 ${activePatternObj.borderClass} flex items-center justify-center relative`}
                    >
                      <div className="absolute inset-1 border border-dashed border-black/40 rounded-sm pointer-events-none" />
                      <span
                        className={`font-mono font-black text-sm tracking-[0.22em] ${activePatternObj.textClass}`}
                      >
                        U.S. ARMY
                      </span>
                    </div>

                    {/* Patrol Cap Rear Strip w/ Optional Cat-Eyes */}
                    <div
                      className={`h-10 rounded-md ${activePatternObj.bgClass} border-2 ${activePatternObj.borderClass} flex items-center justify-between px-2 relative`}
                    >
                      {includeCatEyes && (
                        <span
                          className="w-3.5 h-3.5 rounded-xs bg-lime-300 shadow-[0_0_8px_#a3e635] border border-black/40"
                          title="Luminous Glow Cat-Eye"
                        />
                      )}
                      <span
                        className={`font-mono font-black text-xs tracking-widest mx-auto ${activePatternObj.textClass}`}
                      >
                        {cleanLastName.slice(0, 10)}
                      </span>
                      {includeCatEyes && (
                        <span
                          className="w-3.5 h-3.5 rounded-xs bg-lime-300 shadow-[0_0_8px_#a3e635] border border-black/40"
                          title="Luminous Glow Cat-Eye"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Tape Camo Pattern & Backing Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Tape Camo / Fabric
                    </label>
                    <select
                      value={selectedTapePattern}
                      onChange={(e) => setSelectedTapePattern(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white font-mono"
                    >
                      {SEWING_STUDIO_CATALOG.tapePatterns.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Attachment Method
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setBackingType('DIRECT_SEW')}
                        className={`py-1 rounded text-[11px] font-mono font-bold transition ${
                          backingType === 'DIRECT_SEW'
                            ? 'bg-amber-500 text-zinc-950'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Direct Sew
                      </button>
                      <button
                        type="button"
                        onClick={() => setBackingType('HOOK_VELCRO')}
                        className={`py-1 rounded text-[11px] font-mono font-bold transition ${
                          backingType === 'HOOK_VELCRO'
                            ? 'bg-amber-500 text-zinc-950'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Velcro Hook
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live AR 670-1 OCP Chest Layout Blueprint */}
                <div className="bg-gradient-to-b from-[#4c5038] to-[#393c2a] border-2 border-[#6b7052] rounded-xl p-3.5 text-white relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-200/90 mb-2 border-b border-white/15 pb-1.5">
                    <span>AR 670-1 OCP COAT CHEST DIAGRAM</span>
                    <span>FLUSH / 1/4&quot; SPACING</span>
                  </div>

                  <div className="grid grid-cols-11 gap-1.5 items-end pt-2 pb-1">
                    {/* Wearer's Right Chest (Viewer Left): Last Name */}
                    <div className="col-span-5 flex flex-col items-center">
                      <span className="text-[9px] font-mono text-zinc-200/80 mb-1">
                        RIGHT CHEST (NAME)
                      </span>
                      <div className="w-full py-1.5 px-1 bg-[#65684c] border border-dashed border-black/70 text-center font-mono font-black text-xs text-black tracking-widest rounded-xs">
                        {cleanLastName.slice(0, 12)}
                      </div>
                      <div className="w-full h-6 border-t-2 border-x border-black/40 bg-black/15 mt-0.5 rounded-t-xs flex items-center justify-center text-[9px] font-mono text-zinc-200/70">
                        RIGHT POCKET SEAM
                      </div>
                    </div>

                    {/* Center Placket Rank */}
                    <div className="col-span-1 flex flex-col items-center justify-center pb-3">
                      <div className="px-1 py-2 bg-[#65684c] border border-dashed border-black/70 rounded-xs font-mono font-black text-[10px] text-black">
                        {selectedRank}
                      </div>
                    </div>

                    {/* Wearer's Left Chest (Viewer Right): Skill Badges + U.S. ARMY */}
                    <div className="col-span-5 flex flex-col items-center">
                      {/* Stacked Skill Badges */}
                      <div className="flex flex-col-reverse items-center gap-1 mb-1 w-full">
                        {selectedBadgeObjects.length === 0 ? (
                          <span className="text-[9px] font-mono text-zinc-300/70 italic">
                            (No Skill Badges Selected)
                          </span>
                        ) : (
                          selectedBadgeObjects.map((badge) => (
                            <div
                              key={badge.id}
                              className="px-2 py-0.5 bg-[#5a5d42] border border-dashed border-black/70 rounded-xs text-[9px] font-mono font-black text-black tracking-wider"
                            >
                              ★ {badge.short}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="w-full py-1.5 px-1 bg-[#65684c] border border-dashed border-black/70 text-center font-mono font-black text-xs text-black tracking-widest rounded-xs">
                        U.S. ARMY
                      </div>
                      <div className="w-full h-6 border-t-2 border-x border-black/40 bg-black/15 mt-0.5 rounded-t-xs flex items-center justify-center text-[9px] font-mono text-zinc-200/70">
                        LEFT POCKET SEAM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fort Bragg Skill Badges Selector (Up to 3) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Select Sew-On Skill Badges (Up to 3)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIncludeCatEyes(!includeCatEyes)}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        includeCatEyes
                          ? 'bg-lime-950/80 border-lime-500/60 text-lime-300'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      {includeCatEyes ? '✓ PC Cat-Eyes: ON' : 'PC Cat-Eyes: OFF'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SEWING_STUDIO_CATALOG.skillBadges.map((badge) => {
                      const isSelected = selectedBadges.includes(badge.id);
                      return (
                        <button
                          key={badge.id}
                          type="button"
                          onClick={() => toggleBadge(badge.id)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition ${
                            isSelected
                              ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black'
                              : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {badge.short}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7 Cols): Service Menu + Turnaround + Digital Sew Ticket */}
            <div className="lg:col-span-7 space-y-4">
              {/* Category Selector Pills */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Step 2 • Choose Uniform Sewing, Beret, Dress or Ruck Repair Services
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Tap + to add garments
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SEWING_STUDIO_CATALOG.categories.map((cat) => {
                    const active = cat.id === activeCategoryId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategoryId(cat.id)}
                        className={`p-2.5 rounded-lg border text-left transition ${
                          active
                            ? 'bg-amber-500/15 border-amber-400 text-white'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase text-amber-400 font-bold truncate">
                          {cat.badge}
                        </div>
                        <div className="text-xs font-bold mt-0.5 leading-snug">
                          {cat.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Services List */}
                {SEWING_STUDIO_CATALOG.categories
                  .filter((c) => c.id === activeCategoryId)
                  .map((cat) => (
                    <div key={cat.id} className="space-y-2.5">
                      <p className="text-xs text-zinc-400">{cat.description}</p>
                      <div className="space-y-2">
                        {cat.services.map((svc) => {
                          const qty = selectedServices[svc.id] || 0;
                          return (
                            <div
                              key={svc.id}
                              className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                                qty > 0
                                  ? 'bg-amber-500/10 border-amber-500/60'
                                  : 'bg-zinc-950/90 border-zinc-800/90 hover:border-zinc-700'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm font-bold text-white">
                                    {svc.name}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300">
                                    {svc.turnaround}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-400">{svc.detail}</p>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <div className="text-base font-black text-amber-400 font-mono">
                                    ${svc.price}
                                  </div>
                                  <div className="text-[10px] text-zinc-500 font-mono">
                                    per item
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-lg p-1">
                                  <button
                                    type="button"
                                    onClick={() => updateServiceQty(svc.id, -1)}
                                    className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="w-6 text-center font-mono font-bold text-sm text-white">
                                    {qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateServiceQty(svc.id, 1)}
                                    className="w-7 h-7 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center font-bold"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                {/* Turnaround Speed & Special Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Turnaround Speed
                    </label>
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setTurnaroundTier('STANDARD_24HR')}
                        className={`w-full p-2 rounded-lg border text-left text-xs font-mono flex items-center justify-between ${
                          turnaroundTier === 'STANDARD_24HR'
                            ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span>🕐 Standard 24-Hr Pickup</span>
                        <span>+$0</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTurnaroundTier('RUSH_SAMEDAY')}
                        className={`w-full p-2 rounded-lg border text-left text-xs font-mono flex items-center justify-between ${
                          turnaroundTier === 'RUSH_SAMEDAY'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span>⚡ Same-Day / Before 2PM Rush</span>
                        <span>+$6</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g., 'Pin Airborne wings 1/4 inch above U.S. Army, replace broken #10 zipper on medium ruck...'"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Live Itemized Digital Sew Ticket & Pull-Sheet Action */}
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-stone-900 border-2 border-amber-500/50 rounded-xl p-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      STEP 3 • COUNTER DROP-OFF SEW TICKET SUMMARY
                    </span>
                    <h3 className="text-base font-black text-white">
                      TAPE SPELLING: &ldquo;{cleanLastName}&rdquo; • RANK: {selectedRank}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-zinc-400">Estimated Total</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      ${totalEstimate}
                    </div>
                  </div>
                </div>

                {/* Selected Items Breakdown */}
                {selectedServiceItems.length === 0 ? (
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Select at least one sewing, uniform, or ruck repair service above to build your ticket.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {selectedServiceItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs bg-zinc-950/80 px-3 py-2 rounded-lg border border-zinc-800/80"
                      >
                        <span className="text-zinc-200 font-medium">
                          <strong className="text-amber-400 font-mono">{item.qty}x</strong> {item.name}
                        </span>
                        <span className="font-mono font-bold text-white">
                          ${item.price * item.qty}
                        </span>
                      </div>
                    ))}
                    {extraBadgeCost > 0 && (
                      <div className="flex items-center justify-between text-xs bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800/80 text-zinc-300">
                        <span>+3rd Skill Badge Sew-On Fee</span>
                        <span className="font-mono font-bold text-white">+${extraBadgeCost}</span>
                      </div>
                    )}
                    {rushFee > 0 && (
                      <div className="flex items-center justify-between text-xs bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300">
                        <span>⚡ Same-Day Walk-In Priority Rush</span>
                        <span className="font-mono font-bold">+${rushFee}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Spelling Confirmation Checkbox */}
                <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800">
                  <input
                    type="checkbox"
                    checked={spellingConfirmed}
                    onChange={(e) => setSpellingConfirmed(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>
                    I confirm my name tape spelling is{' '}
                    <strong className="font-mono text-amber-400 underline">{cleanLastName}</strong>{' '}
                    and rank is <strong className="font-mono text-amber-400">{selectedRank}</strong>.
                  </span>
                </label>

                {/* Created Ticket Confirmation Box */}
                {createdTicket && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        SEW TICKET #{createdTicket.ticketId} ADDED TO PULL SHEET!
                      </span>
                      <span className="text-xs font-mono text-emerald-200">
                        {createdTicket.createdAt}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200">
                      Show this ticket or open your <strong>Hold / CIF Pull Sheet</strong> at the counter at{' '}
                      <strong>240 S Bragg Blvd, Spring Lake, NC</strong>.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled={selectedServiceItems.length === 0 || !spellingConfirmed}
                    onClick={handleGenerateTicket}
                    className="flex-1 min-w-[220px] py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-black text-sm tracking-wide flex items-center justify-center gap-2 transition shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {createdTicket
                      ? `Update Sew Ticket (${createdTicket.ticketId})`
                      : 'Lock Spelling & Add Sew Ticket to Counter Pull Sheet'}
                  </button>

                  {createdTicket && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSewingModalOpen(false);
                        setIsHoldDrawerOpen(true);
                      }}
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition"
                    >
                      View Pull Sheet →
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-3 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition"
                    title="Print Drop-Off Sew Slip"
                  >
                    <Printer className="w-4 h-4" />
                    Print Slip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
