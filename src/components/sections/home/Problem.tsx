import { problem } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.04] tracking-tight text-navy">
              {problem.heading}
            </h2>
            <div className="flex flex-col gap-5 lg:pt-3">
              <p className="text-lg leading-relaxed text-muted">{problem.body}</p>
              <p className="border-l-2 border-orange pl-5 text-lg font-medium leading-relaxed text-navy">
                {problem.resolution}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
