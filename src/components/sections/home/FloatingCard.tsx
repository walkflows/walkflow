import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx } from "@/lib/utils";

export function FloatingCard({
  icon,
  label,
  detail,
  className,
  tilt = -6,
  duration = 7,
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  detail: string;
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
        "animate-float absolute flex w-52 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-3.5 backdrop-blur-md",
        className,
      )}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-orange/20 text-orange-light">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-semibold text-white">{label}</span>
        <span className="block whitespace-nowrap text-xs text-white/55">{detail}</span>
      </span>
    </div>
  );
}
