import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

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
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <Image
              src={media.logoOnDark.src!}
              alt={media.logoOnDark.alt}
              width={160}
              height={160}
              className="h-11 w-11 object-contain"
            />
            <span className="font-heading text-lg font-bold text-white">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{site.footerDescription}</p>
          <p className="mt-4 font-accent text-2xl font-medium text-orange-light">{site.tagline}</p>
        </div>

        <FooterColumn title="Services" links={footerNav.services} />
        <FooterColumn title="Industries" links={footerNav.industries} />
        <FooterColumn title="Explore" links={footerNav.explore} />
      </Container>

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
