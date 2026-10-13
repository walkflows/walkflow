// Regenerates the small favicon / app icons and the social-sharing image from the approved logo files.
// Source artwork (unchanged, never edited): public/brand/logo-icon-orange.png and public/brand/logo-white-on-black.png
//   node scripts/brand/make-icons.mjs
// Only resizes and compresses; logo proportions, colours and lettering are untouched.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const orange = readFileSync("public/brand/logo-icon-orange.png");
const png = (size, name, opts = {}) =>
  sharp(orange).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10, ...opts }).toFile(name);

await png(48, "src/app/icon.png");        // tab icon / search-result icon (multiple of 48)
await png(192, "src/app/icon1.png");      // Android / PWA
await png(512, "src/app/icon2.png");      // large icon
await png(180, "src/app/apple-icon.png"); // iPhone home screen

// Social-sharing image 1200x630: the approved white-on-black logo, enlarged and centred on the logo's own background colour.
const white = sharp("public/brand/logo-white-on-black.png");
const { data } = await white.clone().extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
const bg = { r: data[0], g: data[1], b: data[2] };
// Logo scaled to 1008 px (the artwork has wide empty margins) and centred; only margin is cropped, the logo itself is never cut.
const SCALE = 1008;
const logo = await white.clone().resize(SCALE, SCALE, { kernel: "lanczos3" }).extract({ left: 0, top: 189, width: SCALE, height: 630 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: bg } })
  .composite([{ input: logo, left: (1200 - SCALE) / 2, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg");
writeFileSync("src/app/opengraph-image.alt.txt", "WALKFLOW logo on a black background");
console.log("background colour used:", bg);
