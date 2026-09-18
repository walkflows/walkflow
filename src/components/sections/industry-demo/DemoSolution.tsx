import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DemoSolution({ heading, body, components }: { heading: string; body: string; components: string[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">{heading}</h2>
          <p className="mt-5 leading-relaxed text-white/60">{body}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {components.map((item) => (
              <li
                key={item}
                className="rounded-full border border-orange/25 bg-orange/[0.06] px-4 py-2 text-sm font-medium text-orange"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
