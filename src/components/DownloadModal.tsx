import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { RootData, LanguageMode } from '../types';
import { downloadOfflineHtml, openPrintableDocumentInNewTab } from '../utils/exportContent';
import { generateAndDownloadPdf } from '../utils/pdfGenerator';
import { generateAndDownloadPptx } from '../utils/pptxGenerator';
import { Bi } from './Bi';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RootData;
  currentLang: LanguageMode;
}

export default function DownloadModal({
  isOpen,
  onClose,
  data,
  currentLang
}: DownloadModalProps) {
  const [selectedLang, setSelectedLang] = useState<LanguageMode>(currentLang);
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light'>('dark');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPptx = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setProgressPercent(2);
    setProgressStatus(`Initializing ${selectedTheme === 'dark' ? 'Dark Theme' : 'Light Theme'} PPTX engine...`);

    try {
      await generateAndDownloadPptx(
        data, 
        selectedLang, 
        (pct, status) => {
          setProgressPercent(pct);
          setProgressStatus(status);
        },
        { theme: selectedTheme }
      );
      setSuccessMsg(`Master PPTX (${selectedTheme.toUpperCase()} theme, ${selectedLang.toUpperCase()}) successfully downloaded!`);
      setTimeout(() => {
        setProgressPercent(0);
        setProgressStatus('');
      }, 5000);
    } catch (e: any) {
      console.error('PPTX generation failed:', e);
      setErrorMsg(e.message || 'Failed to generate PPTX. Please try again.');
      setProgressPercent(0);
      setProgressStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadMasterPdf = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setProgressPercent(2);
    setProgressStatus(`Initializing ${selectedTheme === 'dark' ? 'Dark Theme' : 'Light Theme'} PDF engine...`);

    try {
      await generateAndDownloadPdf(
        data, 
        selectedLang, 
        (pct, status) => {
          setProgressPercent(pct);
          setProgressStatus(status);
        },
        { theme: selectedTheme }
      );
      setSuccessMsg(`Master PDF (${selectedTheme.toUpperCase()} theme, ${selectedLang.toUpperCase()}) successfully downloaded!`);
      setTimeout(() => {
        setProgressPercent(0);
        setProgressStatus('');
      }, 3000);
    } catch (e: any) {
      console.error('PDF Generation error:', e);
      setErrorMsg('PDF generation encountered an issue. You can also use the "Print View in New Tab" option.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenPrintableView = async () => {
    // Both 'Save as PDF' and 'Download Master PDF' proceed directly through the robust PDF engine
    // ensuring the user gets their complete 22-page document with all 12 photos, dark theme, and watermarks
    await handleDownloadMasterPdf();
  };

  const handleNativeBrowserPrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Native print call failed:', e);
    }
  };

  const handleDownloadHtml = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setProgressPercent(5);
    setProgressStatus('Embedding offline photos as Base64...');

    try {
      await downloadOfflineHtml(
        data, 
        selectedLang, 
        (pct, status) => {
          setProgressPercent(pct);
          setProgressStatus(status);
        },
        selectedTheme
      );
      setSuccessMsg(`Offline HTML guide (${selectedTheme} theme) successfully downloaded with all photos embedded!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (e: any) {
      console.error('Offline HTML download error:', e);
      setErrorMsg('Failed to download offline HTML file.');
    } finally {
      setIsProcessing(false);
      setProgressPercent(0);
      setProgressStatus('');
    }
  };

  return (
    <div 
      id="download-export-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={!isProcessing ? onClose : undefined}
    >
      <div 
        className="relative w-full max-w-xl bg-[#0b1222] border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
              <Icons.Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Bi en="Download Complete Master Material" hi="संपूर्ण मास्टर अध्ययन सामग्री डाउनलोड करें" />
              </h3>
              <p className="text-xs text-slate-400">
                <Bi 
                  en="All chapters, line-by-line notes, all 12 photos & official watermark" 
                  hi="सभी अध्याय, बिंदुवार नोट्स, सभी 12 चित्र और आधिकारिक वॉटरमार्क" 
                />
              </p>
            </div>
          </div>
          <button 
            type="button"
            id="close-download-modal-btn"
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Watermark Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-4 font-semibold">
          <div className="flex items-center gap-2">
            <Icons.ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Official Watermarked Content:</span>
          </div>
          <span className="font-bold tracking-wider text-amber-200 uppercase text-[11px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            GS BY DURGESH PANDEY SIR
          </span>
        </div>

        {/* Language Selection for Download */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            <Bi en="Select Language for Download" hi="डाउनलोड हेतु भाषा चुनें" />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="lang-select-bi"
              onClick={() => setSelectedLang('bi')}
              disabled={isProcessing}
              className={`p-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                selectedLang === 'bi'
                  ? 'bg-blue-600/30 border-blue-500 text-cyan-200 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Bilingual</span>
              <span className="text-[10px] font-normal opacity-80">Eng + हिंदी</span>
            </button>

            <button
              type="button"
              id="lang-select-en"
              onClick={() => setSelectedLang('en')}
              disabled={isProcessing}
              className={`p-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                selectedLang === 'en'
                  ? 'bg-blue-600/30 border-blue-500 text-cyan-200 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>English</span>
              <span className="text-[10px] font-normal opacity-80">Only English</span>
            </button>

            <button
              type="button"
              id="lang-select-hi"
              onClick={() => setSelectedLang('hi')}
              disabled={isProcessing}
              className={`p-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                selectedLang === 'hi'
                  ? 'bg-blue-600/30 border-blue-500 text-cyan-200 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>हिंदी</span>
              <span className="text-[10px] font-normal opacity-80">केवल हिंदी</span>
            </button>
          </div>
        </div>

        {/* Theme Selection for Download (Dark Theme vs Light Theme) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Bi en="PDF Theme Style" hi="पीडीएफ थीम शैली" />
            </label>
            <span className="text-[10px] text-cyan-400 font-bold">
              {selectedTheme === 'dark' ? '🌙 Dark Mode (Recommended)' : '☀️ Light Mode'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="theme-select-dark"
              onClick={() => setSelectedTheme('dark')}
              disabled={isProcessing}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                selectedTheme === 'dark'
                  ? 'bg-slate-900 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/50 ring-1 ring-cyan-500'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icons.Moon className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="font-bold flex items-center gap-1.5">
                  <span>Dark Theme PDF</span>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1 rounded">DEFAULT</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">Eye-safe #080c14 background</div>
              </div>
            </button>

            <button
              type="button"
              id="theme-select-light"
              onClick={() => setSelectedTheme('light')}
              disabled={isProcessing}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                selectedTheme === 'light'
                  ? 'bg-slate-900 border-amber-500 text-amber-300 shadow-md shadow-amber-950/50 ring-1 ring-amber-500'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icons.Sun className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-bold">Light Theme PDF</div>
                <div className="text-[10px] text-slate-400 font-normal">Classic white paper layout</div>
              </div>
            </button>
          </div>
        </div>

        {/* Live Progress Bar if Generating */}
        {isProcessing && (
          <div className="mb-4 p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/40 animate-fade-in">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-cyan-300 flex items-center gap-2">
                <Icons.Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                {progressStatus || 'Processing...'}
              </span>
              <span className="font-black text-white">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Primary Download Actions */}
        <div className="space-y-3 mb-4">
          {/* ACTION 1: DIRECT MASTER PDF DOWNLOAD */}
          <button
            type="button"
            id="download-master-pdf-button"
            onClick={handleDownloadMasterPdf}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-blue-900/50 border border-blue-400/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors flex-shrink-0">
                <Icons.FileDown className="w-5 h-5 text-cyan-200" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>Download Complete Master PDF (.pdf)</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">HIGH QUALITY</span>
                </div>
                <div className="text-[11px] text-blue-200 font-normal">
                  Multi-page A4 PDF with all subjects, line-by-line notes, all photos &amp; watermark
                </div>
              </div>
            </div>
            <Icons.Download className="w-5 h-5 text-cyan-300 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
          </button>

          {/* ACTION 1.5: EXPORT AS PPTX */}
          <button
            type="button"
            id="download-pptx-button"
            onClick={handleDownloadPptx}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-orange-900/50 border border-orange-400/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors flex-shrink-0">
                <Icons.MonitorPlay className="w-5 h-5 text-orange-200" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>Export as Presentation (.pptx)</span>
                </div>
                <div className="text-xs text-orange-100 font-medium">
                  Perfect Slides Format • Photos & Watermark Preserved
                </div>
              </div>
            </div>
            <Icons.Download className="w-5 h-5 text-orange-200 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
          </button>


          {/* ACTION 2: PRINT / SAVE AS PDF & BROWSER PRINT OPTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              id="print-save-pdf-button"
              onClick={handleOpenPrintableView}
              disabled={isProcessing}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 disabled:opacity-50 text-white font-bold text-xs sm:text-sm border border-slate-700/80 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500/25 transition-colors flex-shrink-0">
                  <Icons.Printer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-100">Print / Save as PDF</div>
                  <div className="text-[10px] text-slate-400 font-normal">All 22 pages &amp; photos</div>
                </div>
              </div>
              <Icons.FileDown className="w-4 h-4 text-indigo-400 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
            </button>

            <button
              type="button"
              id="quick-browser-print-button"
              onClick={handleNativeBrowserPrint}
              disabled={isProcessing}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 disabled:opacity-50 text-white font-bold text-xs sm:text-sm border border-slate-700/80 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 group-hover:bg-amber-500/25 transition-colors flex-shrink-0">
                  <Icons.Printer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-100">Quick Browser Print</div>
                  <div className="text-[10px] text-slate-400 font-normal">Native Ctrl + P dialog</div>
                </div>
              </div>
              <Icons.ExternalLink className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            </button>
          </div>

          {/* ACTION 3: STANDALONE OFFLINE HTML */}
          <button
            type="button"
            id="download-offline-html-button"
            onClick={handleDownloadHtml}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 disabled:opacity-50 text-white font-bold text-sm border border-slate-700/80 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-400 group-hover:bg-cyan-500/25 transition-colors flex-shrink-0">
                <Icons.FileCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold">
                  <span>Download Standalone Offline App (.html)</span>
                </div>
                <div className="text-[11px] text-slate-400 font-normal">
                  All 12 photos embedded inside as Base64 — works 100% offline without internet
                </div>
              </div>
            </div>
            <Icons.Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all flex-shrink-0" />
          </button>
        </div>

        {/* Success Feedback Alert */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 mb-3 animate-fade-in">
            <Icons.CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Feedback Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 mb-3 animate-fade-in">
            <Icons.AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
          <span>Target SSC CGL • CHSL • MTS • GD • </span>
          <span className="font-bold text-amber-300">GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </div>
  );
}
