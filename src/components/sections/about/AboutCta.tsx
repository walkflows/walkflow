import { aboutCta } from "@/content/about";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutCta() {
  return (
    <section className="border-t border-white/10 bg-navy-deep px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-navy p-10 text-center sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange/10 blur-[90px]"
          />
          <Container className="relative max-w-xl px-0">
            <h2 className="text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.15] text-white">{aboutCta.heading}</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/65">{aboutCta.body}</p>
            <div className="mt-8 flex justify-center">
              <Button href={aboutCta.cta.href}>{aboutCta.cta.label}</Button>
            </div>
          </Container>
        </div>
      </Reveal>
    </section>
  );
}
