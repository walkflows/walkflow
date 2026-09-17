"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, useMotionValue, motion, useReducedMotion } from "motion/react";
import { industriesCarousel } from "@/content/industries-carousel";
import { Container } from "@/components/ui/Container";
import { IconChevronLeft, IconChevronRight, IconPause, IconPlay } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

const GAP_PX = 16;
const AUTOPLAY_MS = 4000;
const TRANSITION_S = 0.7;
const DRAG_THRESHOLD = 0.18; // fraction of a card's width

export function IndustryCarousel() {
  const reduceMotion = useReducedMotion();
  const n = industriesCarousel.length;
  // Three copies so both prev and next can loop indefinitely: whichever
  // direction you move, there's always a real card rendered to land on, and
  // once a move settles outside the middle copy we snap (no animation, no
  // visible change since the copies are pixel-identical) back into it.
  const loopSlides = useMemo(() => [...industriesCarousel, ...industriesCarousel, ...industriesCarousel], []);

  const [index, setIndex] = useState(n);
  const indexRef = useRef(n);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const x = useMotionValue(0);

  const measure = useCallback(() => {
    if (cardRef.current) {
      stepRef.current = cardRef.current.offsetWidth + GAP_PX;
      x.set(-indexRef.current * stepRef.current);
    }
  }, [x]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback(
    (target: number, animated: boolean) => {
      indexRef.current = target;
      setIndex(target);
      const targetX = -target * stepRef.current;

      const settle = () => {
        let corrected = target;
        if (corrected < n) corrected += n;
        else if (corrected >= 2 * n) corrected -= n;
        if (corrected !== target) {
          indexRef.current = corrected;
          setIndex(corrected);
          x.set(-corrected * stepRef.current);
        }
      };

      if (animated && !reduceMotion) {
        animate(x, targetX, { type: "tween", duration: TRANSITION_S, ease: "easeInOut", onComplete: settle });
      } else {
        x.set(targetX);
        settle();
      }
    },
    [n, reduceMotion, x],
  );

  const next = useCallback(() => goTo(indexRef.current + 1, true), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1, true), [goTo]);

  // Autoplay — off entirely under reduced motion, and while paused for any
  // reason (manual pause button, hover, keyboard focus, active drag).
  useEffect(() => {
    if (reduceMotion || manuallyPaused || interactionPaused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, manuallyPaused, interactionPaused, next]);

  // Pointer-based drag: covers both touch and mouse with one code path.
  const drag = useRef<{ startClientX: number; startX: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    drag.current = { startClientX: e.clientX, startX: x.get() };
    setInteractionPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    x.set(drag.current.startX + (e.clientX - drag.current.startClientX));
  };
  const endDrag = () => {
    if (!drag.current) return;
    const delta = x.get() - drag.current.startX;
    drag.current = null;
    setInteractionPaused(false);
    const threshold = stepRef.current * DRAG_THRESHOLD;
    if (delta < -threshold) next();
    else if (delta > threshold) prev();
    else goTo(indexRef.current, true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // Deliberately excludes `reduceMotion` here: that value differs between
  // server (always false) and a real reduced-motion client, and this result
  // decides which icon renders. Mixing it in caused a real hydration
  // mismatch — see SESSION-NOTES.md Session 8. The button is hidden
  // entirely under reduced motion anyway (see className below), so which
  // icon it would have shown never actually matters in that case.
  const showPlayIcon = manuallyPaused || interactionPaused;
  const activeLabel = industriesCarousel[((index % n) + n) % n]?.label ?? "";

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries we work with"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={() => setInteractionPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <span className="sr-only" aria-live="polite">
        {activeLabel}
      </span>

      <div className="mx-auto w-full max-w-[100rem] overflow-hidden px-5 sm:px-8 lg:px-10">
        <motion.div
          className="flex cursor-grab touch-pan-y gap-4 active:cursor-grabbing"
          style={{ x }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loopSlides.map((slide, i) => (
            <div
              key={`${slide.id}-${i}`}
              ref={i === 0 ? cardRef : undefined}
              className="relative aspect-[4/5] w-[74vw] flex-none overflow-hidden rounded-2xl bg-navy-800 sm:w-[19rem]"
            >
              <Image
                src={slide.src}
                alt={slide.label}
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

      <Container className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous industry"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
        >
          <IconChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => setManuallyPaused((p) => !p)}
          aria-pressed={manuallyPaused}
          aria-label={manuallyPaused ? "Resume autoplay" : "Pause autoplay"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 motion-reduce:hidden"
        >
          {showPlayIcon ? <IconPlay /> : <IconPause />}
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next industry"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
        >
          <IconChevronRight />
        </button>
      </Container>
    </div>
  );
}
