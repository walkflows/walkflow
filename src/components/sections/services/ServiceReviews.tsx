import type { ReviewItem } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Renders nothing when there are no real reviews yet — per explicit
 * instruction, this section must stay ready in the code without ever
 * displaying an editorial placeholder ("[Insert genuine reviews...]") as if
 * it were a real testimonial. Every service page currently passes an empty
 * `reviews` array (see content/services.ts) because no verified WALKFLOW
 * reviews exist anywhere in this project yet. Add real, permissioned
 * reviews to a page's `reviews` array and this section appears
 * automatically — no other changes needed.
 */
export function ServiceReviews({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-4xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              Reviews
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] text-white">What clients say about working with us.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08} y={20}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <p className="leading-relaxed text-white/80">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-white">{review.name}</p>
                <p className="text-sm text-white/50">{review.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
