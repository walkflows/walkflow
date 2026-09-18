import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function IndustrySolutions({
  heading,
  body,
  areas,
}: {
  heading: string;
  body: string;
  areas: string[];
}) {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-4xl">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/60">{body}</p>
        </Reveal>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((item, i) => (
            <Reveal key={item} delay={i * 0.04} y={16}>
              <div className="group flex h-full items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange/30 hover:bg-white/[0.05]">
                <span aria-hidden className="mr-3 h-1.5 w-1.5 flex-none rounded-full bg-orange" />
                <span className="text-sm font-medium text-white/85">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
