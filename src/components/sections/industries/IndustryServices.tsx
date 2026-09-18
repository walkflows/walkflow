import type { IndustryServiceItem } from "@/content/industries";
import { Container } from "@/components/ui/Container";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { Reveal } from "@/components/ui/Reveal";
import { IconAutomation, IconMail, IconMobile, IconWebsite } from "@/components/ui/icons";

const icons = {
  automation: IconAutomation,
  mail: IconMail,
  website: IconWebsite,
  mobile: IconMobile,
};

/** Only the services most relevant to this industry — new, industry-specific copy per page rather than the generic homepage descriptions. */
export function IndustryServices({ heading, items }: { heading: string; items: IndustryServiceItem[] }) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  {item.optional && (
                    <span className="absolute right-6 top-6 rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white/50">
                      Optional
                    </span>
                  )}
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-orange/20 bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" />
                  </div>
                  <h3 className="mt-5 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{item.body}</p>
                  <div className="mt-auto pt-6">
                    <ExploreLink href={item.href}>{`Explore ${item.title}`}</ExploreLink>
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
