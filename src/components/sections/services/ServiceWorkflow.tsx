import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceWorkflow({ heading, steps }: { heading: string; steps: string[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
          <ol className="mt-9">
            {steps.map((step, i) => (
              <li key={step} className="relative flex gap-5 pb-7 last:pb-0">
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute left-[1.05rem] top-10 h-[calc(100%-1.25rem)] w-px bg-white/10" />
                )}
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-orange/40 font-heading text-sm font-medium text-orange">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed text-white sm:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
