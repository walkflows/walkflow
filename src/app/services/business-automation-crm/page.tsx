import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceBenefits } from "@/components/sections/services/ServiceBenefits";
import { ServiceWhatWeDo } from "@/components/sections/services/ServiceWhatWeDo";
import { ServiceWhyWalkflow } from "@/components/sections/services/ServiceWhyWalkflow";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceReviews } from "@/components/sections/services/ServiceReviews";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["business-automation-crm"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function BusinessAutomationCrmPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <ServiceBenefits {...content.benefits} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      <ServiceProjects {...content.projects} serviceSlug={content.slug} />
      <ServiceProcess {...content.process} />
      <ServiceReviews reviews={content.reviews} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
