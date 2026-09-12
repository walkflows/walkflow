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
    usedIn: "Footer / navy sections",
  },
  heroVisual: {
    id: "heroVisual",
    alt: "Preview of a WALKFLOW-built business website on desktop and mobile",
    status: "planned",
    recommended: "PNG/WebP composite, 1600x1200, device mockups, <400KB",
    usedIn: "Homepage hero",
  },
};
