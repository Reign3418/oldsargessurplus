import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Delete, Unlock } from 'lucide-react';

// Last 4 digits of Old Sarge's Surplus phone number (910) 497-5335 -> '5335'
const EXPECTED_PIN = String.fromCharCode(53, 51, 51, 53);

export default function SiteGateModal({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleDigit = (digit) => {
    if (pin.length >= 4) return;
    const nextPin = pin + digit;
    setPin(nextPin);
    setError(false);

    if (nextPin.length === 4) {
      if (nextPin === EXPECTED_PIN) {
        try {
          sessionStorage.setItem('oldsarge_site_locked', 'false');
        } catch {
          // ignore
        }
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
        }, 650);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="min-h-screen w-full bg-[#07090C] text-[#F4F4F0] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.12)_0%,transparent_65%)]" />

      <div className="relative z-10 w-full max-w-sm bg-[#0F131A] border-2 border-yellow-400/70 shadow-2xl p-6 space-y-5 rounded-none">
        <div className="flex flex-col items-center text-center space-y-2.5">
          <div className="relative">
            <img
              src="./images/storelogo.jpg"
              alt="Old Sarge's Surplus"
              className="w-28 h-20 object-contain bg-black border-2 border-yellow-400 p-1 shadow-lg rounded-none"
            />
            <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-1 border border-black">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-yellow-400" />
              <span>Owner Preview Gate • PIN: 5335</span>
            </div>
            <h1 className="text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
              Old Sarge&apos;s Surplus
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Enter Last 4 Digits of Store Phone (5335)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2.5 max-w-[240px] mx-auto">
            {[0, 1, 2, 3].map((idx) => {
              const filled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`h-13 flex items-center justify-center border-2 font-mono text-2xl font-black transition-all rounded-none ${
                    error
                      ? 'border-rose-500 bg-rose-950/50 text-rose-300'
                      : filled
                      ? 'border-yellow-400 bg-[#1B2230] text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.25)]'
                      : 'border-[#262F40] bg-[#090C10] text-zinc-600'
                  }`}
                >
                  {filled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {error ? (
            <p className="text-center text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider">
              Invalid Access Code — Use 5335
            </p>
          ) : (
            <p className="text-center text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              240 S Bragg Blvd • Spring Lake, NC 28390
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-12 bg-[#161C26] hover:bg-[#222B3A] active:bg-yellow-400 active:text-black border border-[#2C3648] text-white font-mono font-black text-lg transition cursor-pointer rounded-none"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="h-12 bg-[#11151D] hover:bg-zinc-800 border border-[#232B3A] text-zinc-400 font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer rounded-none"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-12 bg-[#161C26] hover:bg-[#222B3A] active:bg-yellow-400 active:text-black border border-[#2C3648] text-white font-mono font-black text-lg transition cursor-pointer rounded-none"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 bg-[#11151D] hover:bg-zinc-800 border border-[#232B3A] text-zinc-300 flex items-center justify-center transition cursor-pointer rounded-none"
            aria-label="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onUnlock}
          className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>1-Tap Instant Demo Unlock</span>
        </button>
      </div>
    </div>
  );
}
