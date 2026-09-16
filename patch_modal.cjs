const fs = require('fs');
let code = fs.readFileSync('src/components/DownloadModal.tsx', 'utf8');

// Add import
code = code.replace("import { generateAndDownloadPdf } from '../utils/pdfGenerator';", 
`import { generateAndDownloadPdf } from '../utils/pdfGenerator';
import { generateAndDownloadPptx } from '../utils/pptxGenerator';`);

// Add handler
code = code.replace("const handleDownloadMasterPdf = async () => {", 
`const handleDownloadPptx = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setProgressPercent(2);
    setProgressStatus(\`Initializing \${selectedTheme === 'dark' ? 'Dark Theme' : 'Light Theme'} PPTX engine...\`);

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
      setSuccessMsg(\`Master PPTX (\${selectedTheme.toUpperCase()} theme, \${selectedLang.toUpperCase()}) successfully downloaded!\`);
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

  const handleDownloadMasterPdf = async () => {`);

// Add button
const pdfButtonPattern = `          <button
            type="button"
            id="download-master-pdf-button"
            onClick={handleDownloadMasterPdf}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 disabled:opacity-50 text-white font-bold border border-slate-700/80 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                <Icons.FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-[15px] sm:text-base font-bold text-slate-100">
                  <span>Download Complete Master PDF</span>
                </div>
                <div className="text-xs text-slate-400 font-normal">
                  All 22 Pages • Photos Embedded • Lossless Ultra-HD
                </div>
              </div>
            </div>
            <Icons.Download className="w-5 h-5 text-cyan-300 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
          </button>`;

const replacement = pdfButtonPattern + `

          {/* ACTION 1.5: EXPORT AS PPTX */}
          <button
            type="button"
            id="download-pptx-button"
            onClick={handleDownloadPptx}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 disabled:opacity-50 text-white font-bold border border-slate-700/80 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30 transition-colors flex-shrink-0">
                <Icons.MonitorPlay className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-[15px] sm:text-base font-bold text-slate-100">
                  <span>Export as Presentation (.pptx)</span>
                </div>
                <div className="text-xs text-slate-400 font-normal">
                  Slides format • Watermarked • Images & Content preserved
                </div>
              </div>
            </div>
            <Icons.Download className="w-5 h-5 text-orange-400 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
          </button>`;

code = code.replace(pdfButtonPattern, replacement);

fs.writeFileSync('src/components/DownloadModal.tsx', code);
