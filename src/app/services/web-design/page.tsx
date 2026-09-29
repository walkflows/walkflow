import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceBenefits } from "@/components/sections/services/ServiceBenefits";
import { ServiceWhatWeDo } from "@/components/sections/services/ServiceWhatWeDo";
import { ServiceWhyWalkflow } from "@/components/sections/services/ServiceWhyWalkflow";
import { WebDesignProjectGallery } from "@/components/sections/services/WebDesignProjectGallery";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceReviews } from "@/components/sections/services/ServiceReviews";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["web-design"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function WebDesignPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <ServiceBenefits {...content.benefits} />
      <ServiceWhatWeDo {...content.whatWeDo} />
      <ServiceWhyWalkflow {...content.whyWalkflow} />
      {/* Session 27: six real projects (FORMERA, QUES Consulting, Happy Clinics, ROOFORA, ZOOM, Youghall Beach Co.) — see web-design-projects.ts. Keeps the #projects id the hero's "View Projects" anchor already targets. */}
      <WebDesignProjectGallery />
      <ServiceProcess {...content.process} />
      <ServiceReviews reviews={content.reviews} />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta {...content.finalCta} />
    </>
  );
}
