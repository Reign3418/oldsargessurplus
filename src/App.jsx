import React, { useState, Suspense, lazy } from 'react';
import { SurplusProvider, useSurplus } from './context/SurplusContext';
import DesignSwitcherBar from './components/DesignSwitcherBar';
import StorefrontLayout from './components/StorefrontLayout';
import SiteGateModal from './components/SiteGateModal';
import { Phone, Navigation, Calculator, ShoppingBag, ShieldAlert } from 'lucide-react';

const HoldPullSheetDrawer = lazy(() => import('./components/HoldPullSheetDrawer'));
const DisambiguationModal = lazy(() => import('./components/DisambiguationModal'));
const CifCalculatorModal = lazy(() => import('./components/CifCalculatorModal'));
const OwnerAdminModal = lazy(() => import('./components/OwnerAdminModal'));
const CounterTvModal = lazy(() => import('./components/CounterTvModal'));
const StoreTwinSimulatorModal = lazy(() => import('./components/StoreTwinSimulatorModal'));
const DiscoveryWhitePaperModal = lazy(() => import('./components/DiscoveryWhitePaperModal'));

function AppContent({ onLockSite }) {
  const {
    storeInfo,
    themeVersion,
    holdItemCount,
    setIsHoldDrawerOpen,
    setIsCifCalculatorOpen,
    setIsDisambiguationModalOpen
  } = useSurplus();

  const isDaylight = themeVersion === 'daylight';
  const isOlive = themeVersion === 'olivedrab';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans pb-20 md:pb-0 w-full max-w-full overflow-x-hidden relative ${
        isDaylight
          ? 'bg-[#F5F2EB] text-[#171614] selection:bg-[#B45309] selection:text-white'
          : isOlive
          ? 'bg-[#11160F] text-[#F1EFE6] selection:bg-emerald-500 selection:text-black'
          : 'bg-[#0B0D10] text-[#F4F4F0] selection:bg-yellow-400 selection:text-black'
      }`}
    >
      {/* Top Operator & Theme Switcher Bar */}
      <DesignSwitcherBar onLockSite={onLockSite} />

      {/* Main Storefront Experience */}
      <StorefrontLayout />

      {/* Interactive Modals & Drawers (Code-Split for Sub-200ms Mobile Load) */}
      <Suspense fallback={null}>
        <HoldPullSheetDrawer />
        <DisambiguationModal />
        <CifCalculatorModal />
        <OwnerAdminModal />
        <CounterTvModal />
        <StoreTwinSimulatorModal />
        <DiscoveryWhitePaperModal />
      </Suspense>

      {/* Mobile Bottom Quick-Action Bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 px-2.5 flex items-center justify-between gap-1.5 shadow-2xl border-t ${
          isDaylight
            ? 'bg-white border-[#D6D0C4]'
            : 'bg-[#080A0E] border-yellow-500/40'
        }`}
      >
        <a
          href={`tel:${storeInfo.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 text-black font-black py-2.5 px-2 rounded-none text-[11px] uppercase tracking-wider shadow"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Store</span>
        </a>

        <a
          href={storeInfo.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-[#161C26] text-yellow-300 border border-yellow-500/40 font-bold py-2.5 px-2 rounded-none text-[11px] uppercase tracking-wider"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </a>

        <button
          type="button"
          onClick={() => setIsCifCalculatorOpen(true)}
          className="flex-1 flex items-center justify-center gap-1 bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-none text-[11px] uppercase tracking-wider cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>CIF Calc</span>
        </button>

        {holdItemCount > 0 ? (
          <button
            type="button"
            onClick={() => setIsHoldDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 bg-amber-500 text-black font-black py-2.5 px-2 rounded-none text-[11px] uppercase tracking-wider cursor-pointer border border-white"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Hold ({holdItemCount})</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 bg-rose-800 text-white font-bold py-2.5 px-2 rounded-none text-[11px] uppercase tracking-wider cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>NY Notice</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isLocked, setIsLocked] = useState(() => {
    try {
      return sessionStorage.getItem('oldsarge_site_locked') === 'true';
    } catch {
      return false;
    }
  });

  const handleLockSite = () => {
    try {
      sessionStorage.setItem('oldsarge_site_locked', 'true');
    } catch {
      // ignore
    }
    setIsLocked(true);
  };

  const handleUnlockSite = () => {
    try {
      sessionStorage.setItem('oldsarge_site_locked', 'false');
    } catch {
      // ignore
    }
    setIsLocked(false);
  };

  if (isLocked) {
    return <SiteGateModal onUnlock={handleUnlockSite} />;
  }

  return (
    <SurplusProvider>
      <AppContent onLockSite={handleLockSite} />
    </SurplusProvider>
  );
}
