import Link from "next/link";
import { contactHero } from "@/content/contact";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconInstagram, IconLinkedin, IconMail, IconPeople, IconPhone, IconSchedule, IconTiktok, IconYoutube } from "@/components/ui/icons";

const socialIcons: Record<string, typeof IconLinkedin> = {
  linkedin: IconLinkedin,
  tiktok: IconTiktok,
  instagram: IconInstagram,
  youtube: IconYoutube,
};

type Card = { id: string; wide?: boolean; content: React.ReactNode };

/**
 * Contact-info cards, built only from confirmed real WALKFLOW details.
 *
 * As of Session 22, none of these are confirmed: `site.contact.confirmed`
 * is `false` (the phone/address/email above it are documented dummy
 * placeholder data, not Joshua's real details), `hours` is `null` (never
 * supplied), and every `site.social` entry is a literal "#" stub with no
 * real profile behind it. Per explicit instruction, invented, placeholder,
 * or personal-inbox details are not published here — each card below
 * renders only when its underlying data is genuinely present, and the
 * section falls back to a plain notice when none are. Set
 * `site.contact.confirmed = true` (after replacing the placeholder values),
 * fill in `hours`, and/or point a `site.social` entry at a real profile,
 * and the matching card(s) appear automatically — no changes needed here.
 */
function buildCards(): Card[] {
  const cards: Card[] = [];

  if (site.contact.confirmed) {
    cards.push({
      id: "phone",
      content: (
        <InfoCard icon={IconPhone} label="Phone">
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-orange">
            {site.contact.phone}
          </a>
        </InfoCard>
      ),
    });
    cards.push({
      id: "email",
      content: (
        <InfoCard icon={IconMail} label="Email">
          <a href={`mailto:${site.contact.email}`} className="hover:text-orange">
            {site.contact.email}
          </a>
        </InfoCard>
      ),
    });
  }

  if (site.contact.hours && site.contact.hours.length > 0) {
    cards.push({
      id: "hours",
      wide: true,
      content: (
        <InfoCard icon={IconSchedule} label="Opening Hours">
          <div className="flex flex-col gap-1">
            {site.contact.hours.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </InfoCard>
      ),
    });
  }

  const realSocial = site.social.filter((profile): profile is typeof profile & { href: string } => Boolean(profile.href));
  if (realSocial.length > 0) {
    cards.push({
      id: "social",
      content: (
        <InfoCard icon={IconPeople} label="Follow Us">
          <div className="mt-1 flex items-center gap-3">
            {realSocial.map((profile) => {
              const Icon = socialIcons[profile.id];
              return (
                <Link
                  key={profile.id}
                  href={profile.href}
                  aria-label={profile.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                </Link>
              );
            })}
          </div>
        </InfoCard>
      ),
    });
  }

  return cards;
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof IconPhone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/30 hover:bg-white/[0.05] hover:shadow-[0_0_28px_-10px_rgba(255,153,28,0.45)]">
      <div className="flex items-center gap-2.5 text-white/50">
        <Icon className="h-4 w-4 flex-none text-orange transition-transform duration-300 ease-out group-hover:scale-110" />
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-3 leading-relaxed text-white/80">{children}</div>
    </div>
  );
}

export function ContactHero() {
  const cards = buildCards();

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-14 pt-20 sm:pb-16 sm:pt-24">
      {/* Plain near-black background with just the subtle grid-line texture
          used elsewhere on the site (no oversized wordmark, no orange glow
          band) — per explicit instruction, so the hero reads as a clean
          "black with line design" backdrop and blends into the form
          section directly below it (both are the same bg-navy-deep, with
          nothing here to create a visible seam at the boundary). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container className="relative">
        <Reveal>
          <h1 className="text-balance text-center text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-white">{contactHero.heading}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.02] p-3 sm:p-4">
            {cards.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {cards.map((card, i) => (
                  <Reveal key={card.id} delay={0.15 + i * 0.08} y={16} className={card.wide ? "sm:col-span-2" : undefined}>
                    {card.content}
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/[0.03] p-8 text-center">
                <p className="font-semibold text-white">Direct contact details are on the way.</p>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  We&rsquo;re finalising WALKFLOW&rsquo;s phone, email and hours for this page — use the form below in
                  the meantime and we&rsquo;ll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
