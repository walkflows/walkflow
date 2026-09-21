import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceBenefits } from "@/components/sections/services/ServiceBenefits";
import { ServiceWhatWeDo } from "@/components/sections/services/ServiceWhatWeDo";
import { ServiceWhyWalkflow } from "@/components/sections/services/ServiceWhyWalkflow";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceEmailPlatforms } from "@/components/sections/services/ServiceEmailPlatforms";
import { ServiceReviews } from "@/components/sections/services/ServiceReviews";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["email-marketing"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function EmailMarketingPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <ServiceBenefits {...content.benefits} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      {/* Session 24: near-square tiles, name-only cards — see ServiceProjectCard.tsx. Every other service page omits these props and is unaffected. */}
      <ServiceProjects {...content.projects} serviceSlug={content.slug} tileAspect="square" showSummary={false} />
      <ServiceProcess {...content.process} />
      <ServiceEmailPlatforms />
      <ServiceReviews reviews={content.reviews} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
