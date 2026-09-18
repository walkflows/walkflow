import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoResults({ heading, body, outcomes }: { heading: string; body: string; outcomes: string[] }) {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">{heading}</h2>
          <p className="mt-4 leading-relaxed text-white/60">{body}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
                {outcome}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
