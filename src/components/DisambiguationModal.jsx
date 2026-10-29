import React from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Phone,
  MapPin,
  ExternalLink,
  X,
  AlertTriangle,
  Building2
} from 'lucide-react';

export default function DisambiguationModal() {
  const { isDisambiguationModalOpen, setIsDisambiguationModalOpen, storeInfo } = useSurplus();

  if (!isDisambiguationModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disambiguation-title"
    >
      <div className="bg-[#0E1218] border-2 border-yellow-400 text-[#F4F4F0] w-full max-w-4xl rounded-none shadow-2xl overflow-hidden my-auto">
        {/* Top Warning Header */}
        <div className="bg-gradient-to-r from-rose-950 via-[#1A1114] to-[#12161F] border-b border-yellow-400/50 p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-400 text-black p-2.5 shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-400/50 text-rose-200 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">
                <span>Official Consumer &amp; Search Engine Disambiguation Notice</span>
              </div>
              <h2
                id="disambiguation-title"
                className="text-2xl sm:text-3xl font-black uppercase tracking-wide font-['Bebas_Neue'] text-white"
              >
                Looking for an Unshipped Online Order from &ldquo;Old Sarge&apos;s Drop Zone&rdquo;?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                Please read carefully before posting a Google Review — there are <strong>two completely unrelated businesses</strong> with similar names in different states.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDisambiguationModalOpen(false)}
            className="bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 p-2 cursor-pointer shrink-0"
            aria-label="Close disambiguation notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Side-by-Side Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT: OUR STORE (SPRING LAKE, NC) */}
            <div className="bg-emerald-950/25 border-2 border-emerald-500/70 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span className="inline-flex items-center gap-1.5 text-emerald-300 font-mono text-xs font-extrabold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>THIS STORE • SPRING LAKE, NC</span>
                </span>
                <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                  Verified NC Storefront
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="./images/storelogo.jpg"
                  alt="Old Sarge's Surplus Spring Lake NC Logo"
                  className="w-16 h-12 object-contain bg-black border border-yellow-500/50 p-1 shrink-0"
                />
                <div>
                  <h3 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
                    Old Sarge&apos;s Surplus (Old Sarge Surplus)
                  </h3>
                  <p className="text-xs text-emerald-300 font-semibold">
                    Family-Owned Outside Fort Bragg for 30+ Years
                  </p>
                </div>
              </div>

              <ul className="text-xs space-y-2 text-zinc-200 font-sans">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Physical Address:</strong> 240 S Bragg Blvd, Spring Lake, NC 28390
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Storefront Phone:</strong>{' '}
                    <a href="tel:9104975335" className="underline text-yellow-300 font-bold">
                      (910) 497-5335
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>How We Sell:</strong> In-store retail at 240 S Bragg Blvd, on-site uniform sewing, and our top-rated{' '}
                    <a
                      href={storeInfo.ebayUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow-300 underline font-bold"
                    >
                      eBay Store (oldsargessurplus)
                    </a>
                    .
                  </span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:9104975335"
                  className="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider py-2.5 px-3"
                >
                  Call NC Store: (910) 497-5335
                </a>
                <a
                  href={storeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-[#151C26] hover:bg-[#1F2937] text-emerald-300 border border-emerald-500/50 font-bold text-xs uppercase tracking-wider py-2.5 px-3"
                >
                  Directions to Bragg Blvd
                </a>
              </div>
            </div>

            {/* RIGHT: UNRELATED NEW YORK WEBSITE */}
            <div className="bg-rose-950/25 border-2 border-rose-500/70 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-500/30 pb-2">
                <span className="inline-flex items-center gap-1.5 text-rose-300 font-mono text-xs font-extrabold uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>UNRELATED NEW YORK BUSINESS</span>
                </span>
                <span className="bg-rose-600 text-white font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                  Zero Affiliation
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-rose-200">
                  &ldquo;Old Sarge&apos;s Drop Zone&rdquo; (Westfield, NY)
                </h3>
                <p className="text-xs text-rose-300 font-semibold">
                  Separate Mail-Order Website Operating Out of Chautauqua County, NY
                </p>
              </div>

              <ul className="text-xs space-y-2 text-zinc-200 font-sans">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>NY Address:</strong> 7031 US-20, Westfield, NY 14787
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>NY Phone Number:</strong>{' '}
                    <a href="tel:7164012930" className="underline text-rose-300 font-bold">
                      (716) 401-2930
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Website Domain:</strong> <code className="text-rose-200">oldsargesdropzone.com</code> — If your credit card or email confirmation references <em>Old Sarge&apos;s Drop Zone</em>, your order was placed with New York, <strong>not</strong> our Spring Lake, NC store.
                  </span>
                </li>
              </ul>

              <div className="bg-black/50 border border-rose-500/40 p-2.5 text-[11px] text-rose-200 leading-relaxed">
                <strong>Need help with a New York order?</strong> Please contact Old Sarge&apos;s Drop Zone in Westfield, NY directly at <strong>(716) 401-2930</strong> or contact your card-issuing bank. Please do not leave a negative review on our Spring Lake, NC family storefront!
              </div>
            </div>
          </div>

          {/* Real-World Proof Callout (Showing Why We Built This Shield) */}
          <div className="bg-[#141922] border border-zinc-700 p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5">
              <img
                src="./images/google-review-collision-proof.png"
                alt="Screenshot of mistaken identity 1-star Google review left on Old Sarge Surplus Spring Lake NC"
                className="w-full max-h-72 object-contain border border-zinc-600 bg-white"
              />
            </div>
            <div className="md:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
                <span>Why This Verification Shield Exists</span>
              </div>
              <h4 className="text-lg font-black uppercase font-['Bebas_Neue'] tracking-wide text-white">
                Protecting 30+ Years of Honest Service on Bragg Blvd
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                As shown in the review screenshot on the left, online shoppers who had fulfillment issues with <strong>Old Sarge&apos;s Drop Zone in New York</strong> accidentally searched &ldquo;Old Sarge Surplus&rdquo; on Google Maps and posted 1-star reviews on our <strong>Spring Lake, NC</strong> storefront.
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                By launching our official domain (<strong>oldsargessurplus.com</strong>) with embedded <strong>Schema.org Entity Disambiguation</strong> and this consumer verification shield, both Google&apos;s search algorithm and online buyers can immediately distinguish our Fort Bragg / Spring Lake store from the unrelated New York website.
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <a
                  href={storeInfo.ebayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-3.5 py-2"
                >
                  <span>Visit Our Verified eBay Store (oldsargessurplus)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsDisambiguationModalOpen(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2 border border-zinc-600 cursor-pointer"
                >
                  Return to Spring Lake Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
