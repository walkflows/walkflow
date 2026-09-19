import type { Metadata } from "next";
import { Suspense } from "react";
import { contactPage, contactSeo } from "@/content/contact";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="bg-navy-deep pb-20 sm:pb-28">
        <Container className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
              {contactPage.eyebrow}
            </span>
            <p className="mt-5 max-w-xl leading-relaxed text-white/65">{contactPage.intro}</p>
          </Reveal>

          <div className="mt-10">
            {/* useSearchParams (for the ?service= preselect) requires a Suspense boundary in a statically-rendered route. */}
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
