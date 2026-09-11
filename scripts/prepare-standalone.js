const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone folder not found. Run "npm run build" first.');
  process.exit(1);
}

if (!fs.existsSync(staticSrc)) {
  console.error('Error: .next/static folder not found. The production build is incomplete.');
  process.exit(1);
}

console.log('Packaging standalone bundle for Hostinger deployment...');

// 1. Copy public folder
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
if (fs.existsSync(publicSrc)) {
  console.log('-> Copying public/ to standalone/public/ ...');
  copyFolderSync(publicSrc, publicDest);
}

// 2. Copy .next/static folder
console.log('-> Copying .next/static/ to standalone/.next/static/ ...');
copyFolderSync(staticSrc, staticDest);

const staticFiles = fs.readdirSync(staticDest, { recursive: true });
if (!staticFiles.some((file) => file.endsWith('.css')) || !staticFiles.some((file) => file.endsWith('.js'))) {
  console.error('Error: standalone bundle is missing CSS or JavaScript assets.');
  process.exit(1);
}

// 3. Copy prisma folder (schema and local sqlite database if present)
const prismaSrc = path.join(rootDir, 'prisma');
const prismaDest = path.join(standaloneDir, 'prisma');
if (fs.existsSync(prismaSrc)) {
  console.log('-> Copying prisma/ to standalone/prisma/ ...');
  copyFolderSync(prismaSrc, prismaDest);
}

console.log('✅ Standalone bundle is 100% ready for Hostinger in: .next/standalone');
