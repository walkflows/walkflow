import { process } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      {/* Subtle depth so the section doesn't read as flat black: a faint
          grid texture (same technique as the hero) plus two soft, blurred
          orange glows tucked into opposite corners. All aria-hidden,
          low-opacity and pointer-events-none — never competes with the
          cards or text for attention. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,153,28,0.12),transparent)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,153,28,0.1),transparent)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {process.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.15] text-white">
              {process.headingLines.map((line) => (
                <span key={line} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} y={36}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/30 hover:bg-white/[0.05]">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-orange/30 font-heading text-lg font-medium text-orange transition-all duration-300 ease-out group-hover:scale-105 group-hover:border-orange/60 group-hover:shadow-[0_0_18px_-2px_rgba(255,153,28,0.5)]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
