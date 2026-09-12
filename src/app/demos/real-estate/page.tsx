import type { Metadata } from "next";
import { realEstateDemoSeo } from "@/content/real-estate-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RealEstateDemo } from "@/components/demo/real-estate/RealEstateDemo";
import { Explainer } from "@/components/sections/real-estate-demo/Explainer";
import { FinalCta } from "@/components/sections/real-estate-demo/FinalCta";
import { Hero } from "@/components/sections/real-estate-demo/Hero";
import { Journey } from "@/components/sections/real-estate-demo/Journey";

export const metadata: Metadata = {
  title: realEstateDemoSeo.title,
  description: realEstateDemoSeo.description,
};

export default function RealEstateDemoPage() {
  return (
    <>
      <Hero />
      <Journey />
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.75rem)] font-extrabold tracking-tight text-navy">
              Try the interactive demo
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Browse the sample listings, share requirements as a buyer would, request a viewing, then switch to Agent View
              to see how the same actions would appear to an agent.
            </p>
            <div className="mt-8">
              <RealEstateDemo />
            </div>
          </Reveal>
        </Container>
      </section>
      <Explainer />
      <FinalCta />
    </>
  );
}
