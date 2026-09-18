import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoProblem({ heading, points }: { heading: string; points: string[] }) {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">{heading}</p>
          <ul className="mt-5 flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-lg leading-relaxed text-white/70">
                <span aria-hidden className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
