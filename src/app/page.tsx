import type { Metadata } from "next";
import { DemoShowcase } from "@/components/sections/home/DemoShowcase";
import { FAQ } from "@/components/sections/home/FAQ";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Journey } from "@/components/sections/home/Journey";
import { PlatformsAndTools } from "@/components/sections/home/PlatformsAndTools";
import { Problem } from "@/components/sections/home/Problem";
import { ServiceShowcase } from "@/components/sections/home/ServiceShowcase";
import { WhyAndProcess } from "@/components/sections/home/WhyAndProcess";
import { homeSeo } from "@/content/home";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ServiceShowcase />
      <PlatformsAndTools />
      <Journey />
      <Industries />
      <DemoShowcase />
      <WhyAndProcess />
      <FAQ />
      <FinalCta />
    </>
  );
}
