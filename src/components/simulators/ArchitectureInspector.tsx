import React, { useState } from 'react';
import { Sparkles, Layers, Gauge, Code2, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

interface BundleChunk {
  name: string;
  sizeKb: number;
  type: 'code' | 'asset' | 'vendor';
  deferred: boolean;
}

const CHUNKS: BundleChunk[] = [
  { name: 'index.html (SSR Entry Shell)', sizeKb: 14.2, type: 'code', deferred: false },
  { name: 'assets/index-*.js (Core React Runtime)', sizeKb: 68.4, type: 'vendor', deferred: false },
  { name: 'assets/hero-ambient-poster.webp (Local High-Q Poster)', sizeKb: 7.2, type: 'asset', deferred: false },
  { name: 'assets/HeroEffects-*.js (Spline & Lanyard Mesh)', sizeKb: 84.1, type: 'code', deferred: true },
  { name: 'assets/caseStudies-*.js (Dynamic Markdown Chunks)', sizeKb: 22.8, type: 'code', deferred: true },
  { name: 'resume.pdf (Base-aware Vector Document)', sizeKb: 112.0, type: 'asset', deferred: true },
];

export default function ArchitectureInspector() {
  const [activeTab, setActiveTab] = useState<'chunks' | 'lighthouse' | 'schema'>('chunks');
  const [hasCopiedSchema, setHasCopiedSchema] = useState(false);

  const sampleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Sahaya Savari F",
        "jobTitle": "AI Engineer & Full Stack Developer",
        "url": "https://sahayasavari.dev",
        "sameAs": [
          "https://github.com/sahaya-savari",
          "https://www.linkedin.com/in/sahaya-savari"
        ],
        "knowsAbout": ["Python", "Machine Learning", "FastAPI", "React", "TypeScript", "IndexedDB"]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Sahaya Savari Portfolio Architecture",
        "applicationCategory": "DeveloperPortfolio",
        "operatingSystem": "Web, iOS, Android"
      }
    ]
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleSchema, null, 2));
    setHasCopiedSchema(true);
    setTimeout(() => setHasCopiedSchema(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 my-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Client Architecture & Telemetry Inspector
          </div>
          <h3 className="text-xl font-heading tracking-tight">System Internals & Bundle Telemetry</h3>
          <p className="text-xs text-white/60 font-body">Inspect Vite code splitting, Core Web Vitals gate compliance, and Schema.org semantic graphs.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('chunks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'chunks' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Chunks
          </button>
          <button
            onClick={() => setActiveTab('lighthouse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'lighthouse' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" /> Vitals
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Schema
          </button>
        </div>
      </div>

      {/* Tab 1: Chunk Tree */}
      {activeTab === 'chunks' && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 px-1">
            <span>Module / Asset Descriptor</span>
            <span>Uncompressed Size</span>
          </div>
          {CHUNKS.map((c, i) => (
            <div key={i} className="p-3 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 truncate">
                <FileCode className={`w-4 h-4 shrink-0 ${c.type === 'vendor' ? 'text-blue-400' : c.type === 'asset' ? 'text-purple-400' : 'text-emerald-400'}`} />
                <span className="text-white/90 truncate">{c.name}</span>
                {c.deferred && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                    lazy
                  </span>
                )}
              </div>
              <span className="font-semibold text-white/80 shrink-0">{c.sizeKb} KB</span>
            </div>
          ))}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-body text-blue-200">
            Total Critical Path JS Bundle size is strictly budgeted below 120 KB, enabling sub-800ms Time-to-Interactive (TTI).
          </div>
        </div>
      )}

      {/* Tab 2: Lighthouse Vitals */}
      {activeTab === 'lighthouse' && (
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center">
              <div className="text-3xl font-mono font-bold text-emerald-400">98</div>
              <div className="text-xs font-body text-white/80 mt-1">Performance</div>
              <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">LCP ≤ 1.2s</div>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center">
              <div className="text-3xl font-mono font-bold text-emerald-400">100</div>
              <div className="text-xs font-body text-white/80 mt-1">Accessibility</div>
              <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">WCAG 2.2 AA</div>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center">
              <div className="text-3xl font-mono font-bold text-emerald-400">100</div>
              <div className="text-xs font-body text-white/80 mt-1">Best Practices</div>
              <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">HTTPS & CSP</div>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center">
              <div className="text-3xl font-mono font-bold text-emerald-400">100</div>
              <div className="text-xs font-body text-white/80 mt-1">SEO</div>
              <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">Canonical / OpenGraph</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-body text-white/70">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
              <CheckCircle2 className="w-4 h-4" /> Continuous Integration Performance Gate Active
            </div>
            <p>Every commit triggers Lighthouse CI in `.github/workflows/deploy-pages.yml` running 3 median runs with strict performance thresholds.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Schema.org Viewer */}
      {activeTab === 'schema' && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-white/50">JSON-LD Linked Data Entity Graph</span>
            <button
              onClick={handleCopySchema}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-xs font-body text-white/80 transition-colors cursor-pointer"
            >
              {hasCopiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {hasCopiedSchema ? 'Copied' : 'Copy Schema'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-60 leading-relaxed">
            {JSON.stringify(sampleSchema, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

