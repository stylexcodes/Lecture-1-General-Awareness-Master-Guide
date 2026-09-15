import { RootData, LanguageMode } from '../types';
import { preloadAllImages } from './imageLoader';

/**
 * Triggers opening of a high-resolution printable document in a new tab,
 * which bypasses iframe restrictions and enables native browser printing.
 */
export async function openPrintableDocumentInNewTab(
  data: RootData,
  activeLang: LanguageMode = 'bi',
  theme: 'dark' | 'light' = 'dark'
): Promise<void> {
  const imageMap = await preloadAllImages();
  const html = generateCompleteHtmlDocument(data, activeLang, imageMap, true, theme);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const newWin = window.open(url, '_blank');
  if (!newWin) {
    // If popup was blocked, fallback to direct download of the printable HTML
    const a = document.createElement('a');
    a.href = url;
    a.download = `GS_By_Durgesh_Pandey_Sir_Printable_Notes_${theme.toUpperCase()}_${activeLang.toUpperCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export function triggerPrintToPdf(): void {
  try {
    window.print();
  } catch (e) {
    console.warn('Direct print call failed, trying print document', e);
  }
}

/**
 * Generates an all-in-one standalone HTML file that can be opened in any
 * browser (desktop, tablet, mobile) with ZERO internet access.
 * Contains full notes, all subjects, all 12 photos embedded as Base64 data URLs,
 * interactive bilingual switcher, and the "GS BY DURGESH PANDEY SIR" watermark.
 */
export async function downloadOfflineHtml(
  data: RootData,
  activeLang: LanguageMode = 'bi',
  onProgress?: (pct: number, status: string) => void,
  theme: 'dark' | 'light' = 'dark'
): Promise<void> {
  if (onProgress) onProgress(10, 'Loading and embedding photos as offline Base64...');
  
  const imageMap = await preloadAllImages((loaded, total, label) => {
    if (onProgress) {
      const pct = 10 + Math.round((loaded / total) * 75);
      onProgress(pct, `Embedding photo (${loaded}/${total}): ${label}...`);
    }
  });

  if (onProgress) onProgress(90, 'Assembling complete offline guide...');

  const htmlContent = generateCompleteHtmlDocument(data, activeLang, imageMap, false, theme);

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GS_By_Durgesh_Pandey_Sir_Master_Notes_${theme.toUpperCase()}_${activeLang.toUpperCase()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (onProgress) onProgress(100, 'Offline HTML guide downloaded successfully!');
}

/**
 * Builds the complete standalone HTML string with all 8 subjects,
 * all 14 chapters, all tables, diagrams, and base64 embedded photos.
 */
function generateCompleteHtmlDocument(
  data: RootData,
  activeLang: LanguageMode,
  imageMap: Map<string, string>,
  isPrintView: boolean,
  theme: 'dark' | 'light' = 'dark'
): string {
  const generatedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getImg = (url: string) => imageMap.get(url) || url;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GS by Durgesh Pandey Sir - Master Study Notes (Offline &amp; Print Edition)</title>
  <style>
    :root {
      --bg-dark: #080c14;
      --card-bg: #0d1527;
      --border-color: #1e293b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent-cyan: #38bdf8;
      --accent-blue: #3b82f6;
      --accent-amber: #f59e0b;
      --watermark-text: rgba(255, 255, 255, 0.04);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      padding-bottom: 60px;
      position: relative;
    }

    /* Fixed Watermark Background */
    body::before {
      content: "GS BY DURGESH PANDEY SIR";
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-35deg);
      font-size: 8vw;
      font-weight: 900;
      color: var(--watermark-text);
      white-space: nowrap;
      pointer-events: none;
      z-index: 0;
      letter-spacing: 0.15em;
    }

    /* Floating Print Toolbar */
    .print-toolbar {
      background: #0f172a;
      border-bottom: 2px solid #2563eb;
      padding: 12px 20px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .print-btn {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    }
    .print-btn:hover {
      background: #1e40af;
    }

    header {
      background: #0b1120;
      border-bottom: 1px solid var(--border-color);
      padding: 24px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .watermark-pill {
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fcd34d;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 12px;
      border-radius: 9999px;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }
    .header-title {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
    }
    .header-subtitle {
      font-size: 13px;
      color: var(--text-muted);
    }
    .lang-controls {
      display: flex;
      background: #030712;
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      gap: 2px;
    }
    .lang-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .lang-btn.active {
      background: var(--accent-blue);
      color: #ffffff;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px 16px;
      position: relative;
      z-index: 1;
    }
    .subject-section {
      margin-bottom: 40px;
      page-break-after: auto;
    }
    .subject-header {
      background: linear-gradient(90deg, #1e293b 0%, #0f172a 100%);
      padding: 14px 20px;
      border-radius: 12px;
      border-left: 4px solid var(--accent-cyan);
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .subject-title {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
    }
    .chapter-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 22px;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    .chapter-title {
      font-size: 17px;
      font-weight: 700;
      color: #38bdf8;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chapter-content {
      font-size: 14px;
      color: #e2e8f0;
      line-height: 1.7;
    }
    .chapter-content ul {
      padding-left: 20px;
      margin: 10px 0;
    }
    .chapter-content li {
      margin-bottom: 8px;
    }
    .bi-en {
      display: block;
    }
    .bi-hi {
      display: block;
      color: #93c5fd;
      margin-top: 2px;
      font-size: 0.95em;
    }
    
    /* Image Preview Styling */
    .embedded-image-box {
      margin: 16px 0;
      background: #030712;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
    }
    .embedded-image-box img {
      max-width: 100%;
      height: auto;
      max-height: 480px;
      border-radius: 6px;
      display: block;
      margin: 0 auto;
      object-fit: contain;
    }
    .image-caption {
      margin-top: 8px;
      font-size: 11px;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
    }

    /* Mode variations */
    body.mode-en .bi-hi { display: none !important; }
    body.mode-hi .bi-en { display: none !important; }
    body.mode-hi .bi-hi { color: #f8fafc !important; }

    .card-footer-watermark {
      margin-top: 18px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #fbbf24;
      font-weight: 700;
    }
    .callout-box {
      background: rgba(30, 58, 138, 0.25);
      border: 1px solid rgba(59, 130, 246, 0.4);
      padding: 12px 16px;
      border-radius: 8px;
      margin: 12px 0;
      color: #bfdbfe;
    }

    /* Print Stylesheet */
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body.theme-light {
        background: #ffffff !important;
        color: #0f172a !important;
      }
      body.theme-light::before {
        color: rgba(0, 0, 0, 0.05) !important;
      }
      body.theme-light .chapter-card {
        border: 1px solid #cbd5e1 !important;
        background: #ffffff !important;
        box-shadow: none !important;
        page-break-inside: avoid;
        margin-bottom: 20px !important;
      }
      body.theme-light .chapter-title {
        color: #1e3a8a !important;
      }
      body.theme-light .bi-hi {
        color: #1d4ed8 !important;
      }
      body.theme-light .embedded-image-box {
        background: #ffffff !important;
        border: 1px solid #e2e8f0 !important;
      }
      body.theme-light .subject-header {
        background: #f1f5f9 !important;
        color: #0f172a !important;
        border-left: 4px solid #1e3a8a !important;
      }
      body.theme-light .subject-title {
        color: #0f172a !important;
      }

      /* Dark Theme Print Styles */
      body.theme-dark {
        background: #080c14 !important;
        color: #f8fafc !important;
      }
      body.theme-dark::before {
        color: rgba(255, 255, 255, 0.05) !important;
      }
      body.theme-dark .chapter-card {
        border: 1px solid #1e293b !important;
        background: #0d1527 !important;
        color: #f8fafc !important;
        page-break-inside: avoid;
        margin-bottom: 20px !important;
      }
      body.theme-dark .chapter-title {
        color: #38bdf8 !important;
      }
      body.theme-dark .bi-hi {
        color: #93c5fd !important;
      }
      body.theme-dark .embedded-image-box {
        background: #030712 !important;
        border: 1px solid #334155 !important;
      }
      body.theme-dark .subject-header {
        background: #0b1120 !important;
        color: #ffffff !important;
        border-left: 4px solid #38bdf8 !important;
      }
      body.theme-dark .subject-title {
        color: #ffffff !important;
      }
      body.theme-dark .callout-box {
        background: rgba(30, 58, 138, 0.4) !important;
        border-color: #3b82f6 !important;
        color: #dbeafe !important;
      }

      .print-toolbar, header, .lang-controls {
        display: none !important;
      }
      .embedded-image-box img {
        max-height: 400px !important;
      }
    }
  </style>
</head>
<body class="mode-${activeLang} theme-${theme}">
  <!-- Floating Print & Quick Actions Toolbar -->
  <div class="print-toolbar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="background: #f59e0b; color: #000; font-weight: 900; font-size: 11px; padding: 3px 8px; border-radius: 4px;">OFFICIAL</span>
      <span style="font-weight: 800; font-size: 14px; color: #ffffff;">GS BY DURGESH PANDEY SIR</span>
    </div>

    <div style="display: flex; align-items: center; gap: 10px;">
      <button class="print-btn" onclick="window.print()">
        🖨️ Print / Save as PDF (Ctrl + P)
      </button>

      <div class="lang-controls">
        <button class="lang-btn ${activeLang === 'en' ? 'active' : ''}" onclick="setOfflineLang('en')">English</button>
        <button class="lang-btn ${activeLang === 'bi' ? 'active' : ''}" onclick="setOfflineLang('bi')">Bilingual</button>
        <button class="lang-btn ${activeLang === 'hi' ? 'active' : ''}" onclick="setOfflineLang('hi')">हिंदी</button>
      </div>
    </div>
  </div>

  <header>
    <div class="header-brand">
      <div class="watermark-pill">⭐ GS BY DURGESH PANDEY SIR</div>
      <h1 class="header-title">${data.title} • Master Study Guide</h1>
      <div class="header-subtitle">${data.subtitle} • Complete Offline &amp; Print Edition</div>
    </div>
  </header>

  <div class="container">
    <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #bae6fd;">
      💾 <strong>Complete Offline Master Notes:</strong> Generated on ${generatedDate}. All 12 authentic study photos are embedded directly as Base64 data URLs. This file works completely offline anywhere on any device without internet.
    </div>

    ${buildAllChaptersSectionHtml(getImg)}
  </div>

  <script>
    function setOfflineLang(lang) {
      document.body.className = 'mode-' + lang;
      var btns = document.querySelectorAll('.lang-btn');
      btns.forEach(function(btn) {
        btn.classList.remove('active');
        if (
          (lang === 'en' && btn.innerText.includes('English')) ||
          (lang === 'bi' && btn.innerText.includes('Bilingual')) ||
          (lang === 'hi' && btn.innerText.includes('हिंदी'))
        ) {
          btn.classList.add('active');
        }
      });
    }

    ${isPrintView ? 'window.addEventListener("DOMContentLoaded", function() { setTimeout(function() { window.print(); }, 500); });' : ''}
  </script>
</body>
</html>`;
}

/**
 * Renders all 8 subjects and all 14 chapters with full rich notes,
 * tables, diagrams, and embedded photos with watermarks.
 */
function buildAllChaptersSectionHtml(getImg: (url: string) => string): string {
  return `
    <!-- SUBJECT 1: POLITY -->
    <section class="subject-section" id="subject-polity">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 1: Indian Polity &amp; Constitution</span>
          <span class="bi-hi">विषय 1: भारतीय राजव्यवस्था एवं संविधान</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- Chapter 1: Constituent Assembly -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 1. Constituent Assembly of India</span>
          <span class="bi-hi">📌 1. भारत की संविधान सभा</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>1934:</strong> The idea of a Constituent Assembly for India was put forward for the first time by <strong>M.N. Roy</strong> (pioneer of the communist movement in India).</span><span class="bi-hi"><strong>1934:</strong> भारत के लिए संविधान सभा का विचार पहली बार <strong>एम.एन. रॉय</strong> द्वारा प्रस्तुत किया गया था।</span></li>
            <li><span class="bi-en"><strong>1935:</strong> Indian National Congress (INC) officially demanded a Constituent Assembly to frame the Constitution of India.</span><span class="bi-hi"><strong>1935:</strong> भारतीय राष्ट्रीय कांग्रेस ने आधिकारिक तौर पर संविधान सभा की मांग की।</span></li>
            <li><span class="bi-en"><strong>1940:</strong> The British Government accepted the demand in principle through the 'August Offer'.</span><span class="bi-hi"><strong>1940:</strong> ब्रिटिश सरकार ने 'अगस्त प्रस्ताव' के माध्यम से सैद्धांतिक रूप से इस मांग को स्वीकार किया।</span></li>
            <li><span class="bi-en"><strong>Cabinet Mission Plan (1946):</strong> Sent by British PM Clement Attlee. Comprised <strong>3 British Cabinet Ministers</strong>: Lord Pethick Lawrence (Chairman &amp; Secretary of State for India), Sir Stafford Cripps (President of the Board of Trade), and A.V. Alexander (First Lord of the Admiralty).</span><span class="bi-hi"><strong>कैबिनेट मिशन योजना (1946):</strong> ब्रिटिश पीएम क्लेमेंट एटली द्वारा भेजा गया। 3 कैबिनेट मंत्री: लॉर्ड पेथिक लॉरेंस (अध्यक्ष), सर स्टैफोर्ड क्रिप्स, ए.वी. अलेक्जेंडर।</span></li>
            <li><span class="bi-en"><strong>Total Seat Allocation (389 Seats):</strong> 296 seats allocated to British India and 93 seats to Princely States. Roughly 1 seat per 1 Million (10 Lakh) population.</span><span class="bi-hi"><strong>कुल 389 सीटें:</strong> 296 सीटें ब्रिटिश भारत को और 93 सीटें देशी रियासतों को। लगभग 10 लाख जनसंख्या पर 1 सीट।</span></li>
            <li><span class="bi-en"><strong>Elections:</strong> Held in July–August 1946. Indian National Congress won 208 seats, Muslim League won 73 seats, and small groups/independents won 15 seats.</span><span class="bi-hi"><strong>चुनाव:</strong> जुलाई-अगस्त 1946 में। कांग्रेस 208 सीटें, मुस्लिम लीग 73 सीटें, निर्दलीय 15 सीटें।</span></li>
            <li><span class="bi-en"><strong>First Meeting:</strong> 9 December 1946. Dr. Sachchidananda Sinha was elected as the temporary President following the French practice.</span><span class="bi-hi"><strong>पहली बैठक:</strong> 9 दिसंबर 1946। डॉ. सच्चिदानंद सिन्हा अस्थायी अध्यक्ष बने।</span></li>
            <li><span class="bi-en"><strong>Permanent President:</strong> On 11 December 1946, <strong>Dr. Rajendra Prasad</strong> was elected permanent President; H.C. Mukherjee and V.T. Krishnamachari were elected Vice-Presidents.</span><span class="bi-hi"><strong>स्थायी अध्यक्ष:</strong> 11 दिसंबर 1946, <strong>डॉ. राजेंद्र प्रसाद</strong> स्थायी अध्यक्ष निर्वाचित हुए।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Making of Indian constitution_.png')}" alt="Making of Indian Constitution" />
            <div class="image-caption">📷 PHOTO: Making of Indian Constitution • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC CGL / CHSL / MTS Polity</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Chapter 2: Drafting Committee & Organs of Govt -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 2. Drafting Committee &amp; Organs of Government</span>
          <span class="bi-hi">📌 2. प्रारूप समिति और सरकार के अंग</span>
        </h3>
        <div class="chapter-content">
          <div class="callout-box">
            <strong>Key Milestone Dates &amp; Figures:</strong><br/>
            • <strong>Constitutional Advisor:</strong> Sir B.N. Rau (Benegal Narsing Rau).<br/>
            • <strong>Drafting Committee Setup:</strong> 29 August 1947.<br/>
            • <strong>Chairman:</strong> Dr. B.R. Ambedkar.<br/>
            • <strong>7 Committee Members:</strong> 1. Dr. B.R. Ambedkar (Chairman), 2. Alladi Krishnaswamy Iyer, 3. N. Gopalaswami Ayyangar, 4. K.M. Munshi, 5. Mohammad Saadulla, 6. N. Madhava Rau (replaced B.L. Mitter), 7. T.T. Krishnamachari (replaced D.P. Khaitan).<br/>
            • <strong>Total Time:</strong> 2 Years, 11 Months, 18 Days (11 Sessions, 165 Days).<br/>
            • <strong>Adopted:</strong> 26 November 1949 (Constitution Day).<br/>
            • <strong>Enforced:</strong> 26 January 1950 (Republic Day).<br/>
            • <strong>Calligraphy:</strong> Prem Behari Narain Raizada (English italic), Vasant Krishna Vaidya (Hindi).
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Exam Key Polity Fact Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 2: GEOGRAPHY & SPACE -->
    <section class="subject-section" id="subject-geography">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 2: Geography &amp; Space Science</span>
          <span class="bi-hi">विषय 2: भूगोल एवं अंतरिक्ष विज्ञान</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- Origin of Universe -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 3. Origin of Universe Theories</span>
          <span class="bi-hi">📌 3. ब्रह्मांड की उत्पत्ति के सिद्धांत</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Cosmology:</strong> Study of the origin, evolution, and eventual fate of the universe. Age of universe: ~13.8 Billion years.</span><span class="bi-hi"><strong>कॉस्मोलॉजी:</strong> ब्रह्मांड की उत्पत्ति और संरचना का अध्ययन। ब्रह्मांड की आयु: लगभग 13.8 बिलियन वर्ष।</span></li>
            <li><span class="bi-en"><strong>Big Bang Theory:</strong> Formulated by Georges Lemaître (1931). Confirmed by Edwin Hubble (1929) demonstrating universe expansion via redshift.</span><span class="bi-hi"><strong>बिग बैंग सिद्धांत:</strong> जॉर्ज लेमैत्रे (1931) द्वारा। एडविन हबल द्वारा पुष्टि।</span></li>
            <li><span class="bi-en"><strong>Nebular Theory (1755):</strong> Proposed by Immanuel Kant, mathematically revised by Pierre-Simon Laplace in 1796.</span><span class="bi-hi"><strong>नेबुलर सिद्धांत (1755):</strong> इमैनुएल कांट द्वारा, 1796 में लाप्लास द्वारा संशोधित।</span></li>
            <li><span class="bi-en"><strong>Planetesimal Theory (1905):</strong> Proposed by Thomas Chamberlin and Forest Ray Moulton.</span><span class="bi-hi"><strong>ग्रहाणु सिद्धांत (1905):</strong> थॉमस चेम्बरलेन और फॉरेस्ट रे मौलटन द्वारा।</span></li>
            <li><span class="bi-en"><strong>Steady State Theory:</strong> Proposed by Fred Hoyle, Hermann Bondi, and Thomas Gold.</span><span class="bi-hi"><strong>स्थिर अवस्था सिद्धांत:</strong> फ्रेड हॉयल, हरमन बोंडी और थॉमस गोल्ड द्वारा।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Organ of Universe Theories_.png')}" alt="Universe Theories" />
            <div class="image-caption">📷 PHOTO: Origin of Universe Theories • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Astronomy Master Guide</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Solar System & Planets -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 4. Solar System &amp; Planets</span>
          <span class="bi-hi">📌 4. सौर मंडल और ग्रह</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>The Sun:</strong> Distance: 14.96 crore km (~150M km). Light travel time: 8 min 20 sec (500 seconds). Surface temp: ~6000°C. Composed of Hydrogen (~71%) and Helium (~26.5%).</span><span class="bi-hi"><strong>सूर्य:</strong> दूरी: 14.96 करोड़ किमी। प्रकाश पहुंचने का समय: 8 मिनट 20 सेकंड (500 सेकंड)। सतह तापमान: 6000°C।</span></li>
            <li><span class="bi-en"><strong>Venus:</strong> Hottest planet (465°C, 96% CO<sub>2</sub> greenhouse effect). Morning and Evening Star. Earth's twin. Rotates clockwise (East to West).</span><span class="bi-hi"><strong>शुक्र:</strong> सबसे गर्म ग्रह (465°C)। भोर और सांझ का तारा। पृथ्वी की जुड़वां बहन। दक्षिणावर्त (पूर्व से पश्चिम) घूर्णन।</span></li>
            <li><span class="bi-en"><strong>Mars:</strong> Red Planet (Iron Oxide). Moons: Phobos and Deimos. Olympus Mons: Tallest volcano in solar system.</span><span class="bi-hi"><strong>मंगल:</strong> लाल ग्रह (आयरन ऑक्साइड)। उपग्रह: फोबोस और डीमोस। ओलंपस मॉन्स ज्वालामुखी।</span></li>
            <li><span class="bi-en"><strong>Jupiter:</strong> Largest planet. Fastest rotation (9.9 hours). Ganymede is the largest satellite in the solar system.</span><span class="bi-hi"><strong>बृहस्पति:</strong> सबसे बड़ा ग्रह। सबसे तेज घूर्णन (9.9 घंटे)। गेनीमेड सबसे बड़ा उपग्रह।</span></li>
            <li><span class="bi-en"><strong>Saturn:</strong> Spectacular ring system. Moon Titan. Least density (floats on water).</span><span class="bi-hi"><strong>शनि:</strong> सुंदर वलय प्रणाली। उपग्रह टाइटन। सबसे कम घनत्व (पानी पर तैर सकता है)।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Solar System.png')}" alt="Solar System" />
            <div class="image-caption">📷 PHOTO: Solar System Planetary Chart • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Geography Planetary Notes</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Latitudes, Longitudes & Lines -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 5. Earth Latitudes, Longitudes &amp; Climate Zones</span>
          <span class="bi-hi">📌 5. पृथ्वी की रेखाएँ, अक्षांश, देशांतर और जलवायु क्षेत्र</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Equator (0°):</strong> Divides earth into Northern &amp; Southern hemispheres.</span><span class="bi-hi"><strong>भूमध्य रेखा (0°):</strong> पृथ्वी को उत्तरी और दक्षिणी गोलार्ध में विभाजित करती है।</span></li>
            <li><span class="bi-en"><strong>Tropic of Cancer (23.5° N):</strong> Passes through 8 Indian States: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram. <em>(Trick: मित्र पर गमछा झार)</em>.</span><span class="bi-hi"><strong>कर्क रेखा (23.5° N):</strong> 8 भारतीय राज्यों से गुजरती है: गुजरात, राजस्थान, म.प्र., छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।</span></li>
            <li><span class="bi-en"><strong>Prime Meridian (0°):</strong> Greenwich, London. Standard reference for UTC.</span><span class="bi-hi"><strong>प्रधान मध्याह्न रेखा (0°):</strong> ग्रीनविच, लंदन। यूटीसी का संदर्भ।</span></li>
            <li><span class="bi-en"><strong>Indian Standard Time (IST - 82.5° E):</strong> Passes through Mirzapur, Prayagraj (UP). IST is 5 hrs 30 mins ahead of GMT.</span><span class="bi-hi"><strong>भारतीय मानक समय (82.5° E):</strong> मिर्जापुर (उ.प्र.) से गुजरती है। GMT से 5 घंटे 30 मिनट आगे।</span></li>
            <li><span class="bi-en"><strong>International Date Line (180°):</strong> Zigzag line in the Pacific Ocean (Bering Strait) where the date changes by 1 full day.</span><span class="bi-hi"><strong>अंतर्राष्ट्रीय तिथि रेखा (180°):</strong> प्रशांत महासागर (बेरिंग जलडमरूमध्य) में टेढ़ी-मेढ़ी रेखा जहां तिथि 1 दिन बदलती है।</span></li>
          </ul>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin: 16px 0;">
            <div class="embedded-image-box">
              <img src="${getImg('/Line.png')}" alt="Lines" />
              <div class="image-caption">📷 PHOTO: Latitudes &amp; Longitudes</div>
            </div>
            <div class="embedded-image-box">
              <img src="${getImg('/Important Lines.png')}" alt="Important Lines" />
              <div class="image-caption">📷 PHOTO: Earth Climate Zones</div>
            </div>
            <div class="embedded-image-box">
              <img src="${getImg('/International Date Line.png')}" alt="International Date Line" />
              <div class="image-caption">📷 PHOTO: International Date Line (180°)</div>
            </div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC World &amp; Indian Geography</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 3: HISTORY -->
    <section class="subject-section" id="subject-history">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 3: History (Ancient &amp; Medieval)</span>
          <span class="bi-hi">विषय 3: इतिहास (प्राचीन एवं मध्यकालीन)</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- 3 Age & Pottery -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 6. CJ Thomsen 3-Age Classification &amp; Pottery Timeline</span>
          <span class="bi-hi">📌 6. सी.जे. थॉमसन 3-युग वर्गीकरण और मृद्भाण्ड कालक्रम</span>
        </h3>
        <div class="chapter-content">
          <div class="callout-box">
            <strong>C.J. Thomsen 3-Age System (1836):</strong><br/>
            1. Stone Age (Paleolithic ➔ Mesolithic ➔ Neolithic)<br/>
            2. Bronze Age (Harappan / Indus Valley Civilization)<br/>
            3. Iron Age (Vedic &amp; Mahajanapada Era)
          </div>
          <ul>
            <li><span class="bi-en"><strong>OCP (Ochre Coloured Pottery):</strong> Neolithic / Late Harappan / Copper Hoard Culture.</span><span class="bi-hi"><strong>गेरुआ मृद्भाण्ड (OCP):</strong> नवपाषाण / उत्तर हड़प्पा / ताम्र संचय संस्कृति।</span></li>
            <li><span class="bi-en"><strong>BRW (Black and Red Ware):</strong> Chalcolithic &amp; Early Iron Age.</span><span class="bi-hi"><strong>काले और लाल मृद्भाण्ड (BRW):</strong> ताम्रपाषाण और प्रारंभिक लौह युग।</span></li>
            <li><span class="bi-en"><strong>PGW (Painted Grey Ware):</strong> Later Vedic Period (Rigvedic/Kuru-Panchala).</span><span class="bi-hi"><strong>चित्रित धूसर मृद्भाण्ड (PGW):</strong> उत्तर वैदिक काल।</span></li>
            <li><span class="bi-en"><strong>NBPW (Northern Black Polished Ware):</strong> Mauryan Era &amp; Second Urbanization. Luxury glossy black finish.</span><span class="bi-hi"><strong>उत्तरी काली पॉलिशदार मृद्भाण्ड (NBPW):</strong> मौर्य काल एवं द्वितीय नगरीकरण।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Ancient History Pottery Guide</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Delhi Sultanate -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 7. Delhi Sultanate (1206–1526 AD)</span>
          <span class="bi-hi">📌 7. दिल्ली सल्तनत (1206-1526 ई.)</span>
        </h3>
        <div class="chapter-content">
          <div class="callout-box">
            <strong>Dynasty Trick: Sa - K - T - Sa - Lo</strong><br/>
            Slave (1206-90) ➔ Khilji (1290-1320) ➔ Tughlaq (1320-1414) ➔ Sayyid (1414-51) ➔ Lodhi (1451-1526)
          </div>
          <ul>
            <li><span class="bi-en"><strong>Qutubuddin Aibak:</strong> Founder. 'Lakh Baksh'. Started Qutub Minar. Died playing Chaugan (Polo).</span><span class="bi-hi"><strong>कुतुबुद्दीन ऐबक:</strong> संस्थापक। 'लाख बख्श'। चौगान (पोलो) खेलते समय मृत्यु।</span></li>
            <li><span class="bi-en"><strong>Iltutmish:</strong> Real founder. Established Turkan-i-Chahalgani (Group of 40) &amp; Iqta system. Introduced silver Tanka &amp; copper Jital.</span><span class="bi-hi"><strong>इल्तुतमिश:</strong> वास्तविक संस्थापक। तुर्कान-ए-चहलगानी और इक्ता प्रणाली। चांदी का टका और तांबे का जीतल।</span></li>
            <li><span class="bi-en"><strong>Razia Sultana:</strong> First and only Muslim woman ruler of Delhi.</span><span class="bi-hi"><strong>रजिया सुल्ताना:</strong> दिल्ली की पहली और एकमात्र महिला मुस्लिम शासक।</span></li>
            <li><span class="bi-en"><strong>Balban:</strong> Policy of 'Blood and Iron'. Sijda, Paibos, Navroz festival. Destroyed Chahalgani.</span><span class="bi-hi"><strong>बलबन:</strong> 'लौह और रक्त' नीति। सिजदा, पैबोस और नवरोज उत्सव।</span></li>
            <li><span class="bi-en"><strong>Alauddin Khilji:</strong> Market price reforms, Dagh (branding horses), Chehra (descriptive rolls), Alai Darwaza, Siri Fort.</span><span class="bi-hi"><strong>अलाउद्दीन खिलजी:</strong> बाजार नियंत्रण, दाग और चेहरा प्रथा, अलाई दरवाजा, सिरी किला।</span></li>
            <li><span class="bi-en"><strong>Muhammad bin Tughlaq:</strong> Capital shifted to Daulatabad, token copper currency, Ibn Battuta arrived during his reign.</span><span class="bi-hi"><strong>मोहम्मद बिन तुगलक:</strong> दौलताबाद राजधानी स्थानांतरण, सांकेतिक मुद्रा, इब्न बतूता का आगमन।</span></li>
            <li><span class="bi-en"><strong>Ibrahim Lodhi:</strong> Defeated by Babur in 1st Battle of Panipat (1526), ending the Sultanate.</span><span class="bi-hi"><strong>इब्राहिम लोधी:</strong> पानीपत की पहली लड़ाई (1526) में बाबर द्वारा पराजित।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Medieval India Sultanate Notes</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 4: SCIENCE -->
    <section class="subject-section" id="subject-science">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 4: General Science (Biology &amp; Physics)</span>
          <span class="bi-hi">विषय 4: सामान्य विज्ञान (जीव विज्ञान एवं भौतिकी)</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- Cell Biology -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 8. Cell Biology, Organelles &amp; Solution Tonicity</span>
          <span class="bi-hi">📌 8. कोशिका विज्ञान, अंगक और टोनिसिटी</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Cell Discovery:</strong> Robert Hooke (1665 dead cork cells); Antonie van Leeuwenhoek (1674 first living free cells).</span><span class="bi-hi"><strong>कोशिका खोज:</strong> रॉबर्ट हुक (1665 मृत कॉर्क कोशिकाएं); एंटोनी वैन लीउवेनहोक (1674 पहली जीवित कोशिकाएं)।</span></li>
            <li><span class="bi-en"><strong>Cell Theory:</strong> Schleiden (1838) &amp; Schwann (1839). Rudolf Virchow (1855: <em>Omnis cellula-e-cellula</em>).</span><span class="bi-hi"><strong>कोशिका सिद्धांत:</strong> श्लीडेन (1838) और श्वान (1839)। रुडोल्फ विरचो (1855)।</span></li>
            <li><span class="bi-en"><strong>Mitochondria:</strong> 'Powerhouse of the cell'. Cellular respiration, produces ATP. Has own DNA and ribosomes.</span><span class="bi-hi"><strong>माइटोकॉन्ड्रिया:</strong> 'कोशिका का पावरहाउस'। एटीपी का निर्माण। स्वयं का डीएनए।</span></li>
            <li><span class="bi-en"><strong>Lysosomes:</strong> 'Suicidal bags' of the cell. Contain digestive hydrolytic enzymes.</span><span class="bi-hi"><strong>लाइसोसोम:</strong> 'आत्मघाती थैली'। पाचक एंजाइम।</span></li>
            <li><span class="bi-en"><strong>Ribosomes:</strong> 'Protein factories'. Discovered by George Palade.</span><span class="bi-hi"><strong>राइबोसोम:</strong> 'प्रोटीन की फैक्ट्री'। जॉर्ज पैलेड द्वारा खोज।</span></li>
            <li><span class="bi-en"><strong>Solution Tonicity:</strong> Hypotonic (cell swells via endosmosis), Hypertonic (cell shrinks via plasmolysis), Isotonic (no net size change).</span><span class="bi-hi"><strong>घोल की टोनिसिटी:</strong> हाइपोटोनिक (कोशिका फूलती है), हाइपरटोनिक (सिकुड़ती है), आइसोटोनिक (समान रहती है)।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC General Science Biology Notes</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- States of Matter & Bosons -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 9. States of Matter &amp; Boson Physics</span>
          <span class="bi-hi">📌 9. पदार्थ की अवस्थाएँ और बोसॉन भौतिकी</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>5 States of Matter:</strong> Solid, Liquid, Gas, Plasma (superheated ionized gas), Bose-Einstein Condensate (BEC / Bosons).</span><span class="bi-hi"><strong>पदार्थ की 5 अवस्थाएँ:</strong> ठोस, द्रव, गैस, प्लाज्मा, बोस-आइंस्टीन कंडेनसेट (बीईसी / बोसॉन)।</span></li>
            <li><span class="bi-en"><strong>BEC (Bosons):</strong> Super-cooled gas of extremely low density near Absolute Zero (0 Kelvin / -273.15°C). Atoms merge into a single 'super atom'. Predicted by S.N. Bose &amp; Albert Einstein (1924-25).</span><span class="bi-hi"><strong>बीईसी (बोसॉन):</strong> परम शून्य (0 K) पर अत्यधिक ठंडी की गई गैस। एस.एन. बोस और आइंस्टीन द्वारा भविष्यवाणी।</span></li>
            <li><span class="bi-en"><strong>Nobel Prizes:</strong> 2001 Nobel to Eric Cornell &amp; Carl Wieman for synthesizing BEC. 2013 Nobel to Francois Englert &amp; Peter Higgs for Higgs Boson ('God Particle') discovered at CERN LHC in 2012.</span><span class="bi-hi"><strong>नोबेल पुरस्कार:</strong> 2001 में कॉर्नेल और वीमन को; 2013 में हिग्स बोसॉन ('गॉड पार्टिकल') के लिए पीटर हिग्स और फ्रांस्वा एंगलर्ट को।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/State Of matter_.png')}" alt="States of Matter" />
            <div class="image-caption">📷 PHOTO: States of Matter &amp; Phase Changes • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Physics &amp; Chemistry Master Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 5: ECONOMICS -->
    <section class="subject-section" id="subject-economics">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 5: Indian Economy &amp; Collar Jobs</span>
          <span class="bi-hi">विषय 5: भारतीय अर्थव्यवस्था एवं कॉलर जॉब्स</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 10. Micro vs Macro &amp; 5 Sectors of Economy</span>
          <span class="bi-hi">📌 10. व्यष्टि vs समष्टि अर्थशास्त्र और 5 आर्थिक क्षेत्र</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Microeconomics:</strong> Individual consumers, demand-supply, price theory. Father: <strong>Adam Smith</strong> (<em>Wealth of Nations</em>, 1776).</span><span class="bi-hi"><strong>व्यष्टि अर्थशास्त्र:</strong> व्यक्तिगत इकाइयां, मांग-आपूर्ति, मूल्य सिद्धांत। जनक: <strong>एडम स्मिथ</strong>।</span></li>
            <li><span class="bi-en"><strong>Macroeconomics:</strong> Whole economy, GDP, inflation, fiscal policy. Father: <strong>John Maynard Keynes</strong> (1936).</span><span class="bi-hi"><strong>समष्टि अर्थशास्त्र:</strong> समग्र अर्थव्यवस्था, जीडीपी, मुद्रास्फीति। जनक: <strong>जे.एम. कीन्स</strong>।</span></li>
            <li><span class="bi-en"><strong>Sectors:</strong> Primary (agriculture, mining), Secondary (manufacturing, factories), Tertiary (services, banking), Quaternary (knowledge, research), Quinary (top decision makers, CEOs, ministers).</span><span class="bi-hi"><strong>आर्थिक क्षेत्र:</strong> प्राथमिक (कृषि, खनन), द्वितीयक (विनिर्माण), तृतीयक (सेवाएं), चतुर्थक (अनुसंधान, ज्ञान), पंचम (नीति निर्माता, शीर्ष अधिकारी)।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Indian Economy Core Concepts</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 11. The 8 Collar Jobs of the Modern Workforce</span>
          <span class="bi-hi">📌 11. कार्यबल की 8 कॉलर जॉब्स</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Red Collar:</strong> Primary sector outdoor manual labor (farmers, loggers, miners).</span><span class="bi-hi"><strong>रेड कॉलर:</strong> प्राथमिक क्षेत्र के श्रमिक (कृषि, वानिकी)।</span></li>
            <li><span class="bi-en"><strong>Blue Collar:</strong> Secondary sector factory workers and skilled mechanical trades.</span><span class="bi-hi"><strong>ब्लू कॉलर:</strong> द्वितीयक क्षेत्र के कारखाने और तकनीकी मजदूर।</span></li>
            <li><span class="bi-en"><strong>White Collar:</strong> Salaried desk job professionals and corporate executives.</span><span class="bi-hi"><strong>व्हाइट कॉलर:</strong> कार्यालयी एवं प्रशासनिक वेतनभोगी कर्मचारी।</span></li>
            <li><span class="bi-en"><strong>Pink Collar:</strong> Service caregiving roles (nurses, receptionists, teachers).</span><span class="bi-hi"><strong>पिंक कॉलर:</strong> सेवा और देखभाल से संबंधित नौकरियां।</span></li>
            <li><span class="bi-en"><strong>Gold Collar:</strong> Highly skilled elite professionals (surgeons, scientists, lawyers).</span><span class="bi-hi"><strong>गोल्ड कॉलर:</strong> अत्यधिक कुशल शीर्ष पेशेवर (सर्जन, वैज्ञानिक)।</span></li>
            <li><span class="bi-en"><strong>Green Collar:</strong> Clean energy, sustainability, and solar/wind technology.</span><span class="bi-hi"><strong>ग्रीन कॉलर:</strong> पर्यावरण और नवीकरणीय ऊर्जा से जुड़े कार्यकर्ता।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Collar Jobs.png')}" alt="Collar Jobs" />
            <div class="image-caption">📷 PHOTO: 8 Collar Jobs Breakdown • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Economics Collar Jobs Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 6: ART & CULTURE -->
    <section class="subject-section" id="subject-art-culture">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 6: Art &amp; Culture of India</span>
          <span class="bi-hi">विषय 6: भारत की कला एवं संस्कृति</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- 8 Classical Dances -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 12. 8 Classical Dances of India</span>
          <span class="bi-hi">📌 12. भारत के 8 शास्त्रीय नृत्य</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Bharatnatyam (Tamil Nadu):</strong> Oldest classical dance, originated in temples, Bharata Muni's Natya Shastra, Ekaharya solo dance.</span><span class="bi-hi"><strong>भरतनाट्यम (तमिलनाडु):</strong> सबसे प्राचीन, नाट्यशास्त्र पर आधारित, एकल प्रदर्शन (एकहार्य)।</span></li>
            <li><span class="bi-en"><strong>Kathakali (Kerala):</strong> Dance-drama, dramatic makeup, mudras, enacts Ramayana/Mahabharata.</span><span class="bi-hi"><strong>कथकली (केरल):</strong> नृत्य-नाटिका, मुखौटा रूपी मेकअप, महाकाव्य प्रसंग।</span></li>
            <li><span class="bi-en"><strong>Mohiniattam (Kerala):</strong> 'Dance of the Enchantress', Lasya style, white and gold kasavu dress.</span><span class="bi-hi"><strong>मोहिनीअट्टम (केरल):</strong> लास्य शैली, सफेद और सुनहरी कसावू पोशाक।</span></li>
            <li><span class="bi-en"><strong>Kathak (UP / North India):</strong> Storytellers, intricate footwork (Tatkar), pirouettes (Chakkar).</span><span class="bi-hi"><strong>कथक (उत्तर प्रदेश):</strong> पद संचालन (तत्कार), चक्कर, कथक घराने।</span></li>
            <li><span class="bi-en"><strong>Kuchipudi (Andhra Pradesh):</strong> Kuchelapuram origin, Tarangam (dancing on brass plate edge).</span><span class="bi-hi"><strong>कुचिपुड़ी (आंध्र प्रदेश):</strong> कुचेलापुरम, पीतल की थाली के किनारे पर नृत्य (तरंगम)।</span></li>
            <li><span class="bi-en"><strong>Odissi (Odisha):</strong> Tribhanga posture, Chowk stance, Mahari and Gotipua traditions.</span><span class="bi-hi"><strong>ओडिसी (ओडिशा):</strong> त्रिभंग मुद्रा, चौक stance, महारी परंपरा।</span></li>
            <li><span class="bi-en"><strong>Manipuri (Manipur):</strong> Raasleela of Radha-Krishna, Pung Cholom drum.</span><span class="bi-hi"><strong>मणिपुरी (मणिपुर):</strong> राधा-कृष्ण रासलीला, पुंग चोलोम ढोल नृत्य।</span></li>
            <li><span class="bi-en"><strong>Sattriya (Assam):</strong> Propounded by Srimanta Sankardev in 15th century. Recognized by SNA in 2000.</span><span class="bi-hi"><strong>सत्रिया (असम):</strong> श्रीमंत शंकरदेव द्वारा प्रतिपादित। वर्ष 2000 में मान्यता।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Classical dance_.png')}" alt="Classical Dances" />
            <div class="image-caption">📷 PHOTO: 8 Classical Dance Forms • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Art &amp; Culture Classical Dances</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Kathakali Vesham -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 13. The 6 Types of Kathakali Vesham (Makeup)</span>
          <span class="bi-hi">📌 13. कथकली वेषम (मेकअप) के 6 प्रकार</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Pacha (Green):</strong> Satvika character. Noble, heroic gods and kings (Rama, Krishna, Arjuna).</span><span class="bi-hi"><strong>पचा (हरा):</strong> सात्विक पात्र। श्रेष्ठ, नीतिवान देवता और राजा (राम, कृष्ण, अर्जुन)।</span></li>
            <li><span class="bi-en"><strong>Kathi (Knife):</strong> Rajasika character. Arrogant, evil royalty possessing bravery tainted by ego (Ravana, Duryodhana). Red knife patterns.</span><span class="bi-hi"><strong>कथी (चाकू):</strong> राजसिक पात्र। घमंडी दुष्ट राजा (रावण, दुर्योधन)।</span></li>
            <li><span class="bi-en"><strong>Thadi (Beards):</strong> Chuvanna Thadi (Red beard, demonic villains), Vella Thadi (White beard, divine higher beings like Hanuman), Karutha Thadi (Black beard, hunters).</span><span class="bi-hi"><strong>थाड़ी (दाढ़ी):</strong> लाल दाढ़ी (राक्षसी दुष्ट), सफेद दाढ़ी (हनुमान जी जैसे दिव्य पात्र), काली दाढ़ी (शिकारी)।</span></li>
            <li><span class="bi-en"><strong>Kari (Black):</strong> Evil demonesses (Surpanakha). Black face and black attire.</span><span class="bi-hi"><strong>कारी (काला):</strong> दुष्ट राक्षसियां (शूर्पणखा)।</span></li>
            <li><span class="bi-en"><strong>Minukku (Radiant):</strong> Gentle women, heroines, sages, Brahmins (Sita, Draupadi). Warm apricot base.</span><span class="bi-hi"><strong>मिनुक्कू (चमकदार):</strong> सौम्य स्त्रियां, सीता, द्रौपदी, ऋषि।</span></li>
            <li><span class="bi-en"><strong>Pazhuppu (Ripe):</strong> Orange-red face for revered divinities like Lord Shiva and Balarama.</span><span class="bi-hi"><strong>पझुप्पु (पक्व):</strong> भगवान शिव और बलराम जैसे आराध्य देवों के लिए नारंगी-लाल रंग।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Types of Kathakali Vesham  (Makeup).png')}" alt="Kathakali Vesham" />
            <div class="image-caption">📷 PHOTO: Types of Kathakali Vesham (Makeup) • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Art &amp; Culture Kathakali Vesham</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Folk Dances & Tricks -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 14. Folk Dances &amp; Memory Tricks</span>
          <span class="bi-hi">📌 14. लोक नृत्य और याद रखने की ट्रिक्स</span>
        </h3>
        <div class="chapter-content">
          <div class="callout-box">
            <strong>State-wise Memory Tricks:</strong><br/>
            • <strong>Maharashtra:</strong> Lavani, Koli, Tamasha, Dhangari Gaja, Lezim. <em>Trick: "Kohli Vadapav Lana, Tamasha mat kar, Dhang se Lavani dekh!"</em><br/>
            • <strong>Karnataka:</strong> Yakshagana, Dollu Kunitha, Bhootha Kola, Nagamandala. <em>Trick: "Yash bola Kam kar Saale, Doll, Bhootha, Nagamandali ke sath!"</em><br/>
            • <strong>Gujarat:</strong> Garba, Dandiya Raas, Bhavai, Tippani.<br/>
            • <strong>Rajasthan:</strong> Ghoomar, Kalbelia (UNESCO recognized snake dance), Bhavai, Chari, Gair, Chakri.<br/>
            • <strong>Punjab:</strong> Bhangra, Giddha, Sammi, Kikli.<br/>
            • <strong>Assam:</strong> Bihu, Bagurumba, Jhumur.
          </div>

          <div class="embedded-image-box">
            <img src="${getImg('/Folk Dance Trick.png')}" alt="Folk Dance Tricks" />
            <div class="image-caption">📷 PHOTO: Folk Dance Mnemonic Tricks • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Folk Dances Trick Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Major Festivals -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 15. Major Festivals of India</span>
          <span class="bi-hi">📌 15. भारत के प्रमुख त्यौहार</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Hornbill Festival (Nagaland):</strong> 'Festival of Festivals', 1-10 December at Kisama Naga Heritage Village, Kohima.</span><span class="bi-hi"><strong>हॉर्नबिल महोत्सव (नागालैंड):</strong> 'त्यौहारों का त्यौहार', 1-10 दिसंबर, किसामा।</span></li>
            <li><span class="bi-en"><strong>Losoong / Namsoong (Sikkim):</strong> Sikkimese New Year harvest festival, sacred Cham dance.</span><span class="bi-hi"><strong>लोसूंग (सिक्किम):</strong> नववर्ष फसल उत्सव, छाम नृत्य।</span></li>
            <li><span class="bi-en"><strong>Wangala (Meghalaya):</strong> '100 Drums Festival' of the Garo tribe celebrating harvest god Saljong.</span><span class="bi-hi"><strong>वांगला (मेघालय):</strong> गारो जनजाति का '100 ड्रम महोत्सव'।</span></li>
            <li><span class="bi-en"><strong>Chapchar Kut (Mizoram):</strong> Spring festival after clearing jhum forests. Cheraw bamboo dance.</span><span class="bi-hi"><strong>चापचार कुट (मिजोरम):</strong> वसंत उत्सव, चेराव बांस नृत्य।</span></li>
            <li><span class="bi-en"><strong>Kharchi Puja (Tripura):</strong> Worship of 14 ancestral deities at Old Agartala.</span><span class="bi-hi"><strong>खारची पूजा (त्रिपुरा):</strong> 14 देवताओं की पूजा।</span></li>
            <li><span class="bi-en"><strong>Hemis Festival (Ladakh):</strong> Commemorates birth anniversary of Guru Padmasambhava at Hemis Gompa.</span><span class="bi-hi"><strong>हेमिस महोत्सव (लद्दाख):</strong> गुरु पद्मसंभव की जयंती पर हेमिस मठ में।</span></li>
          </ul>

          <div class="embedded-image-box">
            <img src="${getImg('/Important Festival_.png')}" alt="Major Festivals" />
            <div class="image-caption">📷 PHOTO: Major Festivals of India • GS BY DURGESH PANDEY SIR</div>
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC High Frequency Festivals</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 7: MISCELLANEOUS -->
    <section class="subject-section" id="subject-misc">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 7: Sports &amp; Literature</span>
          <span class="bi-hi">विषय 7: खेल एवं साहित्य</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <!-- Badminton -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 16. Badminton Master Rules &amp; World Trophies</span>
          <span class="bi-hi">📌 16. बैडमिंटन नियम, कोर्ट और प्रमुख कप</span>
        </h3>
        <div class="chapter-content">
          <div class="callout-box">
            • <strong>Court Dimensions:</strong> Length: 13.40 m (44 ft); Singles Width: 5.18 m (17 ft); Doubles Width: 6.10 m (20 ft).<br/>
            • <strong>Net Height:</strong> 1.55 m (5 ft 1 inch) at posts; 1.524 m (5 ft) at center.<br/>
            • <strong>Shuttlecock:</strong> Exactly 16 feathers from goose/duck left wing; weight: 4.74 to 5.50 grams.<br/>
            • <strong>Scoring:</strong> Best of 3 games of 21 points each (rally point system).<br/>
            • <strong>Disciplinary Cards:</strong> Yellow Card (warning), Red Card (penalty fault), Black Card (disqualification).<br/>
            • <strong>Major Cups:</strong> Thomas Cup (Men's World Team - India Gold 2022), Uber Cup (Women's World Team), Sudirman Cup (Mixed World Team), All England Open, Syed Modi International.
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Sports Badminton Fact Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <!-- Literature & Authors -->
      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 17. Great Literature &amp; Authors</span>
          <span class="bi-hi">📌 17. महान साहित्यकार एवं उनकी प्रमुख रचनाएँ</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Jaishankar Prasad:</strong> Kamayani (15 cantos epic), Dhruvswamini, Skandagupta, Chandragupta, Titli, Kankal, Iravati, Mamta, Aansoo.</span><span class="bi-hi"><strong>जयशंकर प्रसाद:</strong> कामायनी (15 सर्ग महाकाव्य), ध्रुवस्वामिनी, स्कंदगुप्त, चंद्रगुप्त, तितली, कंकाल, इरावती, ममता, आंसू।</span></li>
            <li><span class="bi-en"><strong>Munshi Premchand:</strong> Godaan, Gaban, Nirmala, Rangbhoomi, Karmabhoomi, Seva Sadan, Kafan, Poos ki Raat, Eidgah, Panch Parmeshwar.</span><span class="bi-hi"><strong>मुंशी प्रेमचंद:</strong> गोदान, गबन, निर्मला, रंगभूमि, कर्मभूमि, सेवासदन, कफ़न, पूस की रात, ईदगाह।</span></li>
            <li><span class="bi-en"><strong>Rabindranath Tagore:</strong> Gitanjali (Nobel Prize 1913), Gora, Ghare-Baire, Chokher Bali, Kabuliwala. Composed Jana Gana Mana &amp; Amar Shonar Bangla.</span><span class="bi-hi"><strong>रवीन्द्रनाथ टैगोर:</strong> गीतांजलि (1913 नोबेल पुरस्कार), गोरा, घरे-बाईरे, चौखेर बाली, काबुलीवाला।</span></li>
            <li><span class="bi-en"><strong>Kalidasa:</strong> Abhijñānaśākuntalam, Meghadūta, Raghuvaṃśa, Kumārasambhava, Mālavikāgnimitram, Vikramōrvaśīyam.</span><span class="bi-hi"><strong>कालिदास:</strong> अभिज्ञानशाकुंतलम्, मेघदूतम्, रघुवंशम्, कुमारसंभवम्, मालविकाग्निमित्रम्।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Literature &amp; Books Sheet</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>

      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">🏛️ 18. High-Yield Government Schemes</span>
          <span class="bi-hi">🏛️ 18. परीक्षा उपयोगी प्रमुख सरकारी योजनाएँ</span>
        </h3>
        <div class="chapter-content">
          <ul>
            <li><span class="bi-en"><strong>Pradhan Mantri Jan Dhan Yojana (PMJDY):</strong> Launched 28 August 2014. Financial inclusion slogan: 'Mera Khata, Bhagya Vidhata'. Zero balance accounts, RuPay debit card.</span><span class="bi-hi"><strong>प्रधानमंत्री जन धन योजना (PMJDY):</strong> 28 अगस्त 2014 को प्रारंभ। नारा: 'मेरा खाता, भाग्य विधाता'। जीरो बैलेंस खाते एवं रुपे डेबिट कार्ड।</span></li>
            <li><span class="bi-en"><strong>Ayushman Bharat (PM-JAY):</strong> Launched 23 September 2018 (Ranchi, Jharkhand). ₹5 Lakh annual cashless health cover per family for secondary &amp; tertiary hospitalization.</span><span class="bi-hi"><strong>आयुष्मान भारत (PM-JAY):</strong> 23 सितंबर 2018 (रांची) से प्रारंभ। प्रति परिवार प्रतिवर्ष ₹5 लाख का कैशलेस स्वास्थ्य बीमा।</span></li>
            <li><span class="bi-en"><strong>PM Kisan Samman Nidhi:</strong> Launched 24 February 2019 (Gorakhpur, UP). ₹6,000 per year in 3 equal four-monthly installments of ₹2,000 directly via DBT.</span><span class="bi-hi"><strong>पीएम किसान सम्मान निधि:</strong> 24 फरवरी 2019 (गोरखपुर) से प्रारंभ। पात्र किसानों को ₹2,000 की 3 किस्तों में प्रतिवर्ष ₹6,000 की प्रत्यक्ष सहायता।</span></li>
            <li><span class="bi-en"><strong>Jal Jeevan Mission (JJM):</strong> Announced 15 August 2019. Providing functional household tap water connections (FHTC) to every rural household with 55 LPCD potable water.</span><span class="bi-hi"><strong>जल जीवन मिशन (JJM):</strong> 15 अगस्त 2019 को घोषित। 'हर घर जल' लक्ष्य के तहत प्रति व्यक्ति प्रतिदिन 55 लीटर सुरक्षित पेयजल उपलब्ध कराना।</span></li>
          </ul>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC Flagship Government Schemes</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>

    <!-- SUBJECT 8: PRACTICE QUESTIONS -->
    <section class="subject-section" id="subject-questions">
      <div class="subject-header">
        <div class="subject-title">
          <span class="bi-en">Subject 8: High-Yield Practice Question Bank</span>
          <span class="bi-hi">विषय 8: उच्च संभावित अभ्यास प्रश्न बैंक</span>
        </div>
        <span style="font-size: 11px; font-weight: bold; color: #f59e0b;">GS BY DURGESH PANDEY SIR</span>
      </div>

      <div class="chapter-card">
        <h3 class="chapter-title">
          <span class="bi-en">📌 19. Exam-Ready Multiple Choice Questions</span>
          <span class="bi-hi">📌 19. परीक्षा उपयोगी बहुविकल्पीय प्रश्न</span>
        </h3>
        <div class="chapter-content">
          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q1. Who among the following put forward the idea of a Constituent Assembly for India for the first time in 1934?</strong><br/>
            (a) Jawaharlal Nehru &nbsp;&nbsp;(b) M.N. Roy &nbsp;&nbsp;(c) B.R. Ambedkar &nbsp;&nbsp;(d) Mahatma Gandhi<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) M.N. Roy</span> • Manabendra Nath Roy was a pioneer of the communist movement in India.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q2. How much total time did the Constituent Assembly take to complete the Indian Constitution?</strong><br/>
            (a) 2 Years, 11 Months, 18 Days &nbsp;&nbsp;(b) 3 Years, 1 Month, 12 Days &nbsp;&nbsp;(c) 2 Years, 9 Months, 20 Days<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (a) 2 Years, 11 Months, 18 Days</span> • Held across 11 sessions.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q3. Which planet rotates clockwise (from East to West) on its axis?</strong><br/>
            (a) Mars &nbsp;&nbsp;(b) Jupiter &nbsp;&nbsp;(c) Venus &nbsp;&nbsp;(d) Mercury<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (c) Venus</span> • Both Venus and Uranus have retrograde rotation.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q4. The Tropic of Cancer (23.5° N) does NOT pass through which of the following Indian states?</strong><br/>
            (a) Rajasthan &nbsp;&nbsp;(b) Odisha &nbsp;&nbsp;(c) Chhattisgarh &nbsp;&nbsp;(d) Tripura<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Odisha</span> • Passes through 8 states (Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram).
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q5. Who was the founder of the Slave / Mamluk Dynasty in 1206 AD?</strong><br/>
            (a) Iltutmish &nbsp;&nbsp;(b) Qutubuddin Aibak &nbsp;&nbsp;(c) Balban &nbsp;&nbsp;(d) Alauddin Khilji<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Qutubuddin Aibak</span> • Known as 'Lakh Baksh'.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q6. Which cell organelle is famously known as the 'Suicidal Bags' of the cell?</strong><br/>
            (a) Ribosome &nbsp;&nbsp;(b) Mitochondria &nbsp;&nbsp;(c) Lysosome &nbsp;&nbsp;(d) Golgi Apparatus<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (c) Lysosome</span> • Contains digestive enzymes that break down cell debris.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q7. Which state of matter is formed when a gas of ultra-low density is cooled near absolute zero?</strong><br/>
            (a) Plasma &nbsp;&nbsp;(b) Bose-Einstein Condensate (BEC) &nbsp;&nbsp;(c) Superfluid &nbsp;&nbsp;(d) Dark Matter<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Bose-Einstein Condensate (BEC)</span> • Predicted by Satyendra Nath Bose and Albert Einstein (0 Kelvin / -273.15°C).
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q8. In economic sector classifications, 'Red Collar Workers' belong to which economic sector?</strong><br/>
            (a) Secondary Sector &nbsp;&nbsp;(b) Primary Sector &nbsp;&nbsp;(c) Tertiary Sector &nbsp;&nbsp;(d) Quaternary Sector<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Primary Sector</span> • Engaged in direct extraction of natural resources (agriculture, mining, fishing).
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q9. Sattriya, the classical dance of Assam, was founded by which revered 15th-century Vaishnavite saint?</strong><br/>
            (a) Chaitanya Mahaprabhu &nbsp;&nbsp;(b) Srimanta Sankardev &nbsp;&nbsp;(c) Vallabhacharya &nbsp;&nbsp;(d) Madhavacharya<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Srimanta Sankardev</span> • Recognized as classical dance in 2000.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q10. In Kathakali, which Vesham (facial makeup) represents noble, virtuous, and divine heroes like Rama and Krishna?</strong><br/>
            (a) Kathi &nbsp;&nbsp;(b) Kari &nbsp;&nbsp;(c) Pacha &nbsp;&nbsp;(d) Thadi<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (c) Pacha (Green / हरा)</span> • Symbolizes Satvika nature, righteousness, and divine character.
          </div>

          <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #334155;">
            <strong>Q11. The famous 'Hornbill Festival' (Festival of Festivals) is celebrated annually in which Indian state?</strong><br/>
            (a) Mizoram &nbsp;&nbsp;(b) Nagaland &nbsp;&nbsp;(c) Manipur &nbsp;&nbsp;(d) Tripura<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) Nagaland</span> • Celebrated annually 1-10 December at Kisama Heritage Village near Kohima.
          </div>

          <div>
            <strong>Q12. In international badminton, how many feathers are fixed into the cork base of a standard tournament shuttlecock?</strong><br/>
            (a) 14 feathers &nbsp;&nbsp;(b) 16 feathers &nbsp;&nbsp;(c) 18 feathers &nbsp;&nbsp;(d) 12 feathers<br/>
            <span style="color: #4ade80; font-weight: bold;">✔ Answer: (b) 16 feathers</span> • Exactly 16 goose or duck feathers with length between 62 mm and 70 mm.
          </div>
        </div>
        <div class="card-footer-watermark">
          <span>🎯 SSC High Yield Practice Questions</span>
          <span>GS BY DURGESH PANDEY SIR</span>
        </div>
      </div>
    </section>
  `;
}
