import type { Metadata } from "next";
import { homeServicesDemoSeo } from "@/content/home-services-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HomeServicesDemo } from "@/components/demo/home-services/HomeServicesDemo";
import { Explainer } from "@/components/sections/home-services-demo/Explainer";
import { FinalCta } from "@/components/sections/home-services-demo/FinalCta";
import { Hero } from "@/components/sections/home-services-demo/Hero";
import { Journey } from "@/components/sections/home-services-demo/Journey";

export const metadata: Metadata = {
  title: homeServicesDemoSeo.title,
  description: homeServicesDemoSeo.description,
};

export default function HomeServicesDemoPage() {
  return (
    <>
      <Hero />
      <section className="bg-navy-deep py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.75rem)] leading-[1.15] text-white">Try the interactive demo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">
              Browse the sample services, submit a roofing request as a customer would, then switch to Business View to see how the same request would
              appear to the team.
            </p>
            <div className="mt-8">
              <HomeServicesDemo />
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
