import { Poppins, Manrope, Caveat } from "next/font/google";

/**
 * Heading font — APPROXIMATION, not a verified match.
 * The Session 6 reference (reference_for_walkflow/) is a rasterised
 * screenshot/PDF/video with no embedded font metadata, so the exact
 * typeface used by that site could not be identified from the source
 * files. Poppins (ExtraBold/Bold/SemiBold) was chosen as a visually close,
 * slimmer alternative to Unbounded — geometric, rounded terminals, normal
 * (not expanded) letter width — matching the reference's proportions far
 * more closely than Unbounded's wide/blocky forms. Replace this with the
 * real font if it's ever identified with certainty.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat",
  display: "swap",
});
