"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

const sequence = [0, 0.08, 0.16, 0.24];

/**
 * Centered hero: eyebrow/heading/body/buttons stacked and centered, with a
 * large rounded landscape image beneath — following the supplied reference
 * layout, re-created with the site's own background treatment (oversized
 * wordmark + grid texture + orange glow, same as the homepage/DemoHero/
 * IndustryHero) rather than the reference's own decorative background.
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
  image: { src: string; alt: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}) {
  const reduceMotion = useReducedMotion();
  const d = (i: number) => (reduceMotion ? 0 : sequence[i]);

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
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: d(0) }}
          className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(1) }}
          className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.08] text-white"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(2) }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60"
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(3) }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button href={primaryCta.href}>
            {primaryCta.label}
            <IconArrowRight />
          </Button>
          <Button href={secondaryCta.href} variant="secondary-on-dark">
            {secondaryCta.label}
          </Button>
        </motion.div>

        <Reveal delay={0.3} y={32} className="mt-12 w-full max-w-4xl sm:mt-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 896px, 92vw" className="object-cover" priority />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
