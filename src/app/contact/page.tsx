import type { Metadata } from "next";
import { contactPage, contactSeo } from "@/content/contact";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
};

export default function ContactPage() {
  return (
    <section className="bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange">
            {contactPage.eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.1] text-white">
            {contactPage.heading}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-white/65">{contactPage.intro}</p>
        </Reveal>

        <div className="mt-12">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
