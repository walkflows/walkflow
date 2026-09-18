"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";

const sequence = [0, 0.08, 0.16, 0.24];

/**
 * Plain centered-text hero, matching the homepage/DemoHero treatment — no
 * photo, since the brief gives no service-specific hero image (project
 * photos are used later, in Selected Projects).
 *
 * `primaryCta` ("Explore <Service>") renders first but styled as the
 * outline button; `secondaryCta` ("Request a Call") renders second but
 * styled solid — CLAUDE.md designates "Request a Call" the site's one
 * main conversion action, so it keeps the prominent solid treatment here
 * even though the brief lists "Explore <Service>" first in the button order.
 */
export function ServiceHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  heading: string;
  body: string;
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
          <Button href={primaryCta.href} variant="secondary-on-dark">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href}>
            {secondaryCta.label}
            <IconArrowRight />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
