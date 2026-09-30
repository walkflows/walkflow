import type { Metadata } from "next";
import { industryPages } from "@/content/industries";
import { IndustryHero } from "@/components/sections/industries/IndustryHero";
import { IndustryProblem } from "@/components/sections/industries/IndustryProblem";
import { IndustrySolutions } from "@/components/sections/industries/IndustrySolutions";
import { IndustryWorkflow } from "@/components/sections/industries/IndustryWorkflow";
import { IndustryServices } from "@/components/sections/industries/IndustryServices";
import { IndustryFAQ } from "@/components/sections/industries/IndustryFAQ";
import { IndustryFinalCta } from "@/components/sections/industries/IndustryFinalCta";

const content = industryPages["home-services"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function HomeServicesIndustryPage() {
  return (
    <>
      <IndustryHero {...content.hero} />
      <IndustryProblem heading={content.problem.heading} body={content.problem.body} points={content.problem.points} />
      <IndustrySolutions heading={content.solutions.heading} body={content.solutions.body} cards={content.solutions.cards} />
      <IndustryWorkflow heading={content.workflow.heading} steps={content.workflow.steps} safetyNote={content.safetyNote} />
      <IndustryServices heading={content.services.heading} items={content.services.items} />
      <IndustryFAQ items={content.faqs} />
      <IndustryFinalCta heading={content.finalCta.heading} body={content.finalCta.body} cta={content.finalCta.cta} secondaryCta={content.finalCta.secondaryCta} />
    </>
  );
}
