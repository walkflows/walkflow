import Image from "next/image";
import { tools } from "@/content/tools";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact "platforms we work with" section for the Mobile App Development
 * page (Session 26), placed immediately after "How We Work" — same slot and
 * exact styling as `ServiceEmailPlatforms.tsx`, per explicit instruction to
 * reuse that section's style. Limited to `tools.ts`'s app-development-
 * relevant subset of the existing approved "design" category — Expo,
 * Flutter, FlutterFlow, Bubble, Supabase — leaving out the web-design/CMS
 * tools that category also includes (Framer, Shopify, Squarespace, Wix,
 * Webflow, WordPress), since those aren't app-development platforms.
 */
const appPlatformIds = ["expo", "flutter", "flutterflow", "bubble", "supabase"];
const appPlatforms = tools.filter((tool) => appPlatformIds.includes(tool.id));

export function ServiceAppPlatforms() {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              Platforms
            </span>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2rem)] leading-[1.2] text-white">App Development Platforms We Work With</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {appPlatforms.map((tool) => (
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
