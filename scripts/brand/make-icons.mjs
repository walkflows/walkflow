// Regenerates the small favicon (48 px) and iPhone icon (180 px) from the approved logo tile.
// Source artwork (unchanged, never edited): public/brand/logo-icon-orange.png (the same tile the site header shows).
// Only the 48 px tab icon and the 180 px iPhone icon are generated (the larger 192/512 sizes were dropped: "Walkflow Agcy." is baked into the artwork and would be fully readable there). At 180 px it is small but still readable on iPhone home screens; replace with an icon-only logo file if one exists.
//   node scripts/brand/make-icons.mjs
// Only resizes and compresses; logo proportions, colours and lettering are untouched.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const orange = readFileSync("public/brand/logo-icon-orange.png");
const png = (size, name, opts = {}) =>
  sharp(orange).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10, ...opts }).toFile(name);

await png(48, "src/app/icon.png");        // tab icon / search-result icon (multiple of 48)
await png(180, "src/app/apple-icon.png"); // iPhone home screen

// The social-sharing image is NOT made here: it is the live WALKFLOW wordmark lockup (see scripts/brand/og-template.html).
console.log("icons written");
