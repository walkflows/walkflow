import type { IndustryDemoStep } from "@/content/industry-demos";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoSteps({ heading, items }: { heading: string; items: IndustryDemoStep[] }) {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">{heading}</h2>
          <ol className="mt-8">
            {items.map((step, i) => (
              <li key={step.title} className="relative flex gap-6 pb-8 last:pb-0">
                {i < items.length - 1 && (
                  <span aria-hidden className="absolute left-[1.1rem] top-11 h-[calc(100%-1.5rem)] w-px bg-white/10" />
                )}
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-orange/40 font-heading text-sm font-medium text-orange">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-lg text-white">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-white/60">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
