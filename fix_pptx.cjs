const fs = require('fs');
let code = fs.readFileSync('src/utils/pptxGenerator.ts', 'utf8');

code = code.replace("pptx.layout = { name: 'A4', width: 8.27, height: 11.69 };",
`pptx.defineLayout({ name: 'A4', width: 8.27, height: 11.69 });
    pptx.layout = 'A4';`);

fs.writeFileSync('src/utils/pptxGenerator.ts', code);
