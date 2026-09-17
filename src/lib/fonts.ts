import localFont from "next/font/local";
import { Manrope, Caveat } from "next/font/google";

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
