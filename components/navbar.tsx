"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/general/utils";
import { BUSINESS } from "@/lib/general/constants";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/examples/language-switcher";

import { SocialIcon } from "@/components/social-icon";
import { WoltButton } from "@/components/wolt-button";

const NAV_LINKS = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "events", href: "#events" },
  { key: "occasions", href: "#occasions" },
  { key: "products", href: "#products" },
  { key: "gallery", href: "#gallery" },
  { key: "reviews", href: "#reviews" },
  { key: "contact", href: "#contact" },
] as const;

// Simple SVG icons for social platforms (inline to avoid extra dependencies)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export const Navbar = () => {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMobileMenu();

      if (!isHomePage) {
        // Navigate to homepage with hash — scroll will happen after load
        router.push(`/${href}`);
        return;
      }

      if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [closeMobileMenu, isHomePage, router]
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Left: Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="relative flex shrink-0 items-center"
            >
              <Image
                src="/images/mini_logo.png"
                alt={BUSINESS.name}
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </a>

            {/* Center: Desktop Nav Links */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                    "after:absolute after:bottom-0.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-2/3",
                    isScrolled
                      ? "text-foreground/80 hover:text-gold"
                      : "text-white/90 hover:text-gold-light"
                  )}
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Right: Desktop Actions */}
            <div className="hidden items-center gap-2 lg:flex">
              {/* Phone */}
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className={cn(
                  "transition-colors duration-300",
                  isScrolled
                    ? "text-foreground/70 hover:text-gold hover:bg-accent"
                    : "text-white/80 hover:text-gold-light hover:bg-white/10"
                )}
              >
                <a href={BUSINESS.phoneHref} aria-label={t("phone")}>
                  <Phone className="size-4" />
                </a>
              </Button>

              {/* Wolt */}
              <WoltButton
                size="small"
                className={cn(
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white"
                )}
              />

              {/* Language Switcher — override styles for transparent state */}
              <div
                className={cn(
                  "[&_button]:transition-colors [&_button]:duration-300",
                  !isScrolled &&
                    "[&_button]:border-white/20 [&_button]:text-white/80 [&_button]:hover:text-white [&_button]:hover:bg-white/10 [&_button]:bg-transparent"
                )}
              >
                <LanguageSwitcher />
              </div>

            </div>

            {/* Mobile: Hamburger Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden transition-colors duration-300",
                isScrolled
                  ? "text-foreground hover:bg-accent"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? t("close") : t("menu")}
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel — slides from right */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[min(85vw,360px)] bg-background/98 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          "border-l border-border",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Panel Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Image
            src="/images/mini_logo.png"
            alt={BUSINESS.name}
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={closeMobileMenu}
            aria-label={t("close")}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Panel Body */}
        <div className="flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto px-6 py-6">
          {/* Nav Links */}
          <div className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-all duration-300 hover:bg-accent hover:text-gold"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="inline-block h-px w-0 bg-gold transition-all duration-300 group-hover:w-4 group-hover:mr-3" />
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="space-y-4 border-t border-border pt-4">
            {/* Wolt Button — full width, normal size */}
            <WoltButton className="w-full justify-center" />

            {/* Phone */}
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:bg-accent hover:text-gold"
            >
              <Phone className="size-4" />
              {BUSINESS.phone}
            </a>

            {/* Social Icons + Switchers */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <SocialIcon
                  url={BUSINESS.socials.instagram}
                  icon={<InstagramIcon className="size-4" />}
                  color="instagram"
                  isMobile
                />
                <SocialIcon
                  url={BUSINESS.socials.facebook}
                  icon={<FacebookIcon className="size-4" />}
                  color="facebook"
                  isMobile
                />
                <SocialIcon
                  url={BUSINESS.socials.tiktok}
                  icon={<TikTokIcon className="size-4" />}
                  color="tiktok"
                  isMobile
                />
              </div>
              <LanguageSwitcher toggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
