import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { WebDesignProjectGallery } from "@/components/sections/services/WebDesignProjectGallery";
import { ServiceWhatWeDo } from "@/components/sections/services/ServiceWhatWeDo";
import { ServiceWhyWalkflow } from "@/components/sections/services/ServiceWhyWalkflow";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServicePlatforms } from "@/components/sections/services/ServicePlatforms";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["web-design"];
const webDesignToolIds = ["framer", "shopify", "squarespace", "wix", "webflow", "wordpress"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

/**
 * Session 29: unified section order across all four service pages — Hero,
 * Showcase, What We Can Build, Why WALKFLOW, How We Work, Platforms &
 * Tools, FAQs, Final CTA. The old separate Benefits section is gone
 * (merged into Why WALKFLOW) and Reviews is gone (always empty, not part
 * of the required order).
 */
export default function WebDesignPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <WebDesignProjectGallery />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      <ServiceProcess {...content.process} />
      <ServicePlatforms heading="Web Design Platforms We Work With" toolIds={webDesignToolIds} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
