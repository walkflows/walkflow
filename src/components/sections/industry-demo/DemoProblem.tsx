import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoProblem({ heading, points, image }: { heading: string; points: string[]; image: string }) {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
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
        <Reveal delay={0.1} y={28}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image src={image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
