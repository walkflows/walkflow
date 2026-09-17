import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowUpRight } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

/**
 * Label + circular arrow as a single link. On hover/focus the circle fills
 * orange, the resting (white) arrow slides diagonally out to the upper
 * right, and a second (dark) arrow slides in from the lower left to take
 * its place — both clipped inside the fixed-size circle via
 * `overflow-hidden`, so nothing changes the surrounding layout. Movement is
 * plain CSS transform/colour transitions, so the site-wide
 * `prefers-reduced-motion` rule in globals.css (which zeroes all transition
 * durations) automatically collapses this to an instant colour change with
 * no perceptible slide, without any extra reduced-motion branching here.
 */
export function ExploreLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex w-fit items-center gap-3 rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange",
        className,
      )}
    >
      <span className="text-xs font-bold uppercase tracking-wide text-white transition-colors duration-[240ms] group-hover:text-orange group-focus-visible:text-orange">
        {children}
      </span>
      <span className="relative flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-full border border-white/20 transition-colors duration-[240ms] group-hover:border-orange group-hover:bg-orange group-focus-visible:border-orange group-focus-visible:bg-orange">
        <IconArrowUpRight className="absolute text-white transition-transform duration-[240ms] ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-focus-visible:translate-x-4 group-focus-visible:-translate-y-4" />
        <IconArrowUpRight className="absolute -translate-x-4 translate-y-4 text-navy-deep transition-transform duration-[240ms] ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0" />
      </span>
    </Link>
  );
}
