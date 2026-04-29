import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { EB_Garamond, Manrope } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { BaseLayoutProps } from "@/types/page-props";
import { BASE_URL, BUSINESS } from "@/lib/general/constants";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "greek"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const META = {
  el: {
    title: "MΩISIS Flower Design | Ανθοπωλείο Ηλιούπολη",
    description:
      "Ανθοπωλείο στην Ηλιούπολη. Στολισμοί γάμων, βαπτίσεις, μπουκέτα & λουλούδια για κάθε περίσταση. Παραδίδουμε μέσω Wolt. MΩISIS Flower Design.",
    keywords: [
      "ανθοπωλείο Ηλιούπολη",
      "λουλούδια Ηλιούπολη",
      "στολισμοί γάμων",
      "στολισμοί γάμων Ηλιούπολη",
      "στολισμός χώρων",
      "ανθοπωλείο κοντά μου",
      "ανθοστολισμός γάμου",
      "βαπτίσεις",
      "ανθοδέσμη",
      "μπουκέτα",
      "MΩISIS",
    ],
    ogDescription:
      "Ανθοπωλείο στην Ηλιούπολη. Στολισμοί γάμων, βαπτίσεις, μπουκέτα & λουλούδια για κάθε περίσταση. Παραδίδουμε μέσω Wolt.",
  },
  en: {
    title: "MΩISIS Flower Design | Flower Shop Ilioupoli Athens",
    description:
      "Premium flower shop in Ilioupoli, Athens. Wedding decorations, christenings, bouquets & floral arrangements for every occasion. Order via Wolt.",
    keywords: [
      "flower shop Ilioupoli",
      "flowers Athens",
      "wedding flowers",
      "wedding decoration",
      "florist near me",
      "event decoration",
      "bouquets",
      "christening flowers",
      "MΩISIS",
    ],
    ogDescription:
      "Premium flower shop in Ilioupoli, Athens. Wedding decorations, christenings, bouquets & floral arrangements for every occasion.",
  },
} as const;

export const generateMetadata = async ({ params }: BaseLayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  const lang = locale === "el" ? "el" : "en";
  const meta = META[lang];

  return {
    title: {
      default: meta.title,
      template: `%s | MΩISIS Flower Design`,
    },
    description: meta.description,
    keywords: [...meta.keywords],
    authors: [{ name: "MΩISIS Flower Design" }],
    creator: "MΩISIS Flower Design",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { el: "/el", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "MΩISIS Flower Design",
      title: meta.title,
      description: meta.ogDescription,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
      locale: locale === "el" ? "el_GR" : "en_US",
      alternateLocale: locale === "el" ? "en_US" : "el_GR",
    },
    twitter: {
      card: "summary_large_image",
      title: "MΩISIS Flower Design",
      description: meta.ogDescription,
      images: ["/images/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: BaseLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${ebGaramond.variable} ${manrope.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Florist",
              name: BUSINESS.name,
              description: locale === "el"
                ? "Ανθοπωλείο στην Ηλιούπολη — στολισμοί γάμων, βαπτίσεις, μπουκέτα & λουλούδια για κάθε περίσταση."
                : "Premium flower shop in Ilioupoli, Athens — wedding decorations, christenings, bouquets & floral arrangements for every occasion.",
              url: BASE_URL,
              telephone: BUSINESS.phoneHref.replace("tel:", ""),
              email: BUSINESS.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: BUSINESS.address.street,
                addressLocality: BUSINESS.address.city,
                addressRegion: "Αττική",
                postalCode: BUSINESS.address.zip,
                addressCountry: "GR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.9253,
                longitude: 23.7614,
              },
              hasMap: BUSINESS.googleMapsLink,
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "21:00" },
              ],
              image: `${BASE_URL}/images/og.jpg`,
              priceRange: "€€",
              sameAs: [
                BUSINESS.socials.facebook,
                BUSINESS.socials.instagram,
                BUSINESS.socials.tiktok,
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "43",
                bestRating: "5",
              },
            }),
          }}
        />
        <Providers messages={messages} locale={locale}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
