"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, useMotionValue, motion, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { industriesCarousel } from "@/content/industries-carousel";
import { Container } from "@/components/ui/Container";
import { IconPause, IconPlay } from "@/components/ui/icons";

const PX_PER_SECOND = 39.6; // calm, readable pace — 10% faster than the original 36px/s
const DRAG_TO_SCROLL = 1; // 1:1 pointer-to-track movement

export function IndustryCarousel() {
  const reduceMotion = useReducedMotion();
  const loopSlides = useMemo(() => [...industriesCarousel, ...industriesCarousel], []);

  const [manuallyPaused, setManuallyPaused] = useState(false);
  // Session 29: only an active drag pauses the loop now — hover used to
  // pause it too, which directly conflicted with the explicit "continuous
  // movement, autoplay continues on hover" requirement. Dragging still
  // pauses (the user is actively controlling the track by hand), and the
  // manual pause button remains as the one deliberate, user-initiated way
  // to stop it.
  const [interactionPaused, setInteractionPaused] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const trackWidthRef = useRef(0);
  const x = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  // Continuous linear loop: animates exactly one copy's width per cycle,
  // then — instead of resetting to 0 (which would cause a visible "snap
  // back" if anything were even a pixel off) — nudges the motion value
  // forward by that same width and immediately starts the next cycle from
  // there. Because the slide list is rendered twice back to back, shifting
  // by one copy's width lands on pixel-identical content, so the nudge is
  // invisible — the classic seamless-marquee technique, driven by Motion
  // instead of a CSS animation so it can be paused, dragged and resumed.
  const runCycleRef = useRef<() => void>(() => {});
  const runCycle = useCallback(() => {
    const width = trackWidthRef.current;
    if (!width || reduceMotion) return;
    const from = x.get();
    const duration = width / PX_PER_SECOND;
    controls.current = animate(x, from - width, {
      duration,
      ease: "linear",
      onComplete: () => {
        x.set(x.get() + width);
        runCycleRef.current();
      },
    });
  }, [reduceMotion, x]);
  useEffect(() => {
    runCycleRef.current = runCycle;
  }, [runCycle]);

  const measure = useCallback(() => {
    if (trackRef.current) {
      // Track renders two copies side by side; one copy's width is half.
      trackWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const shouldPlay = !reduceMotion && !manuallyPaused && !interactionPaused;

  useEffect(() => {
    if (shouldPlay) {
      runCycle();
    } else {
      controls.current?.pause();
    }
    return () => controls.current?.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay]);

  // Pointer drag: pauses the loop, follows the pointer 1:1, and hands back
  // to a fresh continuous cycle from wherever the drag ended (unless the
  // user has manually paused, in which case it just stays put).
  const drag = useRef<{ startClientX: number; startX: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    controls.current?.stop();
    drag.current = { startClientX: e.clientX, startX: x.get() };
    setInteractionPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    x.set(drag.current.startX + (e.clientX - drag.current.startClientX) * DRAG_TO_SCROLL);
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    // Keep the dragged-to position within one copy's width of 0 so the
    // loop never has to travel far (or run out of duplicated content) to
    // resume — same invisible-nudge trick as the loop itself.
    const width = trackWidthRef.current;
    if (width) {
      let current = x.get();
      while (current > 0) current -= width;
      while (current <= -width) current += width;
      x.set(current);
    }
    setInteractionPaused(false);
  };

  const activeLabel = industriesCarousel[0]?.label ?? "";

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries we work with"
    >
      <span className="sr-only">{activeLabel} and other industries — scrolling gallery</span>

      <div className="mx-auto w-full max-w-[100rem] overflow-hidden px-5 sm:px-8 lg:px-10">
        <motion.div
          ref={trackRef}
          className="flex w-max cursor-grab touch-pan-y gap-4 active:cursor-grabbing"
          style={{ x }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loopSlides.map((slide, i) => (
            <div
              key={`${slide.id}-${i}`}
              aria-hidden={i >= industriesCarousel.length}
              className="relative aspect-[4/5] w-[74vw] flex-none overflow-hidden rounded-2xl bg-navy-800 sm:w-[19rem]"
            >
              <Image
                src={slide.src}
                alt={i < industriesCarousel.length ? slide.label : ""}
                fill
                draggable={false}
                sizes="(max-width: 640px) 74vw, 304px"
                className="pointer-events-none object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />
              <p className="absolute bottom-4 left-4 right-4 font-heading text-lg text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {slide.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <Container className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setManuallyPaused((p) => !p)}
          aria-pressed={manuallyPaused}
          aria-label={manuallyPaused ? "Resume autoplay" : "Pause autoplay"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 motion-reduce:hidden"
        >
          {manuallyPaused || interactionPaused ? <IconPlay /> : <IconPause />}
        </button>
      </Container>
    </div>
  );
}
