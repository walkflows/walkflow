import type { Metadata } from "next";
import { industryDemos } from "@/content/industry-demos";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryInteractiveDemo } from "@/components/demo/industry/IndustryInteractiveDemo";
import { DemoHero } from "@/components/sections/industry-demo/DemoHero";
import { DemoProblem } from "@/components/sections/industry-demo/DemoProblem";
import { DemoSolution } from "@/components/sections/industry-demo/DemoSolution";
import { DemoSteps } from "@/components/sections/industry-demo/DemoSteps";
import { DemoVisual } from "@/components/sections/industry-demo/DemoVisual";
import { DemoResults } from "@/components/sections/industry-demo/DemoResults";
import { DemoFinalCta } from "@/components/sections/industry-demo/DemoFinalCta";

const content = industryDemos["home-services"];

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function HomeServicesDemoPage() {
  return (
    <>
      <DemoHero {...content.hero} />
      <DemoProblem heading={content.problem.heading} points={content.problem.points} image={content.problem.image} />
      <DemoSolution
        heading={content.solution.heading}
        body={content.solution.body}
        components={content.solution.components}
        image={content.solution.image}
      />
      <DemoSteps heading={content.steps.heading} items={content.steps.items} />
      <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.75rem)] leading-[1.15] text-white">Try the interactive demo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{content.interactiveDemo.introText}</p>
            <div className="mt-8">
              <IndustryInteractiveDemo content={content} />
            </div>
          </Reveal>
        </Container>
      </section>
      <DemoVisual heading={content.visual.heading} body={content.visual.body} />
      <DemoResults heading={content.results.heading} body={content.results.body} outcomes={content.results.outcomes} />
      <DemoFinalCta heading={content.finalCta.heading} cta={content.finalCta.cta} />
    </>
  );
}
