"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProjectShot } from "@/content/web-design-projects";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/ui/icons";

/**
 * Website showcase gallery for a Web Design project-detail page (Session
 * 27): one large screenshot, a balanced two-column pair, an optional extra
 * full-width shot (only Youghall's brand-story image uses this) and a
 * mobile screenshot group (one or two shots, since not every project
 * needed a full pair — see `web-design-projects.ts`). `betweenSlot`
 * (the "What this means for your visitors" 3-column block) renders
 * between the pair and the extra/mobile groups, breaking up the gallery
 * per the brief, while this component still owns one shared lightbox
 * across every image so Left/Right navigation moves through the whole set
 * in visual order.
 *
 * Every image opens the lightbox uncropped: capped at 85% of the viewport
 * height with width following its real aspect ratio, so a portrait mobile
 * screenshot is shown whole and legible rather than squeezed into a
 * landscape frame.
 */
export function WebDesignShowcase({
  large,
  pair,
  extra,
  mobile,
  betweenSlot,
}: {
  large: ProjectShot;
  pair: [ProjectShot, ProjectShot];
  extra?: ProjectShot;
  mobile: ProjectShot[];
  betweenSlot: ReactNode;
}) {
  const images = [large, ...pair, ...(extra ? [extra] : []), ...mobile];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  function close() {
    setOpenIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }

  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
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

  function renderThumb(shot: ProjectShot, index: number, wide = true) {
    return (
      <Reveal key={shot.src} delay={Math.min(index, 4) * 0.06}>
        <figure>
          <button
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open enlarged view: ${shot.alt}`}
            className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 outline-none transition-colors duration-200 ease-out hover:border-orange/30 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={wide ? "(min-width: 1024px) 700px, 92vw" : "(min-width: 640px) 260px, 45vw"}
              loading={index === 0 ? undefined : "lazy"}
              priority={index === 0}
              className="h-auto w-full"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 bg-navy-deep/80 py-2 text-center text-xs font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Click to enlarge
            </span>
          </button>
          {shot.caption && <figcaption className="mt-3 text-sm leading-relaxed text-white/55">{shot.caption}</figcaption>}
        </figure>
      </Reveal>
    );
  }

  const openShot = openIndex !== null ? images[openIndex] : null;

  return (
    <div className="mt-14 flex flex-col gap-10">
      {renderThumb(large, 0)}

      <div className="grid gap-6 sm:grid-cols-2">
        {renderThumb(pair[0], 1)}
        {renderThumb(pair[1], 2)}
      </div>

      {betweenSlot}

      {extra && renderThumb(extra, 1 + pair.length)}

      <div className={mobile.length > 1 ? "grid grid-cols-2 gap-6 sm:max-w-md" : "max-w-[220px]"}>
        {mobile.map((shot, i) => renderThumb(shot, 1 + pair.length + (extra ? 1 : 0) + i, false))}
      </div>

      <AnimatePresence>
        {openShot && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={openShot.alt}
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

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="fixed left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white outline-none transition-colors duration-150 ease-out hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:left-6"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="fixed right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white outline-none transition-colors duration-150 ease-out hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-6"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="flex min-h-full flex-col items-center justify-center gap-3 px-4 py-16 sm:px-16">
              <Image
                src={openShot.src}
                alt={openShot.alt}
                width={openShot.width}
                height={openShot.height}
                sizes="92vw"
                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
                priority
              />
              {openShot.caption && <p className="max-w-xl text-center text-sm text-white/60">{openShot.caption}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
