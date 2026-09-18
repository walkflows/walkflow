import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoHero({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  notice,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  notice: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-20 pt-20 sm:pb-28 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,153,28,0.16),transparent)]"
      />
      <Container className="relative max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] text-white">{heading}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">{subheading}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="secondary-on-dark">
              {secondaryCta.label}
            </Button>
          </div>
          <p className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
            {notice}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
