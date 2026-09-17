export type DemoStatus = "planned" | "simulated" | "live";

export type MediaAsset = {
  id: string;
  src?: string;
  alt: string;
  poster?: string;
  videoUrl?: string;
  demoUrl?: string;
  status: DemoStatus;
  /** Recommended source dimensions/format, for whoever supplies the final asset. */
  recommended: string;
  /** Where this asset is used, for editors replacing media later. */
  usedIn: string;
};

/**
 * Central registry of replaceable media. Nothing here is a broken reference:
 * entries with no `src`/`videoUrl` render a branded placeholder / coming-soon
 * state until a real asset is supplied.
 */
export const media: Record<string, MediaAsset> = {
  logoOnLight: {
    id: "logoOnLight",
    src: "/brand/logo-navy-on-white.png",
    alt: "WALKFLOW",
    status: "live",
    recommended: "PNG, transparent or white background, min 480px wide",
    usedIn: "Header on light surfaces",
  },
  logoOnDark: {
    id: "logoOnDark",
    src: "/brand/logo-white-on-navy.png",
    alt: "WALKFLOW",
    status: "live",
    recommended: "PNG, transparent or navy background, min 480px wide",
    usedIn: "Currently unused — the footer switched to logoOnBlack (Session 9) to match the header exactly, per explicit instruction. Kept registered here in case a navy-background surface needs this treatment again.",
  },
  /** Session 8: header-only icon, replacing the navy-backed version that
   * clashed with the near-black palette introduced in Session 7.
   * Superseded once already within Session 8 — first swapped to a
   * black-background copy of the existing icon (logo-white-on-black.png,
   * still in public/brand/ if needed), then swapped again to this
   * orange-background "walkflow new logo.png" asset per explicit
   * instruction. Both source files still contain the old "Walkflow Agcy."
   * wordmark arced above the icon, illegible at the ~40px render size this
   * asset is used at, and NOT the same text as the "WALKFLOW" wordmark
   * rendered separately in Header.tsx — flagged in SESSION-NOTES.md as
   * worth a proper icon-only crop if that illegible baked-in text ever
   * needs to go away for good. */
  logoOnBlack: {
    id: "logoOnBlack",
    src: "/brand/logo-icon-orange.png",
    alt: "WALKFLOW",
    status: "live",
    recommended: "PNG, transparent background, icon only (no wordmark baked in), min 480px wide",
    usedIn: "Header (dark)",
  },
  heroVisual: {
    id: "heroVisual",
    alt: "Preview of a WALKFLOW-built business website on desktop and mobile",
    status: "planned",
    recommended: "PNG/WebP composite, 1600x1200, device mockups, <400KB",
    usedIn: "Homepage hero",
  },
};
