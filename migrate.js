const fs = require('fs');
const path = require('path');

const base = __dirname;
const src = path.join(base, 'src/app/(dashboard)');
const dest = path.join(base, 'src/app/dashboard');

// Sub-pages to copy (we already created layout, page, orders, listings, earnings)
const remaining = ['calendar', 'momo', 'profile', 'reviews', 'settings'];

for (const sub of remaining) {
  const srcFile = path.join(src, sub, 'page.tsx');
  const destDir = path.join(dest, sub);
  const destFile = path.join(destDir, 'page.tsx');
  
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log('OK:', sub);
  }
}

// Now remove old (dashboard) directory
fs.rmSync(src, { recursive: true, force: true });
console.log('Removed old (dashboard) route group');

// Clean up temp files
try { fs.unlinkSync(path.join(base, 'copy-dashboard.js')); } catch(e) {}
try { fs.unlinkSync(path.join(base, 'fix-route.js')); } catch(e) {}
try { fs.unlinkSync(path.join(base, 'migrate.js')); } catch(e) {}
console.log('Done!');
