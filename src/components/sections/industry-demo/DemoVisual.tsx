import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WebsiteIllustration } from "@/components/ui/illustrations";

/**
 * Placeholder for real screenshots the user will supply later (per
 * explicit instruction, Session 10). Uses the same illustrated
 * browser-window mockup as the homepage's Web Design service card rather
 * than a broken image or an empty box, with a clear "coming soon" label —
 * matching CLAUDE.md's rule that unfinished visuals show an intentional
 * placeholder state, not a fake finished one.
 */
export function DemoVisual({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] leading-[1.15] text-white">{heading}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{body}</p>
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10">
            <WebsiteIllustration className="block h-auto w-full" />
            <span className="absolute right-4 top-4 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/60 backdrop-blur-sm">
              Coming soon
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
