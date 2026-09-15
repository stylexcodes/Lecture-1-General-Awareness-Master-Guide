import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useLanguage } from './Bi';
import { LanguageMode } from '../types';
import * as Icons from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    darkMode: true,
    background: '#0a0f1d',
    primaryColor: '#1e293b',
    primaryBorderColor: '#38bdf8',
    primaryTextColor: '#ffffff',
    lineColor: '#60a5fa',
    secondaryColor: '#0f172a',
    tertiaryColor: '#1e293b',
    fontSize: '13px'
  },
  securityLevel: 'loose'
});

interface MermaidChartProps {
  code: string;
  codeHi?: string;
  codeBi?: string;
  id: string;
}

export default function MermaidChart({ code, codeHi, codeBi, id }: MermaidChartProps) {
  const globalMode = useLanguage();
  const [activeLang, setActiveLang] = useState<LanguageMode>(globalMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Sync with global language changes when they happen
  useEffect(() => {
    setActiveLang(globalMode);
  }, [globalMode]);

  // Determine active code based on selected language
  const currentCode = React.useMemo(() => {
    if (activeLang === 'hi' && codeHi) return codeHi;
    if (activeLang === 'bi' && codeBi) return codeBi;
    return code;
  }, [activeLang, code, codeHi, codeBi]);

  useEffect(() => {
    let isMounted = true;
    const uniqueId = `mermaid-${id.replace(/[^a-zA-Z0-9_-]/g, '')}-${activeLang}-${Math.random().toString(36).substring(2, 8)}`;

    setRenderError(null);
    if (containerRef.current) {
      mermaid
        .render(uniqueId, currentCode)
        .then(({ svg }) => {
          if (isMounted && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.error('Mermaid render error:', err);
          if (isMounted) {
            setRenderError(String(err));
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [currentCode, id, activeLang]);

  return (
    <div className="w-full my-4 rounded-xl border border-slate-800 bg-[#0a101f] shadow-lg overflow-hidden relative group">
      {/* Diagram Top Bar with Language Selector & Watermark */}
      <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Icons.GitFork className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-200 tracking-wide">
            {activeLang === 'hi' ? 'संकल्पना प्रवाह (Flowchart)' : activeLang === 'bi' ? 'Concept Flow • संकल्पना प्रवाह' : 'Concept Flowchart'}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            GS BY DURGESH PANDEY SIR
          </span>
        </div>

        {/* Diagram-Specific Language Switcher (EN / BI / HI) */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeLang === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Diagram in English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('bi')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeLang === 'bi'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Diagram in Bilingual"
          >
            Bilingual
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('hi')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeLang === 'hi'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="हिंदी में आरेख"
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="p-4 sm:p-6 overflow-x-auto flex justify-center items-center min-h-[220px] bg-[#070c17]">
        {renderError ? (
          <div className="p-4 text-center text-xs text-rose-400 bg-rose-950/20 rounded-lg border border-rose-900/40">
            Unable to render flowchart diagram. Please toggle language above.
          </div>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-container w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_.nodeLabel]:!text-white [&_.nodeLabel]:!font-semibold [&_.edgeLabel]:!bg-slate-900 [&_.edgeLabel]:!text-cyan-300 [&_.edgeLabel]:!px-2 [&_.edgeLabel]:!py-0.5 [&_.edgeLabel]:!rounded"
          />
        )}
      </div>

      {/* Diagram Watermark Footer */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
        <span>💡 Tap nodes or pinch to zoom on mobile</span>
        <span className="font-semibold text-slate-400">GS BY DURGESH PANDEY SIR</span>
      </div>
    </div>
  );
}
