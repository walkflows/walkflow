"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll-position fix (mobile especially): an ordinary internal
 * link to a new route should always land at the top of that page's hero,
 * not wherever the previous page happened to be scrolled to.
 *
 * Keyed on `pathname` alone (never the hash) — Next's `usePathname()`
 * excludes the hash entirely, so an in-page anchor jump (e.g. `#demos`)
 * never changes `pathname` and this effect never fires for it. That's what
 * keeps intentional section links working untouched, with no special-casing
 * needed here.
 *
 * Back/forward navigation is deliberately left alone: a `popstate` listener
 * flags the next pathname change as history navigation so the browser's own
 * scroll restoration applies instead of our forced reset.
 */
export function ScrollRestoration() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isPopNavigation = useRef(false);

  useEffect(() => {
    function onPopState() {
      isPopNavigation.current = true;
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      return;
    }
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
