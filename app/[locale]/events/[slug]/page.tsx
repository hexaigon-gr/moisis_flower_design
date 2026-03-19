import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EVENTS, BUSINESS } from "@/lib/general/constants";
import { getImages } from "@/lib/general/images";
import { DetailPageLayout } from "@/components/detail-page-layout";

const validSlugs = EVENTS.map((e) => e.slug);

export const generateStaticParams = () => {
  return EVENTS.map((event) => ({ slug: event.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) return {};

  const t = await getTranslations({ locale, namespace: "EventPage" });

  return {
    title: `${t(`${slug}.title` as never)} — ${BUSINESS.name}`,
    description: t(`${slug}.heroDescription` as never),
  };
};

const EventPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("EventPage");

  return (
    <DetailPageLayout
      title={t(`${slug}.title` as never)}
      heroDescription={t(`${slug}.heroDescription` as never)}
      about={t(`${slug}.about` as never)}
      images={getImages("events", slug)}
      backHref="/#events"
      backLabel={t("backToEvents")}
      portfolioLabel={t("portfolio")}
      ctaLabel={t("bookConsultation")}
      contactLabel={t("contactUs")}
      galleryLabel={t("gallery")}
    />
  );
};

export default EventPage;
