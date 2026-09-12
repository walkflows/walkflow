import { serviceShowcase } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame, AutomationIllustration, WebsiteIllustration } from "@/components/ui/illustrations";

const illustrations = {
  "web-design": WebsiteIllustration,
  "ai-automation": AutomationIllustration,
};

export function ServiceShowcase() {
  return (
    <section id={serviceShowcase.id} className="scroll-mt-24 bg-cream py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-dark">{serviceShowcase.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-navy">
              {serviceShowcase.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{serviceShowcase.body}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {serviceShowcase.services.map((service, i) => {
            const Illustration = illustrations[service.id as keyof typeof illustrations];
            return (
              <Reveal key={service.id} delay={i * 0.1}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-[0_1px_2px_rgba(19,35,60,0.05)]">
                  <BrowserFrame>
                    <Illustration className="block h-auto w-full" />
                  </BrowserFrame>
                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    <h3 className="font-heading text-2xl font-bold text-navy sm:text-3xl">{service.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted">{service.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-navy/12 bg-surface px-3 py-1.5 text-xs font-semibold text-navy/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href={service.cta.href} variant="secondary">
                        {service.cta.label}
                      </Button>
                    </div>
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
