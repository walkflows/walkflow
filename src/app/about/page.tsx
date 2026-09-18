import type { Metadata } from "next";
import { aboutSeo } from "@/content/about";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutCta } from "@/components/sections/about/AboutCta";

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutFounder />
      <AboutValues />
      <AboutCta />
    </>
  );
}
