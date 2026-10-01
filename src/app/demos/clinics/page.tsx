import type { Metadata } from "next";
import { clinicsDemoSeo } from "@/content/clinics-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClinicsDemo } from "@/components/demo/clinics/ClinicsDemo";
import { Explainer } from "@/components/sections/clinics-demo/Explainer";
import { FinalCta } from "@/components/sections/clinics-demo/FinalCta";
import { Hero } from "@/components/sections/clinics-demo/Hero";
import { Journey } from "@/components/sections/clinics-demo/Journey";

export const metadata: Metadata = {
  title: clinicsDemoSeo.title,
  description: clinicsDemoSeo.description,
};

export default function ClinicsDemoPage() {
  return (
    <>
      <Hero />
      <section className="bg-navy-deep py-20 sm:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.8vw,2.75rem)] leading-[1.15] text-white">Try the interactive demo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">
              Browse the sample services, submit an appointment request as a patient would, then switch to Clinic View to see how the same request would
              appear to staff.
            </p>
            <div className="mt-8">
              <ClinicsDemo />
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
