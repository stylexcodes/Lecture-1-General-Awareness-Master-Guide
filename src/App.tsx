import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { lectureData } from './data';
import SectorChart from './components/SectorChart';
import MermaidChart from './components/MermaidChart';
import DownloadModal from './components/DownloadModal';
import { Leaf, LanguageMode } from './types';
import { LanguageContext, Bi } from './components/Bi';

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : <Icons.Circle className={className} />;
};

export default function App() {
  const [activeBranchId, setActiveBranchId] = useState<string>(lectureData.branches[0].id);
  const [language, setLanguage] = useState<LanguageMode>('bi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showChapterDrawer, setShowChapterDrawer] = useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  const activeBranch = useMemo(() => {
    return lectureData.branches.find(b => b.id === activeBranchId) || lectureData.branches[0];
  }, [activeBranchId]);

  // Filter leaves based on search query if entered
  const filteredLeaves = useMemo(() => {
    if (!searchQuery.trim()) return activeBranch.leaves;
    const q = searchQuery.toLowerCase();
    return activeBranch.leaves.filter(leaf => {
      const matchTitle = leaf.title.toLowerCase().includes(q) || (leaf.titleHi && leaf.titleHi.toLowerCase().includes(q));
      const matchTags = leaf.tags?.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchTags;
    });
  }, [activeBranch, searchQuery]);

  const scrollToLeaf = (leafId: string) => {
    const el = document.getElementById(`leaf-${leafId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <LanguageContext.Provider value={language}>
      <div className="min-h-screen bg-[#070b13] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
        
        {/* ====================================================================
            WATERMARK 1: FIXED REPEATING BACKGROUND PATTERN
            "GS BY DURGESH PANDEY SIR"
        ==================================================================== */}
        <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-[0.032] sm:opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gs-watermark-pattern" width="400" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
                <text x="30" y="70" fill="#ffffff" className="text-[17px] font-black tracking-[0.25em] uppercase">
                  GS BY DURGESH PANDEY SIR
                </text>
                <text x="180" y="190" fill="#38bdf8" className="text-[13px] font-bold tracking-[0.2em] uppercase">
                  SSC CGL • CHSL • CPO MASTER GUIDE
                </text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gs-watermark-pattern)" />
          </svg>
        </div>

        {/* Ambient background glow accents */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ====================================================================
            TOP APP BAR (Compact ~58px - NEVER eats half the screen!)
        ==================================================================== */}
        <header className="sticky top-0 z-30 bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
            
            {/* Left: Branding & Watermark */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <button 
                onClick={() => setShowChapterDrawer(true)}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 transition-colors flex items-center gap-1.5 flex-shrink-0"
                title="View All Chapters"
                aria-label="Open chapters menu"
              >
                <Icons.Menu className="w-5 h-5 text-cyan-400" />
                <span className="hidden md:inline text-xs font-semibold text-slate-300">Chapters</span>
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-400 flex-shrink-0">
                  <Icons.GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight text-white truncate flex items-center gap-1.5">
                      <span className="text-amber-400 font-black">GS</span> BY DURGESH PANDEY SIR
                    </h1>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                      SSC Special
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                    <Bi en="Lecture 1: General Awareness Master Guide" hi="व्याख्यान 1: सामान्य अध्ययन संपूर्ण नोट्स" />
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Language Pill Selector + Offline Download Button */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* High Quality Download Button */}
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all border border-blue-400/40 group active:scale-95"
                title="Download offline master guide with watermark"
              >
                <Icons.Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-cyan-200" />
                <span className="hidden md:inline">Offline Access</span>
                <span className="md:hidden">Download</span>
              </button>

              {/* Language Switcher */}
              <div className="flex bg-slate-900/90 p-0.5 sm:p-1 rounded-lg border border-slate-800 shadow-inner">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                    language === 'en' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('bi')}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                    language === 'bi' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="English + Hindi Bilingual View"
                >
                  BILINGUAL
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                    language === 'hi' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* ====================================================================
            SUBJECT NAVIGATION BAR (Horizontal Scrolling Pills - Height ~48px)
            Replaces the bulky half-screen sidebar on mobile & desktop!
        ==================================================================== */}
        <nav className="sticky top-14 sm:top-16 z-20 bg-[#0a101f]/95 backdrop-blur-md border-b border-slate-800/90 py-2 sm:py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-0.5">
              <span className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider pr-2 border-r border-slate-800 flex-shrink-0">
                <Icons.Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Subjects:</span>
              </span>

              {lectureData.branches.map((branch) => {
                const isActive = activeBranchId === branch.id;
                return (
                  <button
                    key={branch.id}
                    onClick={() => {
                      setActiveBranchId(branch.id);
                      setSearchQuery('');
                    }}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-indigo-600/30 text-cyan-200 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800'
                    }`}
                  >
                    <div className={`p-1 rounded-md ${isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon name={branch.iconName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span>
                      <Bi en={branch.title} hi={branch.titleHi} />
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {branch.leaves.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ====================================================================
            SUB-HEADER: ACTIVE SUBJECT INFO & QUICK-JUMP CHIPS
        ==================================================================== */}
        <section className="bg-[#0b1222]/80 border-b border-slate-800/60 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Subject details */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 shadow-sm flex-shrink-0">
                <Icon name={activeBranch.iconName} className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Bi en={activeBranch.title} hi={activeBranch.titleHi} />
                  <span className="text-xs font-normal text-slate-400">({activeBranch.leaves.length} Topics)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  <Bi en={activeBranch.description} hi={activeBranch.descriptionHi} />
                </p>
              </div>
            </div>

            {/* Quick Topic Chips & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Filter topic or concept..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 px-3 py-1.5 pl-8 rounded-lg bg-slate-900/90 border border-slate-700/70 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Icons.Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Topic quick jumps */}
              <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto">
                {activeBranch.leaves.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollToLeaf(l.id)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 transition-colors whitespace-nowrap truncate max-w-[140px]"
                    title={l.title}
                  >
                    #{l.title}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================================
            MAIN STUDY CANVAS (FULL-WIDTH GRID - NO WASTED SPACE!)
        ==================================================================== */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 study-content-area relative z-10">
          
          {filteredLeaves.length === 0 ? (
            <div className="text-center py-16 bg-[#0e1628] rounded-2xl border border-slate-800 p-8">
              <Icons.FileQuestion className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-200">No matching topic found</h3>
              <p className="text-sm text-slate-400 mt-1">Try clearing your search keyword &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredLeaves.map((leaf, index) => (
                <LeafCard 
                  key={leaf.id} 
                  leaf={leaf} 
                  index={index} 
                  onImageClick={(src) => setSelectedImageModal(src)}
                />
              ))}
            </div>
          )}

          {/* Bottom Watermark & Attribution Footer */}
          <footer className="mt-16 pt-8 pb-12 border-t border-slate-800/80 text-center relative">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Icons.ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>GS BY DURGESH PANDEY SIR</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>SSC CGL / CHSL / MTS / CPO Bilingual Master Guide</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-500 font-mono">Exam Orientation 2026</span>
            </div>
          </footer>

        </main>

        {/* ====================================================================
            FLOATING CORNER WATERMARK BADGE
            Always visible, unobtrusive, highly professional
        ==================================================================== */}
        <div className="fixed bottom-3 right-3 z-20 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-full bg-[#0d1627]/90 border border-amber-500/40 text-amber-300 text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <Icons.Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GS BY DURGESH PANDEY SIR</span>
          </div>
        </div>

        {/* ====================================================================
            ALL CHAPTERS & TOPICS SLIDE-OUT DRAWER
        ==================================================================== */}
        {showChapterDrawer && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
              onClick={() => setShowChapterDrawer(false)}
            />

            {/* Slide-out Panel */}
            <div className="relative w-full max-w-md bg-[#0b1120] border-r border-slate-800 h-full p-6 overflow-y-auto shadow-2xl flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Icons.BookOpen className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Course Syllabus & Chapters</h3>
                </div>
                <button 
                  onClick={() => setShowChapterDrawer(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-amber-400 font-bold mb-3 flex items-center gap-1.5">
                <Icons.Award className="w-4 h-4" />
                <span>GS BY DURGESH PANDEY SIR</span>
              </div>

              <div className="space-y-4 flex-1">
                {lectureData.branches.map((branch) => (
                  <div key={branch.id} className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3.5">
                    <button
                      onClick={() => {
                        setActiveBranchId(branch.id);
                        setShowChapterDrawer(false);
                      }}
                      className="w-full text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400">
                          <Icon name={branch.iconName} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                            <Bi en={branch.title} hi={branch.titleHi} />
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {branch.leaves.length} study topics
                          </div>
                        </div>
                      </div>
                      <Icons.ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </button>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 pl-8 space-y-1">
                      {branch.leaves.map((leaf) => (
                        <button
                          key={leaf.id}
                          onClick={() => {
                            setActiveBranchId(branch.id);
                            setShowChapterDrawer(false);
                            setTimeout(() => scrollToLeaf(leaf.id), 100);
                          }}
                          className="w-full text-left text-xs text-slate-400 hover:text-cyan-300 py-1 transition-colors block truncate"
                        >
                          • {leaf.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Optional Image Preview Lightbox */}
        {selectedImageModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImageModal(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-2xl">
              <img 
                src={selectedImageModal} 
                alt="Enlarged Diagram" 
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
              <div className="p-3 text-center text-xs text-slate-400 flex items-center justify-between">
                <span className="text-amber-400 font-bold">GS BY DURGESH PANDEY SIR</span>
                <span>Click anywhere to close</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Download Button (Sticky Quick Access) */}
        <button
          type="button"
          onClick={() => setIsDownloadModalOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-950/70 border border-blue-400/40 hover:scale-105 active:scale-95 transition-all no-print group"
          title="Download complete notes for offline study with watermark"
        >
          <Icons.Download className="w-4 h-4 text-cyan-200 group-hover:translate-y-0.5 transition-transform" />
          <span>Offline Guide</span>
          <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black tracking-wide">PDF</span>
        </button>

        {/* Offline Download Modal */}
        <DownloadModal 
          isOpen={isDownloadModalOpen} 
          onClose={() => setIsDownloadModalOpen(false)} 
          data={lectureData} 
          currentLang={language} 
        />

        {/* ====================================================================
            PRINT-ONLY MASTER CONTAINER
            When user clicks Print to PDF, this renders the entire master study guide
            across all subjects with the official "GS BY DURGESH PANDEY SIR" watermark!
        ==================================================================== */}
        <div className="hidden print:block print-all-content p-6 text-slate-900 bg-white">
          <div className="print-header-watermark flex justify-between items-center border-b-2 border-slate-900 pb-3 mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">GS BY DURGESH PANDEY SIR</h1>
              <p className="text-xs font-semibold text-slate-600">Complete General Awareness Master Study Notes • Offline PDF Edition</p>
            </div>
            <div className="text-right text-xs text-slate-600">
              <div className="font-bold text-blue-800">SSC CGL / CHSL / MTS / GD</div>
              <div className="text-[10px] font-bold text-amber-600">WATERMARKED AUTHENTIC GUIDE</div>
            </div>
          </div>

          {lectureData.branches.map((branch, bIndex) => (
            <div key={branch.id} className={bIndex > 0 ? "print-page-break mt-8" : "mt-4"}>
              <div className="border-b-2 border-slate-400 pb-2 mb-4 flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-900">
                  {bIndex + 1}. {branch.title} / {branch.titleHi}
                </h2>
                <span className="text-xs font-bold text-slate-700">GS BY DURGESH PANDEY SIR</span>
              </div>
              <div className="space-y-6">
                {branch.leaves.map((leaf) => (
                  <div key={leaf.id} className="print-card-break border border-slate-300 rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-base text-blue-900">
                        {leaf.title} {leaf.titleHi ? `(${leaf.titleHi})` : ''}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-600">GS BY DURGESH PANDEY SIR</span>
                    </div>
                    <div className="text-xs leading-relaxed text-slate-800">
                      {typeof leaf.content === 'string' ? (
                        <Bi en={leaf.content} hi={leaf.contentHi as string} />
                      ) : (
                        leaf.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </LanguageContext.Provider>
  );
}

// ====================================================================
// LEAF CARD COMPONENT (DARK THEME WITH INTEGRATED CARD WATERMARK)
// ====================================================================
const LeafCard: React.FC<{ 
  leaf: Leaf; 
  index: number;
  onImageClick?: (src: string) => void;
}> = ({ leaf, index, onImageClick }) => {
  const isFullWidth = leaf.isChart || (typeof leaf.content === 'string' && leaf.content.length > 250);

  return (
    <div 
      id={`leaf-${leaf.id}`}
      className={`bg-[#0d1527] rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-800/90 hover:border-slate-700 transition-all relative overflow-hidden flex flex-col group ${
        isFullWidth ? 'lg:col-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Decorative vertical accent bar */}
      <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 opacity-90 group-hover:w-2 transition-all" />
      
      {/* Card Header: Title & Tags */}
      <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5 pl-2 sm:pl-3">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white flex items-center gap-2 sm:gap-2.5">
          <Icons.Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
          <Bi en={leaf.title} hi={leaf.titleHi} />
        </h3>

        {leaf.tags && (
          <div className="flex flex-wrap gap-1 justify-end">
            {leaf.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-slate-800/90 text-slate-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-md border border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="text-sm sm:text-base text-slate-200 leading-relaxed pl-2 sm:pl-3 flex-1">
        {typeof leaf.content === 'string' ? (
          <Bi en={leaf.content} hi={leaf.contentHi as string} />
        ) : (
          leaf.content
        )}
      </div>

      {/* Render Chart if applicable */}
      {leaf.isChart && <SectorChart />}

      {/* Render Mermaid Diagram if applicable */}
      {leaf.mermaidCode && (
        <MermaidChart 
          code={leaf.mermaidCode}
          codeHi={leaf.mermaidCodeHi}
          codeBi={leaf.mermaidCodeBi}
          id={`mermaid-${leaf.id}`} 
        />
      )}

      {/* Render Custom SVG or Visual if applicable */}
      {leaf.customVisual && (
        <div className="mt-4 sm:mt-5 pl-2 sm:pl-3">
          {leaf.customVisual}
        </div>
      )}

      {/* ====================================================================
          WATERMARK 2: INTEGRATED CARD STAMP
          Discreet, authentic, branded footer on every study note
      ==================================================================== */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pl-2 sm:pl-3 select-none">
        <span className="flex items-center gap-1.5 text-amber-400/90 font-bold uppercase tracking-wider">
          <Icons.ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          GS BY DURGESH PANDEY SIR
        </span>
        <span className="font-mono text-slate-400">
          SSC EXAM NOTES
        </span>
      </div>

    </div>
  );
};
