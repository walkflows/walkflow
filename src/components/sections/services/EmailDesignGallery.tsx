"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { EmailDesign } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { IconClose } from "@/components/ui/icons";

/**
 * Stacked, full-proportion email designs for a project's detail page
 * (Session 24), each openable in an enlarged, scrollable lightbox. Images
 * are shown at their real aspect ratio — never cropped — since these are
 * the actual deliverables, not thumbnails.
 *
 * Lightbox accessibility: Escape closes it, an obvious close button is
 * always visible, focus moves to that close button on open and returns to
 * whichever thumbnail opened it on close, and the trigger is a real
 * `<button>` so it's reachable and operable by keyboard on its own.
 */
export function EmailDesignGallery({ designs }: { designs: EmailDesign[] }) {
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

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  const openDesign = openIndex !== null ? designs[openIndex] : null;

  return (
    <div className="mt-10 flex flex-col gap-12">
      {designs.map((design, i) => (
        <Reveal key={design.title} delay={i * 0.08}>
          <div>
            <h2 className="text-lg font-semibold text-white">{design.title}</h2>
            <p className="mt-1.5 max-w-xl leading-relaxed text-white/60">{design.description}</p>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open enlarged view of ${design.title}`}
              className="group relative mt-5 block w-full max-w-md overflow-hidden rounded-2xl border border-white/10 outline-none transition-colors duration-200 ease-out hover:border-orange/30 focus-visible:border-orange/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              <Image
                src={design.src}
                alt={design.alt}
                width={design.width}
                height={design.height}
                sizes="(min-width: 640px) 448px, 92vw"
                // Only the first design sits above the fold on this page — eager-load (priority) just that one, lazy-load the rest.
                {...(i === 0 ? { priority: true } : { loading: "lazy" as const })}
                className="h-auto w-full"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-navy-deep/80 py-2.5 text-center text-xs font-bold uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                Click to enlarge
              </span>
            </button>
          </div>
        </Reveal>
      ))}

      <AnimatePresence>
        {openDesign && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={openDesign.title}
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
            <div className="flex min-h-full items-start justify-center px-4 py-16 sm:px-8">
              <Image
                src={openDesign.src}
                alt={openDesign.alt}
                width={openDesign.width}
                height={openDesign.height}
                sizes="(min-width: 640px) 640px, 92vw"
                className="h-auto w-full max-w-2xl rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
