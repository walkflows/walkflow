"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { AppScreen } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/ui/icons";

/**
 * Banner + case-study/screenshot gallery for the Mobile App Development
 * detail pages (Session 26). The banner (the same showcase image used on
 * the gallery card) is itself a lightbox trigger — clicking it opens the
 * project's real inner screens starting at the first one, rather than just
 * re-displaying the showcase image the visitor already saw. Below it, a
 * numbered thumbnail grid gives direct access to any individual screen.
 * Both feed one shared lightbox with Left/Right navigation, since a project
 * here can have up to 6 untitled screens (unlike `EmailDesignGallery`'s two
 * titled, independently-opened designs).
 *
 * Sizing: the lightbox never crops. Each image is capped at 85% of the
 * viewport height and lets width follow from its real aspect ratio, so a
 * tall portrait screenshot (941x1672 for most of these) is shown whole and
 * large enough to read, instead of being squeezed into a fixed frame sized
 * for the landscape showcase image.
 */
export function AppScreenGallery({
  banner,
  screens,
}: {
  banner: { src: string; alt: string };
  screens: AppScreen[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const bannerTriggerRef = useRef<HTMLButtonElement>(null);
  const thumbTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  function openAt(i: number, trigger: HTMLElement) {
    lastTriggerRef.current = trigger;
    setOpenIndex(i);
  }

  function close() {
    setOpenIndex(null);
    lastTriggerRef.current?.focus();
  }

  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % screens.length));
  }

  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + screens.length) % screens.length));
  }

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && screens.length > 1) next();
      if (e.key === "ArrowLeft" && screens.length > 1) prev();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const openScreen = openIndex !== null ? screens[openIndex] : null;

  if (screens.length === 0) return null;

  return (
    <>
      <Reveal delay={0.08}>
        <button
          ref={bannerTriggerRef}
          type="button"
          onClick={(e) => openAt(0, e.currentTarget)}
          aria-label="Open the app's inner screens"
          className="group relative mt-10 block aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-navy outline-none transition-colors duration-200 ease-out hover:border-orange/30 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 1024px) 768px, 92vw" className="object-cover" priority />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 bg-navy-deep/80 py-2.5 text-center text-xs font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Click to view inner screens
          </span>
        </button>
      </Reveal>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-white">Inside the App</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {screens.map((screen, i) => (
            <Reveal key={screen.src} delay={i * 0.06}>
              <button
                ref={(el) => {
                  thumbTriggerRefs.current[i] = el;
                }}
                type="button"
                onClick={(e) => openAt(i, e.currentTarget)}
                aria-label={`Open enlarged view of screen ${i + 1}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 outline-none transition-colors duration-200 ease-out hover:border-orange/30 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 768px) 220px, 45vw"
                  loading="lazy"
                  className="h-auto w-full"
                />
                <span
                  aria-hidden
                  className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-deep/85 text-xs font-bold text-white backdrop-blur"
                >
                  {i + 1}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 bg-navy-deep/80 py-2 text-center text-xs font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  Click to enlarge
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openScreen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Screen ${(openIndex ?? 0) + 1} of ${screens.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-navy-deep/95 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close enlarged view"
              className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white outline-none transition-colors duration-150 ease-out hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-8 sm:top-8"
            >
              <IconClose className="h-4 w-4" />
            </button>

            {screens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screen"
                  className="fixed left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white outline-none transition-colors duration-150 ease-out hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:left-6"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screen"
                  className="fixed right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white outline-none transition-colors duration-150 ease-out hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-6"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="flex min-h-full flex-col items-center justify-center gap-3 px-4 py-16 sm:px-16">
              <Image
                src={openScreen.src}
                alt={openScreen.alt}
                width={openScreen.width}
                height={openScreen.height}
                sizes="92vw"
                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
                priority
              />
              {screens.length > 1 && (
                <p className="text-sm font-semibold text-white/50">
                  {(openIndex ?? 0) + 1} / {screens.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
