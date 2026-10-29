import React from 'react';
import { useSurplus } from '../context/SurplusContext';
import {
  FileText,
  X,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Server,
  Search,
  DollarSign
} from 'lucide-react';

export default function DiscoveryWhitePaperModal() {
  const { isWhitePaperOpen, setIsWhitePaperOpen } = useSurplus();

  if (!isWhitePaperOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitepaper-title"
    >
      <div className="bg-[#0D1118] border-2 border-yellow-400 text-[#F4F4F0] w-full max-w-5xl rounded-none shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#151C28] border-b border-yellow-400/60 p-4 sm:p-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-400 text-black p-2.5 shrink-0">
              <FileText className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="inline-block bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mb-1">
                Executive Discovery Audit &amp; Digital Turnaround Blueprint
              </span>
              <h2
                id="whitepaper-title"
                className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white"
              >
                Why Old Sarge&apos;s Surplus Is Getting Hit With New York Reviews — And How We Stop It
              </h2>
              <p className="text-xs text-zinc-300">
                Prepared for Old Sarge&apos;s Surplus • 240 S Bragg Blvd, Spring Lake, NC 28390 • Domain: <code className="text-yellow-300">oldsargessurplus.com</code>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsWhitePaperOpen(false)}
            className="p-2 bg-zinc-900 hover:bg-rose-700 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer shrink-0"
            aria-label="Close white paper"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs sm:text-sm leading-relaxed">
          {/* Section 1: The Forensic Root Cause */}
          <div className="bg-[#141A24] border-l-4 border-rose-500 p-4 space-y-2">
            <h3 className="text-lg font-black uppercase font-['Bebas_Neue'] tracking-wider text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>1. The Root Cause: Why Angry New York Shoppers Review Your Spring Lake Store</span>
            </h3>
            <p className="text-zinc-200">
              Right now, your domain (<strong>oldsargessurplus.com</strong>) redirects to a locked Shopify <code className="text-rose-300">/password</code> screen with a hidden header (<code className="text-rose-300">x-robots-tag: nofollow</code>) that forbids Google from indexing your website.
            </p>
            <p className="text-zinc-200">
              Because Google sees no active website for <strong>Old Sarge&apos;s Surplus in Spring Lake, NC</strong>, Google&apos;s Knowledge Graph and AI Search Overviews have merged your storefront with an unrelated business in Westfield, New York called <strong>&ldquo;Old Sarge&apos;s Drop Zone&rdquo; (<code className="text-rose-300">oldsargesdropzone.com</code>)</strong>. When that New York website fails to ship orders or ignores emails, frustrated buyers search <em>&ldquo;Old Sarge Surplus&rdquo;</em> on Google Maps and drop 1-star chargeback reviews on your <strong>240 S Bragg Blvd</strong> profile!
            </p>
          </div>

          {/* Section 2: Why Shopify Stalled Out */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141A24] border border-zinc-700 p-4 space-y-2">
              <h4 className="font-mono font-black uppercase text-rose-400 text-xs flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>The Shopify Trap (Current State)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300 list-disc pl-4">
                <li>
                  <strong>Monthly SaaS Bleed:</strong> Paying $39–$105/month ($468–$1,260/yr) while the site sits locked behind <code className="text-rose-300">/password</code>.
                </li>
                <li>
                  <strong>Surplus SKU Burnout:</strong> Entering 3,000 rotating military surplus items (mixed NSNs, grades, sizes) into traditional e-commerce carts takes hundreds of hours.
                </li>
                <li>
                  <strong>Duplicate Work:</strong> You already sell individual shippable items on your top-rated <strong>eBay store (oldsargessurplus)</strong>.
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/25 border border-emerald-500/60 p-4 space-y-2">
              <h4 className="font-mono font-black uppercase text-emerald-400 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Turnkey Surplus Locker Solution (This Build)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-200 list-disc pl-4">
                <li>
                  <strong>$0/Month Hosting Forever:</strong> Point <code className="text-emerald-300">oldsargessurplus.com</code> here and cancel your monthly Shopify subscription bill permanently.
                </li>
                <li>
                  <strong>Algorithmic Entity Firewall:</strong> Injects Schema.org <code className="text-emerald-300">disambiguatingDescription</code> + an interactive NY Order Intercept Shield to stop 1-star reviews cold.
                </li>
                <li>
                  <strong>10-Second Bay &amp; Crate Admin:</strong> Toggle stock status (<em>In Stock, Low Stock, Fresh Crate, Sold Out</em>) and sewing turnaround in 1 tap—plus bridge out-of-state buyers straight to your eBay vault.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: The 4 Engines Driving Foot Traffic to 240 S Bragg Blvd */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#141A24] border border-zinc-700 p-3.5 space-y-1.5">
              <Search className="w-5 h-5 text-yellow-400" />
              <h5 className="font-bold text-white text-xs uppercase font-mono">
                1. NSN &amp; CIF Search SEO
              </h5>
              <p className="text-[11px] text-zinc-300">
                When a Fort Liberty soldier searches <em>&ldquo;MOLLE II ruck near me&rdquo;</em> or <em>&ldquo;CIF turn in gear Spring Lake&rdquo;</em>, your 8 Tactical Bays rank at the top.
              </p>
            </div>

            <div className="bg-[#141A24] border border-zinc-700 p-3.5 space-y-1.5">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h5 className="font-bold text-white text-xs uppercase font-mono">
                2. CIF Savings Calculator
              </h5>
              <p className="text-[11px] text-zinc-300">
                Shows soldiers side-by-side how much they save buying missing gear at 240 S Bragg Blvd vs. paying CIF Statement of Charges.
              </p>
            </div>

            <div className="bg-[#141A24] border border-zinc-700 p-3.5 space-y-1.5">
              <Server className="w-5 h-5 text-sky-400" />
              <h5 className="font-bold text-white text-xs uppercase font-mono">
                3. On-Site Sewing Live Board
              </h5>
              <p className="text-[11px] text-zinc-300">
                Broadcasts walk-in OCP name tape, rank, badge sewing, and ruck zipper repair turnaround times to capture high-margin walk-ins.
              </p>
            </div>

            <div className="bg-[#141A24] border border-zinc-700 p-3.5 space-y-1.5">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
              <h5 className="font-bold text-white text-xs uppercase font-mono">
                4. 1080p Counter TV + USB
              </h5>
              <p className="text-[11px] text-zinc-300">
                Includes a 1920×1080 digital signage board for behind the counter that exports to a USB stick for 100% offline playback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
