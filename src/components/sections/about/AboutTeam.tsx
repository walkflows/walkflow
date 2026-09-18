import { aboutTeam } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconPeople } from "@/components/ui/icons";

export function AboutTeam() {
  const seats = Array.from({ length: aboutTeam.seatCount }, (_, i) => i + 1);

  return (
    <section className="border-t border-white/10 bg-navy py-20 sm:py-28">
      <Container>
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
          {seats.map((seat, i) => (
            <Reveal key={seat} delay={i * 0.08} y={20}>
              <div className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-heading text-[7rem] font-medium leading-none text-white/[0.05]"
                >
                  {String(seat).padStart(2, "0")}
                </span>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-white/20 text-white/35">
                  <IconPeople className="h-8 w-8" />
                </div>
                <p className="relative mt-6 text-base font-semibold text-white/70">Team Member</p>
                <p className="relative mt-1 text-sm text-white/40">Role coming soon</p>
                <span className="relative mt-4 inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
                  Coming Soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
