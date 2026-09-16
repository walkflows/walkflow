import { realEstateDemoExplainer } from "@/content/real-estate-demo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Explainer() {
  return (
    <section className="border-t border-navy/8 bg-white py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] font-extrabold text-navy">
            {realEstateDemoExplainer.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-muted">{realEstateDemoExplainer.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
