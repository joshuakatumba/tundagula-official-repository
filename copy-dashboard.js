const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/app/(dashboard)');
const destDir = path.join(__dirname, 'src/app/dashboard');

const subdirs = ['calendar', 'earnings', 'listings', 'momo', 'orders', 'profile', 'reviews', 'settings'];

for (const sub of subdirs) {
  const srcFile = path.join(srcDir, sub, 'page.tsx');
  const destSubDir = path.join(destDir, sub);
  const destFile = path.join(destSubDir, 'page.tsx');
  
  if (fs.existsSync(srcFile)) {
    if (!fs.existsSync(destSubDir)) {
      fs.mkdirSync(destSubDir, { recursive: true });
    }
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied: ${sub}/page.tsx`);
  } else {
    console.log(`SKIP: ${sub}/page.tsx not found`);
  }
}

console.log('Done copying dashboard sub-pages.');
