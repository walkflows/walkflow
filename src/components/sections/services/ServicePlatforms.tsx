import Image from "next/image";
import { tools } from "@/content/tools";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared "Platforms & Tools" section for all four service pages (Session
 * 29) — generalised from the Email Marketing/Mobile App Development
 * versions (`ServiceEmailPlatforms.tsx`/`ServiceAppPlatforms.tsx`, now
 * removed) into one component so all four pages share the exact same
 * position, heading hierarchy, logo container, spacing and static-row
 * layout, per explicit instruction. Each page supplies its own heading and
 * the subset of `tools.ts` entries relevant to that service — never a tool
 * unrelated to what that page actually offers.
 */
export function ServicePlatforms({ heading, toolIds }: { heading: string; toolIds: string[] }) {
  const platforms = tools.filter((tool) => toolIds.includes(tool.id));

  return (
    <section className="border-t border-white/10 bg-navy-deep py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              Platforms &amp; Tools
            </span>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2rem)] leading-[1.2] text-white">{heading}</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {platforms.map((tool) => (
              <li
                key={tool.id}
                className="group flex h-16 w-52 flex-none items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition-all duration-[350ms] ease-out hover:-translate-y-1.5 hover:border-orange/40 hover:bg-white/[0.07] hover:shadow-[0_0_28px_-6px_rgba(255,153,28,0.4)]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/95 p-1.5 transition-transform duration-300 ease-out group-hover:scale-110">
                  <Image src={tool.src} alt={`${tool.name} logo`} width={36} height={36} className="h-full w-full object-contain" />
                </span>
                <span className="truncate text-sm font-semibold text-white/85">{tool.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
