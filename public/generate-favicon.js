const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];
const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="256" fill="#2E7D32"/>
  <path d="M256,128c35.35,0,64,28.65,64,64s-28.65,64-64,64-64-28.65-64-64S220.65,128,256,128z" fill="#FFFFFF"/>
  <path d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256,256-114.84,256-256S397.16,0,256,0zm0,480C132.29,480,32,379.71,32,256S132.29,32,256,32s224,100.29,224,224-100.29,224-224,224z" fill="#1B5E20"/>
  <path d="M256,128c-35.35,0-64,28.65-64,64s28.65,64,64,64,64-28.65,64-64S291.35,128,256,128z" fill="none" stroke="#1B5E20" stroke-width="16"/>
  <path d="M256,384c-35.35,0-64-28.65-64-64s28.65-64,64-64,64,28.65,64,64S291.35,384,256,384z" fill="#4CAF50"/>
  <path d="M256,256v128" stroke="#1B5E20" stroke-width="16" stroke-linecap="round"/>
</svg>`;

// Save SVG
fs.writeFileSync('favicon.svg', svg);

// Generate PNGs
async function generateIcons() {
  for (const size of sizes) {
    const filename = size <= 32 ? `favicon-${size}x${size}.png` : 
                    size === 192 ? 'android-chrome-192x192.png' :
                    size === 512 ? 'android-chrome-512x512.png' :
                    `icon-${size}x${size}.png`;
    
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .toFile(filename);
    
    console.log(`Generated ${filename}`);
  }
  
  // Generate ICO
  await sharp('favicon-32x32.png')
    .toFile('favicon.ico');
  
  console.log('Generated favicon.ico');
  
  // Generate apple-touch-icon
  await sharp('android-chrome-192x192.png')
    .resize(180, 180)
    .toFile('apple-touch-icon.png');
    
  console.log('Generated apple-touch-icon.png');
}

generateIcons().catch(console.error);
