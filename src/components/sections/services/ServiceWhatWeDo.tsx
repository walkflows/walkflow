import type { TitleBody } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceWhatWeDo({ heading, body, items }: { heading: string; body: string; items: TitleBody[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mt-5 leading-relaxed text-white/60">{body}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} y={16}>
              <div className="border-b border-white/10 pb-6 last:border-none last:pb-0">
                <h3 className="text-lg text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
