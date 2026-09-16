import { process, why } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function WhyAndProcess() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <h2 className="text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold leading-[1.08] text-navy">
                {why.heading}
              </h2>
              <dl className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
                {why.points.map((point) => (
                  <div key={point.title} className="py-6">
                    <dt className="text-lg font-bold text-navy">{point.title}</dt>
                    <dd className="mt-2 max-w-md leading-relaxed text-muted">{point.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold leading-[1.08] text-navy">
                {process.heading}
              </h2>
              <ol className="mt-10">
                {process.steps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
                    {i < process.steps.length - 1 && (
                      <span aria-hidden className="absolute left-[1.1rem] top-11 h-[calc(100%-1.5rem)] w-px bg-navy/12" />
                    )}
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-orange/40 font-heading text-sm font-bold text-orange-dark">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
