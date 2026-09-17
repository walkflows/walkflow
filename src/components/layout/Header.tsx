"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav, consultationCta } from "@/content/navigation";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

/**
 * The header spans a wider band than the rest of the page's content
 * column (which uses the shared, narrower `Container`), per the reference
 * layout's edge-to-edge feel. Kept local to Header rather than changing
 * `Container` itself, since only the header/hero were in scope this round.
 */
function HeaderBand({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[100rem] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Trigger classes shared between the plain-link and dropdown-trigger nav items. */
const navItemClass =
  "whitespace-nowrap rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-wide outline-none transition-colors duration-200";
const navItemIdleClass = "text-white/75 hover:bg-white/10 hover:text-orange focus-visible:bg-white/10 focus-visible:text-orange";
const navItemActiveClass = "bg-white/10 text-orange";

/** Close delay bridges the visual gap between the trigger and the panel below it. */
const CLOSE_DELAY_MS = 150;

function NavDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: { label: string; href: string }[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    clearCloseTimer();
    setOpen(true);
  };
  const closeWithDelay = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const closeNow = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) closeNow();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        closeNow();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeNow]);

  useEffect(() => clearCloseTimer, []);

  return (
    <div className="relative" ref={wrapperRef} onMouseEnter={openNow} onMouseLeave={closeWithDelay}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        onClick={() => (open ? closeNow() : openNow())}
        className={cx("flex items-center gap-1", navItemClass, active ? navItemActiveClass : navItemIdleClass)}
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={cx("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-navy/10 bg-white p-2 shadow-[var(--shadow-card)]"
          >
            {items.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-xl px-3 py-2 text-sm text-navy/80 outline-none transition-colors duration-150 hover:bg-surface hover:text-orange-dark focus-visible:bg-surface focus-visible:text-orange-dark"
                onClick={closeNow}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/90 backdrop-blur"
    >
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <HeaderBand className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Image
            src={media.logoOnBlack.src!}
            alt={media.logoOnBlack.alt}
            width={160}
            height={160}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading text-lg font-bold">
            <span className="text-orange">WALK</span>
            <span className="text-white">FLOW</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center justify-center gap-1 justify-self-center rounded-full border border-white/10 bg-white/[0.04] p-1.5 lg:flex"
        >
          {mainNav.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={item.children}
                active={item.children.some((child) => isActivePath(pathname, child.href))}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                aria-current={isActivePath(pathname, item.href!) ? "page" : undefined}
                className={cx(navItemClass, isActivePath(pathname, item.href!) ? navItemActiveClass : navItemIdleClass)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden lg:block">
            <Button href={consultationCta.href}>
              {consultationCta.label}
              <IconArrowRight />
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Close Menu" : "Open Menu"}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </HeaderBand>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-white/10 bg-navy-deep lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeInOut" }}
          >
            <HeaderBand className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <div key={item.label} className="border-b border-white/10 py-2 last:border-none">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block py-2 text-base font-semibold uppercase tracking-wide text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p className="py-2 text-base font-semibold uppercase tracking-wide text-white/50">{item.label}</p>
                  )}
                  {item.children && (
                    <div className="mt-1 flex flex-col gap-1 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-lg py-1.5 text-sm text-white/65 transition-colors duration-150 hover:text-orange"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button href={consultationCta.href} className="mt-4 w-full">
                {consultationCta.label}
                <IconArrowRight />
              </Button>
            </HeaderBand>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
