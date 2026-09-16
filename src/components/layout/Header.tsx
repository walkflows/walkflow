"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav, requestCallCta } from "@/content/navigation";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cx } from "@/lib/utils";

function NavDropdown({ label, href, items }: { label: string; href: string; items: { label: string; href: string }[] }) {
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
        className="flex items-center gap-1 py-2 text-[0.95rem] font-medium text-white/80 hover:text-white"
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={cx("transition-transform", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 rounded-2xl border border-navy/10 bg-white p-2 shadow-[var(--shadow-card)]">
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/90 backdrop-blur">
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Image
            src={media.logoOnDark.src!}
            alt={media.logoOnDark.alt}
            width={160}
            height={160}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading text-lg font-bold text-white">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} label={item.label} href={item.href} items={item.children} />
            ) : (
              <Link key={item.href} href={item.href} className="py-2 text-[0.95rem] font-medium text-white/80 hover:text-white">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href={requestCallCta.href}>{requestCallCta.label}</Button>
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
      </Container>

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
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <div key={item.href} className="border-b border-white/10 py-2 last:border-none">
                  <Link href={item.href} className="block py-2 text-base font-semibold text-white" onClick={() => setMobileOpen(false)}>
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
              <Button href={requestCallCta.href} className="mt-4 w-full">
                {requestCallCta.label}
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
