import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OCCASIONS, BUSINESS } from "@/lib/general/constants";
import { getImages } from "@/lib/general/images";
import { DetailPageLayout } from "@/components/detail-page-layout";

const validSlugs = OCCASIONS.map((o) => o.slug);

export const generateStaticParams = () => {
  return OCCASIONS.map((occasion) => ({ slug: occasion.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) return {};

  const t = await getTranslations({ locale, namespace: "OccasionPage" });

  return {
    title: `${t(`${slug}.title` as never)} | ${BUSINESS.name}`,
    description: t(`${slug}.heroDescription` as never),
  };
};

const OccasionPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as (typeof validSlugs)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("OccasionPage");

  return (
    <DetailPageLayout
      title={t(`${slug}.title` as never)}
      heroDescription={t(`${slug}.heroDescription` as never)}
      about={t(`${slug}.about` as never)}
      images={getImages("occasions", slug)}
      backHref="/#occasions"
      backLabel={t("backToOccasions")}
      portfolioLabel={t("portfolio")}
      ctaLabel={t("bookConsultation")}
      contactLabel={t("contactUs")}
      galleryLabel={t("gallery")}
      photoshootNotice={t("photoshootNotice")}
    />
  );
};

export default OccasionPage;
