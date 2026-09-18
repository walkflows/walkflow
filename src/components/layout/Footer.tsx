import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconMail, IconMapPin, IconPhone, IconWhatsapp, IconLinkedin, IconInstagram } from "@/components/ui/icons";

const socialIcons = { whatsapp: IconWhatsapp, linkedin: IconLinkedin, instagram: IconInstagram };

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/85 hover:text-orange">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Reveal y={24}>
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <Image
              src={media.logoOnBlack.src!}
              alt={media.logoOnBlack.alt}
              width={160}
              height={160}
              className="h-11 w-11 object-contain"
            />
            <span className="font-heading text-lg font-bold">
              <span className="text-orange">WALK</span>
              <span className="text-white">FLOW</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{site.footerDescription}</p>
          <p className="mt-4 font-accent text-2xl font-medium text-orange-light">{site.tagline}</p>
        </div>

        <FooterColumn title="Industries" links={footerNav.industries} />
        <FooterColumn title="Services" links={footerNav.services} />

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">Connect with Us</h3>
          {/*
            Placeholder contact details (src/content/site.ts `contact`) — not
            Joshua's real email/phone/address yet. See CLAUDE.md/SESSION-NOTES.md.
          */}
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-start gap-2.5 text-sm text-white/85">
              <IconMail className="mt-0.5 h-4 w-4 flex-none text-orange" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-orange">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-white/85">
              <IconPhone className="mt-0.5 h-4 w-4 flex-none text-orange" />
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-orange">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-white/85">
              <IconMapPin className="mt-0.5 h-4 w-4 flex-none text-orange" />
              <span>{site.contact.address}</span>
            </li>
          </ul>

          <h3 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-white/60">Follow us</h3>
          <div className="mt-4 flex items-center gap-3">
            {site.social.map((profile) => {
              const Icon = socialIcons[profile.id as keyof typeof socialIcons];
              return (
                <Link
                  key={profile.id}
                  href={profile.href}
                  aria-label={profile.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
        </Container>
      </Reveal>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
            <button type="button" className="hover:text-white" data-cookie-settings>
              Cookie Settings
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
