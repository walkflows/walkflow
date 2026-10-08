import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import {
  privacyIntro,
  privacyOpenItems,
  privacySections,
  privacySeo,
  type PrivacyBlock,
} from "@/content/privacy";

export const metadata: Metadata = {
  title: privacySeo.title,
  description: privacySeo.description,
  // Draft: keep out of search results until the open items are resolved.
  robots: privacyOpenItems.length > 0 ? { index: false, follow: false } : undefined,
};

function Block({ block }: { block: PrivacyBlock }) {
  if (typeof block === "string") {
    return <p className="leading-relaxed text-muted">{block}</p>;
  }
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted marker:text-orange-dark">
      {block.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[22rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,153,28,0.14),transparent)]"
        />
        <Container className="relative"><div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {privacyIntro.eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-white">
            {privacyIntro.heading}
          </h1>
          <p className="mt-6 leading-relaxed text-white/65">{privacyIntro.summary}</p>
          <p className="mt-4 text-sm text-white/50">Last updated: {privacyIntro.lastUpdated}</p>
        </div></Container>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <Container><div className="mx-auto max-w-3xl">
          {privacyOpenItems.length > 0 && (
            <aside
              aria-label="Draft review notes"
              className="mb-12 rounded-2xl border border-orange/40 bg-orange/10 p-5 text-sm text-ink"
            >
              <p className="font-bold">Draft for review: not yet published</p>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5">
                {privacyOpenItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          )}

          <nav aria-label="On this page" className="mb-12 rounded-2xl border border-border bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">On this page</p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {privacySections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink underline-offset-4 hover:text-orange-dark hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {privacySections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                <h2 id={`${s.id}-h`} className="text-[clamp(1.35rem,2.4vw,1.75rem)] leading-tight text-ink">
                  {s.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div></Container>
      </section>
    </>
  );
}
