// Regenerates the header/footer logo mark and the favicon / app icons from the approved 2026 logo files in
// brand_assets/walkflow-logo/ (the old "Walkflow Agcy." tile and its no-text workaround are no longer used).
//   node scripts/brand/make-icons.mjs        (run from the project root; needs `sharp`, which is not a project dependency)
//
//   walkflow-logo-2026-tile-black-on-orange.png    -> public/brand/logo-mark.png   (header + footer logo)
//   walkflow-logo-2026-mark-orange-transparent.png -> src/app/icon*.png, apple-icon.png (favicon + app icons)
//
// Neither the W nor the ball is altered: tiles are only cropped/scaled, the transparent mark is only trimmed and padded.
import sharp from "sharp";

const DIR = "brand_assets/walkflow-logo/";
const TILE = DIR + "walkflow-logo-2026-tile-black-on-orange.png";
const MARK = DIR + "walkflow-logo-2026-mark-orange-transparent.png";

// Header/footer: square crop centred on the W + ball (measured content box 249..1015 x 451..917 in the 1254 px tile).
const TILE_CROP = { left: 162, top: 214, width: 940, height: 940 };
// Favicon/app icons: the measured content box of the transparent mark (75..1207 x 296..999).
const MARK_BOX = { left: 75, top: 296, width: 1133, height: 704 };

await sharp(TILE)
  .extract(TILE_CROP)
  .resize(256, 256, { kernel: "lanczos3" })
  .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
  .toFile("public/brand/logo-mark.png");

/** The transparent W, trimmed to its content and centred in a square of `size` with `pad` (fraction) margin on every side. */
async function markIcon(size, name, { pad, background } = {}) {
  const inner = Math.round(size * (1 - 2 * pad));
  const art = await sharp(MARK).extract(MARK_BOX).resize(inner, inner, { fit: "inside", kernel: "lanczos3" }).toBuffer();
  let img = sharp({ create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: art, gravity: "centre" }]);
  await img.png({ compressionLevel: 9, effort: 10 }).toFile(name);
}

await markIcon(48, "src/app/icon.png", { pad: 0.03 });        // browser tab / search-result icon (multiple of 48)
await markIcon(192, "src/app/icon1.png", { pad: 0.06 });      // Android / PWA
await markIcon(512, "src/app/icon2.png", { pad: 0.06 });      // large icon (also the structured-data logo URL)
// iPhone home screen cannot be transparent (iOS fills it with black), so it sits on the brand near-black.
await markIcon(180, "src/app/apple-icon.png", { pad: 0.16, background: { r: 10, g: 10, b: 10, alpha: 1 } });
console.log("logo mark + icons written");
