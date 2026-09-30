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

const content = servicePages["email-marketing"];
const emailToolIds = ["activecampaign", "brevo", "mailchimp", "klaviyo"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

/**
 * Session 29: unified section order across all four service pages — Hero,
 * Showcase, What We Can Deliver, Why WALKFLOW, How We Work, Platforms &
 * Tools, FAQs, Final CTA. The old separate Benefits section is gone
 * (merged into Why WALKFLOW) and Reviews is gone (always empty, not part
 * of the required order). FAQ copy is unchanged, per explicit instruction —
 * only Web Design and Business Automation & CRM got new FAQ copy this round.
 */
export default function EmailMarketingPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      {/* Session 24: near-square tiles, name-only cards — see ServiceProjectCard.tsx. */}
      <ServiceProjects {...content.projects} serviceSlug={content.slug} tileAspect="square" showSummary={false} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      <ServiceProcess {...content.process} />
      <ServicePlatforms heading="Email Marketing Platforms We Work With" toolIds={emailToolIds} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
