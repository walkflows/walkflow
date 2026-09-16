import { realEstateDemoHero } from "@/content/real-estate-demo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-20 pt-20 sm:pb-28 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(231,110,12,0.16),transparent)]"
      />
      <Container className="relative max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {realEstateDemoHero.eyebrow}
          </span>
          <h1 className="mt-6 text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] text-white">
            {realEstateDemoHero.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">{realEstateDemoHero.body}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={realEstateDemoHero.primaryCta.href}>{realEstateDemoHero.primaryCta.label}</Button>
            <Button href={realEstateDemoHero.secondaryCta.href} variant="secondary-on-dark">
              {realEstateDemoHero.secondaryCta.label}
            </Button>
          </div>
          <p className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
            {realEstateDemoHero.notice}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
