import localFont from "next/font/local";

/**
 * Heading font — Unbounded, self-hosted from the local files the user added
 * under "Unbounded font family/" at the project root (Google's open-source
 * release, OFL-licensed — see that folder's OFL.txt).
 *
 * Only Regular (400) and Medium (500) are loaded on purpose: the brief
 * explicitly asked to compare just these two weights and pick whichever
 * reads lighter/cleaner, after Unbounded's default weights (500-800) were
 * rejected as too thick. See SESSION-NOTES.md Session 8 for which one was
 * chosen and why. Every other weight file in that folder (Light, SemiBold,
 * Bold, ExtraBold, Black, the variable font) is left unused — add another
 * `src` entry here if a heavier face is ever deliberately needed.
 *
 * This is still self-identified as WALKFLOW's own choice, not a verified
 * match to any reference — see the reference-inspection note in
 * SESSION-NOTES.md.
 */
export const unbounded = localFont({
  src: [
    { path: "../../Unbounded font family/static/Unbounded-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../Unbounded font family/static/Unbounded-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-unbounded",
  display: "swap",
});

/**
 * Manrope and Caveat are self-hosted here (same pattern as Unbounded above),
 * not fetched at build time via next/font/google. That fetch started failing
 * in this environment — Turbopack's own font-resolution step couldn't
 * complete even though plain network access (curl, Node's fetch, the
 * already-running dev server) all worked fine, traced to a local
 * antivirus TLS-inspection component interfering with Turbopack's Rust HTTP
 * client specifically. Rather than touch any security/antivirus setting,
 * the two files below were downloaded once (via Node's fetch, unaffected by
 * that issue) from Google's own CDN — the exact bytes next/font/google would
 * otherwise have fetched at every build — and are now bundled like any other
 * local asset. Both are Google's official variable-font files (OFL
 * licensed, same as the static Unbounded files above): Google's CSS API
 * serves every requested static weight from the SAME physical file for
 * these two families, so one file per family covers the full weight range
 * actually used on the site, declared here as a `weight` range per Next's
 * localFont variable-font support.
 */
export const manrope = localFont({
  src: "../../Manrope font family/Manrope-Variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

export const caveat = localFont({
  src: "../../Caveat font family/Caveat-Variable.woff2",
  weight: "400 700",
  variable: "--font-caveat",
  display: "swap",
});
