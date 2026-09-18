import { realEstateDemoExplainer } from "@/content/real-estate-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Explainer() {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">
            {realEstateDemoExplainer.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-white/60">{realEstateDemoExplainer.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
