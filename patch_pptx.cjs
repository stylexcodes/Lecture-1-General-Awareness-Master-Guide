const fs = require('fs');
let code = fs.readFileSync('src/utils/pptxGenerator.ts', 'utf8');

code = code.replace("import { jsPDF } from 'jspdf';", "import pptxgen from 'pptxgenjs';");
code = code.replace(/generateAndDownloadPdf/g, "generateAndDownloadPptx");
code = code.replace(/const pdf = new jsPDF\(\{[\s\S]*?\}\);/, `const pptx = new pptxgen();
    pptx.layout = { name: 'A4', width: 8.27, height: 11.69 };`);

code = code.replace(/const pdfWidth = 210; \/\/ mm/g, "const pptxWidth = 8.27; // inches");
code = code.replace(/const pdfHeight = 297; \/\/ mm/g, "const pptxHeight = 11.69; // inches");

code = code.replace(/pdf\.addPage\('a4', 'portrait'\);/g, "/* pptx automatically creates first slide or we add per iteration */");

code = code.replace(/if \(i > 0\) \{\s*\/\* pptx automatically creates first slide or we add per iteration \*\/\s*\}/g, "");
// we need to add a slide every iteration:

code = code.replace(/pdf\.addImage\(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST'\);/g, 
`const slide = pptx.addSlide();
      slide.addImage({ data: imgData, x: 0, y: 0, w: pptxWidth, h: pptxHeight });`);

code = code.replace(/pdf\.save\(filename\);/g, "await pptx.writeFile({ fileName: filename });");

code = code.replace(/GS_By_Durgesh_Pandey_Sir_Master_Notes_\$\{lang\.toUpperCase\(\)\}_\$\{theme\.toUpperCase\(\)\}\.pdf/g, 
"GS_By_Durgesh_Pandey_Sir_Master_Notes_${lang.toUpperCase()}_${theme.toUpperCase()}.pptx");

code = code.replace(/Master PDF successfully downloaded/g, "Master PPTX successfully downloaded");
code = code.replace(/Master PDF/g, "Master PPTX");

fs.writeFileSync('src/utils/pptxGenerator.ts', code);
