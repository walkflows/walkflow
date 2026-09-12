import Link from "next/link";
import { whatWeBuild } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AutomationIllustration, WebsiteIllustration } from "@/components/ui/illustrations";
import { IconArrowUpRight } from "@/components/ui/icons";

const illustrations = [WebsiteIllustration, AutomationIllustration];

export function WhatWeBuild() {
  return (
    <section className="bg-navy py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {whatWeBuild.heading}
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {whatWeBuild.cards.map((card, i) => {
              const Illustration = illustrations[i];
              return (
                <Link
                  key={card.title}
                  href={card.cta.href}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-orange/40"
                >
                  <div className="p-5 sm:p-7">
                    <Illustration className="w-full" />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8">
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-white/60">{card.body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                      {card.cta.label}
                      <IconArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
