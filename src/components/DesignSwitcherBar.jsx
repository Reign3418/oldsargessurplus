import React from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  Palette,
  ShieldAlert,
  FileText,
  Calculator,
  Sliders,
  Tv,
  Smartphone,
  Lock,
  ShieldCheck,
  Sun,
  Award
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
    setIsAdminModalOpen,
    setIsTvBoardOpen,
    setIsStoreTwinOpen
  } = useSurplus();

  const themes = [
    {
      id: 'hangar',
      name: '1. Hangar Gold & Steel',
      dot: 'bg-yellow-400',
      icon: Award
    },
    {
      id: 'olivedrab',
      name: '2. Fort Bragg OD',
      dot: 'bg-emerald-500',
      icon: ShieldCheck
    },
    {
      id: 'daylight',
      name: '3. Daylight Counter',
      dot: 'bg-amber-600',
      icon: Sun
    }
  ];

  return (
    <div className="bg-[#060709] border-b border-[#262B36] py-1.5 px-2.5 sm:py-2 sm:px-3 text-xs z-50 relative w-full max-w-full overflow-hidden">
      {/* MOBILE SLIM BAR (<768px) */}
      <div className="md:hidden flex items-center justify-between gap-1.5 w-full">
        <div className="flex items-center gap-1 min-w-0">
          <Palette className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <select
            value={themeVersion}
            onChange={(e) => setThemeVersion(e.target.value)}
            className="bg-[#12161F] text-yellow-300 border border-[#2E3646] text-[11px] font-bold py-1 px-1.5 rounded-none focus:outline-none focus:border-yellow-400 max-w-[130px] truncate"
            aria-label="Select storefront layout theme"
          >
            <option value="hangar">🚁 Hangar Gold</option>
            <option value="olivedrab">🪖 Ft. Bragg OD</option>
            <option value="daylight">☀️ Daylight Counter</option>
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsWhitePaperOpen(true)}
            className="p-1 px-1.5 rounded-none bg-yellow-400 text-black font-black text-[11px] flex items-center gap-0.5 shadow cursor-pointer"
            title="Open Discovery & Reputation Rescue White Paper"
          >
            <span>📄 Rescue Plan</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="p-1 px-1.5 rounded-none bg-rose-700 text-white font-black text-[11px] flex items-center gap-0.5 shadow cursor-pointer"
            title="Preview NY Mistaken-Identity Shield"
          >
            <span>🛡️ Shield</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCifCalculatorOpen(true)}
            className="p-1 px-1.5 rounded-none bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
            title="CIF Turn-In & Packing List Calculator"
          >
            <span>🎒 CIF</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="p-1 px-1.5 rounded-none bg-zinc-800 text-yellow-300 border border-yellow-500/40 font-bold text-[11px] cursor-pointer"
            title="Owner 10-Second Stock Admin"
          >
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTvBoardOpen(true)}
            className="p-1 px-1.5 rounded-none bg-[#171C26] border border-yellow-500/40 text-yellow-300 font-bold text-[11px] cursor-pointer"
            title="1080p Counter TV Board"
          >
            <span>TV</span>
          </button>
        </div>
      </div>

      {/* DESKTOP BAR (>=768px) */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-2">
        {/* Left: Primary White Paper + 3 Theme Switchers */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsWhitePaperOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-white shadow-md mr-1"
            title="Open the Master Discovery Audit & Reputation Rescue Blueprint"
          >
            <FileText className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5]" />
            <span className="whitespace-nowrap">📄 White Paper &amp; Audit</span>
          </button>

          <div className="h-4 w-px bg-zinc-700 mx-0.5 hidden lg:block" />

          <Palette className="w-3.5 h-3.5 text-yellow-400 shrink-0 hidden lg:inline" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-yellow-300 hidden xl:inline">
            Themes:
          </span>
          {themes.map((t) => {
            const isActive = themeVersion === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeVersion(t.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-bold transition cursor-pointer border ${
                  isActive
                    ? 'bg-[#1A202C] text-white border-yellow-400 shadow-md ring-1 ring-yellow-400/50'
                    : 'bg-[#0F131A] text-zinc-400 hover:text-zinc-200 border-[#252D3D] hover:border-zinc-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-none ${t.dot} shrink-0`} />
                <span className="whitespace-nowrap">{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Operational Tools */}
        <div className="flex items-center gap-1.5 justify-end shrink-0">
          <button
            type="button"
            onClick={() => setViewModeOverride(isMobileMode ? 'desktop' : 'mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer border shadow-sm ${
              isMobileMode
                ? 'bg-yellow-400 text-black border-white'
                : 'bg-[#161B24] hover:bg-[#222A38] text-yellow-300 border-yellow-500/40'
            }`}
            title="Toggle between Mobile App Mode (auto-enabled on phones) and Desktop Mode"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">
              {isMobileMode ? '📱 Mobile App: ON' : '📱 Mobile View'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-rose-700 hover:bg-rose-600 text-white border border-rose-400 shadow-sm"
            title="See how we intercept angry 'Old Sarge's Drop Zone (NY)' customers before they leave 1-star reviews"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">🛡️ NY Review Shield</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCifCalculatorOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 shadow-sm"
            title="Interactive Fort Bragg CIF Turn-In & Packing List Savings Calculator"
          >
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">🎒 CIF Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setIsStoreTwinOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-sky-700 hover:bg-sky-600 text-white border border-sky-400 shadow-sm"
            title="Live Split-Screen Counter TV + Owner Phone Simulator"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">🏪 Counter + Phone Sim</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black shadow-sm"
            title="10-Second Owner Stock & Sewing Turnaround Switchboard"
          >
            <Sliders className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Stock Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTvBoardOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-[#161B24] hover:bg-[#222A38] text-yellow-300 hover:text-white border border-yellow-500/40 shadow-sm"
            title="1080p Counter TV Board & Offline USB PNG Export"
          >
            <Tv className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span className="whitespace-nowrap">1080p TV</span>
          </button>

          {onLockSite && (
            <button
              type="button"
              onClick={onLockSite}
              className="flex items-center gap-1 px-2 py-1 rounded-none text-xs font-black transition cursor-pointer bg-zinc-900 hover:bg-rose-900 text-zinc-300 hover:text-white border border-zinc-700 shadow-sm"
              title="Lock site behind 4-digit PIN gate (5335)"
            >
              <Lock className="w-3 h-3 text-yellow-400 shrink-0" />
              <span className="whitespace-nowrap">Lock</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
