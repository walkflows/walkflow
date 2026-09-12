import { finalCta } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="bg-navy-deep px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-navy p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange/10 blur-[90px]"
          />
          <Container className="relative max-w-2xl px-0">
            <h2 className="text-[clamp(2rem,4.8vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/65">{finalCta.body}</p>
            <div className="mt-9 flex justify-center">
              <Button href={finalCta.cta.href}>{finalCta.cta.label}</Button>
            </div>
            <p className="mt-5 text-sm text-white/55">{finalCta.note}</p>
          </Container>
        </div>
      </Reveal>
    </section>
  );
}
