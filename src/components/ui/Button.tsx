import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "secondary-on-dark" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  sm: "px-4 py-2.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-orange text-navy hover:bg-orange-hover shadow-[var(--shadow-soft)]",
  secondary: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "secondary-on-dark": "border border-white/30 text-white hover:bg-white hover:text-navy",
  ghost: "text-navy hover:text-orange-dark",
};

type LinkButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Button({ variant = "primary", size = "md", className, children, href, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

type NativeButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function ButtonEl({ variant = "primary", size = "md", className, children, ...rest }: NativeButtonProps) {
  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
