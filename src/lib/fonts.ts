import { League_Spartan, Manrope } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-league-spartan",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
