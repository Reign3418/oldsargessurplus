import React, { useState, Suspense, lazy } from 'react';
import { SurplusProvider, useSurplus } from './context/SurplusContext';
import DesignSwitcherBar from './components/DesignSwitcherBar';
import StorefrontLayout from './components/StorefrontLayout';
import MobileAppView from './components/MobileAppView';
import SiteGateModal from './components/SiteGateModal';
import { Monitor } from 'lucide-react';

const HoldPullSheetDrawer = lazy(() => import('./components/HoldPullSheetDrawer'));
const DisambiguationModal = lazy(() => import('./components/DisambiguationModal'));
const CifCalculatorModal = lazy(() => import('./components/CifCalculatorModal'));
const SewingAlterationsModal = lazy(() => import('./components/SewingAlterationsModal'));
const EbaySyncModal = lazy(() => import('./components/EbaySyncModal'));
const OwnerAdminModal = lazy(() => import('./components/OwnerAdminModal'));
const CounterTvModal = lazy(() => import('./components/CounterTvModal'));
const StoreTwinSimulatorModal = lazy(() => import('./components/StoreTwinSimulatorModal'));
const DiscoveryWhitePaperModal = lazy(() => import('./components/DiscoveryWhitePaperModal'));

function AppContent({ onLockSite }) {
  const {
    themeVersion,
    isMobileMode,
    viewModeOverride,
    setViewModeOverride
  } = useSurplus();

  const isDaylight = themeVersion === 'daylight';
  const isOlive = themeVersion === 'olivedrab';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans w-full max-w-full overflow-x-hidden relative ${
        isDaylight
          ? 'bg-[#F5F2EB] text-[#171614] selection:bg-[#B45309] selection:text-white'
          : isOlive
          ? 'bg-[#11160F] text-[#F1EFE6] selection:bg-emerald-500 selection:text-black'
          : 'bg-[#0B0D10] text-[#F4F4F0] selection:bg-yellow-400 selection:text-black'
      }`}
    >
      {/* Top Operator & Theme Switcher Bar */}
      <DesignSwitcherBar onLockSite={onLockSite} />

      {/* ================================================================= */}
      {/* AUTO-SWITCHING MOBILE APP MODE (Phones <768px OR Mobile Preview)  */}
      {/* ================================================================= */}
      {isMobileMode ? (
        <div className="w-full flex flex-col items-center">
          {/* If previewing Mobile Mode on a wide desktop screen, show a sleek phone frame */}
          {viewModeOverride === 'mobile' && (
            <div className="hidden md:flex w-full max-w-[430px] mt-4 mb-2 items-center justify-between bg-[#141A24] border border-yellow-400/60 px-3 py-1.5 text-xs font-mono text-yellow-300">
              <span>📱 Native Mobile App Mode Active</span>
              <button
                type="button"
                onClick={() => setViewModeOverride(null)}
                className="inline-flex items-center gap-1 bg-yellow-400 text-black font-black px-2 py-0.5 uppercase cursor-pointer"
              >
                <Monitor className="w-3 h-3" />
                <span>Exit to Desktop</span>
              </button>
            </div>
          )}
          <div
            className={`w-full ${
              viewModeOverride === 'mobile'
                ? 'md:max-w-[430px] md:border-2 md:border-yellow-400/70 md:shadow-2xl md:mb-8'
                : ''
            }`}
          >
            <MobileAppView />
          </div>
        </div>
      ) : (
        <StorefrontLayout />
      )}

      {/* Interactive Modals & Drawers (Code-Split for Sub-200ms Mobile Load) */}
      <Suspense fallback={null}>
        <HoldPullSheetDrawer />
        <DisambiguationModal />
        <CifCalculatorModal />
        <SewingAlterationsModal />
        <EbaySyncModal />
        <OwnerAdminModal />
        <CounterTvModal />
        <StoreTwinSimulatorModal />
        <DiscoveryWhitePaperModal />
      </Suspense>
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
