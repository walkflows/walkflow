import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function IndustryProblem({ heading, body, points }: { heading: string; body: string; points: string[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/60">{body}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-white/70">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
