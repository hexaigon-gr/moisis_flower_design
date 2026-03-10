import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { BUSINESS, EVENTS } from "@/lib/general/constants";
import { SocialIcon } from "@/components/social-icon";
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

/* TikTok has no lucide icon — inline SVG */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#hero", key: "home" },
  { href: "#about", key: "about" },
  { href: "#events", key: "events" },
  { href: "#occasions", key: "occasions" },
  { href: "#gallery", key: "gallery" },
  { href: "#reviews", key: "reviews" },
  { href: "#contact", key: "contact" },
] as const;

export async function Footer() {
  const [tFooter, tNav, tEvents] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Events"),
  ]);

  return (
    <footer className="relative bg-forest text-cream/80">
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gold/20" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ─── Column 1: Brand ─── */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt={BUSINESS.name}
                width={56}
                height={56}
                className="rounded-full opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
            <p className="font-serif text-lg font-semibold tracking-wide text-cream">
              {BUSINESS.name}
            </p>
            <p className="text-sm leading-relaxed text-cream/60">
              {BUSINESS.tagline}
            </p>
          </div>

          {/* ─── Column 2: Quick Links ─── */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
              {tFooter("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 3: Events ─── */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
              {tFooter("events")}
            </h4>
            <ul className="space-y-3">
              {EVENTS.map(({ slug }) => (
                <li key={slug}>
                  <Link
                    href={`/events/${slug}`}
                    className="text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    {tEvents(`items.${slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 4: Contact + Social ─── */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
              {tFooter("contact")}
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                  <span>{BUSINESS.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="group flex items-center gap-2 text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                  <span>{BUSINESS.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="group flex items-center gap-2 text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  <Mail className="size-4 shrink-0 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                  <span className="break-all">{BUSINESS.email}</span>
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold/70">
                {tFooter("followUs")}
              </p>
              <div className="flex items-center gap-3">
                <SocialIcon
                  url={BUSINESS.socials.instagram}
                  icon={<Instagram className="size-5" />}
                  color="instagram"
                  isMobile
                />
                <SocialIcon
                  url={BUSINESS.socials.facebook}
                  icon={<Facebook className="size-5" />}
                  color="facebook"
                  isMobile
                />
                <SocialIcon
                  url={BUSINESS.socials.tiktok}
                  icon={<TikTokIcon className="size-5" />}
                  color="tiktok"
                  isMobile
                />
              </div>
            </div>

            {/* Wolt link */}
            <a
              href={BUSINESS.wolt}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-2 text-xs font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              <ExternalLink className="size-3.5" />
              {tFooter("orderOnWolt")}
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 border-t border-gold/20 pt-6 flex flex-col items-center gap-2">
          <p className="text-center text-xs tracking-wide text-cream/40">
            &copy; {new Date().getFullYear()} MΩISIS Flower Design.{" "}
            {tFooter("copyright")}
          </p>
          <a
            href="https://hexaigon.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-cream/30 transition-colors duration-300 hover:text-cream/50"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 fill-amber-500/70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            </svg>
            Made by hexaigon.gr
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
