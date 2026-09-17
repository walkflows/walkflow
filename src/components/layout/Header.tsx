"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

function NavDropdown({
  label,
  href,
  items,
  active,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
          active ? "bg-white/10 text-orange" : "text-white/75 hover:text-white",
        )}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={cx("transition-transform", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-navy/10 bg-white p-2 shadow-[var(--shadow-card)]">
          <Link
            href={href}
            className="block rounded-xl px-3 py-2 text-sm font-semibold text-navy hover:bg-surface"
            onClick={() => setOpen(false)}
          >
            {label} overview
          </Link>
          <div className="my-1 h-px bg-border" />
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-xl px-3 py-2 text-sm text-navy/80 hover:bg-surface hover:text-navy"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
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
                key={item.href}
                label={item.label}
                href={item.href}
                items={item.children}
                active={isActivePath(pathname, item.href)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className={cx(
                  "whitespace-nowrap rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
                  isActivePath(pathname, item.href) ? "bg-white/10 text-orange" : "text-white/75 hover:text-white",
                )}
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
                <div key={item.href} className="border-b border-white/10 py-2 last:border-none">
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-semibold uppercase tracking-wide text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 flex flex-col gap-1 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-1.5 text-sm text-white/65"
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
