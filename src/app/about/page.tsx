import type { Metadata } from "next";
import { aboutSeo } from "@/content/about";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutCta } from "@/components/sections/about/AboutCta";

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutTeam />
      <AboutValues />
      <AboutCta />
    </>
  );
}
