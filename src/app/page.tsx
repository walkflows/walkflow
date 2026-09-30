import type { Metadata } from "next";
import { DemoShowcase } from "@/components/sections/home/DemoShowcase";
import { FAQ } from "@/components/sections/home/FAQ";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { PlatformsAndTools } from "@/components/sections/home/PlatformsAndTools";
import { Process } from "@/components/sections/home/Process";
import { Services } from "@/components/sections/home/Services";
import { WhyWalkflow } from "@/components/sections/home/WhyWalkflow";
import { homeSeo } from "@/content/home";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
};

/**
 * Session 29: required section order — Hero (with the Who We Work With
 * slider built in), Industry Solutions, Demos, Our Services, Why WALKFLOW,
 * How We Work, Platforms & Tools, FAQs, final Book a Consultation CTA, then
 * the global footer. See SESSION-NOTES.md for what moved from where.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Industries />
      <DemoShowcase />
      <Services />
      <WhyWalkflow />
      <Process />
      <PlatformsAndTools />
      <FAQ />
      <FinalCta />
    </>
  );
}
