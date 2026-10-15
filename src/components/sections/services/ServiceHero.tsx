import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/** Inline variables for the `.enter` CSS entrance (see globals.css): delay, rise distance and duration. */
const enter = (delay: number, y: number, duration = 0.5) =>
  ({ "--enter-delay": `${delay}s`, "--enter-y": `${y}px`, "--enter-duration": `${duration}s` }) as CSSProperties;

/**
 * Centered hero: eyebrow/heading/body/buttons stacked and centered, with an
 * optional large rounded landscape image beneath — following the supplied
 * reference layout, re-created with the site's own background treatment
 * (oversized wordmark + grid texture + orange glow, same as the homepage/
 * DemoHero/IndustryHero) rather than the reference's own decorative
 * background. `image` is optional (Session 24) — Email Marketing's hero
 * dropped its image per explicit instruction; every other service page
 * still supplies one and renders exactly as before.
 *
 * `secondaryCta` is optional (Session 29) — all four service pages now omit
 * it, showing one concise "Book a Consultation" button since the project
 * showcase sits directly below the hero and no longer needs a "jump to it"
 * button of its own.
 */
export function ServiceHero({
  eyebrow,
  heading,
  body,
  image,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  image?: { src: string; alt: string };
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-16 sm:pb-20 sm:pt-20">
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[30vw] font-medium leading-none tracking-wide text-white/[0.05] sm:top-20 sm:text-[23vw]"
      >
        {heading}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(255,153,28,0.28),transparent)]"
      />

      <Container className="relative flex flex-col items-center text-center">
        <span
          style={enter(0, 10)}
          className="enter inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange"
        >
          {eyebrow}
        </span>

        <h1
          style={enter(0.08, 18, 0.6)}
          className="enter mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.08] text-white"
        >
          {heading}
        </h1>

        <p
          style={enter(0.16, 14, 0.6)}
          className="enter mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60"
        >
          {body}
        </p>

        <div
          style={enter(0.24, 14, 0.6)}
          className="enter mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button href={primaryCta.href}>
            {primaryCta.label}
            <IconArrowRight />
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary-on-dark">
              {secondaryCta.label}
            </Button>
          )}
        </div>

        {image && (
          <Reveal eager delay={0.3} y={32} className="mt-12 w-full max-w-4xl sm:mt-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 896px, 92vw" className="object-cover" priority />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
