const fs = require('fs');
let code = fs.readFileSync('src/components/DownloadModal.tsx', 'utf8');

const pptxButton = `
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
`;

code = code.replace("<span>Download Complete Master PDF (.pdf)</span>", "<span>Download Complete Master PDF (.pdf)</span>");
code = code.replace(/<Icons\.Download className="w-5 h-5 text-cyan-300 group-hover:translate-y-0\.5 transition-transform flex-shrink-0" \/>\s*<\/button>/g, 
`<Icons.Download className="w-5 h-5 text-cyan-300 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
          </button>\n${pptxButton}`);

fs.writeFileSync('src/components/DownloadModal.tsx', code);
