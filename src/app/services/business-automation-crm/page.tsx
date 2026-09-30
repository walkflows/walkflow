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

const content = servicePages["business-automation-crm"];
const automationToolIds = ["gohighlevel", "make", "n8n", "chatgpt", "claude"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

/**
 * Session 29: unified section order across all four service pages — Hero,
 * Showcase, What We Can Automate, Why WALKFLOW, How We Work, Platforms &
 * Tools, FAQs, Final CTA. The old separate Benefits section is gone
 * (merged into Why WALKFLOW) and Reviews is gone (always empty, not part
 * of the required order). Showcase still uses the four existing concept
 * projects (LeadFlow, ServiceDesk, ClinicConnect, ConsultTrack) — no real
 * automation demo videos exist yet to replace them with.
 */
export default function BusinessAutomationCrmPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <ServiceProjects {...content.projects} serviceSlug={content.slug} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      <ServiceProcess {...content.process} />
      <ServicePlatforms heading="Business Automation Platforms We Work With" toolIds={automationToolIds} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
