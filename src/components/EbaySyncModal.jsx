import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  Upload,
  Download
} from 'lucide-react';
import { useSurplus } from '../context/SurplusContext';
import {
  EBAY_STORE_CONFIG,
  EBAY_FEED_SYNC_BATCH,
  getEbayItemSearchUrl
} from '../data/surplusData';

export default function EbaySyncModal() {
  const {
    isEbaySyncModalOpen,
    setIsEbaySyncModalOpen,
    ebaySyncMeta,
    setEbaySyncMeta,
    runEbayFeedSync,
    importCustomEbayListing,
    importEbayCsvBatch,
    showCifComparison,
    setShowCifComparison,
    inventoryBays
  } = useSurplus();

  const [isSyncingAnim, setIsSyncingAnim] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPrice, setQuickPrice] = useState('');
  const [quickNsn, setQuickNsn] = useState('');
  const [quickBay, setQuickBay] = useState('auto');
  const [lastImportedResult, setLastImportedResult] = useState(null);
  const [csvImportSummary, setCsvImportSummary] = useState(null);

  if (!isEbaySyncModalOpen) return null;

  const handleRunLiveSync = () => {
    setIsSyncingAnim(true);
    setTimeout(() => {
      runEbayFeedSync();
      setIsSyncingAnim(false);
    }, 600);
  };

  const handleQuickImport = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    const res = importCustomEbayListing({
      title: quickTitle,
      price: quickPrice,
      nsn: quickNsn,
      bayId: quickBay
    });
    setLastImportedResult(res);
    setQuickTitle('');
    setQuickPrice('');
    setQuickNsn('');
  };

  // Parse standard eBay Seller Hub Active Listings CSV (supports quoted fields)
  const parseCsvLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleCsvFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = String(evt.target?.result || '');
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length < 2) return;

      const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
      const titleIdx = headers.findIndex((h) => h.includes('title') || h.includes('name'));
      const priceIdx = headers.findIndex(
        (h) => h.includes('current price') || h.includes('start price') || h.includes('price')
      );
      const itemNumIdx = headers.findIndex((h) => h.includes('item number') || h.includes('id'));
      const skuIdx = headers.findIndex((h) => h.includes('custom label') || h.includes('sku') || h.includes('nsn'));
      const qtyIdx = headers.findIndex((h) => h.includes('available') || h.includes('qty') || h.includes('quantity'));
      const condIdx = headers.findIndex((h) => h.includes('condition'));

      const parsedRows = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        const title = cols[titleIdx >= 0 ? titleIdx : 1] || cols[0];
        if (!title || title.toLowerCase() === 'title') continue;
        parsedRows.push({
          itemNumber: itemNumIdx >= 0 ? cols[itemNumIdx] : `${285960000000 + i}`,
          title,
          price: priceIdx >= 0 ? cols[priceIdx] : '45.00',
          sku: skuIdx >= 0 ? cols[skuIdx] : 'EBAY-ACTIVE-CSV',
          qty: qtyIdx >= 0 ? cols[qtyIdx] : '2',
          condition: condIdx >= 0 ? cols[condIdx] : 'eBay Seller Hub Active'
        });
      }

      const count = importEbayCsvBatch(parsedRows);
      setCsvImportSummary({
        fileName: file.name,
        count
      });
    };
    reader.readAsText(file);
  };

  const handleDownloadSampleCsv = () => {
    const sampleCsv = [
      'Item number,Title,Custom label (SKU),Current price,Available quantity,Condition',
      '285941100101,"Mystery Ranch SATL Bridger Assault Pack Coyote Brown USGI SOF",8465-01-559-5410,325.00,2,"Pre-owned - Grade 1"',
      '285941100102,"Tactical Tailor Fight Light MAV 2-Piece Chest Rig Multicam OCP",TT-MAV-2PC,95.00,4,"New without tags"',
      '285941100103,"Specialty Defense Systems USGI MOLLE II Waist Pack Butt Pack OCP",8465-01-641-9318,28.00,9,"Unissued USGI"',
      '285941100104,"London Bridge Trading LBT-6094A Plate Carrier Ranger Green",LBT-6094A-RG,265.00,1,"Grade 1 Surplus"',
      '285941100105,"Belleville 390DES Hot Weather Combat Boots Coyote Size 10.5R AR 670-1",8430-01-647-6110,79.00,5,"New in Box"'
    ].join('\n');

    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oldsargessurplus-ebay-active-listings-sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border-2 border-yellow-400 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F1521] via-[#161F30] to-[#0F1521] border-b border-yellow-400/40 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black shrink-0">
              <RefreshCw className={`w-6 h-6 ${isSyncingAnim ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-xs bg-yellow-400 text-black font-black">
                  ZERO-WORKFLOW-CHANGE EBAY BRIDGE
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-xs">
                  ● Seller: @{EBAY_STORE_CONFIG.sellerHandle}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
                eBay Storefront Sync Engine &amp; Seller Hub CSV Importer
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEbaySyncModalOpen(false)}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-rose-700 text-zinc-300 hover:text-white transition cursor-pointer"
            aria-label="Close eBay Sync Hub"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Why eBay Sync Solves the Shopify Problem */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-1.5">
              <div className="text-xs font-mono uppercase text-yellow-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>1. Keep Your Exact eBay Workflow</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Why did Shopify sit locked behind a password? Because typing inventory twice is a chore. With our eBay Bridge, you list on{' '}
                <strong className="text-white">@{EBAY_STORE_CONFIG.sellerHandle}</strong> and your website updates automatically.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-1.5">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>2. More Clicks to Your eBay Listings</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Every item on <strong className="text-white">oldsargessurplus.com</strong> has a direct{' '}
                <span className="text-yellow-300 font-mono font-bold">&ldquo;eBay ↗&rdquo;</span> button that sends nationwide mail-order buyers straight into your eBay checkout.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-1.5">
              <div className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Toggle Army CIF Price Comparison</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                You control whether the site displays <strong className="text-white">only your Store / eBay price</strong> or also shows soldiers what the <strong className="text-emerald-300">Army Fort Bragg CIF Fine</strong> would cost them:
              </p>
              <button
                type="button"
                onClick={() => setShowCifComparison(!showCifComparison)}
                className={`w-full mt-1 py-1.5 px-2.5 rounded font-mono text-[11px] font-bold uppercase border cursor-pointer transition ${
                  showCifComparison
                    ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-800 border-zinc-600 text-zinc-200'
                }`}
              >
                {showCifComparison
                  ? '✓ Showing Army CIF Fine Comparison (Click to Hide)'
                  : 'Showing Store Price Only (Click to Show CIF Savings)'}
              </button>
            </div>
          </div>

          {/* Live Sync Control Bar */}
          <div className="bg-gradient-to-r from-zinc-900 via-[#151D2B] to-zinc-900 border-2 border-yellow-400/60 p-4 sm:p-5 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500 text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                  {EBAY_STORE_CONFIG.reputationBadge}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Last Synced: <strong className="text-white">{ebaySyncMeta.lastSyncedAt}</strong>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                eBay Seller Feed: @{EBAY_STORE_CONFIG.sellerHandle} ({ebaySyncMeta.syncedListingsCount} Active Synced Listings)
              </h3>
              <p className="text-xs text-zinc-300">
                Top Detected eBay Brands:{' '}
                <span className="font-mono text-yellow-300">
                  {EBAY_STORE_CONFIG.topBrands.join(' • ')}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setEbaySyncMeta((prev) => ({
                    ...prev,
                    autoSyncEnabled: !prev.autoSyncEnabled
                  }))
                }
                className={`px-3 py-2.5 rounded-lg font-mono text-xs font-bold border cursor-pointer transition ${
                  ebaySyncMeta.autoSyncEnabled
                    ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                }`}
              >
                {ebaySyncMeta.autoSyncEnabled
                  ? '✓ 15-Min Auto-Sync: ON'
                  : '15-Min Auto-Sync: PAUSED'}
              </button>

              <button
                type="button"
                onClick={handleRunLiveSync}
                className="px-4 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingAnim ? 'animate-spin' : ''}`} />
                <span>
                  {ebaySyncMeta.hasImportedBatch
                    ? '✓ Re-Sync @oldsargessurplus eBay Feed'
                    : '🔄 Sync Latest @oldsargessurplus eBay Feed Now'}
                </span>
              </button>

              <a
                href={EBAY_STORE_CONFIG.storeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold flex items-center gap-1.5"
              >
                <span>Open eBay Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Real eBay Seller Hub CSV File Dropzone */}
          <div className="bg-zinc-900/90 border-2 border-dashed border-emerald-500/60 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-black uppercase">
                <Upload className="w-4 h-4" />
                <span>Option B • Instant eBay Seller Hub Active Listings (.CSV) Dropzone</span>
              </div>
              <p className="text-xs text-zinc-300">
                In eBay Seller Hub (<code className="font-mono text-yellow-300">Listings → Active → Download CSV</code>), export your active listings and upload the <code className="font-mono">.csv</code> file here to auto-populate all 8 Bays on the spot.
              </p>
              {csvImportSummary && (
                <div className="text-xs font-mono font-bold text-emerald-300 pt-1">
                  ✓ Imported {csvImportSummary.count} eBay listings from &ldquo;{csvImportSummary.fileName}&rdquo; into the live storefront!
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="Download a sample eBay Seller Hub CSV file to test uploading"
              >
                <Download className="w-3.5 h-3.5 text-yellow-400" />
                <span>Download Sample eBay CSV</span>
              </button>

              <label className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload eBay Active CSV</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 2-Column Workspace: Feed Preview + Instant Paste/Import */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Live @oldsargessurplus eBay Feed Items */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">
                  Detected @oldsargessurplus eBay Listings Ready / Synced to Website
                </h4>
                {ebaySyncMeta.hasImportedBatch && (
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Live in 8-Bay Storefront!
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                {EBAY_FEED_SYNC_BATCH.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-yellow-400/60 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 font-mono text-[10px] font-bold px-1.5 py-0.5">
                          eBay #{item.ebayItemNumber}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          🔥 {item.ebayWatchers} eBay Watchers
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          → Routes to: <strong className="text-white uppercase">{item.bayId}</strong>
                        </span>
                      </div>
                      <div className="font-bold text-sm text-white">{item.name}</div>
                      <div className="text-[11px] text-zinc-400">{item.description}</div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2 border-t sm:border-t-0 border-zinc-800 pt-2 sm:pt-0">
                      <div className="text-right">
                        <div className="text-lg font-black font-mono text-yellow-400">
                          ${item.price}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          NSN: {item.nsn}
                        </div>
                      </div>

                      <a
                        href={getEbayItemSearchUrl(item)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-yellow-400 hover:text-black text-yellow-300 font-mono text-[11px] font-bold flex items-center gap-1 transition"
                      >
                        <span>View on eBay</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Instant eBay Listing URL / Title Auto-Router */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs font-bold uppercase">
                  <PlusCircle className="w-4 h-4" />
                  <span>Test Single eBay Listing Auto-Importer</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Paste any eBay listing title below. Our auto-classifier detects the gear type (Ruck, Pouch, Boots, Woobie, Ammo Can) and publishes it to the matching Bay with a direct eBay checkout link.
                </p>

                <form onSubmit={handleQuickImport} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      eBay Listing Title
                    </label>
                    <input
                      type="text"
                      value={quickTitle}
                      onChange={(e) => setQuickTitle(e.target.value)}
                      placeholder="e.g., Mystery Ranch Komodo Dragon Multicam Pack"
                      className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        eBay Buy-It-Now Price ($)
                      </label>
                      <input
                        type="number"
                        value={quickPrice}
                        onChange={(e) => setQuickPrice(e.target.value)}
                        placeholder="185"
                        className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        NSN / SKU (Optional)
                      </label>
                      <input
                        type="text"
                        value={quickNsn}
                        onChange={(e) => setQuickNsn(e.target.value)}
                        placeholder="8465-01-..."
                        className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Target Website Bay
                    </label>
                    <select
                      value={quickBay}
                      onChange={(e) => setQuickBay(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white font-mono"
                    >
                      <option value="auto">✨ Auto-Route by eBay Title / Keyword</option>
                      {inventoryBays.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.code}: {b.shortName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition shadow"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Import eBay Listing Into Live Storefront</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {lastImportedResult && (
                  <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Synced to Bay: {lastImportedResult.targetBayId.toUpperCase()}</span>
                    </div>
                    <p className="text-zinc-200">
                      <strong>{lastImportedResult.newItem.name}</strong> (${lastImportedResult.newItem.price}) is now live on the storefront and Counter TV!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
