import type { Metadata } from "next";
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
 * Session 38: Industry Solutions and Demos are one merged section (Industries),
 * so the separate Demo Showcase section is gone. Order: Hero, Industry
 * Solutions + Demos, Our Services, Why WALKFLOW, How We Work, Platforms &
 * Tools, FAQs, final Book a Consultation CTA, then the global footer.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WALKFLOW",
  url: "https://walkflow.tech",
  logo: "https://walkflow.tech/icon2.png",
  slogan: "Take the steps. Build the flow.",
  description: homeSeo.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Industries />
      <Services />
      <WhyWalkflow />
      <Process />
      <PlatformsAndTools />
      <FAQ />
      <FinalCta />
    </>
  );
}
