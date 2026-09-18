import type { Metadata } from "next";
import { DemoShowcase } from "@/components/sections/home/DemoShowcase";
import { FAQ } from "@/components/sections/home/FAQ";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { PlatformsAndTools } from "@/components/sections/home/PlatformsAndTools";
import { Process } from "@/components/sections/home/Process";
import { Services } from "@/components/sections/home/Services";
import { homeSeo } from "@/content/home";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PlatformsAndTools />
      <Industries />
      <DemoShowcase />
      <Process />
      <FAQ />
      <FinalCta />
    </>
  );
}
