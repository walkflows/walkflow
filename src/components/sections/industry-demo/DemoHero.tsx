"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";

const sequence = [0, 0.08, 0.16, 0.24];

/** Colours the last word of a multi-word heading, or the whole heading when it's a single word — matching the homepage hero's accent-word treatment. */
function HighlightedHeading({ heading }: { heading: string }) {
  const words = heading.split(" ");
  if (words.length === 1) {
    return <span className="text-orange">{heading}</span>;
  }
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-orange">{last}</span>
    </>
  );
}

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
  const reduceMotion = useReducedMotion();
  const d = (i: number) => (reduceMotion ? 0 : sequence[i]);

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-16 sm:pb-20 sm:pt-20">
      {/* Oversized background wordmark — same treatment as the homepage hero,
          purely decorative and clipped by the section's own overflow-hidden. */}
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
          className="mt-6 text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] text-white"
        >
          <HighlightedHeading heading={heading} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(2) }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60"
        >
          {subheading}
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: d(3) + (reduceMotion ? 0 : 0.1) }}
          className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70"
        >
          {notice}
        </motion.p>
      </Container>
    </section>
  );
}
