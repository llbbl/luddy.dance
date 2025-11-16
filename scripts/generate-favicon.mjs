#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Simple ICO generator - creates a minimal ICO file from SVG
// For production, consider using sharp or an online converter
async function generateFavicon() {
  try {
    const sharp = await import('sharp').catch(() => null);

    if (!sharp) {
      console.log('Sharp not available. Please install it with: pnpm add -D sharp');
      console.log('Or use an online converter: https://realfavicongenerator.net/');
      process.exit(1);
    }

    const svgPath = join(publicDir, 'favicon.svg');
    const icoPath = join(publicDir, 'favicon.ico');

    // Read the SVG
    const svgBuffer = readFileSync(svgPath);

    // Convert to ICO (using 32x32 PNG as ICO)
    await sharp.default(svgBuffer).resize(32, 32).png().toFile(icoPath);

    console.log('✓ Generated favicon.ico from favicon.svg');
  } catch (error) {
    console.error('Error generating favicon:', error.message);
    process.exit(1);
  }
}

generateFavicon();
