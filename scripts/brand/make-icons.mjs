// Regenerates the favicon (48 px), iPhone icon (180 px) and Android/large icons (192, 512 px) from the approved W tile
// WITHOUT its baked-in "Walkflow Agcy." lettering (public/brand/logo-icon-orange-notext.png, made by make-notext-tile.py
// from the approved tile public/brand/logo-icon-orange.png). The W and the ball are untouched; the crop only trims empty tile margin.
//   node scripts/brand/make-icons.mjs
import sharp from "sharp";

const CROP = { left: 130, top: 160, width: 960, height: 960 }; // centred on the W + ball
const png = (size, name) =>
  sharp("public/brand/logo-icon-orange-notext.png").extract(CROP).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile(name);

await png(48, "src/app/icon.png");        // browser tab / search-result icon (multiple of 48)
await png(192, "src/app/icon1.png");      // Android / PWA
await png(512, "src/app/icon2.png");      // large icon
await png(180, "src/app/apple-icon.png"); // iPhone home screen
console.log("icons written");
