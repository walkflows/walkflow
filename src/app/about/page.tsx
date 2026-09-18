import type { Metadata } from "next";
import { aboutSeo } from "@/content/about";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutExperience } from "@/components/sections/about/AboutExperience";
import { AboutCta } from "@/components/sections/about/AboutCta";

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutHero />
      <AboutTeam />
      <AboutValues />
      <AboutExperience />
      <AboutCta />
    </>
  );
}
