import Link from "next/link";
import { demoShowcase } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

export function DemoShowcase() {
  return (
    <section className="border-y border-navy/8 bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-dark">{demoShowcase.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              {demoShowcase.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{demoShowcase.body}</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {demoShowcase.items.map((item) => {
              const isLive = item.status === "simulated";
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cx(
                    "group flex flex-col justify-between rounded-3xl border p-6 transition-shadow",
                    isLive
                      ? "border-orange/30 bg-orange/[0.04] hover:shadow-[var(--shadow-card)]"
                      : "border-navy/8 bg-surface hover:shadow-[var(--shadow-card)]",
                  )}
                >
                  <div>
                    <span
                      className={cx(
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                        isLive ? "bg-orange/15 text-orange-dark" : "bg-navy/8 text-navy/60",
                      )}
                    >
                      {item.statusLabel}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">{item.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                  <span
                    className={cx(
                      "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                      isLive ? "text-navy" : "text-navy/50",
                    )}
                  >
                    {item.cta}
                    <IconArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
