const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. High-resolution SVG for modern browsers and vector scaling
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="512" height="512" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#047857" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Modern App Squircle Background -->
  <rect width="512" height="512" rx="112" fill="url(#brandGrad)"/>

  <!-- Iconic Coupon Tag (RefPromos Brand Symbol) -->
  <g transform="translate(256, 256) rotate(-4) scale(16.5) translate(-10.875, -10.875)">
    <!-- Main tag body in bright white -->
    <path
      d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z"
      fill="#ffffff"
    />
    <!-- Tag circular punch hole in emerald brand color -->
    <circle cx="7.5" cy="7.5" r="1.85" fill="#059669" />
  </g>
</svg>`;

// Helper to build a multi-resolution ICO file from PNG buffers
function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const svgBuffer = Buffer.from(svgContent);

  // 1. Write SVGs
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  console.log('Created icon.svg in public/ and src/app/');

  // 2. Render PNG resolutions
  const sizes = [16, 32, 48, 180, 192, 512];
  const pngs = {};

  for (const size of sizes) {
    pngs[size] = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
  }

  // 3. Save standard web PNGs
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), pngs[16]);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), pngs[32]);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngs[180]);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngs[180]);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), pngs[192]);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), pngs[512]);
  console.log('Created PNG icon sizes (16, 32, 180, 192, 512)');

  // 4. Build multi-resolution ICO file (16, 32, 48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: pngs[16] },
    { width: 32, height: 32, buffer: pngs[32] },
    { width: 48, height: 48, buffer: pngs[48] }
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Created multi-resolution favicon.ico in public/ and src/app/');

  // 5. Create webmanifest
  const manifest = {
    name: "RefPromos — Verified Promo Codes & Discounts",
    short_name: "RefPromos",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#059669",
    background_color: "#0f172a",
    display: "standalone",
    start_url: "/"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Created site.webmanifest');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
