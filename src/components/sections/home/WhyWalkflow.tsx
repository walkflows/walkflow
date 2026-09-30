"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { whyWalkflow } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconChat, IconDocument, IconGear, IconAutomation, IconPeople, IconSwap } from "@/components/ui/icons";

type Feature = (typeof whyWalkflow.features)[number];
type Stat = (typeof whyWalkflow.stats)[number];
type Pill = (typeof whyWalkflow.pills)[number];

const featureIcons = { people: IconPeople, document: IconDocument, chat: IconChat };
const pillIcons = { document: IconDocument, gear: IconGear, refresh: IconAutomation, swap: IconSwap };

/**
 * Gathered-to-separated reveal: as the row scrolls into view, each circle
 * starts pulled in toward the centre (heavily overlapping its neighbours)
 * and gently glides out to its resting, evenly-spaced position. Lifted
 * unchanged from the old `PlatformsAndTools.tsx` (Session 29 split) — see
 * that file's git history for the original design notes.
 */
function StatCircle({
  stat,
  index,
  total,
  statsProgress,
}: {
  stat: Stat;
  index: number;
  total: number;
  statsProgress: MotionValue<number>;
}) {
  const center = (total - 1) / 2;
  const startOffset = (center - index) * 60;
  const separationX = useTransform(statsProgress, [0, 1], [startOffset, 0]);

  return (
    <div className="relative" style={{ zIndex: 100 - index }}>
      <motion.div style={{ x: separationX }} className="motion-reduce:!transform-none">
        <Reveal delay={0.15 + index * 0.1} y={40} scale={0.9}>
          <div
            style={
              {
                "--float-delay": `${index * 0.5}s`,
                "--float-duration": "7s",
                "--float-amount": "-6px",
              } as React.CSSProperties
            }
            className="flex h-24 w-24 flex-none animate-float-soft flex-col items-center justify-center overflow-hidden rounded-full border border-white/12 bg-navy-deep/70 px-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-sm motion-reduce:[animation:none] sm:h-36 sm:w-36 lg:h-44 lg:w-44"
          >
            <p className="whitespace-nowrap font-heading text-sm font-medium text-white sm:text-2xl lg:text-3xl">{stat.value}</p>
            <p className="mt-1.5 max-w-[4rem] text-[0.55rem] leading-tight text-white/55 sm:max-w-[5rem] sm:text-[0.68rem] lg:max-w-[7rem] lg:text-[0.78rem]">
              {stat.label}
            </p>
          </div>
        </Reveal>
      </motion.div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = featureIcons[feature.icon];
  return (
    <Reveal delay={0.1 + index * 0.1} y={32} scale={0.97}>
      <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(255,153,28,0.22),transparent)] opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-orange/30 text-orange transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-orange/60 group-hover:shadow-[0_0_18px_-2px_rgba(255,153,28,0.5)]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-lg text-white">{feature.title}</h3>
        <p className="mt-3 leading-relaxed text-white/60">{feature.body}</p>
      </div>
    </Reveal>
  );
}

function ToolPill({ pill, index }: { pill: Pill; index: number }) {
  const Icon = pillIcons[pill.icon];
  return (
    <Reveal delay={0.4 + index * 0.06} y={16}>
      <div className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-orange/35 hover:shadow-[0_0_16px_-4px_rgba(255,153,28,0.45)]">
        <Icon className="h-4 w-4 flex-none text-orange transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        <span className="whitespace-nowrap text-sm font-medium text-white/80">{pill.label}</span>
      </div>
    </Reveal>
  );
}

export function WhyWalkflow() {
  const statsRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsProgress } = useScroll({ target: statsRowRef, offset: ["start 95%", "start 45%"] });

  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[24rem] bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,rgba(255,153,28,0.1),transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {whyWalkflow.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{whyWalkflow.heading}</h2>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center">
          <div ref={statsRowRef} className="flex -space-x-2 sm:-space-x-3 lg:-space-x-4">
            {whyWalkflow.stats.map((stat, i) => (
              <StatCircle key={stat.id} stat={stat} index={i} total={whyWalkflow.stats.length} statsProgress={statsProgress} />
            ))}
          </div>
          <Reveal delay={0.15 + whyWalkflow.stats.length * 0.1}>
            <p className="mt-8 max-w-md text-center text-sm text-white/50">{whyWalkflow.statsCaption}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {whyWalkflow.features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {whyWalkflow.pills.map((pill, i) => (
            <ToolPill key={pill.id} pill={pill} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
