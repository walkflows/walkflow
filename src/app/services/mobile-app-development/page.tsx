import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { ServiceWhatWeDo } from "@/components/sections/services/ServiceWhatWeDo";
import { ServiceWhyWalkflow } from "@/components/sections/services/ServiceWhyWalkflow";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServicePlatforms } from "@/components/sections/services/ServicePlatforms";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["mobile-app-development"];
const appToolIds = ["expo", "flutter", "flutterflow", "bubble", "supabase"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

/**
 * Session 29: unified section order across all four service pages — Hero,
 * Showcase, What We Can Build, Why WALKFLOW, How We Work, Platforms &
 * Tools, FAQs, Final CTA. The old separate Benefits section is gone
 * (merged into Why WALKFLOW) and Reviews is gone (always empty, not part
 * of the required order). FAQ copy is unchanged, per explicit instruction.
 */
export default function MobileAppDevelopmentPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      {/* Session 26: wide 16:9 tiles matching the showcase images' real proportions, headline shown under each title — see ServiceProjectCard.tsx. */}
      <ServiceProjects {...content.projects} serviceSlug={content.slug} tileAspect="16/9" showSummary={false} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      <ServiceProcess {...content.process} />
      <ServicePlatforms heading="App Development Platforms We Work With" toolIds={appToolIds} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
