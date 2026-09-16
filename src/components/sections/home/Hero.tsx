"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/home";
import { consultationCta } from "@/content/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BrowserFrame, AutomationIllustration, WebsiteIllustration } from "@/components/ui/illustrations";
import { cx } from "@/lib/utils";

const sequence = [0, 0.08, 0.16, 0.24];

function ServicePanel({
  label,
  caption,
  children,
  floatDelay,
  offsetClassName,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
  floatDelay: number;
  offsetClassName?: string;
}) {
  return (
    <div className={cx("transition-transform duration-300 ease-out hover:-translate-y-1.5", offsetClassName)}>
      <p className="mb-3 text-center text-sm font-semibold text-white/70 sm:text-left">{label}</p>
      <div
        className="animate-float"
        style={{ "--float-duration": "8s", "--float-delay": `${floatDelay}s`, "--tilt": "0deg" } as React.CSSProperties}
      >
        <BrowserFrame contentClassName="aspect-[4/3]">{children}</BrowserFrame>
      </div>
      <p className="mt-3 text-center text-xs text-white/35 sm:text-left">{caption}</p>
    </div>
  );
}

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
        className="pointer-events-none absolute left-1/2 top-16 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[26vw] font-extrabold leading-none text-white/[0.03] sm:top-20 sm:text-[20vw]"
      >
        {site.name}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[85%] max-w-3xl -translate-x-1/2 rounded-[50%] bg-orange/20 blur-[110px]"
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
          className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80"
        >
          <span>Your</span>
          <span className="flex h-5 w-7 flex-none items-center justify-center rounded-md bg-orange text-[0.7rem] font-extrabold text-navy-deep">
            #1
          </span>
          <span>Choice for Web Design &amp; AI Automation</span>
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(1) }}
          className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.1] text-white"
        >
          Make it <span className="text-orange">easier</span> for customers to choose{" "}
          <span className="text-orange">you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(2) }}
          className="mt-4 max-w-xl text-lg leading-relaxed text-white/65"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: d(3) }}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href={consultationCta.href}>{consultationCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary-on-dark">
            {hero.secondaryCta.label}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: d(3) + (reduceMotion ? 0 : 0.15) }}
          className="relative mt-10 w-full max-w-4xl sm:mt-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-orange/15 blur-[100px]"
          />

          <div className="relative grid gap-8 sm:grid-cols-2 sm:gap-6">
            <ServicePanel label="Web Design" caption="Website concept — illustrative only." floatDelay={0}>
              <WebsiteIllustration className="h-full w-full" />
            </ServicePanel>
            <ServicePanel
              label="AI Automation"
              caption="Automation concept — illustrative only."
              floatDelay={0.4}
              offsetClassName="sm:mt-10"
            >
              <AutomationIllustration className="h-full w-full" />
            </ServicePanel>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
