import Image from "next/image";
import { aboutTeam } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeam() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy py-20 sm:py-28">
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[26vw] font-medium leading-none tracking-wide text-white/[0.05]"
      >
        TEAM
      </p>
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {aboutTeam.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">{aboutTeam.heading}</h2>
            <p className="mt-4 leading-relaxed text-white/60">{aboutTeam.body}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {aboutTeam.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} y={20}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-orange/30 hover:bg-white/[0.05]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[420ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 py-6 text-center">
                  <p className="font-heading text-lg font-medium text-white">{member.name}</p>
                  <p className="mt-1 text-sm font-semibold text-orange">{member.role}</p>
                  <p className="mt-3 leading-relaxed text-white/60">{member.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
