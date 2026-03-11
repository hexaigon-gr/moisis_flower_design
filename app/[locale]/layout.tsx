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

export const metadata: Metadata = {
  title: {
    default: "MΩISIS Flower Design | Ανθοπωλείο Ηλιούπολη",
    template: "%s | MΩISIS Flower Design",
  },
  description:
    "Curated floral compositions for weddings, christenings, and every occasion. Premium flower shop in Ilioupoli, Athens. Defined by quality & detail.",
  keywords: [
    "ανθοπωλείο",
    "Ηλιούπολη",
    "λουλούδια",
    "γάμος",
    "βάπτιση",
    "ανθοδέσμη",
    "flower shop",
    "Athens",
    "wedding flowers",
    "MΩISIS",
  ],
  authors: [{ name: "MΩISIS Flower Design" }],
  creator: "MΩISIS Flower Design",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: { el: "/el", en: "/en" },
  },
  openGraph: {
    type: "website",
    siteName: "MΩISIS Flower Design",
    title: "MΩISIS Flower Design | Ανθοπωλείο Ηλιούπολη",
    description:
      "Curated floral compositions for weddings, christenings, and every occasion. Premium flower shop in Ilioupoli, Athens.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
    locale: "el_GR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MΩISIS Flower Design",
    description: "Premium flower shop in Ilioupoli, Athens — weddings, events & curated arrangements.",
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
              description: "Curated floral compositions for weddings, christenings, and every occasion. Premium flower shop in Ilioupoli, Athens.",
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
                latitude: 37.9300,
                longitude: 23.7500,
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "22:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "22:00" },
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
                reviewCount: "10",
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
