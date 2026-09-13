#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const SIZE = 32;

// sharp can't emit ICO, so wrap the rendered PNG in a minimal single-image ICO
// container. ICO has supported embedded PNG payloads since Windows Vista.
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

async function generateFavicon() {
  try {
    const sharp = await import('sharp').catch(() => null);

    if (!sharp) {
      console.log('Sharp not available. Please install it with: pnpm add -D sharp');
      process.exit(1);
    }

    const svgPath = join(publicDir, 'favicon.svg');
    const icoPath = join(publicDir, 'favicon.ico');

    const svgBuffer = readFileSync(svgPath);
    const png = await sharp.default(svgBuffer).resize(SIZE, SIZE).png().toBuffer();

    writeFileSync(icoPath, pngToIco(png, SIZE));

    console.log('✓ Generated favicon.ico from favicon.svg');
  } catch (error) {
    console.error('Error generating favicon:', error.message);
    process.exit(1);
  }
}

generateFavicon();
