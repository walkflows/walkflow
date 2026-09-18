import type { Metadata } from "next";
import { servicePages } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceProblem } from "@/components/sections/services/ServiceProblem";
import { ServiceDeliver } from "@/components/sections/services/ServiceDeliver";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { ServiceVideo } from "@/components/sections/services/ServiceVideo";
import { ServiceWorkflow } from "@/components/sections/services/ServiceWorkflow";
import { ServiceReviews } from "@/components/sections/services/ServiceReviews";
import { ServiceFAQ } from "@/components/sections/services/ServiceFAQ";
import { ServiceFinalCta } from "@/components/sections/services/ServiceFinalCta";

const content = servicePages["mobile-app-development"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <ServiceHero {...content.hero} />
      <ServiceProblem heading={content.problem.heading} body={content.problem.body} points={content.problem.points} />
      <ServiceDeliver heading={content.deliver.heading} items={content.deliver.items} />
      <ServiceProjects heading={content.projects.heading} items={content.projects.items} />
      <ServiceVideo {...content.video} />
      <ServiceWorkflow heading={content.workflow.heading} steps={content.workflow.steps} />
      <ServiceReviews />
      <ServiceFAQ items={content.faqs} />
      <ServiceFinalCta heading={content.finalCta.heading} body={content.finalCta.body} cta={content.finalCta.cta} />
    </>
  );
}
