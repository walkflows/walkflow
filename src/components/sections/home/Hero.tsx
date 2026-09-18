"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/home";
import { consultationCta } from "@/content/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconArrowRight } from "@/components/ui/icons";
import { IndustryCarousel } from "./IndustryCarousel";

const sequence = [0, 0.08, 0.16, 0.24];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const d = (i: number) => (reduceMotion ? 0 : sequence[i]);

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-16 sm:pb-20 sm:pt-20">
      {/* Oversized, near-invisible wordmark — the reference's "oversized background
          lettering/shapes" idea, adapted to our own brand name rather than inventing
          decorative type. Purely decorative: aria-hidden, never intercepts pointer
          events or reading order. */}
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[13vw] leading-none tracking-tight text-white/[0.035] sm:top-20 sm:text-[9vw]"
      >
        {site.name}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      {/* Orange glow concentrated behind the lower visual area, per the reference —
          fades to near-black by the eyebrow/headline instead of glowing evenly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(255,153,28,0.28),transparent)]"
      />

      <Container className="relative flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: d(0) }}
          className="max-w-xl text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm"
        >
          Your <span className="text-orange">#1</span> Choice for Web Design &amp; AI Automation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(1) }}
          className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.15] text-white"
        >
          Make it{" "}
          <span className="inline-block -rotate-2 rounded-md bg-orange px-3 py-0.5 text-navy-deep">easier</span>
          <br />
          for customers to choose <span className="text-orange">you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(2) }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/65"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(3) }}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href={consultationCta.href}>
            {consultationCta.label}
            <IconArrowRight />
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary-on-dark">
            {hero.secondaryCta.label}
            <IconArrowRight />
          </Button>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: d(3) + (reduceMotion ? 0 : 0.15) }}
        className="relative mt-12 sm:mt-14"
      >
        <Container>
          <p className="text-center font-heading text-sm font-medium uppercase tracking-[0.12em] text-orange-light">
            Who We Work With
          </p>
        </Container>
        <div className="mt-6">
          <IndustryCarousel />
        </div>
      </motion.div>
    </section>
  );
}
