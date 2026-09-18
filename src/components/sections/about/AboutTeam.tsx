import { aboutTeam } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconPeople } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

export function AboutTeam() {
  const seats = Array.from({ length: aboutTeam.seatCount }, (_, i) => i + 1);

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

        {/* Card format follows the reference's team layout — big numeral accent, a featured
            middle card, a badge overlapping the photo area — filled with honest placeholder
            content (no invented names/roles/photos) since real profiles aren't in yet. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {seats.map((seat, i) => {
            const featured = i === 1;
            return (
              <Reveal key={seat} delay={i * 0.08} y={20}>
                <div
                  className={cx(
                    "relative flex flex-col overflow-hidden rounded-3xl border",
                    featured ? "border-orange/30 bg-gradient-to-b from-orange to-orange-hover" : "border-white/10 bg-white/[0.03]",
                  )}
                >
                  <div className="relative flex aspect-[3/4] flex-col items-center justify-end overflow-hidden">
                    <span
                      aria-hidden
                      className={cx(
                        "pointer-events-none absolute left-5 top-5 select-none font-heading text-5xl font-medium leading-none",
                        featured ? "text-navy-deep/25" : "text-white/[0.08]",
                      )}
                    >
                      {String(seat).padStart(2, "0")}
                    </span>
                    <div
                      className={cx(
                        "relative mb-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed",
                        featured ? "border-navy-deep/30 text-navy-deep/50" : "border-white/20 text-white/35",
                      )}
                    >
                      <IconPeople className="h-9 w-9" />
                    </div>
                    <div
                      className={cx(
                        "absolute bottom-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full text-lg font-semibold",
                        featured ? "bg-navy-deep text-orange" : "bg-white text-navy-deep",
                      )}
                      aria-hidden
                    >
                      +
                    </div>
                  </div>
                  <div className={cx("px-5 py-5 text-center", featured ? "bg-navy-deep" : "")}>
                    <p className="text-base font-semibold text-white/80">Team Member</p>
                    <p className="mt-1 text-sm text-white/40">Role coming soon</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
