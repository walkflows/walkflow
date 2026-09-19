import type { TitleBody } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceBenefits({ heading, body, items }: { heading: string; body: string; items: TitleBody[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mt-5 leading-relaxed text-white/60">{body}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} y={24}>
              {/* The numeral is a static label, not a control — no hover/focus affordance, so it never reads as a clickable button. */}
              <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span aria-hidden className="pointer-events-none absolute right-6 top-5 font-heading text-3xl font-medium text-orange/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-[85%] text-lg text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
