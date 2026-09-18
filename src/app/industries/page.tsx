import type { Metadata } from "next";
import { industriesDirectory } from "@/content/industries";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";
import { IndustryDirectoryCards } from "@/components/sections/industries/IndustryDirectoryCards";
import { ContactPromptCta } from "@/components/sections/home/ContactPromptCta";

export const metadata: Metadata = {
  title: industriesDirectory.seo.title,
  description: industriesDirectory.seo.description,
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-16 sm:pb-20 sm:pt-20">
        <p
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[26vw] font-medium leading-none tracking-wide text-white/[0.05] sm:top-20 sm:text-[19vw]"
        >
          INDUSTRIES
        </p>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(255,153,28,0.28),transparent)]"
        />

        <Container className="relative flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {industriesDirectory.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.1] text-white">
              {industriesDirectory.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">{industriesDirectory.body}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8">
              <Button href={industriesDirectory.cta.href}>
                {industriesDirectory.cta.label}
                <IconArrowRight />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <IndustryDirectoryCards />

      <ContactPromptCta
        heading={industriesDirectory.final.heading}
        body={industriesDirectory.final.body}
        cta={industriesDirectory.final.cta}
      />
    </>
  );
}
