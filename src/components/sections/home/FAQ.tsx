import { faq } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section className="border-y border-navy/8 bg-white py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold tracking-tight text-navy">{faq.heading}</h2>
          <div className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
            {faq.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-navy">
                  {item.question}
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-navy/15 text-navy transition-transform group-open:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
