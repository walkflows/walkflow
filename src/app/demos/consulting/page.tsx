import type { Metadata } from "next";
import { consultingDemoSeo } from "@/content/consulting-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultingDemo } from "@/components/demo/consulting/ConsultingDemo";
import { Explainer } from "@/components/sections/consulting-demo/Explainer";
import { FinalCta } from "@/components/sections/consulting-demo/FinalCta";
import { Hero } from "@/components/sections/consulting-demo/Hero";
import { Journey } from "@/components/sections/consulting-demo/Journey";

export const metadata: Metadata = {
  title: consultingDemoSeo.title,
  description: consultingDemoSeo.description,
};

export default function ConsultingDemoPage() {
  return (
    <>
      <Hero />
      <section className="bg-navy-deep py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.75rem)] leading-[1.15] text-white">Try the interactive demo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">
              Browse the sample sessions, arrange a standard session or discuss a custom project as a prospective client would, then switch to Firm View to
              see how the same request would appear to the consulting team.
            </p>
            <div className="mt-8">
              <ConsultingDemo />
            </div>
          </Reveal>
        </Container>
      </section>
      <Explainer />
      <Journey />
      <FinalCta />
    </>
  );
}
