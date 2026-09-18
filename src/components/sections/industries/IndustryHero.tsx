import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/**
 * Two-column hero with a real photo per industry, modeled on AboutHero's
 * text-left/photo-right pattern (the site's existing precedent for a hero
 * with an image) rather than the plain centered-text DemoHero/homepage-Hero
 * treatment, which has no photo to place.
 */
export function IndustryHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  image,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; alt: string };
}) {
  return (
    <section className="overflow-hidden bg-navy-deep py-20 sm:py-28">
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] text-white">{heading}</h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/65">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={primaryCta.href}>
              {primaryCta.label}
              <IconArrowRight />
            </Button>
            <Button href={secondaryCta.href} variant="secondary-on-dark">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12} scale={0.96}>
          <div className="relative mx-auto w-full max-w-lg">
            <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-orange/15 blur-[90px]" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-white/10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 512px, (min-width: 640px) 480px, 92vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
