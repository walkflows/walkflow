import { serviceReviewsNotice } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * REVIEWS PLACEHOLDER — REPLACE BEFORE PUBLISHING. Honest, no-fabrication
 * state: there are no verified client reviews anywhere in this project yet.
 * Swap in real, permissioned reviews here once they exist.
 */
export function ServiceReviews() {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{serviceReviewsNotice.heading}</h2>
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="leading-relaxed text-white/60">{serviceReviewsNotice.notice}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
