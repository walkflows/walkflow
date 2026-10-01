import Image from "next/image";
import { clinicsDemoExplainer } from "@/content/clinics-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Explainer() {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal delay={0.1} y={28} className="lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image src="/demo-visuals/clinics/solution.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal className="lg:order-2">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">{clinicsDemoExplainer.heading}</h2>
          <p className="mt-5 leading-relaxed text-white/60">{clinicsDemoExplainer.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
