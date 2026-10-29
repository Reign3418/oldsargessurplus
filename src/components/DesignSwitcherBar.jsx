import React from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  Palette,
  ShieldAlert,
  FileText,
  Calculator,
  Scissors,
  Sliders,
  Tv,
  Smartphone,
  Lock
} from 'lucide-react';

export default function DesignSwitcherBar({ onLockSite }) {
  const {
    themeVersion,
    setThemeVersion,
    isMobileMode,
    setViewModeOverride,
    setIsWhitePaperOpen,
    setIsDisambiguationModalOpen,
    setIsCifCalculatorOpen,
    setIsSewingModalOpen,
    setIsAdminModalOpen,
    setIsTvBoardOpen,
    setIsStoreTwinOpen
  } = useSurplus();

  const themes = [
    { id: 'hangar', label: 'Hangar Gold', dot: 'bg-yellow-400' },
    { id: 'olivedrab', label: 'Bragg OD', dot: 'bg-emerald-500' },
    { id: 'daylight', label: 'Daylight', dot: 'bg-amber-600' }
  ];

  return (
    <div className="bg-[#060709] border-b border-[#262B36] py-1.5 px-2.5 sm:px-4 text-xs z-50 relative w-full">
      {/* MOBILE SLIM BAR (<768px) */}
      <div className="md:hidden flex items-center justify-between gap-1.5 w-full">
        <div className="flex items-center gap-1 min-w-0">
          <Palette className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <select
            value={themeVersion}
            onChange={(e) => setThemeVersion(e.target.value)}
            className="bg-[#12161F] text-yellow-300 border border-[#2E3646] text-[11px] font-bold py-1 px-1.5 rounded focus:outline-none focus:border-yellow-400 max-w-[115px] truncate"
            aria-label="Select storefront layout theme"
          >
            <option value="hangar">Hangar Gold</option>
            <option value="olivedrab">Bragg OD</option>
            <option value="daylight">Daylight</option>
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsWhitePaperOpen(true)}
            className="px-2 py-1 rounded bg-yellow-400 text-black font-black text-[11px] cursor-pointer"
            title="Open Discovery & Reputation Rescue White Paper"
          >
            Audit
          </button>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="px-2 py-1 rounded bg-rose-700 text-white font-bold text-[11px] cursor-pointer"
            title="NY Mistaken-Identity Shield"
          >
            Shield
          </button>

          <button
            type="button"
            onClick={() => setIsCifCalculatorOpen(true)}
            className="px-2 py-1 rounded bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
            title="CIF Turn-In Calculator"
          >
            CIF
          </button>

          <button
            type="button"
            onClick={() => setIsSewingModalOpen(true)}
            className="px-2 py-1 rounded bg-amber-500 text-black font-black text-[11px] cursor-pointer"
            title="Interactive Name Tape & Sew Studio"
          >
            Sew
          </button>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="px-2 py-1 rounded bg-zinc-800 text-yellow-300 border border-yellow-500/40 font-bold text-[11px] cursor-pointer"
            title="Owner Stock Admin"
          >
            Admin
          </button>
        </div>
      </div>

      {/* DESKTOP & LAPTOP BAR (>=768px) — Compact, Zero-Overflow Layout */}
      <div className="hidden md:flex max-w-7xl mx-auto flex-wrap items-center justify-between gap-y-1.5 gap-x-2">
        {/* Left Group: Audit + Segmented Theme Pill + Mobile Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsWhitePaperOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wide transition cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black shadow-sm"
            title="Open the Master Discovery Audit & Reputation Rescue Blueprint"
          >
            <FileText className="w-3.5 h-3.5 text-black shrink-0" />
            <span>Audit &amp; Plan</span>
          </button>

          {/* Compact Segmented Theme Control */}
          <div className="flex items-center bg-[#0F131A] border border-[#252D3D] rounded p-0.5">
            {themes.map((t) => {
              const isActive = themeVersion === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeVersion(t.id)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#1F2737] text-white shadow-xs ring-1 ring-yellow-400/60'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile App Preview Toggle */}
          <button
            type="button"
            onClick={() => setViewModeOverride(isMobileMode ? 'desktop' : 'mobile')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer border ${
              isMobileMode
                ? 'bg-yellow-400 text-black border-white font-black'
                : 'bg-[#121721] hover:bg-[#1C2433] text-zinc-200 border-zinc-700'
            }`}
            title="Toggle between Mobile App Mode (auto-enabled on phones) and Desktop Mode"
          >
            <Smartphone className="w-3 h-3 text-yellow-400 shrink-0" />
            <span>{isMobileMode ? 'Mobile: ON' : 'Mobile View'}</span>
          </button>
        </div>

        {/* Right Group: Customer Features + Compact Counter Admin Tools */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer bg-rose-700 hover:bg-rose-600 text-white border border-rose-500/60"
            title="See how we intercept angry 'Old Sarge's Drop Zone (NY)' customers before they leave 1-star reviews"
          >
            <ShieldAlert className="w-3 h-3 shrink-0" />
            <span>NY Shield</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCifCalculatorOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/60"
            title="Interactive Fort Bragg CIF Turn-In & Packing List Savings Calculator"
          >
            <Calculator className="w-3 h-3 shrink-0" />
            <span>CIF Calc</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSewingModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-black transition cursor-pointer bg-amber-500 hover:bg-amber-400 text-black"
            title="Interactive AR 670-1 Name Tape, OCP Uniform & Heavy Ruck Repair Studio"
          >
            <Scissors className="w-3 h-3 shrink-0" />
            <span>Sew &amp; Tapes</span>
          </button>

          <div className="h-3.5 w-px bg-zinc-700 mx-0.5" />

          {/* Compact Counter & Owner Group */}
          <div className="flex items-center bg-[#0F131A] border border-zinc-700/80 rounded p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-black transition cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black"
              title="10-Second Owner Stock & Sewing Turnaround Switchboard"
            >
              <Sliders className="w-3 h-3 shrink-0" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setIsTvBoardOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-bold transition cursor-pointer text-yellow-300 hover:bg-zinc-800"
              title="1080p Counter TV Board & Offline USB PNG Export"
            >
              <Tv className="w-3 h-3 shrink-0" />
              <span>TV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsStoreTwinOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-bold transition cursor-pointer text-sky-300 hover:bg-zinc-800"
              title="Live Split-Screen Counter TV + Owner Phone Simulator"
            >
              <Smartphone className="w-3 h-3 shrink-0" />
              <span>Sim</span>
            </button>

            {onLockSite && (
              <button
                type="button"
                onClick={onLockSite}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded-xs text-[11px] font-bold transition cursor-pointer text-zinc-400 hover:text-white hover:bg-rose-900/80"
                title="Lock site behind 4-digit PIN gate (5335)"
              >
                <Lock className="w-3 h-3 text-yellow-400 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
