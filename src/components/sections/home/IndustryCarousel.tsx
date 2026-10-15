"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { industriesCarousel } from "@/content/industries-carousel";
import { Container } from "@/components/ui/Container";
import { IconPause, IconPlay } from "@/components/ui/icons";

const PX_PER_SECOND = 39.6; // calm, readable pace — 10% faster than the original 36px/s
const DRAG_TO_SCROLL = 1; // 1:1 pointer-to-track movement

/**
 * Auto-scrolling industries gallery.
 *
 * Movement is a Web Animations API transform animation on the track, so the browser runs it on the compositor
 * thread: no JavaScript runs per frame and the main thread stays free. (It used to be a Motion value updated from
 * JavaScript on every frame, which kept the page rendering about 58 frames a second even when nothing else was
 * happening.) The slide list is rendered twice back to back and the animation travels exactly one copy's width per
 * cycle, so the loop restarts on pixel-identical content (seamless).
 *
 * Dragging pauses the animation and sets its position 1:1 from the pointer; letting go hands back to the
 * continuous loop from wherever the drag ended. The pause button is the deliberate user-controlled stop. The loop
 * also pauses by itself while the gallery is off screen or the browser tab is hidden, and never plays when the
 * visitor prefers reduced motion (the track stays draggable).
 */
export function IndustryCarousel() {
  const reduceMotion = useReducedMotion();
  const loopSlides = useMemo(() => [...industriesCarousel, ...industriesCarousel], []);

  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const widthRef = useRef(0); // one copy's width in px
  const drag = useRef<{ startClientX: number; startX: number } | null>(null);

  const shouldPlay = !reduceMotion && !manuallyPaused && !dragging && inView && tabVisible;
  // build() reads the latest value when it recreates the animation (e.g. on resize), without re-running every time it changes.
  const shouldPlayRef = useRef(shouldPlay);
  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
  }, [shouldPlay]);

  const cycleMs = (width: number) => (width / PX_PER_SECOND) * 1000;

  /** (Re)creates the animation for the current track width, keeping the current position. */
  const build = useCallback(() => {
    const track = trackRef.current;
    if (!track || typeof track.animate !== "function") return;
    const width = track.scrollWidth / 2; // two copies side by side; one copy's width is half
    if (!width) return;

    const old = animRef.current;
    let progress = 0;
    if (old && widthRef.current) {
      const oldCycle = cycleMs(widthRef.current);
      progress = (((Number(old.currentTime) || 0) % oldCycle) + oldCycle) % oldCycle / oldCycle;
    }
    old?.cancel();

    widthRef.current = width;
    const duration = cycleMs(width);
    const anim = track.animate(
      [{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(${-width}px, 0, 0)` }],
      { duration, iterations: Infinity, easing: "linear" },
    );
    anim.currentTime = progress * duration;
    if (shouldPlayRef.current) anim.play();
    else anim.pause();
    animRef.current = anim;
  }, []);

  useEffect(() => {
    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      animRef.current?.cancel();
      animRef.current = null;
    };
  }, [build]);

  // Play or pause whenever any of the reasons to move (or not) changes.
  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (shouldPlay) anim.play();
    else anim.pause();
  }, [shouldPlay]);

  // Stop doing work while the gallery is scrolled out of view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // ...and while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /** Current track offset in px (0 at the start of a cycle, negative as it scrolls left). */
  const currentX = () => {
    const anim = animRef.current;
    const width = widthRef.current;
    if (!anim || !width) return 0;
    const cycle = cycleMs(width);
    const t = (((Number(anim.currentTime) || 0) % cycle) + cycle) % cycle;
    return -(t / cycle) * width;
  };

  /** Moves the track to an offset by setting the animation's position (wraps within one copy's width). */
  const setX = (x: number) => {
    const anim = animRef.current;
    const width = widthRef.current;
    if (!anim || !width) return;
    const cycle = cycleMs(width);
    const t = (((-x / width) * cycle) % cycle + cycle) % cycle;
    anim.currentTime = t;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    animRef.current?.pause();
    drag.current = { startClientX: e.clientX, startX: currentX() };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setX(drag.current.startX + (e.clientX - drag.current.startClientX) * DRAG_TO_SCROLL);
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false); // the play/pause effect resumes the loop from here (unless manually paused)
  };

  const activeLabel = industriesCarousel[0]?.label ?? "";

  return (
    <div
      ref={rootRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries we work with"
    >
      <span className="sr-only">{activeLabel} and other industries — scrolling gallery</span>

      <div className="mx-auto w-full max-w-[100rem] overflow-hidden px-5 sm:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab touch-pan-y gap-4 will-change-transform active:cursor-grabbing"
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
        </div>
      </div>

      <Container className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setManuallyPaused((p) => !p)}
          aria-pressed={manuallyPaused}
          aria-label={manuallyPaused ? "Resume autoplay" : "Pause autoplay"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 motion-reduce:hidden"
        >
          {manuallyPaused || dragging ? <IconPlay /> : <IconPause />}
        </button>
      </Container>
    </div>
  );
}
