import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Compact CTA card — button only, no full form. Links to the dedicated /contact page. */
export function ContactPromptCta({
  heading,
  body,
  cta,
}: {
  heading: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-navy-deep px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-navy p-8 text-center sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/15 blur-[80px]"
          />
          <Container className="relative max-w-xl px-0">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.15] text-white">{heading}</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/60">{body}</p>
            <div className="mt-7 flex justify-center">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          </Container>
        </div>
      </Reveal>
    </section>
  );
}
