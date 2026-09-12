"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroServicePanel } from "./HeroServicePanel";
import { AutomationIllustration, WebsiteIllustration } from "@/components/ui/illustrations";

const sequence = [0, 0.08, 0.16, 0.24];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const d = (i: number) => (reduceMotion ? 0 : sequence[i]);

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-28 pt-20 sm:pb-40 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(231,110,12,0.16),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <Container className="relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: d(0) }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(1) }}
          className="mt-7 max-w-4xl text-balance text-[clamp(2.6rem,7vw,5.25rem)] font-extrabold leading-[1.02] tracking-tight text-white"
        >
          {hero.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(2) }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(3) }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary-on-dark">
            {hero.secondaryCta.label}
          </Button>
        </motion.div>
        <p className="mt-6 text-sm text-white/55">{hero.note}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: d(3) + (reduceMotion ? 0 : 0.15) }}
          className="relative mt-14 h-72 w-full max-w-3xl sm:mt-20 sm:h-80"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 h-48 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-orange/20 blur-[80px]" />
          <div className="absolute left-1/2 top-1/2 h-32 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-orange/20" />

          <HeroServicePanel label="Web Design" tilt={-4} duration={9} className="left-[2%] top-0 sm:left-[10%]">
            <WebsiteIllustration className="h-full w-full" />
          </HeroServicePanel>
          <HeroServicePanel
            label="AI Automation"
            tilt={4}
            duration={10}
            delay={0.5}
            className="bottom-0 right-[2%] sm:right-[10%]"
          >
            <AutomationIllustration className="h-full w-full" />
          </HeroServicePanel>
        </motion.div>
      </Container>
    </section>
  );
}
