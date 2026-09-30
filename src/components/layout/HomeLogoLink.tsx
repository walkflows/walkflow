"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Shared "logo → homepage hero top" behaviour for Header and Footer
 * (Session 29). A plain `<Link href="/">` does nothing when already on "/",
 * since Next.js only scrolls/re-renders on an actual route change — this
 * wrapper detects that case and scrolls to the top itself instead. When
 * navigating from a different route, the real navigation proceeds and the
 * site-wide `ScrollRestoration` component (mounted once in layout.tsx)
 * already forces the new page to the top, so nothing extra is needed here
 * for that path.
 */
export function HomeLogoLink({
  className,
  ariaLabel,
  onBeforeNavigate,
  children,
}: {
  className?: string;
  ariaLabel: string;
  /** Fired synchronously before either branch below — e.g. closing an open mobile menu and releasing its scroll lock. */
  onBeforeNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        onBeforeNavigate?.();
        if (pathname === "/") {
          e.preventDefault();
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }}
    >
      {children}
    </Link>
  );
}
