import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { EVENTS } from "@/lib/general/constants";
import { Link } from "@/lib/i18n/navigation";

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
    title: `${t(`${slug}.title` as never)} — MOISIS Flower Design`,
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

  const title = t(`${slug}.title` as never);
  const heroDescription = t(`${slug}.heroDescription` as never);
  const about = t(`${slug}.about` as never);

  return (
    <>
      {/* Back link — floating over hero */}
      <div className="absolute top-20 left-0 z-20 w-full">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/#events"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {t("backToEvents")}
          </Link>
        </div>
      </div>

      {/* Hero Banner — 50vh, editorial crop */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image
          src={`/images/events/${slug}.jpg`}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

        {/* Hero content — anchored to bottom */}
        <div className="relative z-10 w-full pb-12 pt-20">
          <div className="mx-auto max-w-6xl px-6">
            {/* Gold decorative line */}
            <div className="mb-5 h-px w-16 bg-gold/60" />

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-4">
              {title}
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-cream/70 font-light leading-relaxed">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* About the Service */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_var(--gold)_1px,_transparent_0)] bg-[size:48px_48px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column — decorative */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center pt-2">
              <div className="h-24 w-px bg-linear-to-b from-transparent via-gold/40 to-transparent" />
              <div className="my-4 size-2 rotate-45 border border-gold/50" />
              <div className="h-24 w-px bg-linear-to-b from-transparent via-gold/40 to-transparent" />
            </div>

            {/* Right column — content */}
            <div className="lg:col-span-9">
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-light">
                {about}
              </p>

              {/* Decorative gold separator */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-linear-to-r from-gold/30 to-transparent" />
                <div className="size-1.5 rounded-full bg-gold/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-forest">
        {/* Decorative overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24 text-center">
          {/* Decorative element */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <div className="size-1.5 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold/40" />
          </div>

          <p className="mb-8 text-lg text-cream/60 font-light tracking-wide">
            {t("contactUs")}
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 rounded-lg border-2 border-gold/60 bg-gold/10 px-8 py-4 font-medium text-gold-light tracking-wide transition-all duration-300 hover:bg-gold/20 hover:border-gold hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(180,150,80,0.15)] active:scale-[0.98]"
          >
            <span className="text-base">{t("bookConsultation")}</span>
          </Link>
        </div>
      </section>

      {/* Bottom back link */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/#events"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {t("backToEvents")}
        </Link>
      </div>
    </>
  );
};

export default EventPage;
