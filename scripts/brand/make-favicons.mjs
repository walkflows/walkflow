// Regenerates the browser favicon and app icons from the approved 2026 favicon artwork.
//   node scripts/brand/make-favicons.mjs        (run from the project root; needs `sharp`, which is not a project dependency)
//
//   brand_assets/walkflow-logo/walkflow-favicon-2026.png -> src/app/icon.png (48), icon1.png (192), icon2.png (512), apple-icon.png (180)
//                                                           src/app/favicon.ico (16, 32, 48 px, PNG-compressed)
//
// The artwork is an opaque orange tile (it has no transparent pixels), so the icons keep that tile. It is only cropped to a
// square around the W + ball (measured content box 249..1015 x 451..917 in the 1254 px original) and scaled: nothing is redrawn,
// recoloured or stretched. Cropping tighter than the full tile is what keeps the W legible at 16-48 px.
// The header/footer logo (scripts/brand/make-icons.mjs) and the social-sharing images are not touched by this script.
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const SRC = "brand_assets/walkflow-logo/walkflow-favicon-2026.png";
const CROP = { left: 162, top: 214, width: 940, height: 940 };

const render = (size) => sharp(SRC).extract(CROP).resize(size, size, { kernel: "lanczos3" }).ensureAlpha().png({ palette: false, compressionLevel: 9, effort: 10 }).toBuffer();
async function icon(size, name) {
  writeFileSync(name, await render(size));
}

await icon(48, "src/app/icon.png");        // browser tab / search-result icon (multiple of 48)
await icon(192, "src/app/icon1.png");      // Android / PWA
await icon(512, "src/app/icon2.png");      // large icon (also the structured-data logo URL)
await icon(180, "src/app/apple-icon.png"); // iPhone home screen

// favicon.ico: an ICONDIR header plus one PNG-compressed entry per size.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(render));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(pngs[i].length, e + 8); head.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([head, ...pngs]));
console.log("favicon + app icons written");
