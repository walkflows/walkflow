import { services } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconAutomation, IconMail, IconMobile, IconWebsite } from "@/components/ui/icons";

const icons = {
  automation: IconAutomation,
  mail: IconMail,
  website: IconWebsite,
  mobile: IconMobile,
};

export function Services() {
  return (
    <section id={services.id} className="scroll-mt-24 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-block rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
                {services.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">
                {services.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <Button href={services.cta.href} className="flex-none">
              {services.cta.label}
              <IconArrowRight />
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy p-8">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-orange/20 bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <h3 className="mt-5 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{item.body}</p>
                  <div className="mt-auto pt-6">
                    <ExploreLink href={item.cta.href}>{item.cta.label}</ExploreLink>
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
