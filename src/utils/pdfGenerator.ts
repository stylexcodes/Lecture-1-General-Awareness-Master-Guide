import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RootData, LanguageMode } from '../types';
import { preloadAllImages } from './imageLoader';

export interface PdfOptions {
  theme?: 'dark' | 'light';
}

/**
 * Generates and downloads a master study PDF formatted for A4 print.
 * Defaults to the Dark Theme requested by the user, with 100% complete
 * bilingual (English & Hindi) content, embedded images, and authentic watermarks.
 */
export async function generateAndDownloadPdf(
  data: RootData,
  lang: LanguageMode = 'bi',
  onProgress?: (percent: number, status: string) => void,
  options: PdfOptions = { theme: 'dark' }
): Promise<void> {
  const theme = options.theme || 'dark';
  const isDark = theme === 'dark';

  const updateProgress = (pct: number, msg: string) => {
    if (onProgress) onProgress(pct, msg);
  };

  updateProgress(5, 'Loading and optimizing study images for PDF...');
  const imageMap = await preloadAllImages((loaded, total, label) => {
    const pct = 5 + Math.round((loaded / total) * 20);
    updateProgress(pct, `Loading photo (${loaded}/${total}): ${label}...`);
  });

  updateProgress(26, `Constructing ${isDark ? 'Dark Theme' : 'Light Theme'} master A4 pages...`);

  // Create temporary offscreen mounting container
  const container = document.createElement('div');
  container.id = 'pdf-render-scratchpad';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '960px'; // High-Res A4 Canvas Base
  container.style.backgroundColor = isDark ? '#080c14' : '#ffffff';
  container.style.color = isDark ? '#f8fafc' : '#0f172a';
  container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  (container.style as any).webkitFontSmoothing = 'antialiased';
  (container.style as any).textRendering = 'optimizeLegibility';
  container.style.zIndex = '-1000';
  document.body.appendChild(container);

  try {
    const pagesHtml = buildMasterPagesHtml(data, lang, imageMap, isDark);
    container.innerHTML = pagesHtml;

    // Wait for fonts and high-resolution layout paint
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await new Promise((r) => setTimeout(r, 450));

    const pageElements = Array.from(container.querySelectorAll<HTMLElement>('.pdf-page-sheet'));
    const totalPages = pageElements.length;

    if (totalPages === 0) {
      throw new Error('No pages generated for PDF');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = 210; // mm
    const pdfHeight = 297; // mm

    for (let i = 0; i < totalPages; i++) {
      const pageEl = pageElements[i];
      const pageNum = i + 1;
      const progressPercent = 30 + Math.round((i / totalPages) * 65);
      updateProgress(progressPercent, `Rendering Page ${pageNum} of ${totalPages} (${isDark ? 'Dark Theme' : 'Light Theme'} Ultra-Sharp)...`);

      // Lossless high-DPI 2.8x rasterization scale (~2688 x 3802 px = 350+ DPI razor-sharp print quality)
      const canvas = await html2canvas(pageEl, {
        scale: 2.8,
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDark ? '#080c14' : '#ffffff',
        logging: false,
        windowWidth: 960,
        imageTimeout: 15000
      });

      // Lossless PNG format: Eliminates 100% of JPEG chroma artifacts, ringing, and fuzziness when zooming in
      const imgData = canvas.toDataURL('image/png');

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    updateProgress(98, 'Finalizing and saving PDF file...');
    const filename = `GS_By_Durgesh_Pandey_Sir_Master_Notes_${lang.toUpperCase()}_${theme.toUpperCase()}.pdf`;
    pdf.save(filename);

    updateProgress(100, 'Master PDF successfully downloaded!');
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Builds the complete A4 pages HTML structure with all chapters,
 * 100% complete bilingual text, tables, diagrams, and photos with watermarks.
 */
function buildMasterPagesHtml(
  data: RootData,
  lang: LanguageMode,
  imgMap: Map<string, string>,
  isDark: boolean
): string {
  const getImg = (url: string) => imgMap.get(url) || url;
  const isHi = lang === 'hi';
  const isEn = lang === 'en';

  // Styling tokens based on Dark vs Light theme
  const bgPage = isDark ? '#080c14' : '#ffffff';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#475569';
  const cardBg = isDark ? '#0e1626' : '#f8fafc';
  const cardBorder = isDark ? '#1e293b' : '#e2e8f0';
  const accentBorder = isDark ? '#38bdf8' : '#1e3a8a';
  const hiColor = isDark ? '#7dd3fc' : '#1d4ed8'; // Crisp sky-blue in dark, royal blue in light
  const watermarkColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(30, 58, 138, 0.045)';
  const boxAlt = isDark ? '#131d33' : '#eff6ff';
  const boxAltBorder = isDark ? '#1e293b' : '#bfdbfe';

  // 100% Bilingual string generator
  const t = (enText: string, hiText: string, inline = false) => {
    if (isHi) return hiText;
    if (isEn) return enText;
    if (inline) {
      return `<span>${enText}</span> <span style="color: ${hiColor}; font-weight: 500;">(${hiText})</span>`;
    }
    return `<div>${enText}</div><div style="color: ${hiColor}; font-size: 0.96em; margin-top: 3px; font-weight: 500;">${hiText}</div>`;
  };

  const headerWatermark = (subjectTitle: string, pageNum: number) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${accentBorder}; padding-bottom: 8px; margin-bottom: 14px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #000000; font-size: 16px; font-weight: 900; padding: 4px 12px; border-radius: 6px; letter-spacing: 0.05em;">GS BY DURGESH PANDEY SIR</span>
        <span style="font-size: 16.5px; font-weight: 800; color: ${isDark ? '#38bdf8' : '#1e3a8a'};">${subjectTitle}</span>
      </div>
      <div style="font-size: 15.5px; font-weight: 700; color: ${textMuted};">
        SSC CGL • CHSL • MTS • GD • State Exams • Page ${pageNum}
      </div>
    </div>
  `;

  const footerWatermark = (pageNum: number) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid ${cardBorder}; padding-top: 8px; margin-top: 14px; font-size: 11.5px; color: ${textMuted}; font-weight: 700;">
      <span style="color: #fbbf24; font-size: 15.5px;">⭐ AUTHENTIC MASTER STUDY MATERIAL • GS BY DURGESH PANDEY SIR (BILINGUAL)</span>
      <span style="color: #38bdf8; font-weight: 800; font-size: 15.5px;">PAGE ${pageNum} OF 22</span>
    </div>
  `;

  const watermarkStyle = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-32deg);
    font-size: 64px;
    font-weight: 900;
    color: ${watermarkColor};
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
    letter-spacing: 0.12em;
    user-select: none;
  `;

  const pageWrapper = (content: string, pageNum: number, subjectTitle: string) => `
    <div class="pdf-page-sheet" style="
      width: 960px;
      height: 1358px;
      max-height: 1358px;
      padding: 26px 36px;
      box-sizing: border-box;
      background: ${bgPage};
      color: ${textMain};
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    ">
      <div style="${watermarkStyle}">GS BY DURGESH PANDEY SIR</div>
      <div style="position: relative; z-index: 1; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div>
          ${headerWatermark(subjectTitle, pageNum)}
          ${content}
        </div>
        ${footerWatermark(pageNum)}
      </div>
    </div>
  `;

  // Page Array
  const pages: string[] = [];
  let p = 1;

  // ==========================================
  // PAGE 1: Master Cover Page & Index (Dark Theme)
  // ==========================================
  pages.push(`
    <div class="pdf-page-sheet" style="
      width: 960px;
      height: 1358px;
      max-height: 1358px;
      padding: 44px 48px;
      box-sizing: border-box;
      background: linear-gradient(180deg, #050811 0%, #0d1527 100%);
      color: #f8fafc;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    ">
      <div style="position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.035); white-space: nowrap; letter-spacing: 0.15em;">
        GS BY DURGESH PANDEY SIR
      </div>

      <div style="position: relative; z-index: 1;">
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fef08a; font-size: 15.5px; font-weight: 800; padding: 5px 18px; border-radius: 9999px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 18px;">
          ⭐ OFFICIAL MASTER STUDY GUIDE • 100% EXAM ORIENTED
        </div>
        <h1 style="font-size: 38px; font-weight: 900; color: #ffffff; line-height: 1.2; margin-bottom: 8px;">
          GS BY DURGESH PANDEY SIR
        </h1>
        <h2 style="font-size: 21px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">
          ${t('General Awareness Complete Notes (Bilingual English & हिंदी)', 'सामान्य अध्ययन संपूर्ण नोट्स (द्विभाषी अंग्रेजी एवं हिंदी)')}
        </h2>
        <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 24px;">
          Target Exams: SSC CGL • CHSL • MTS • CPO • GD • State PCS • Railways NTPC
        </p>

        <!-- Subjects Grid Index -->
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 22px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">
            📚 Complete Syllabus Index (${t('Table of Contents', 'विषय सूची', true)})
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14.5px;">
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">1. Indian Polity (राजव्यवस्था):</strong> Constituent Assembly, Cabinet Mission, Drafting Committee, Organs of Govt.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">2. Geography & Space (भूगोल):</strong> Universe Theories, Solar System, Planets, Latitudes, Longitudes & Zones.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">3. History (इतिहास):</strong> 3-Age System, Ancient Pottery (OCP/BRW/PGW/NBPW), Delhi Sultanate Dynasties.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">4. Science (विज्ञान):</strong> Cell Biology, Organelles, Solutions Tonicity, 5 States of Matter, Boson Physics.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">5. Economics (अर्थशास्त्र):</strong> Micro vs Macro, Sectors of Economy (1st-5th), 8 Collar Jobs Breakdown.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">6. Art & Culture (कला एवं संस्कृति):</strong> 8 Classical Dances, 6 Kathakali Makeup Types, Folk Dances Tricks, Festivals.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">7. Miscellaneous (विविध):</strong> Badminton Rules & Cups, Great Literature Authors, Top Govt Schemes.
            </div>
            <div style="background: rgba(30, 41, 59, 0.8); padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8;">
              <strong style="color: #ffffff;">8. Practice MCQs (अभ्यास प्रश्न):</strong> 12 High-Yield Previous Years Exam Questions with Bilingual Solutions.
            </div>
          </div>
        </div>

        <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 14px 18px; font-size: 16px; color: #fde047; line-height: 1.6;">
          💡 <strong>Key Features:</strong> ${t(
            'Includes authentic photos, mnemonic memory tricks, flowcharts, tables, and 100% line-by-line bilingual explanations directly matching Durgesh Pandey Sir master lectures.',
            'प्रामाणिक तस्वीरें, स्मृति ट्रिक्स, फ्लोचार्ट, तालिकाएं और दुर्गेश पांडेय सर के मास्टर लेक्चर्स के अनुरूप 100% पंक्ति-दर-पंक्ति द्विभाषी व्याख्या शामिल।'
          )}
        </div>
      </div>

      <div style="position: relative; z-index: 1; border-top: 1px solid #334155; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #94a3b8;">
        <span style="font-weight: 700; color: #fbbf24;">⭐ COMPLETE GENERAL AWARENESS MASTER NOTES</span>
        <span style="font-weight: 700; color: #38bdf8;">BILINGUAL COMPREHENSIVE EDITION</span>
      </div>
    </div>
  `);
  p++;

  // ==========================================
  // PAGE 2: POLITY - Constituent Assembly & Photo
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('1. Constituent Assembly of India', '1. भारत की संविधान सभा')}
    </h2>
    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; margin-bottom: 14px;">
      <div>
        <ul style="margin: 0; padding-left: 16px; font-size: 16px; line-height: 1.6; color: ${textMain};">
          <li style="margin-bottom: 5px;"><strong>1934:</strong> ${t('Idea first put forward by M.N. Roy.', 'एम.एन. रॉय द्वारा पहली बार विचार प्रस्तुत किया गया।')}</li>
          <li style="margin-bottom: 5px;"><strong>1935:</strong> ${t('INC officially demanded a Constituent Assembly.', 'भारतीय राष्ट्रीय कांग्रेस ने आधिकारिक तौर पर संविधान सभा की मांग की।')}</li>
          <li style="margin-bottom: 5px;"><strong>1940:</strong> ${t('August Offer accepted the demand in principle.', 'अगस्त प्रस्ताव ने सैद्धांतिक रूप से मांग स्वीकार की।')}</li>
          <li style="margin-bottom: 5px;"><strong>Cabinet Mission Plan (1946):</strong> ${t('Sent by British PM Clement Attlee. 3 Members: Pethick Lawrence (Chairman), Sir Stafford Cripps, A.V. Alexander.', 'ब्रिटिश पीएम क्लेमेंट एटली द्वारा भेजा गया। 3 सदस्य: पेथिक लॉरेंस (अध्यक्ष), सर स्टैफोर्ड क्रिप्स, ए.वी. अलेक्जेंडर।')}</li>
          <li style="margin-bottom: 5px;"><strong>Total Seats:</strong> ${t('389 seats (296 British India + 93 Princely States).', 'कुल 389 सीटें (296 ब्रिटिश भारत + 93 देशी रियासतें)।')}</li>
          <li style="margin-bottom: 5px;"><strong>Election Results:</strong> ${t('Congress won 208, Muslim League 73, Independents 15.', 'कांग्रेस को 208, मुस्लिम लीग को 73, निर्दलीयों को 15 सीटें मिलीं।')}</li>
          <li style="margin-bottom: 5px;"><strong>First Meeting:</strong> ${t('9 December 1946, Dr. Sachchidananda Sinha elected temporary President.', '9 दिसंबर 1946, डॉ. सच्चिदानंद सिन्हा अस्थायी अध्यक्ष चुने गए।')}</li>
          <li style="margin-bottom: 5px;"><strong>Permanent President:</strong> ${t('11 December 1946, Dr. Rajendra Prasad elected President; H.C. Mukherjee & V.T. Krishnamachari as Vice-Presidents.', '11 दिसंबर 1946, डॉ. राजेंद्र प्रसाद स्थायी अध्यक्ष चुने गए; एच.सी. मुखर्जी और वी.टी. कृष्णामाचारी उपाध्यक्ष बने।')}</li>
        </ul>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg}; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
          <img src="${getImg('/Making of Indian constitution_.png')}" style="width: 100%; height: 270px; object-fit: contain; border-radius: 8px; display: block;" alt="Making of Indian Constitution" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Making of Indian Constitution</div>
        </div>
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px;">
      <strong style="color: #fbbf24; font-size: 14.5px;">🎯 ${t('Cabinet Mission Plan Seat Breakdown', 'कैबिनेट मिशन योजना सीटों का विवरण')}:</strong>
      <div style="margin-top: 6px; line-height: 1.6;">
        ${t(
          '• 296 British Provinces: 292 from 11 Governor\'s Provinces + 4 from Chief Commissioner\'s Provinces (Delhi, Ajmer-Merwara, Coorg, British Baluchistan).',
          '• 296 ब्रिटिश प्रांत: 11 गवर्नर प्रांतों से 292 + 4 मुख्य आयुक्त प्रांतों से (दिल्ली, अजमेर-मेरवाड़ा, कुर्ग, ब्रिटिश बलूचिस्तान)।'
        )}<br/>
        ${t(
          '• Representation was based on population (roughly 1 seat per 1 million / 10 Lakh population).',
          '• सीटों का आवंटन जनसंख्या के आधार पर था (प्रत्येक 10 लाख जनसंख्या पर लगभग 1 सीट)।'
        )}
      </div>
    </div>
  `, p++, 'Polity & Constitution'));

  // ==========================================
  // PAGE 3: POLITY - Drafting Committee & Organs of Government (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('2. Drafting Committee & Organs of Government', '2. प्रारूप समिति और सरकार के अंग')}
    </h2>

    <div style="background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 16px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #fbbf24; margin-bottom: 8px;">
        📌 ${t('Drafting Committee (Setup: 29 August 1947)', 'प्रारूप समिति (गठन: 29 अगस्त 1947)')}
      </h3>
      <div style="line-height: 1.65;">
        <div style="margin-bottom: 5px;">
          • <strong>${t('Constitutional Advisor', 'संवैधानिक सलाहकार')}:</strong> ${t('Sir B.N. Rau (Benegal Narsing Rau).', 'सर बी.एन. राव (बेनेगल नरसिंह राव)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Chairman', 'अध्यक्ष')}:</strong> ${t('Dr. B.R. Ambedkar (Father of Indian Constitution).', 'डॉ. बी.आर. अंबेडकर (भारतीय संविधान के जनक)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('7 Members', '7 सदस्य')}:</strong> ${t(
            'Dr. B.R. Ambedkar, Alladi Krishnaswamy Iyer, N. Gopalaswami Ayyangar, K.M. Munshi, Mohammad Saadulla, B.L. Mitter (replaced by N. Madhava Rau due to health), D.P. Khaitan (died 1948, replaced by T.T. Krishnamachari).',
            'डॉ. बी.आर. अंबेडकर, अल्लादि कृष्णास्वामी अय्यर, एन. गोपालस्वामी अय्यंगार, के.एम. मुंशी, मोहम्मद सादुल्ला, बी.एल. मित्तर (स्वास्थ्य कारणों से एन. माधव राव आए), डी.पी. खेतान (1948 में निधन, टी.टी. कृष्णामाचारी आए)।'
          )}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Time Taken', 'लगा कुल समय')}:</strong> ${t('2 Years, 11 Months, and 18 Days (11 Sessions, 165 days of sittings).', '2 वर्ष, 11 माह और 18 दिन (11 सत्र, 165 दिन बैठकें)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Adopted', 'संविधान अंगीकृत')}:</strong> ${t('26 November 1949 (celebrated as Constitution Day / Samvidhan Divas).', '26 नवंबर 1949 (संविधान दिवस के रूप में मनाया जाता है)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Enforced', 'संविधान लागू')}:</strong> ${t('26 January 1950 (Republic Day, chosen to commemorate Purna Swaraj Day of 1930).', '26 जनवरी 1950 (गणतंत्र दिवस, 1930 के पूर्ण स्वराज दिवस की स्मृति में)।')}
        </div>
        <div>
          • <strong>${t('Calligrapher & Artists', 'सुलेखक एवं कलाकार')}:</strong> ${t(
            'Prem Behari Narain Raizada (Original handwritten in English italic style). Hindi version by Vasant Krishna Vaidya. Page decorations by Nandalal Bose & Beohar Rammanohar Sinha (Santiniketan).',
            'प्रेम बिहारी नारायण रायजादा (मूल संविधान अंग्रेजी इटैलिक शैली में हस्तलिखित)। हिंदी सुलेखन: वसंत कृष्ण वैद्य। पृष्ठ सज्जा: नंदलाल बोस एवं व्यौहार राममनोहर सिन्हा (शांतिनिकेतन)।'
          )}
        </div>
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px; margin-top: 8px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #38bdf8; margin-bottom: 10px; text-align: center;">
        🏛️ ${t('Three Organs of Government', 'सरकार के तीन प्रमुख अंग')}
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; font-size: 15.5px;">
        <div style="background: ${cardBg}; border: 1px solid #38bdf8; border-radius: 8px; padding: 12px;">
          <strong style="color: #38bdf8; display: block; margin-bottom: 5px; font-size: 14px;">1. ${t('Legislature', 'विधायिका')}</strong>
          <span>${t(
            'Role: Law Making. Parliament (President, Lok Sabha, Rajya Sabha) and State Legislatures.',
            'कार्य: कानून बनाना। संसद (राष्ट्रपति, लोकसभा, राज्यसभा) एवं राज्य विधानमंडल।'
          )}</span>
        </div>
        <div style="background: ${cardBg}; border: 1px solid #10b981; border-radius: 8px; padding: 12px;">
          <strong style="color: #10b981; display: block; margin-bottom: 5px; font-size: 14px;">2. ${t('Executive', 'कार्यपालिका')}</strong>
          <span>${t(
            'Role: Law Enforcement. President, Vice President, Prime Minister, Council of Ministers, Attorney General.',
            'कार्य: कानून लागू करना। राष्ट्रपति, उपराष्ट्रपति, प्रधानमंत्री, मंत्रिपरिषद, महान्यायवादी।'
          )}</span>
        </div>
        <div style="background: ${cardBg}; border: 1px solid #f43f5e; border-radius: 8px; padding: 12px;">
          <strong style="color: #f43f5e; display: block; margin-bottom: 5px; font-size: 14px;">3. ${t('Judiciary', 'न्यायपालिका')}</strong>
          <span>${t(
            'Role: Law Adjudication & Dispute Resolution. Supreme Court (Apex), High Courts, Subordinate Courts.',
            'कार्य: न्याय निर्णय एवं विवाद समाधान। सर्वोच्च न्यायालय (शीर्ष), उच्च न्यायालय, अधीनस्थ न्यायालय।'
          )}</span>
        </div>
      </div>
    </div>
  `, p++, 'Polity & Constitution'));

  // ==========================================
  // PAGE 4: GEOGRAPHY - Universe Theories & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('3. Origin of Universe & Astronomical Theories', '3. ब्रह्मांड की उत्पत्ति और प्रमुख खगोलीय सिद्धांत')}
    </h2>
    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; margin-bottom: 14px;">
      <div>
        <ul style="margin: 0; padding-left: 16px; font-size: 16px; line-height: 1.6; color: ${textMain};">
          <li style="margin-bottom: 5px;"><strong>Cosmology:</strong> ${t('Scientific study of the universe as a whole.', 'संपूर्ण ब्रह्मांड का वैज्ञानिक अध्ययन।')}</li>
          <li style="margin-bottom: 5px;"><strong>Age of Universe:</strong> ${t('Approximately 13.8 Billion years.', 'लगभग 13.8 बिलियन (अरब) वर्ष।')}</li>
          <li style="margin-bottom: 5px;"><strong>Age of Solar System:</strong> ${t('Approximately 4.8 Billion years.', 'लगभग 4.8 बिलियन वर्ष।')}</li>
          <li style="margin-bottom: 5px;"><strong>Big Bang Theory:</strong> ${t('Georges Lemaître (1931). Confirmed by Edwin Hubble (expanding universe via redshift in 1929). Singular point explosion.', 'जॉर्ज लेमैत्रे (1931)। एडविन हबल द्वारा विस्तारित ब्रह्मांड की पुष्टि। विलक्षण बिंदु से विस्तार।')}</li>
          <li style="margin-bottom: 5px;"><strong>Nebular Hypothesis (1755):</strong> ${t('Formulated by Immanuel Kant, mathematically revised by Pierre-Simon Laplace in 1796.', 'इमैनुएल कांट द्वारा प्रतिपादित, 1796 में लाप्लास द्वारा संशोधित।')}</li>
          <li style="margin-bottom: 5px;"><strong>Planetesimal Theory (1905):</strong> ${t('Given by Thomas Chamberlin and Forest Ray Moulton.', 'थॉमस चेम्बरलेन और फॉरेस्ट रे मौलटन द्वारा प्रतिपादित।')}</li>
          <li style="margin-bottom: 5px;"><strong>Steady State Theory:</strong> ${t('Fred Hoyle, Hermann Bondi, and Thomas Gold (universe has no beginning or end).', 'फ्रेड हॉयल, हरमन बोंडी और थॉमस गोल्ड द्वारा (ब्रह्मांड का न आदि है न अंत)।')}</li>
        </ul>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg}; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
          <img src="${getImg('/Organ of Universe Theories_.png')}" style="width: 100%; height: 270px; object-fit: contain; border-radius: 8px; display: block;" alt="Universe Theories" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Origin of Universe Theories</div>
        </div>
      </div>
    </div>

    <div style="background: ${cardBg}; border: 1px solid #f59e0b; border-radius: 10px; padding: 14px 18px; font-size: 16px; color: #fef08a; line-height: 1.6;">
      <strong style="font-size: 14.5px;">🌟 ${t('Important Exam Fact Units', 'परीक्षा उपयोगी महत्वपूर्ण इकाइयाँ')}:</strong><br/>
      ${t(
        '• 1 Light Year = Distance traveled by light in 1 year = 9.46 × 10¹² km (9.46 × 10¹⁵ meters). Speed of light = 3 × 10⁸ m/s.',
        '• 1 प्रकाश वर्ष = प्रकाश द्वारा 1 वर्ष में तय दूरी = 9.46 × 10¹² किमी (9.46 × 10¹⁵ मीटर)। प्रकाश की चाल = 3 × 10⁸ मी/सेकंड।'
      )}<br/>
      ${t(
        '• 1 Astronomical Unit (AU) = Average distance between Sun & Earth = 1.496 × 10⁸ km (~150 Million km).',
        '• 1 खगोलीय इकाई (AU) = सूर्य और पृथ्वी के बीच औसत दूरी = 1.496 × 10⁸ किमी (लगभग 15 करोड़ किमी)।'
      )}
    </div>
  `, p++, 'Geography & Space'));

  // ==========================================
  // PAGE 5: GEOGRAPHY - Solar System & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('4. Solar System & Planetary Data', '4. सौर मंडल और ग्रहीय आंकड़े')}
    </h2>
    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; margin-bottom: 12px;">
      <div>
        <div style="font-size: 16px; line-height: 1.6; color: ${textMain}; background: ${cardBg}; padding: 12px 14px; border-radius: 10px; border: 1px solid ${cardBorder}; margin-bottom: 10px;">
          <strong style="color: #fbbf24; font-size: 14px;">☀️ ${t('The Sun', 'सूर्य')}:</strong><br/>
          • ${t('Distance from Earth: 14.96 Crore km (~150 Million km).', 'पृथ्वी से दूरी: 14.96 करोड़ किमी (लगभग 150 मिलियन किमी)।')}<br/>
          • ${t('Light reaching Earth: 8 minutes 20 seconds (500 seconds).', 'प्रकाश पहुंचने का समय: 8 मिनट 20 सेकंड (500 सेकंड)।')}<br/>
          • ${t('Surface Temp: ~6,000°C; Core Temp: ~15 Million°C.', 'सतह तापमान: ~6,000°C; केंद्र (कोर) तापमान: ~1.5 करोड़°C।')}<br/>
          • ${t('Main gases: Hydrogen (~71%) & Helium (~26.5%) by nuclear fusion.', 'प्रमुख गैसें: हाइड्रोजन (~71%) एवं हीलियम (~26.5%) नाभिकीय संलयन द्वारा।')}
        </div>
        <div style="font-size: 16px; line-height: 1.6; color: ${textMain};">
          <strong style="color: #38bdf8; font-size: 14px;">🪐 ${t('Planets in Order from Sun', 'सूर्य से दूरी के क्रम में ग्रह')}:</strong><br/>
          1. <strong>${t('Mercury (बुध)', 'बुध')}:</strong> ${t('Smallest, closest, fastest revolution (88 days), no atmosphere.', 'सबसे छोटा, सूर्य के निकटतम, सबसे तेज परिक्रमा (88 दिन), वायुमंडल नहीं।')}<br/>
          2. <strong>${t('Venus (शुक्र)', 'शुक्र')}:</strong> ${t('Hottest (465°C due to 96% CO₂), Morning/Evening Star, Earth Twin, clockwise rotation.', 'सबसे गर्म (465°C, 96% CO₂), भोर/सांझ का तारा, पृथ्वी का जुड़वां, दक्षिणावर्त घूर्णन।')}<br/>
          3. <strong>${t('Earth (पृथ्वी)', 'पृथ्वी')}:</strong> ${t('Only planet with life, Blue Planet, axial tilt 23.5°.', 'जीवन वाला एकमात्र ग्रह, नीला ग्रह, अक्षीय झुकाव 23.5°।')}<br/>
          4. <strong>${t('Mars (मंगल)', 'मंगल')}:</strong> ${t('Red Planet (Iron oxide), 2 moons (Phobos & Deimos), Olympus Mons volcano.', 'लाल ग्रह (आयरन ऑक्साइड), 2 उपग्रह (फोबोस व डीमॉस), ओलंपस मॉन्स ज्वालामुखी।')}<br/>
          <em>--- ${t('Asteroid Belt (क्षुद्रग्रह पेटी) between Mars & Jupiter', 'मंगल और बृहस्पति के बीच क्षुद्रग्रह पेटी')} ---</em><br/>
          5. <strong>${t('Jupiter (बृहस्पति)', 'बृहस्पति')}:</strong> ${t('Largest planet, fastest rotation (9.9 hrs), Ganymede moon.', 'सबसे बड़ा ग्रह, सबसे तेज घूर्णन (9.9 घंटे), गैनीमीड सबसे बड़ा उपग्रह।')}<br/>
          6. <strong>${t('Saturn (शनि)', 'शनि')}:</strong> ${t('Spectacular rings, Titan moon, least density (floats on water).', 'भव्य वलय प्रणाली, टाइटन उपग्रह, न्यूनतम घनत्व (पानी पर तैर सकता है)।')}<br/>
          7. <strong>${t('Uranus (अरुण)', 'अरुण')}:</strong> ${t('Rolling planet (98° tilt), green (methane), clockwise rotation.', 'लेटा हुआ ग्रह (98° झुकाव), हरा रंग (मीथेन), दक्षिणावर्त घूर्णन।')}<br/>
          8. <strong>${t('Neptune (वरुण)', 'वरुण')}:</strong> ${t('Farthest, coldest gas giant, slowest revolution (165 yrs).', 'सबसे दूर, सबसे ठंडा गैसीय दानव, सबसे धीमी परिक्रमा (165 वर्ष)।')}
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg}; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
          <img src="${getImg('/Solar System.png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Solar System" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Solar System Planetary Chart</div>
        </div>
      </div>
    </div>
  `, p++, 'Geography & Space'));

  // ==========================================
  // PAGE 6: GEOGRAPHY - Latitudes & Climate Zones (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('5. Earth Latitudes, Circles & Climate Zones', '5. पृथ्वी के अक्षांश, वृत्त एवं जलवायु कटिबंध')}
    </h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
      <div style="border: 1px solid ${cardBorder}; border-radius: 8px; padding: 6px; text-align: center; background: ${cardBg};">
        <img src="${getImg('/Line.png')}" style="width: 100%; height: 240px; object-fit: contain; display: block;" alt="Latitudes and Longitudes Grid" />
        <span style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px; display: block;">PHOTO: Earth Latitudes & Longitudes</span>
      </div>
      <div style="border: 1px solid ${cardBorder}; border-radius: 8px; padding: 6px; text-align: center; background: ${cardBg};">
        <img src="${getImg('/Important Lines.png')}" style="width: 100%; height: 240px; object-fit: contain; display: block;" alt="Important Latitudinal Lines" />
        <span style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px; display: block;">PHOTO: Important Latitudinal Lines & Zones</span>
      </div>
    </div>

    <div style="font-size: 16px; line-height: 1.6; color: ${textMain}; background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px;">
      <div style="margin-bottom: 8px;">
        • <strong>${t('Latitudes (Horizontal Lines)', 'अक्षांश रेखाएँ (क्षैतिज रेखाएँ)')}:</strong> ${t(
          'Total 181 parallels of latitude (including poles) and 179 latitude circles. Distance between two consecutive 1° latitudes = 111 km everywhere.',
          'कुल 181 अक्षांश समानांतर (ध्रुवों सहित) एवं 179 अक्षांश वृत्त। किन्हीं दो 1° अक्षांशों के मध्य दूरी सर्वत्र 111 किमी होती है।'
        )}
      </div>
      <div style="margin-bottom: 8px;">
        • <strong>${t('Equator (0° Latitude)', 'भूमध्य रेखा (0° अक्षांश)')}:</strong> ${t(
          'The Great Circle that divides the Earth into the Northern and Southern Hemispheres. Maximum diameter and circumference (~40,075 km).',
          'महान वृत्त जो पृथ्वी को उत्तरी और दक्षिणी गोलार्धों में विभाजित करता है। अधिकतम व्यास एवं परिधि (~40,075 किमी)।'
        )}
      </div>
      <div style="margin-bottom: 8px;">
        • <strong>${t('Tropic of Cancer (23.5° N)', 'कर्क रेखा (23.5° उत्तरी अक्षांश)')}:</strong> ${t(
          'Passes through 8 Indian States: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram. Famous Mnemonic Trick: "मित्र पर गमछा झार" (मि-मिजोरम, त्र-त्रिपुरा, प-प.बंगाल, र-राजस्थान, ग-गुजरात, म-म.प्र., छा-छत्तीसगढ़, झार-झारखंड). Mahi River in India cuts Tropic of Cancer twice.',
          'भारत के 8 राज्यों से गुजरती है: गुजरात, राजस्थान, म.प्र., छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम। प्रसिद्ध ट्रिक: "मित्र पर गमछा झार"। भारत की माही नदी कर्क रेखा को दो बार काटती है।'
        )}
      </div>
      <div style="margin-bottom: 8px;">
        • <strong>${t('Tropic of Capricorn (23.5° S)', 'मकर रेखा (23.5° दक्षिणी अक्षांश)')}:</strong> ${t(
          'Southern boundary of Torrid zone in Southern Hemisphere. Limpopo River in Africa crosses Capricorn twice.',
          'दक्षिणी गोलार्ध में उष्णकटिबंधीय क्षेत्र की सीमा। अफ्रीका की लिम्पोपो नदी मकर रेखा को दो बार काटती है।'
        )}
      </div>
      <div>
        • <strong>${t('Earth Climate Heat Zones', 'पृथ्वी के प्रमुख ताप कटिबंध')}:</strong> ${t(
          '1. Torrid Zone (उष्णकटिबंध): Between 23.5° N & 23.5° S, receives vertical sunrays year-round. 2. Temperate Zones (समशीतोष्ण): Between 23.5° & 66.5° (N/S), moderate temperature. 3. Frigid Zones (शीत कटिबंध): 66.5° to 90° Poles, extremely cold perpetual ice.',
          '1. उष्णकटिबंध: 23.5° उ. से 23.5° द. के मध्य, वर्षभर लंबवत सूर्यकिरणें। 2. समशीतोष्ण कटिबंध: 23.5° से 66.5° (उ./द.) मध्यम तापमान। 3. शीत कटिबंध: 66.5° से 90° ध्रुवों तक अत्यधिक शीत।'
        )}
      </div>
    </div>
  `, p++, 'Geography & Space'));

  // ==========================================
  // PAGE 7: GEOGRAPHY - Longitudes, GMT, IST & Date Line (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('6. Longitudes, Prime Meridian (GMT), IST & Date Line', '6. देशांतर, प्रधान मध्याह्न (GMT), IST और अंतर्राष्ट्रीय तिथि रेखा')}
    </h2>
    <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; text-align: center; background: ${cardBg}; margin-bottom: 14px;">
      <img src="${getImg('/International Date Line.png')}" style="width: 100%; height: 275px; object-fit: contain; display: block;" alt="International Date Line Map" />
      <span style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px; display: block;">
        PHOTO: 180° International Date Line (Bering Strait, Pacific Ocean Deviation)
      </span>
    </div>

    <div style="font-size: 16px; line-height: 1.6; color: ${textMain}; background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px;">
      <div style="margin-bottom: 8px;">
        • <strong>${t('Longitudes (Meridians - Vertical)', 'देशांतर रेखाएँ (लंबवत रेखाएँ)')}:</strong> ${t(
          'Total 360 meridians. All longitudes are great semi-circles connecting North & South Poles. Distance between longitudes is maximum at Equator = 111.32 km, and converges to 0 km at the Poles. 1° of longitude = 4 minutes of time.',
          'कुल 360 देशांतर। सभी देशांतर उत्तरी और दक्षिणी ध्रुवों को मिलाने वाले अर्धवृत्त हैं। भूमध्य रेखा पर अधिकतम दूरी = 111.32 किमी, जो ध्रुवों पर घटकर 0 हो जाती है। 1° देशांतर = 4 मिनट का समय अंतराल।'
        )}
      </div>
      <div style="margin-bottom: 8px;">
        • <strong>${t('Prime Meridian (0° Longitude)', 'प्रधान मध्याह्न रेखा (0° देशांतर)')}:</strong> ${t(
          'Passes through Royal Astronomical Observatory at Greenwich (London, UK). Divides Earth into Eastern and Western Hemispheres and serves as Universal Time reference (GMT / UTC).',
          'रॉयल वेधशाला ग्रीनविच (लंदन) से होकर गुजरती है। पृथ्वी को पूर्वी एवं पश्चिमी गोलार्ध में विभाजित करती है तथा विश्व मानक समय (GMT/UTC) का आधार है।'
        )}
      </div>
      <div style="margin-bottom: 8px;">
        • <strong>${t('Indian Standard Time (IST - 82.5° E)', 'भारतीय मानक समय (IST - 82.5° पूर्वी देशांतर)')}:</strong> ${t(
          'Passes through Mirzapur / Shankargarh near Prayagraj (UP). IST is exactly +5 Hours 30 Minutes ahead of GMT (82.5° × 4 min = 330 min = 5h 30m). Passes through 5 States: Uttar Pradesh, Madhya Pradesh, Chhattisgarh, Odisha, Andhra Pradesh (Trick: "उमा छत से उड़ी आंधी में").',
          'मिर्जापुर / शंकरगढ़ (प्रयागराज, उ.प्र.) से गुजरती है। IST ग्रीनविच से ठीक +5 घंटे 30 मिनट आगे है (82.5° × 4 मिनट = 330 मिनट = 5 घंटे 30 मिनट)। 5 राज्यों से गुजरती है: उ.प्र., म.प्र., छत्तीसगढ़, ओडिशा, आंध्र प्रदेश।'
        )}
      </div>
      <div>
        • <strong>${t('International Date Line (IDL - 180° Meridian)', 'अंतर्राष्ट्रीय तिथि रेखा (IDL - 180° देशांतर)')}:</strong> ${t(
          'Zigzag line passing through Bering Strait in Pacific Ocean. Deviated to prevent dividing island nations (Siberia/Alaska, Kiribati, Fiji, Tonga). Crossing West to East = Gain 1 day (repeat date). Crossing East to West = Lose 1 day (advance date).',
          'प्रशांत महासागर में बेरिंग जलडमरूमध्य से गुजरने वाली टेढ़ी-मेढ़ी रेखा। द्वीप राष्ट्रों (साइबेरिया/अलास्का, किरिबाती, फिजी, टोंगा) में दो तारीखों से बचने हेतु विचलित की गई। पश्चिम से पूर्व जाने पर 1 दिन का लाभ (तारीख दोहराई जाती है), पूर्व से पश्चिम जाने पर 1 दिन का नुकसान होता है।'
        )}
      </div>
    </div>
  `, p++, 'Geography & Space'));

  // ==========================================
  // PAGE 8: HISTORY - 3-Age System & Ancient Pottery (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('7. Ancient Eras & Pottery Timeline', '7. प्राचीन काल और मृद्भाण्ड कालक्रम')}
    </h2>

    <div style="background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 16px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #fbbf24; margin-bottom: 8px;">
        🏛️ ${t("C.J. Thomsen's 3-Age System (1836 - Copenhagen Museum)", 'सी.जे. थॉमसन का त्रिकाल विभाजन (1836 - कोपेनहेगन संग्रहालय)')}
      </h3>
      <div style="line-height: 1.65;">
        ${t(
          'Christian Jürgensen Thomsen classified human prehistory based on tool manufacturing materials:',
          'क्रिश्चियन जुर्गेंसन थॉमसन ने औजारों की निर्माण सामग्री के आधार पर प्रागैतिहासिक काल को तीन भागों में बांटा:'
        )}<br/>
        1. <strong>${t('Stone Age (पाषाण काल)', 'पाषाण काल')}:</strong> ${t('Paleolithic (Hunter-Gatherer), Mesolithic (Microlith tools, animal domestication), Neolithic (Agriculture, wheel invented).', 'पुरापाषाण (शिकारी), मध्यपाषाण (सूक्ष्म पाषाण औजार, पशुपालन), नवपाषाण (कृषि, पहिये का आविष्कार)।')}<br/>
        2. <strong>${t('Bronze Age (कांस्य काल)', 'कांस्य काल')}:</strong> ${t('Indus Valley Civilization / Harappan Culture (Alloy of Copper + Tin).', 'सिंधु घाटी सभ्यता / हड़प्पा संस्कृति (तांबा + टिन का मिश्रधातु)।')}<br/>
        3. <strong>${t('Iron Age (लौह काल)', 'लौह काल')}:</strong> ${t('Vedic & Mahajanapada Period (First iron found at Atranjikhera, UP).', 'वैदिक एवं महाजनपद काल (भारत में प्रथम लौह साक्ष्य: अतरंजीखेड़ा, उ.प्र.)।')}
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #38bdf8; margin-bottom: 10px;">
        🏺 ${t('Chronology of Ancient Indian Pottery', 'प्राचीन भारतीय मृद्भाण्ड कालक्रम')}
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; line-height: 1.6;">
        <div style="background: ${cardBg}; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <strong style="color: #f59e0b; font-size: 14px;">1. ${t('OCP (Ochre Coloured Pottery)', 'गेरुआ मृद्भाण्ड संस्कृति')}</strong><br/>
          ${t('Associated with Late Harappan & Copper Hoard Culture.', 'उत्तर हड़प्पा एवं ताम्र निधान संस्कृति से संबंधित।')}
        </div>
        <div style="background: ${cardBg}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <strong style="color: #ef4444; font-size: 14px;">2. ${t('BRW (Black and Red Ware)', 'काले और लाल मृद्भाण्ड')}</strong><br/>
          ${t('Chalcolithic to Early Iron Age across central and northern India.', 'ताम्रपाषाण काल से प्रारंभिक लौह काल तक मध्य व उत्तर भारत में।')}
        </div>
        <div style="background: ${cardBg}; padding: 12px; border-radius: 8px; border-left: 4px solid #64748b;">
          <strong style="color: #94a3b8; font-size: 14px;">3. ${t('PGW (Painted Grey Ware)', 'चित्रित धूसर मृद्भाण्ड')}</strong><br/>
          ${t('Hallmark of Later Vedic Period (Rigvedic/Kuru-Panchala).', 'उत्तर वैदिक काल (कुरु-पांचाल) की विशिष्ट पहचान।')}
        </div>
        <div style="background: ${cardBg}; padding: 12px; border-radius: 8px; border-left: 4px solid #38bdf8;">
          <strong style="color: #38bdf8; font-size: 14px;">4. ${t('NBPW (Northern Black Polished Ware)', 'उत्तरी काली पॉलिशदार मृद्भाण्ड')}</strong><br/>
          ${t('Pinnacle of ancient pottery. Associated with Mauryan Empire & 2nd Urbanization.', 'प्राचीन मृद्भाण्ड कला का चरमोत्कर्ष। मौर्य साम्राज्य व द्वितीय नगरीकरण।')}
        </div>
      </div>
    </div>
  `, p++, 'History & Culture'));

  // ==========================================
  // PAGE 9: HISTORY - Delhi Sultanate (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('8. Delhi Sultanate (1206 - 1526 AD)', '8. दिल्ली सल्तनत (1206 - 1526 ई.)')}
    </h2>

    <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 10px; padding: 10px 16px; margin-bottom: 12px; font-size: 16px; color: #fef08a;">
      <strong style="font-size: 14px;">🔑 ${t('Dynasties Chronology Mnemonic Trick', 'राजवंशों के क्रम की याद रखने की ट्रिक')}:</strong> <em>${t('Sa - K - T - Sa - Lo (गुड़ खा तसले में)', 'गु-खि-तु-सै-लो (गुलाम ➔ खिलजी ➔ तुगलक ➔ सैयद ➔ लोदी)')}</em>
    </div>

    <div style="font-size: 15.5px; line-height: 1.6; color: ${textMain};">
      <div style="margin-bottom: 8px; background: ${cardBg}; padding: 10px 14px; border-radius: 8px; border: 1px solid ${cardBorder};">
        <strong style="color: #38bdf8; font-size: 14px;">1. ${t('Slave / Mamluk Dynasty (1206-1290)', 'गुलाम / मामलूक वंश (1206-1290)')}:</strong><br/>
        • <em>${t('Qutubuddin Aibak (1206-1210)', 'कुतुबुद्दीन ऐबक')}:</em> ${t("Founder. Known as 'Lakh Baksh'. Started Qutub Minar. Died playing Chaugan (Polo).", "संस्थापक। 'लाख बख्श' (लाखों का दानी)। कुतुब मीनार की नींव रखी। चौगान (पोलो) खेलते समय मृत्यु।")}<br/>
        • <em>${t('Iltutmish (1211-1236)', 'इल्तुतमिश')}:</em> ${t('Real founder. Turkan-i-Chahalgani (40 nobles) & Iqta system. Silver Tanka & copper Jital.', 'वास्तविक संस्थापक। तुर्कान-ए-चहलगानी (40 दल) और इक्ता प्रणाली। चांदी का टंका व तांबे का जीतल चलाया।')}<br/>
        • <em>${t('Razia Sultana (1236-1240)', 'रजिया सुल्तान')}:</em> ${t('First and only Muslim woman ruler of medieval India.', 'मध्यकालीन भारत की प्रथम और एकमात्र महिला मुस्लिम शासिका।')}<br/>
        • <em>${t('Ghiyasuddin Balban (1266-1287)', 'गयासुद्दीन बलबन')}:</em> ${t("'Blood and Iron' policy, abolished Chahalgani, started Sijda, Paibos, Navroz festival.", "'लौह एवं रक्त' नीति, चहलगानी का दमन, सिजदा, पैबोस और नवरोज उत्सव शुरू किया।")}
      </div>
      <div style="margin-bottom: 8px; background: ${cardBg}; padding: 10px 14px; border-radius: 8px; border: 1px solid ${cardBorder};">
        <strong style="color: #10b981; font-size: 14px;">2. ${t('Khilji Dynasty (1290-1320)', 'खिलजी वंश (1290-1320)')}:</strong><br/>
        • <em>${t('Alauddin Khilji (1296-1316)', 'अलाउद्दीन खिलजी')}:</em> ${t('Strict market control reforms (Shahna-i-Mandi), horse branding (Dagh), soldier roll (Chehra). Built Alai Darwaza, Siri Fort.', 'कठोर बाजार नियंत्रण प्रणाली (शहना-ए-मंडी), घोड़ों को दागने (दाग) और सैनिकों का हुलिया (चेहरा) प्रथा। अलाई दरवाजा व सीरी किला निर्माण।')}
      </div>
      <div style="margin-bottom: 8px; background: ${cardBg}; padding: 10px 14px; border-radius: 8px; border: 1px solid ${cardBorder};">
        <strong style="color: #fbbf24; font-size: 14px;">3. ${t('Tughlaq Dynasty (1320-1414)', 'तुगलक वंश (1320-1414)')}:</strong><br/>
        • <em>${t('Muhammad bin Tughlaq (1325-1351)', 'मोहम्मद बिन तुगलक')}:</em> ${t('Capital shift to Daulatabad, token copper currency. Ibn Battuta (Morocco) visited.', 'दौलताबाद राजधानी स्थानांतरण, सांकेतिक तांबे का सिक्का। इब्न बतूता (मोरक्को) भारत आया।')}<br/>
        • <em>${t('Firoz Shah Tughlaq', 'फिरोज शाह तुगलक')}:</em> ${t('Extensive canal networks, Diwan-i-Khairat (charity), Jizya on Brahmins.', 'नेहरों का विशाल जाल, दीवान-ए-खैरात, ब्राह्मणों पर भी जजिया कर।')}
      </div>
      <div style="background: ${cardBg}; padding: 10px 14px; border-radius: 8px; border: 1px solid ${cardBorder};">
        <strong style="color: #f43f5e; font-size: 14px;">4. ${t('Lodhi Dynasty (1451-1526)', 'लोदी वंश (1451-1526)')}:</strong> ${t('First Afghan dynasty. Sikandar Lodhi founded Agra in 1504. Ibrahim Lodhi defeated by Babur in 1st Battle of Panipat (1526).', 'प्रथम अफगान वंश। सिकंदर लोदी ने 1504 में आगरा बसाया। इब्राहिम लोदी पानीपत के प्रथम युद्ध (1526) में बाबर से पराजित।')}
      </div>
    </div>
  `, p++, 'History & Culture'));

  // ==========================================
  // PAGE 10: SCIENCE - Cell Biology & Solutions (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('9. Cell Biology, Organelles & Solution Tonicity', '9. कोशिका विज्ञान, कोशिकांग और विलयन टोनिसिटी')}
    </h2>

    <div style="background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 16px; line-height: 1.65;">
      <div style="margin-bottom: 6px;">
        • <strong>${t('Cell Discovery', 'कोशिका की खोज')}:</strong> ${t('Robert Hooke (1665, dead cork cells); Antonie van Leeuwenhoek (1674, first living cells in pond water).', 'रॉबर्ट हुक (1665, मृत कॉर्क कोशिकाएं); एंटनी वॉन ल्यूवेनहॉक (1674, तालाब के जल में पहली जीवित कोशिका)।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Cell Theory', 'कोशिका सिद्धांत')}:</strong> ${t('Proposed by Schleiden (1838) & Schwann (1839). Rudolf Virchow (1855) added: "Omnis cellula-e-cellula" (cells arise from pre-existing cells).', 'श्लीडेन (1838) व श्वान (1839) द्वारा। रुडोल्फ विरचो (1855): "सभी कोशिकाएं पूर्व-मौजूद कोशिकाओं से बनती हैं"।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Mitochondria', 'माइटोकॉन्ड्रिया')}:</strong> ${t("'Powerhouse of the cell'. Produces ATP via cellular respiration. Has own circular DNA and 70S ribosomes.", "'कोशिका का पावरहाउस'। श्वसन द्वारा ATP बनाता है। इसका अपना वृत्ताकार DNA व राइबोसोम होता है।")}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Ribosomes', 'राइबोसोम')}:</strong> ${t("'Protein factories of the cell'. Discovered by George Palade. Non-membrane bound.", "'कोशिका की प्रोटीन फैक्ट्री'। जॉर्ज पैलाडे द्वारा खोज। झिल्ली-रहित अंगक।")}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Lysosomes', 'लाइसोसोम')}:</strong> ${t("'Suicidal bags of the cell'. Hydrolytic digestive enzymes destroy foreign debris and aged cells.", "'कोशिका की आत्मघाती थैली'। जल-अपघटकीय एंजाइम अपशिष्ट और मृत कोशिकाओं को पचाते हैं।")}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Golgi Apparatus', 'गॉल्जी काय')}:</strong> ${t('Discovered by Camillo Golgi. Packaging, modification, and dispatch of proteins/lipids.', 'कैमिलो गॉल्जी द्वारा खोज। प्रोटीन व लिपिड की पैकेजिंग और स्राव का कार्य।')}
      </div>
      <div>
        • <strong>${t('Nucleus', 'केंद्रक')}:</strong> ${t("'Brain / Control Center of the cell'. Discovered by Robert Brown in 1831. Houses DNA/chromatin.", "'कोशिका का मस्तिष्क/नियंत्रक'। 1831 में रॉबर्ट ब्राउन द्वारा खोज। आनुवंशिक DNA रखता है।")}
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #38bdf8; margin-bottom: 10px; text-align: center;">
        🧪 ${t('Cell Behavior in Solutions (Osmosis & Tonicity)', 'विलयन में कोशिका का व्यवहार (परासरण एवं टोनिसिटी)')}
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; text-align: center;">
        <div style="background: ${cardBg}; border: 1px solid #38bdf8; padding: 12px; border-radius: 8px;">
          <strong style="color: #38bdf8; display: block; font-size: 14px; margin-bottom: 4px;">${t('Hypotonic Solution', 'अल्पपरासारी विलयन')}</strong>
          <span style="font-size: 15px; color: ${textMain}; line-height: 1.5;">${t('Higher water outside ➔ Water enters cell ➔ <strong>Cell Swells</strong> (Endosmosis).', 'बाहर जल अधिक ➔ जल कोशिका में प्रवेश ➔ <strong>कोशिका फूल जाती है</strong> (अंतःपरासरण)।')}</span>
        </div>
        <div style="background: ${cardBg}; border: 1px solid #10b981; padding: 12px; border-radius: 8px;">
          <strong style="color: #10b981; display: block; font-size: 14px; margin-bottom: 4px;">${t('Isotonic Solution', 'समपरासारी विलयन')}</strong>
          <span style="font-size: 15px; color: ${textMain}; line-height: 1.5;">${t('Equal concentration ➔ No net movement ➔ <strong>Same Size</strong>.', 'समान सांद्रता ➔ जल का शुद्ध प्रवाह शून्य ➔ <strong>आकार यथावत</strong> रहता है।')}</span>
        </div>
        <div style="background: ${cardBg}; border: 1px solid #f43f5e; padding: 12px; border-radius: 8px;">
          <strong style="color: #f43f5e; display: block; font-size: 14px; margin-bottom: 4px;">${t('Hypertonic Solution', 'अतिपरासारी विलयन')}</strong>
          <span style="font-size: 15px; color: ${textMain}; line-height: 1.5;">${t('Higher solute outside ➔ Water leaves cell ➔ <strong>Cell Shrinks</strong> (Plasmolysis).', 'बाहर विलेय अधिक ➔ जल कोशिका से बाहर ➔ <strong>कोशिका सिकुड़ जाती है</strong> (जीवद्रव्यकुंचन)।')}</span>
        </div>
      </div>
    </div>
  `, p++, 'Science & Technology'));

  // ==========================================
  // PAGE 11: SCIENCE - States of Matter & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('10. States of Matter & Boson Physics', '10. पदार्थ की अवस्थाएँ और बोसॉन भौतिकी')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 14px;">
      <div>
        <ul style="margin: 0; padding-left: 16px; font-size: 15.5px; line-height: 1.6; color: ${textMain};">
          <li style="margin-bottom: 6px;"><strong>1. ${t('Solid (ठोस)', 'ठोस')}:</strong> ${t('Fixed shape and volume, maximum intermolecular attraction, minimum kinetic energy.', 'निश्चित आकार और आयतन, अधिकतम अंतर-आणविक आकर्षण, न्यूनतम गतिज ऊर्जा।')}</li>
          <li style="margin-bottom: 6px;"><strong>2. ${t('Liquid (द्रव)', 'द्रव')}:</strong> ${t('No fixed shape, fixed volume, moderate kinetic energy, fluid behavior.', 'अनिश्चित आकार, निश्चित आयतन, मध्यम गतिज ऊर्जा, तरलता का गुण।')}</li>
          <li style="margin-bottom: 6px;"><strong>3. ${t('Gas (गैस)', 'गैस')}:</strong> ${t('Neither fixed shape nor volume, maximum kinetic energy, highly compressible.', 'न निश्चित आकार न आयतन, अधिकतम गतिज ऊर्जा, अत्यधिक संपीड़ित।')}</li>
          <li style="margin-bottom: 6px;"><strong>4. ${t('Plasma (प्लाज्मा)', 'प्लाज्मा')}:</strong> ${t('Superheated ionized gas, stripped electrons. Glowing in stars, Sun, lightning, neon signs.', 'अत्यधिक गर्म आयनीकृत गैस, मुक्त इलेक्ट्रॉन। तारों, सूर्य, बिजली और नीयन बल्बों में चमकता है।')}</li>
          <li style="margin-bottom: 6px;"><strong>5. ${t('Bose-Einstein Condensate (BEC)', 'बोस-आइंस्टीन कंडेनसेट')}:</strong> ${t('Gas of ultra-low density cooled near absolute zero (0 K / -273.15°C). Single super-atom.', 'परम शून्य ताप (0 K / -273.15°C) के निकट अति-निम्न घनत्व वाली गैस। सभी परमाणु एक "सुपर एटम" बनते हैं।')}</li>
          <li><strong>${t('Nobel Milestones', 'नोबेल पुरस्कार उपलब्धियां')}:</strong> ${t('Predicted by S.N. Bose & Albert Einstein (1924-25). Synthesized by Cornell & Wieman (Nobel 2001). Higgs Boson (God Particle) Nobel 2013.', 'सत्येंद्र नाथ बोस और आइंस्टीन द्वारा भविष्यवाणी (1924-25)। कॉर्नेल व वीमैन द्वारा प्रयोगशाला में निर्माण (नोबेल 2001)। हिग्स बोसॉन (नोबेल 2013)।')}</li>
        </ul>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/State Of matter_.png')}" style="width: 100%; height: 270px; object-fit: contain; border-radius: 8px; display: block;" alt="States of Matter" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: States of Matter & Phase Changes</div>
        </div>
      </div>
    </div>

    <div style="background: ${cardBg}; border: 1px solid #38bdf8; border-radius: 10px; padding: 12px 18px; font-size: 15.5px; color: ${textMain}; line-height: 1.6;">
      <strong style="font-size: 14px; color: #38bdf8;">🔥 ${t('Phase Transition Terminology', 'अवस्था परिवर्तन शब्दावली')}:</strong><br/>
      • <strong>${t('Sublimation (ऊर्ध्वपातन)', 'ऊर्ध्वपातन')}:</strong> ${t('Solid directly into Gas (e.g. Camphor, Dry Ice / Solid CO₂, Ammonium Chloride).', 'ठोस का सीधे गैस में बदलना (जैसे कपूर, शुष्क बर्फ / ठोस CO₂, अमोनियम क्लोराइड)।')}<br/>
      • <strong>${t('Deposition (निक्षेपण)', 'निक्षेपण')}:</strong> ${t('Gas directly into Solid without becoming liquid (e.g. Frost formation).', 'गैस का बिना द्रव बने सीधे ठोस में बदलना (जैसे पाला जमना)।')}
    </div>
  `, p++, 'Science & Technology'));

  // ==========================================
  // PAGE 12: ECONOMICS - Micro vs Macro & 5 Sectors (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('11. Economics: Micro vs Macro & 5 Economic Sectors', '11. अर्थशास्त्र: व्यष्टि vs समष्टि और 5 आर्थिक क्षेत्र')}
    </h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
      <div style="background: ${cardBg}; border: 1px solid #38bdf8; border-radius: 8px; padding: 12px 14px; font-size: 15.5px;">
        <strong style="color: #38bdf8; font-size: 14px; display: block; margin-bottom: 4px;">${t('Microeconomics', 'व्यष्टि अर्थशास्त्र')}</strong>
        <span style="line-height: 1.6;">${t(
          'Studies individual consumers, households, and firms. Focuses on price determination, demand-supply, market mechanisms. Father: Adam Smith (Wealth of Nations, 1776).',
          'व्यक्तिगत उपभोक्ताओं, परिवारों और फर्मों का अध्ययन करता है। मूल्य निर्धारण, मांग-आपूर्ति और बाजार संरचना पर केंद्रित। जनक: एडम स्मिथ (वेल्थ ऑफ नेशंस, 1776)।'
        )}</span>
      </div>
      <div style="background: ${cardBg}; border: 1px solid #10b981; border-radius: 8px; padding: 12px 14px; font-size: 15.5px;">
        <strong style="color: #10b981; font-size: 14px; display: block; margin-bottom: 4px;">${t('Macroeconomics', 'समष्टि अर्थशास्त्र')}</strong>
        <span style="line-height: 1.6;">${t(
          'Studies aggregate economy as a whole. Focuses on GDP, National Income, inflation, unemployment, fiscal and monetary policies. Father: John Maynard Keynes (1936).',
          'संपूर्ण अर्थव्यवस्था का समग्र रूप से अध्ययन करता है। जीडीपी, राष्ट्रीय आय, मुद्रास्फीति, बेरोजगारी, राजकोषीय व मौद्रिक नीति पर केंद्रित। जनक: जॉन मेनार्ड कीन्स (1936)।'
        )}</span>
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px; line-height: 1.65;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #fbbf24; margin-bottom: 10px;">
        📊 ${t('5 Sectors of the Economy', 'अर्थव्यवस्था के 5 प्रमुख क्षेत्र')}
      </h3>
      <div style="margin-bottom: 6px;">
        • <strong>1. ${t('Primary Sector (प्राथमिक क्षेत्र)', 'प्राथमिक क्षेत्र')}:</strong> ${t('Direct extraction and harvesting of natural resources. Agriculture, forestry, fishing, mining, quarrying.', 'प्राकृतिक संसाधनों का प्रत्यक्ष दोहन। कृषि, वानिकी, मत्स्य पालन, खनन, उत्खनन।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>2. ${t('Secondary Sector (द्वितीयक क्षेत्र)', 'द्वितीयक क्षेत्र')}:</strong> ${t('Manufacturing, industrial processing, transforming raw materials into finished goods. Factories, construction, power, gas, water supply.', 'विनिर्माण, औद्योगिक प्रसंस्करण, कच्चे माल से तैयार उत्पाद बनाना। कारखाने, निर्माण, बिजली, गैस, जल आपूर्ति।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>3. ${t('Tertiary Sector (तृतीयक / सेवा क्षेत्र)', 'तृतीयक / सेवा क्षेत्र')}:</strong> ${t('Services facilitating production and consumer lifestyle. Banking, insurance, transport, communication, healthcare, education.', 'उत्पादन और जीवनशैली को सुगम बनाने वाली सेवाएं। बैंकिंग, बीमा, परिवहन, संचार, स्वास्थ्य, शिक्षा।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>4. ${t('Quaternary Sector (चतुर्थक क्षेत्र)', 'चतुर्थक क्षेत्र')}:</strong> ${t('Knowledge-based activities, R&D, information technology, consultancy, financial planning.', 'ज्ञान-आधारित गतिविधियां, अनुसंधान व विकास (R&D), सूचना प्रौद्योगिकी, परामर्श, वित्तीय विश्लेषण।')}
      </div>
      <div>
        • <strong>5. ${t('Quinary Sector (पंचम क्षेत्र)', 'पंचम क्षेत्र')}:</strong> ${t('Highest-level decision-makers: Government leaders, corporate top executives, judicial heads, policy creators.', 'शीर्ष स्तर के नीति-निर्माता: सरकारी शीर्ष नेतृत्व, कॉर्पोरेट कार्यकारी, न्यायपालिका प्रमुख, वैज्ञानिक नीतियां।')}
      </div>
    </div>
  `, p++, 'Economics'));

  // ==========================================
  // PAGE 13: ECONOMICS - 8 Collar Jobs & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('12. The 8 Collar Jobs of the Modern Workforce', '12. कार्यबल की 8 कॉलर जॉब्स का संपूर्ण वर्गीकरण')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 12px;">
      <div style="font-size: 15.5px; line-height: 1.6; color: ${textMain};">
        <div style="margin-bottom: 5px;">
          • <strong>Red Collar:</strong> ${t('Primary sector laborers (agriculture, forestry, manual mining).', 'प्राथमिक क्षेत्र के श्रमिक (कृषि, वानिकी, खनन मजदूर)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Blue Collar:</strong> ${t('Manual manufacturing and skilled trade workers (mechanics, assembly line, construction).', 'विनिर्माण और कुशल व्यापार श्रमिक (मैकेनिक, फैक्ट्री कर्मी, निर्माण)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>White Collar:</strong> ${t('Salaried administrative, managerial, and corporate desk professionals.', 'वेतनभोगी प्रशासनिक, प्रबंधकीय और कॉर्पोरेट डेस्क पेशेवर।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Pink Collar:</strong> ${t('Service-oriented caregiving jobs (nurses, receptionists, primary school teachers, retail staff).', 'सेवा-उन्मुख व देखभाल नौकरियां (नर्स, रिसेप्शनिस्ट, प्राथमिक शिक्षक, रिटेल)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Gold Collar:</strong> ${t('Highly skilled elite professionals (neurosurgeons, research scientists, top consultants).', 'अत्यधिक कुशल विशेषज्ञ (न्यूरोसर्जन, वैज्ञानिक, शीर्ष सलाहकार)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Green Collar:</strong> ${t('Environmental sustainability and clean technology workers (solar/wind technicians).', 'पर्यावरण स्थिरता और स्वच्छ तकनीक कार्यकर्ता (सौर/पवन ऊर्जा तकनीशियन)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Open / Grey Collar:</strong> ${t('Technical workers, certified diagnostic technicians, IT support staff.', 'तकनीकी कार्यकर्ता, प्रमाणित स्वास्थ्य तकनीशियन, आईटी रखरखाव कर्मी।')}
        </div>
        <div>
          • <strong>Black Collar:</strong> ${t('High-risk manual labor in black conditions (underground coal mining, oil drilling).', 'कठिन और काली परिस्थितियों में उच्च जोखिम कार्य (कोयला खदान, तेल कुएं)।')}
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/Collar Jobs.png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Collar Jobs" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Collar Jobs Classification</div>
        </div>
      </div>
    </div>
  `, p++, 'Economics'));

  // ==========================================
  // PAGE 14: ART & CULTURE - 8 Classical Dances & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('13. 8 Classical Dances of India (Sangeet Natak Akademi)', '13. भारत के 8 शास्त्रीय नृत्य (संगीत नाटक अकादमी)')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 12px;">
      <div style="font-size: 15px; line-height: 1.55; color: ${textMain};">
        <div style="margin-bottom: 4px;">
          1. <strong>${t('Bharatnatyam (Tamil Nadu)', 'भरतनाट्यम (तमिलनाडु)')}:</strong> ${t('Oldest classical dance, temple origin (Sadir), based on Natya Shastra, solo Ekaharya format.', 'प्राचीनतम शास्त्रीय नृत्य, मंदिरों से उद्भव (सादिर), नाट्यशास्त्र पर आधारित, एकल एकाहार्य शैली।')}
        </div>
        <div style="margin-bottom: 4px;">
          2. <strong>${t('Kathakali (Kerala)', 'कथकली (केरल)')}:</strong> ${t('Elaborate dance-drama, vibrant facial makeup (Vesham), enacts Ramayana and Mahabharata.', 'भव्य नृत्य-नाटिका, विशिष्ट मुखौटा रूपी श्रृंगार (वेषम), रामायण व महाभारत के प्रसंग।')}
        </div>
        <div style="margin-bottom: 4px;">
          3. <strong>${t('Mohiniattam (Kerala)', 'मोहिनीअट्टम (केरल)')}:</strong> ${t("'Dance of the Enchantress', gentle swaying Lasya style, off-white gold Kasavu saree.", "'मोहिनी का नृत्य', लास्य भावयुक्त कोमल चाल, सफेद व सुनहरी किनारी वाली कसावु साड़ी।")}
        </div>
        <div style="margin-bottom: 4px;">
          4. <strong>${t('Kathak (Uttar Pradesh / North India)', 'कथक (उत्तर प्रदेश / उत्तर भारत)')}:</strong> ${t('Storytellers (Kathakars), intricate footwork (Tatkar), rapid spins (Chakkars).', 'कथा सुनाने वाले (कथक), जटिल पाद-संचालन (तत्कार), द्रुत चक्कर (चक्करदार चाल)।')}
        </div>
        <div style="margin-bottom: 4px;">
          5. <strong>${t('Kuchipudi (Andhra Pradesh)', 'कुचिपुड़ी (आंध्र प्रदेश)')}:</strong> ${t('Originated in Kuchelapuram, brass plate rim dancing (Tarangam), Manduk Shabdam.', 'कुचेलापुरम गांव से उद्भव, पीतल की थाली के किनारे पर नृत्य (तरंगम), मंडूक शब्दम।')}
        </div>
        <div style="margin-bottom: 4px;">
          6. <strong>${t('Odissi (Odisha)', 'ओडिसी (ओडिशा)')}:</strong> ${t('Distinguished by Tribhanga body posture (three bends) and Chowk square stance.', 'त्रिभंग मुद्रा (शरीर के तीन मोड़) और चौका चौकोर मुद्रा की विशिष्टता।')}
        </div>
        <div style="margin-bottom: 4px;">
          7. <strong>${t('Manipuri (Manipur)', 'मणिपुरी (मणिपुर)')}:</strong> ${t('Radha-Krishna Raasleela, gentle gliding motion, Pung Cholom drum acrobatic dance.', 'राधा-कृष्ण की रासलीला, कोमल लयात्मक गति, पुंग चोलोम ढोल नृत्य।')}
        </div>
        <div>
          8. <strong>${t('Sattriya (Assam)', 'सत्रिया (असम)')}:</strong> ${t('Created by 15th-century saint Srimanta Sankardev in Vaishnavite monasteries (Satras). Recognized 2000.', '15वीं सदी के संत श्रीमंत शंकरदेव द्वारा वैष्णव मठों (सत्रों) में प्रवर्तित। 2000 में मान्यता।')}
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/Classical dance_.png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Classical Dances" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: 8 Classical Dance Forms</div>
        </div>
      </div>
    </div>
  `, p++, 'Art & Culture'));

  // ==========================================
  // PAGE 15: ART & CULTURE - Kathakali Makeup & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('14. The 6 Types of Kathakali Vesham (Makeup)', '14. कथकली वेषम (मेकअप) के 6 प्रकार')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 12px;">
      <div style="font-size: 15px; line-height: 1.55; color: ${textMain};">
        <div style="margin-bottom: 5px;">
          • <strong>1. Pacha (Green / हरा):</strong> ${t('Satvika character. Noble, divine, virtuous heroes and kings (Rama, Krishna, Arjuna).', 'सात्विक चरित्र। नेक, दिव्य, सदाचारी राजा व नायक (श्रीराम, श्रीकृष्ण, अर्जुन)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>2. Kathi (Knife / चाकू):</strong> ${t('Rajasika character. Evil and arrogant royalty with courage tainted by pride (Ravana, Duryodhana, Kamsa). Green face with red knife mustache marks.', 'राजसिक चरित्र। अहंकारी एवं दुष्ट राजा जिनमें पराक्रम तो है पर अहंकार अधिक है (रावण, दुर्योधन, कंस)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>3. Thadi (Beard / दाढ़ी):</strong><br/>
          &nbsp;&nbsp;- <em>Chuvanna Thadi (Red Beard):</em> ${t('Extremely vicious, demonic characters (Dushasana).', 'अत्यंत क्रूर और दुष्ट दानवी पात्र (दुःशासन)।')}<br/>
          &nbsp;&nbsp;- <em>Vella Thadi (White Beard):</em> ${t('Benevolent divine beings (Hanuman).', 'सदाचारी और पवित्र दिव्य प्राणी (भगवान हनुमान)।')}<br/>
          &nbsp;&nbsp;- <em>Karutha Thadi (Black Beard):</em> ${t('Hunters and forest dwellers.', 'शिकारी और वनवासी पात्र।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>4. Kari (Black / काला):</strong> ${t('She-demons and wicked witches (Surpanakha). Black face and black dress.', 'राक्षसियां और दुष्ट स्त्रियां (शूर्पणखा)। काला चेहरा व काले वस्त्र।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>5. Minukku (Radiance / चमक):</strong> ${t('Virtuous female characters, sages, and Brahmins (Sita, Draupadi). Warm yellow glowing base.', 'साध्वी स्त्रियां, ऋषि और ब्राह्मण (सीता, द्रौपदी)। कोमल पीला-सुनहरा मुखौटा।')}
        </div>
        <div>
          • <strong>6. Pazhuppu (Ripe / पक्व):</strong> ${t('Golden-orange face for supreme deities like Lord Shiva and Balarama.', 'सुनहरा-नारंगी चेहरा, परम पूज्य देवताओं जैसे भगवान शिव और बलराम के लिए।')}
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/Types of Kathakali Vesham  (Makeup).png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Kathakali Makeup" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Kathakali Vesham Types</div>
        </div>
      </div>
    </div>
  `, p++, 'Art & Culture'));

  // ==========================================
  // PAGE 16: ART & CULTURE - Folk Dances & Tricks (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('15. Folk Dances & State Mnemonic Tricks', '15. लोक नृत्य और राज्यों की याद रखने की ट्रिक्स')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 12px;">
      <div style="font-size: 15px; line-height: 1.55; color: ${textMain};">
        <div style="margin-bottom: 5px;">
          • <strong>${t('Maharashtra (महाराष्ट्र)', 'महाराष्ट्र')}:</strong> Lavani, Koli, Tamasha, Dhangari Gaja, Lezim.<br/>
          <em>${t('Trick', 'ट्रिक')}:</em> "Kohli Vadapav Lana, Tamasha mat kar, Dhang se Lavani dekh!"
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Karnataka (कर्नाटक)', 'कर्नाटक')}:</strong> Yakshagana, Dollu Kunitha, Bhootha Kola, Nagamandala.<br/>
          <em>${t('Trick', 'ट्रिक')}:</em> "Yash bola Kam kar Saale, Doll, Bhootha, Nagamandali ke sath!"
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Gujarat (गुजरात)', 'गुजरात')}:</strong> Garba, Dandiya Raas, Bhavai, Tippani, Padhar.<br/>
          <em>${t('Trick', 'ट्रिक')}:</em> "Gujarat ki Gopiyan Dandiya aur Garba khelne chal padi."
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Rajasthan (राजस्थान)', 'राजस्थान')}:</strong> Ghoomar, Kalbelia (UNESCO listed snake dance), Bhavai, Chari, Gair, Chakri.<br/>
          <em>${t('Fact', 'विशेष')}:</em> ${t('Kalbelia inscribed in UNESCO Intangible Cultural Heritage list.', 'कालबेलिया यूनेस्को की अमूर्त सांस्कृतिक विरासत सूची में दर्ज।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>${t('Punjab (पंजाब)', 'पंजाब')}:</strong> Bhangra (men), Giddha (women), Sammi, Kikli, Jhumar.
        </div>
        <div>
          • <strong>${t('Assam (असम)', 'असम')}:</strong> Bihu (Rongali, Kongali, Bhogali), Bagurumba (Bodo community), Jhumur.
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/Folk Dance Trick.png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Folk Dance Tricks" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: Folk Dances Memory Tricks</div>
        </div>
      </div>
    </div>
  `, p++, 'Art & Culture'));

  // ==========================================
  // PAGE 17: ART & CULTURE - Major Festivals & Photo (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('16. Major Festivals of India (High Frequency Exam Facts)', '16. भारत के प्रमुख त्यौहार (सर्वाधिक पूछे जाने वाले तथ्य)')}
    </h2>

    <div style="display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; margin-bottom: 12px;">
      <div style="font-size: 15px; line-height: 1.55; color: ${textMain};">
        <div style="margin-bottom: 5px;">
          • <strong>Hornbill Festival (Nagaland):</strong> ${t("'Festival of Festivals', held annually 1-10 December at Kisama Naga Heritage Village near Kohima.", "'त्यौहारों का त्यौहार', प्रतिवर्ष 1-10 दिसंबर को कोहिमा के निकट किसामा नागा हेरिटेज गांव में।")}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Losoong / Namsoong (Sikkim):</strong> ${t('Sikkimese New Year harvest festival celebrated by Bhutia & Lepcha tribes. Features sacred Cham masked dance.', 'सिक्किमी नववर्ष और फसल उत्सव, भूटिया व लेपचा जनजातियों द्वारा। पवित्र छम मुखौटा नृत्य।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Wangala Festival (Meghalaya):</strong> ${t("'100 Drums Festival' celebrated by Garo tribe honoring Sun God Saljong post-harvest.", "गारो जनजाति का '100 ढोल उत्सव', फसल कटाई के बाद सूर्य देवता सलजोंग के सम्मान में।")}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Chapchar Kut (Mizoram):</strong> ${t('Spring festival celebrated after clearing bamboo forests for jhum cultivation. Cheraw (bamboo dance).', 'झूम खेती के लिए बांस के जंगलों को साफ करने के बाद वसंत उत्सव। चेराव (बांस नृत्य)।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Kharchi Puja (Tripura):</strong> ${t('Royal worship of 14 ancestral deities at Old Agartala temple.', 'पुरानी अगरतला मंदिर में 14 कुलदेवताओं की शाही पूजा।')}
        </div>
        <div style="margin-bottom: 5px;">
          • <strong>Hemis Festival (Ladakh):</strong> ${t('Celebrated at Hemis Gompa honoring birth of Guru Padmasambhava.', 'हेमिस गोम्पा में गुरु पद्मसंभव के जन्मोत्सव पर आयोजित।')}
        </div>
        <div>
          • <strong>Nuakhai (Odisha):</strong> ${t('Agricultural harvest festival offering newly harvested rice to Goddess Samaleswari.', 'नवान्न कृषि उत्सव, देवी समलेश्वरी को नई फसल का चावल अर्पित करना।')}
        </div>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px solid ${cardBorder}; border-radius: 10px; padding: 6px; background: ${cardBg};">
          <img src="${getImg('/Important Festival_.png')}" style="width: 100%; height: 275px; object-fit: contain; border-radius: 8px; display: block;" alt="Major Festivals" />
          <div style="font-size: 15.5px; font-weight: 700; color: #38bdf8; margin-top: 7px;">PHOTO: High-Frequency Exam Festivals</div>
        </div>
      </div>
    </div>
  `, p++, 'Art & Culture'));

  // ==========================================
  // PAGE 18: MISCELLANEOUS - Badminton Rules & Cups (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('17. Badminton Master Rules, Court & World Trophies', '17. बैडमिंटन नियम, कोर्ट आयाम और प्रमुख कप')}
    </h2>

    <div style="background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 16px; line-height: 1.65;">
      <div style="margin-bottom: 6px;">
        • <strong>${t('Court Dimensions', 'कोर्ट के आयाम')}:</strong> ${t('Length = 13.40 m (44 ft). Singles Width = 5.18 m (17 ft). Doubles Width = 6.10 m (20 ft).', 'लंबाई = 13.40 मीटर (44 फीट)। एकल चौड़ाई = 5.18 मीटर (17 फीट)। युगल चौड़ाई = 6.10 मीटर (20 फीट)।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Net Height', 'नेट की ऊंचाई')}:</strong> ${t('1.55 m (5 ft 1 inch) at the posts, 1.524 m (5 ft) at center of court.', 'किनारे के खंभों पर 1.55 मीटर (5 फीट 1 इंच), कोर्ट के केंद्र में 1.524 मीटर (5 फीट)।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Shuttlecock Standards', 'शटलकॉक मानक')}:</strong> ${t('Exactly 16 feathers plucked exclusively from left wing of a goose or duck. Weight = 4.74 to 5.50 grams.', 'हंस या बत्तख के केवल बाएं पंख से ठीक 16 पंख। वजन = 4.74 से 5.50 ग्राम।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>${t('Scoring System', 'अंक प्रणाली')}:</strong> ${t('Best of 3 games of 21 points each (Rally Point system). Must lead by 2 points up to 30.', 'प्रत्येक 21 अंकों के 3 गेम (रैली प्वाइंट प्रणाली)। 30 अंक तक 2 अंकों की बढ़त अनिवार्य।')}
      </div>
      <div>
        • <strong>${t('3 Disciplinary Penalty Cards', '3 अनुशासनात्मक पेनल्टी कार्ड')}:</strong><br/>
        &nbsp;&nbsp;- <em>${t('Yellow Card', 'पीला कार्ड')}:</em> ${t('Official warning for misconduct.', 'अनुचित व्यवहार के लिए आधिकारिक चेतावनी।')}<br/>
        &nbsp;&nbsp;- <em>${t('Red Card', 'लाल कार्ड')}:</em> ${t('Fault penalty, point and serve awarded to opponent.', 'गलती पर पेनल्टी, विपक्षी को अंक व सर्व दिया जाता है।')}<br/>
        &nbsp;&nbsp;- <em>${t('Black Card', 'काला कार्ड')}:</em> ${t('Complete disqualification from match and tournament.', 'मैच और पूरे टूर्नामेंट से पूर्ण अयोग्यता।')}
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #fbbf24; margin-bottom: 10px;">
        🏆 ${t('Famous Badminton Trophies & Cups', 'प्रमुख बैडमिंटन कप एवं ट्रॉफियां')}
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; line-height: 1.55;">
        <div>• <strong>Thomas Cup:</strong> ${t("World Men's Team Championship (India won historic Gold in 2022).", "विश्व पुरुष टीम चैंपियनशिप (भारत ने 2022 में ऐतिहासिक स्वर्ण जीता)।")}</div>
        <div>• <strong>Uber Cup:</strong> ${t("World Women's Team Championship.", "विश्व महिला टीम चैंपियनशिप।")}</div>
        <div>• <strong>Sudirman Cup:</strong> ${t("World Mixed Team Championship.", "विश्व मिश्रित टीम चैंपियनशिप।")}</div>
        <div>• <strong>All England Open:</strong> ${t("Oldest and most prestigious annual championship.", "प्राचीनतम और सबसे प्रतिष्ठित वार्षिक टूर्नामेंट।")}</div>
        <div>• <strong>Syed Modi International:</strong> ${t("BWF World Tour event held in Lucknow, India.", "भारत के लखनऊ में आयोजित बीडब्ल्यूएफ वर्ल्ड टूर प्रतियोगिता।")}</div>
        <div>• <strong>Narang Cup, Chaddha Cup:</strong> ${t("National Indian badminton championships.", "भारतीय राष्ट्रीय बैडमिंटन टूर्नामेंट।")}</div>
      </div>
    </div>
  `, p++, 'Miscellaneous & Sports'));

  // ==========================================
  // PAGE 19: MISCELLANEOUS - Literature & Schemes (100% BILINGUAL)
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('18. Great Literature, Authors & Government Schemes', '18. प्रमुख साहित्यकार, रचनाएं और सरकारी योजनाएँ')}
    </h2>

    <div style="background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; font-size: 16px; line-height: 1.65;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #fbbf24; margin-bottom: 8px;">
        📖 ${t('Master Literary Titans', 'महान साहित्यकार एवं उनकी अमर रचनाएं')}
      </h3>
      <div style="margin-bottom: 6px;">
        • <strong>Jaishankar Prasad (जयशंकर प्रसाद):</strong> ${t('Kamayani (कामायनी - 15 sargas epic), Dhruvswamini (ध्रुवस्वामिनी), Skandagupta, Chandragupta, Titli, Kankal, Iravati, Mamta, Aansoo.', 'कामायनी (15 सर्गों का महाकाव्य), ध्रुवस्वामिनी, स्कंदगुप्त, चंद्रगुप्त, तितली, कंकाल, इरावती, ममता, आंसू।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>Munshi Premchand (मुंशी प्रेमचंद):</strong> ${t('Upanyas Samrat. Godaan, Gaban, Nirmala, Rangbhoomi, Karmabhoomi, Seva Sadan, Kafan, Poos ki Raat, Eidgah, Panch Parmeshwar.', 'उपन्यास सम्राट। गोदान, गबन, निर्मला, रंगभूमि, कर्मभूमि, सेवा सदन, कफन, पूस की रात, ईदगाह, पंच परमेश्वर।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>Rabindranath Tagore (रवीन्द्रनाथ टैगोर):</strong> ${t('Gitanjali (Nobel Prize in Literature 1913), Gora, Ghare-Baire, Chokher Bali, Kabuliwala. National anthems of India & Bangladesh.', 'गीतांजलि (साहित्य नोबेल पुरस्कार 1913), गोरा, घरे-बाईरे, चोखेर बाली, काबुलीवाला। भारत व बांग्लादेश के राष्ट्रगान रचयिता।')}
      </div>
      <div>
        • <strong>Kalidasa (कालिदास):</strong> ${t('Kavikulaguru. Abhijñānaśākuntalam, Meghadūta, Raghuvaṃśa, Kumārasambhava, Mālavikāgnimitram, Vikramōrvaśīyam.', 'कविकुलगुरु। अभिज्ञानशाकुंतलम्, मेघदूतम्, रघुवंशम्, कुमारसंभवम्, मालविकाग्निमित्रम्, विक्रमोर्वशीयम्।')}
      </div>
    </div>

    <div style="background: ${boxAlt}; border: 1px solid ${boxAltBorder}; border-radius: 10px; padding: 14px 18px; font-size: 16px; line-height: 1.65;">
      <h3 style="font-size: 17.5px; font-weight: 800; color: #38bdf8; margin-bottom: 8px;">
        🏛️ ${t('High-Yield Government Schemes', 'परीक्षा उपयोगी प्रमुख सरकारी योजनाएँ')}
      </h3>
      <div style="margin-bottom: 6px;">
        • <strong>Pradhan Mantri Jan Dhan Yojana (PMJDY):</strong> ${t("Launched 28 August 2014. Financial inclusion slogan 'Mera Khata, Bhagya Vidhata'.", "28 अगस्त 2014 को प्रारंभ। वित्तीय समावेशन का नारा: 'मेरा खाता, भाग्य विधाता'।")}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>Ayushman Bharat PM-JAY:</strong> ${t('Launched 23 September 2018 (Ranchi, Jharkhand). ₹5 Lakh annual cashless health cover per family.', '23 सितंबर 2018 को रांची से प्रारंभ। प्रति परिवार प्रतिवर्ष ₹5 लाख का कैशलेस स्वास्थ्य बीमा।')}
      </div>
      <div style="margin-bottom: 6px;">
        • <strong>PM Kisan Samman Nidhi:</strong> ${t('Launched 24 February 2019 (Gorakhpur, UP). ₹6,000 per year in 3 equal installments of ₹2,000.', '24 फरवरी 2019 को गोरखपुर से प्रारंभ। पात्र किसानों को ₹2,000 की 3 किस्तों में प्रतिवर्ष ₹6,000।')}
      </div>
      <div>
        • <strong>Jal Jeevan Mission (JJM):</strong> ${t('Announced 15 August 2019. Providing functional household tap water connections to all rural homes.', '15 अगस्त 2019 को घोषित। सभी ग्रामीण घरों में कार्यात्मक नल जल कनेक्शन प्रदान करना।')}
      </div>
    </div>
  `, p++, 'Miscellaneous & Literature'));

  // ==========================================
  // PAGE 20: PRACTICE QUESTIONS (Part 1) - 100% BILINGUAL
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('19. High-Yield Practice Question Bank (Part 1)', '19. उच्च संभावित अभ्यास प्रश्न बैंक (भाग 1)')}
    </h2>

    <div style="font-size: 15.5px; line-height: 1.6; color: ${textMain};">
      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q1. Who among the following put forward the idea of a Constituent Assembly for India for the first time in 1934?',
          'प्र.1. 1934 में पहली बार भारत के लिए संविधान सभा का विचार निम्नलिखित में से किसने प्रस्तुत किया था?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Jawaharlal Nehru &nbsp;&nbsp;&nbsp;&nbsp;(b) M.N. Roy &nbsp;&nbsp;&nbsp;&nbsp;(c) B.R. Ambedkar &nbsp;&nbsp;&nbsp;&nbsp;(d) Mahatma Gandhi</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) M.N. Roy', 'उत्तर: (b) एम.एन. रॉय')}</span> • ${t(
          'Manabendra Nath Roy proposed the idea in 1934, officially adopted by INC in 1935.',
          'मानवेन्द्र नाथ रॉय ने 1934 में विचार रखा, जिसे 1935 में कांग्रेस ने आधिकारिक रूप से स्वीकार किया।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q2. How much total time did the Constituent Assembly take to complete the Indian Constitution?',
          'प्र.2. संविधान सभा को भारतीय संविधान पूर्ण करने में कुल कितना समय लगा?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) 2 Years, 11 Months, 18 Days &nbsp;&nbsp;&nbsp;&nbsp;(b) 3 Years, 1 Month, 12 Days &nbsp;&nbsp;&nbsp;&nbsp;(c) 2 Years, 9 Months, 20 Days</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (a) 2 Years, 11 Months, 18 Days', 'उत्तर: (a) 2 वर्ष, 11 माह, 18 दिन')}</span> • ${t(
          'Spanning 11 formal sessions and 165 days of sittings.',
          'कुल 11 सत्र और 165 दिन की औपचारिक बैठकें आयोजित की गई थीं।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q3. Which planet rotates clockwise (from East to West) on its axis?',
          'प्र.3. निम्नलिखित में से कौन सा ग्रह अपनी धुरी पर दक्षिणावर्त (पूर्व से पश्चिम) घूमता है?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Mars &nbsp;&nbsp;&nbsp;&nbsp;(b) Jupiter &nbsp;&nbsp;&nbsp;&nbsp;(c) Venus &nbsp;&nbsp;&nbsp;&nbsp;(d) Mercury</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (c) Venus', 'उत्तर: (c) शुक्र')}</span> • ${t(
          'Both Venus and Uranus exhibit retrograde (clockwise) rotation.',
          'शुक्र और अरुण (यूरेनस) दोनों दक्षिणावर्त (पूर्व से पश्चिम) दिशा में घूमते हैं।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q4. The Tropic of Cancer (23.5° N) does NOT pass through which of the following Indian states?',
          'प्र.4. कर्क रेखा (23.5° उत्तरी अक्षांश) निम्नलिखित में से किस भारतीय राज्य से होकर नहीं गुजरती है?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Rajasthan &nbsp;&nbsp;&nbsp;&nbsp;(b) Odisha &nbsp;&nbsp;&nbsp;&nbsp;(c) Chhattisgarh &nbsp;&nbsp;&nbsp;&nbsp;(d) Tripura</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Odisha', 'उत्तर: (b) ओडिशा')}</span> • ${t(
          'Passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.',
          '8 राज्यों से गुजरती है: गुजरात, राजस्थान, म.प्र., छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q5. Who was the founder of the Slave / Mamluk Dynasty in 1206 AD?',
          'प्र.5. 1206 ई. में गुलाम / मामलूक वंश का संस्थापक कौन था?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Iltutmish &nbsp;&nbsp;&nbsp;&nbsp;(b) Qutubuddin Aibak &nbsp;&nbsp;&nbsp;&nbsp;(c) Balban &nbsp;&nbsp;&nbsp;&nbsp;(d) Alauddin Khilji</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Qutubuddin Aibak', 'उत्तर: (b) कुतुबुद्दीन ऐबक')}</span> • ${t(
          "Known as 'Lakh Baksh', built Quwwat-ul-Islam mosque, died playing Chaugan.",
          "'लाख बख्श' उपनाम, कुव्वत-उल-इस्लाम मस्जिद बनाई, चौगान खेलते समय मृत्यु हुई।"
        )}</div>
      </div>

      <div>
        <strong style="font-size: 16px;">${t(
          "Q6. Which cell organelle is famously known as the 'Suicidal Bags' of the cell?",
          "प्र.6. किस कोशिकांग को कोशिका की 'आत्मघाती थैली' कहा जाता है?"
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Ribosome &nbsp;&nbsp;&nbsp;&nbsp;(b) Mitochondria &nbsp;&nbsp;&nbsp;&nbsp;(c) Lysosome &nbsp;&nbsp;&nbsp;&nbsp;(d) Golgi Apparatus</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (c) Lysosome', 'उत्तर: (c) लाइसोसोम')}</span> • ${t(
          'Contains hydrolytic digestive enzymes that break down waste.',
          'इसमें जल-अपघटकीय पाचक एंजाइम होते हैं जो कोशिका अपशिष्ट को पचाते हैं।'
        )}</div>
      </div>
    </div>
  `, p++, 'Practice Questions'));

  // ==========================================
  // PAGE 21: PRACTICE QUESTIONS (Part 2) - 100% BILINGUAL
  // ==========================================
  pages.push(pageWrapper(`
    <h2 style="font-size: 23px; font-weight: 800; color: #38bdf8; margin-bottom: 12px;">
      ${t('20. High-Yield Practice Question Bank (Part 2)', '20. उच्च संभावित अभ्यास प्रश्न बैंक (भाग 2)')}
    </h2>

    <div style="font-size: 15.5px; line-height: 1.6; color: ${textMain};">
      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q7. Which state of matter is formed when a gas of ultra-low density is cooled near absolute zero?',
          'प्र.7. जब अति-निम्न घनत्व वाली गैस को परम शून्य ताप के निकट ठंडा किया जाता है तो कौन सी अवस्था बनती है?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Plasma &nbsp;&nbsp;&nbsp;&nbsp;(b) Bose-Einstein Condensate (BEC) &nbsp;&nbsp;&nbsp;&nbsp;(c) Superfluid &nbsp;&nbsp;&nbsp;&nbsp;(d) Dark Matter</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Bose-Einstein Condensate (BEC)', 'उत्तर: (b) बोस-आइंस्टीन कंडेनसेट (BEC)')}</span> • ${t(
          'Predicted by S.N. Bose & Albert Einstein at 0 Kelvin (-273.15°C).',
          'सत्येंद्र नाथ बोस और आइंस्टीन द्वारा 0 केल्विन (-273.15°C) पर अनुमानित।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          "Q8. In economic sector classifications, 'Red Collar Workers' belong to which economic sector?",
          "प्र.8. आर्थिक क्षेत्र वर्गीकरण में 'रेड कॉलर वर्कर' किस क्षेत्र से संबंधित हैं?"
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Secondary Sector &nbsp;&nbsp;&nbsp;&nbsp;(b) Primary Sector &nbsp;&nbsp;&nbsp;&nbsp;(c) Tertiary Sector &nbsp;&nbsp;&nbsp;&nbsp;(d) Quaternary Sector</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Primary Sector', 'उत्तर: (b) प्राथमिक क्षेत्र')}</span> • ${t(
          'Engaged in direct natural resource extraction like agriculture, mining, and forestry.',
          'कृषि, खनन और वानिकी जैसे प्राकृतिक संसाधनों के सीधे दोहन में संलग्न श्रमिक।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q9. Sattriya, the classical dance of Assam, was founded by which revered 15th-century Vaishnavite saint?',
          'प्र.9. असम का शास्त्रीय नृत्य सत्रिया किस 15वीं सदी के पूज्य वैष्णव संत द्वारा प्रवर्तित किया गया था?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Chaitanya Mahaprabhu &nbsp;&nbsp;&nbsp;&nbsp;(b) Srimanta Sankardev &nbsp;&nbsp;&nbsp;&nbsp;(c) Vallabhacharya &nbsp;&nbsp;&nbsp;&nbsp;(d) Madhavacharya</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Srimanta Sankardev', 'उत्तर: (b) श्रीमंत शंकरदेव')}</span> • ${t(
          'Recognized as classical dance by Sangeet Natak Akademi in the year 2000.',
          'वर्ष 2000 में संगीत नाटक अकादमी द्वारा शास्त्रीय नृत्य का दर्जा प्रदान किया गया।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          'Q10. In Kathakali, which Vesham (facial makeup) represents noble, virtuous, and divine heroes like Rama and Krishna?',
          'प्र.10. कथकली में कौन सा वेषम (मेकअप) श्रीराम और श्रीकृष्ण जैसे सदाचारी और दिव्य नायकों को दर्शाता है?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Kathi &nbsp;&nbsp;&nbsp;&nbsp;(b) Kari &nbsp;&nbsp;&nbsp;&nbsp;(c) Pacha &nbsp;&nbsp;&nbsp;&nbsp;(d) Thadi</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (c) Pacha (Green / हरा)', 'उत्तर: (c) पच्चा (हरा)')}</span> • ${t(
          'Symbolizes Satvika nature, righteousness, and divine character.',
          'सात्विक प्रकृति, धर्मपरायणता और दिव्यता का प्रतीक।'
        )}</div>
      </div>

      <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed ${cardBorder};">
        <strong style="font-size: 16px;">${t(
          "Q11. The famous 'Hornbill Festival' (Festival of Festivals) is celebrated annually in which Indian state?",
          "प्र.11. प्रसिद्ध 'हॉर्नबिल महोत्सव' (त्यौहारों का त्यौहार) प्रतिवर्ष किस भारतीय राज्य में मनाया जाता है?"
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) Mizoram &nbsp;&nbsp;&nbsp;&nbsp;(b) Nagaland &nbsp;&nbsp;&nbsp;&nbsp;(c) Manipur &nbsp;&nbsp;&nbsp;&nbsp;(d) Tripura</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) Nagaland', 'उत्तर: (b) नागालैंड')}</span> • ${t(
          'Celebrated at Kisama Naga Heritage Village near Kohima from 1 to 10 December.',
          '1 से 10 दिसंबर तक कोहिमा के निकट किसामा नागा हेरिटेज गांव में आयोजित।'
        )}</div>
      </div>

      <div>
        <strong style="font-size: 16px;">${t(
          'Q12. How many feathers are strictly present on an official standard badminton shuttlecock?',
          'प्र.12. एक आधिकारिक मानक बैडमिंटन शटलकॉक पर ठीक कितने पंख लगे होते हैं?'
        )}</strong><br/>
        <div style="margin-top: 2px;">(a) 14 Feathers &nbsp;&nbsp;&nbsp;&nbsp;(b) 16 Feathers &nbsp;&nbsp;&nbsp;&nbsp;(c) 18 Feathers &nbsp;&nbsp;&nbsp;&nbsp;(d) 20 Feathers</div>
        <div style="margin-top: 2px;"><span style="color: #10b981; font-weight: 700;">${t('Answer: (b) 16 Feathers', 'उत्तर: (b) 16 पंख')}</span> • ${t(
          'Sourced exclusively from goose/duck left wing; weight 4.74g to 5.50g.',
          'हंस या बत्तख के केवल बाएं पंख से लिए जाते हैं; वजन 4.74 से 5.50 ग्राम।'
        )}</div>
      </div>
    </div>
  `, p++, 'Practice Questions'));

  // ==========================================
  // PAGE 22: Official Closing Page (Ultra-HD Canvas)
  // ==========================================
  pages.push(`
    <div class="pdf-page-sheet" style="
      width: 960px;
      min-height: 1358px;
      max-height: 1358px;
      padding: 44px 48px;
      box-sizing: border-box;
      background: linear-gradient(180deg, #0d1527 0%, #050811 100%);
      color: #f8fafc;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    ">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 72px; font-weight: 900; color: rgba(255, 255, 255, 0.035); white-space: nowrap; letter-spacing: 0.15em;">
        GS BY DURGESH PANDEY SIR
      </div>

      <div style="position: relative; z-index: 1;">
        <div style="border-bottom: 2px solid #38bdf8; padding-bottom: 14px; margin-bottom: 24px;">
          <h2 style="font-size: 28px; font-weight: 900; color: #ffffff;">
            GS BY DURGESH PANDEY SIR
          </h2>
          <p style="font-size: 15px; color: #38bdf8; font-weight: 700;">
            ${t('General Awareness Master Revision Blueprint', 'सामान्य अध्ययन मास्टर पुनरीक्षण योजना')}
          </p>
        </div>

        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #334155; border-radius: 12px; padding: 22px 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #fbbf24; margin-bottom: 12px; text-transform: uppercase;">
            🎯 ${t('Recommended Revision Strategy for Top Rank in SSC', 'एसएससी में शीर्ष रैंक हेतु अनुशंसित पुनरीक्षण रणनीति')}:
          </h3>
          <ul style="font-size: 16px; line-height: 1.75; color: #cbd5e1; padding-left: 20px;">
            <li style="margin-bottom: 10px;">
              <strong>${t('Daily 30-Minute Recall', 'दैनिक 30 मिनट अभ्यास')}:</strong> ${t(
                'Revise 1 subject per day with special focus on mnemonic tricks (Delhi Sultanate, Tropic of Cancer states, Folk Dance mnemonics).',
                'प्रतिदिन 1 विषय का पुनरीक्षण करें और ट्रिक्स (दिल्ली सल्तनत, कर्क रेखा राज्य, लोक नृत्य) पर विशेष ध्यान दें।'
              )}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>${t('Active Visual Linking', 'दृश्य स्मृति अभ्यास')}:</strong> ${t(
                'Keep all 12 authentic photos and diagrams fresh in visual memory before entering the examination hall.',
                'परीक्षा हॉल में जाने से पूर्व सभी 12 प्रामाणिक तस्वीरों और आरेखों को अपनी स्मृति में दोहराएं।'
              )}
            </li>
            <li style="margin-bottom: 10px;">
              <strong>${t('Mock Test Practice', 'मॉक टेस्ट अभ्यास')}:</strong> ${t(
                'Solve past 5 years SSC CGL / CHSL / MTS tier-1 GS questions and cross-check with this master guide.',
                'विगत 5 वर्षों के एसएससी प्रश्नों को हल करें और इस मास्टर गाइड से मिलान करें।'
              )}
            </li>
            <li>
              <strong>${t('Fact Consistency', 'तथ्य सटीकता')}:</strong> ${t(
                'Focus on Constitutional articles, planetary figures, dates, and author-book matches.',
                'संवैधानिक अनुच्छेदों, ग्रहीय आंकड़ों, तिथियों और लेखक-पुस्तक मिलान पर विशेष ध्यान दें।'
              )}
            </li>
          </ul>
        </div>

        <div style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 12px; padding: 20px; text-align: center;">
          <div style="font-size: 19px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
            "सफलता का कोई शॉर्टकट नहीं होता, निरंतर अभ्यास और सही मार्गदर्शन ही विजय दिलाता है।"
          </div>
          <div style="font-size: 14px; color: #93c5fd; font-weight: 600;">
            — Durgesh Pandey Sir
          </div>
        </div>
      </div>

      <div style="position: relative; z-index: 1; border-top: 1px solid #334155; padding-top: 16px; text-align: center; font-size: 15.5px; color: #94a3b8;">
        <span style="font-weight: 800; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span> • All Rights Reserved • Verified Study Document
      </div>
    </div>
  `);

  return pages.join('');
}
