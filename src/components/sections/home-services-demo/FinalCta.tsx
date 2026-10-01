import { homeServicesDemoFinalCta } from "@/content/home-services-demo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="bg-navy-deep px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-navy p-10 text-center sm:p-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-[90px]" />
          <Container className="relative max-w-xl px-0">
            <h2 className="text-[clamp(1.9rem,4.2vw,2.75rem)] leading-[1.15] text-white">{homeServicesDemoFinalCta.heading}</h2>
            <div className="mt-8 flex justify-center">
              <Button href={homeServicesDemoFinalCta.cta.href}>{homeServicesDemoFinalCta.cta.label}</Button>
            </div>
            <p className="mt-5 text-sm text-white/55">This sends a real enquiry to WALKFLOW — separate from the sample journey above, which sends nothing.</p>
          </Container>
        </div>
      </Reveal>
    </section>
  );
}
