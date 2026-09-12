import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx } from "@/lib/utils";

export function HeroServicePanel({
  label,
  children,
  className,
  tilt = -4,
  duration = 9,
  delay = 0,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  tilt?: number;
  duration?: number;
  delay?: number;
}) {
  const style = {
    "--tilt": `${tilt}deg`,
    "--float-duration": `${duration}s`,
    "--float-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={cx(
        "animate-float absolute w-40 overflow-hidden rounded-2xl border border-white/12 bg-navy-800/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:w-64",
        className,
      )}
    >
      <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy">
        {label}
      </span>
      <div className="aspect-[4/3]">{children}</div>
    </div>
  );
}
