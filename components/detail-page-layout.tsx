import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { ImageGallery } from "@/components/image-gallery";

interface DetailPageLayoutProps {
  title: string;
  heroDescription: string;
  about: string;
  images: string[];
  backHref: string;
  backLabel: string;
  portfolioLabel: string;
  ctaLabel: string;
  contactLabel: string;
  galleryLabel: string;
  photoshootNotice: string;
}

export function DetailPageLayout({
  title,
  heroDescription,
  about,
  images,
  backHref,
  backLabel,
  portfolioLabel,
  ctaLabel,
  contactLabel,
  galleryLabel,
  photoshootNotice,
}: DetailPageLayoutProps) {
  const heroImage = images[0];

  return (
    <>
      {/* ─── Split Hero: Title + Image side by side ─── */}
      <section className="relative min-h-[85vh] bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Back link */}
          <div className="pt-24 pb-8">
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 text-sm text-cream/50 transition-colors duration-300 hover:text-cream/80"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {backLabel}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center pb-16 lg:pb-0">
            {/* Left — Title & description */}
            <div className="lg:pr-16 xl:pr-24">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold/70">
                  {portfolioLabel}
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cream tracking-tight leading-[1.05] mb-6">
                {title}
              </h1>

              <p className="max-w-md text-lg text-cream/50 font-light leading-relaxed mb-10">
                {heroDescription}
              </p>

              <Link
                href="/#contact-form"
                className="inline-flex items-center gap-2.5 rounded-lg border border-gold/40 bg-gold/10 px-7 py-3.5 text-sm font-medium text-gold-light tracking-wide transition-all duration-300 hover:bg-gold/20 hover:border-gold/60"
              >
                {ctaLabel}
              </Link>
            </div>

            {/* Right — Hero image */}
            {heroImage && (
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-none aspect-3/4 overflow-hidden rounded-xl">
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    quality={90}
                  />
                </div>
                <div className="absolute -inset-8 -z-10 rounded-3xl bg-gold/5 blur-2xl" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="size-1.5 rounded-full bg-gold/60" />
              <div className="h-px w-10 bg-gold/30" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight text-foreground">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/70 font-light">
              {about}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Photoshoot Notice ─── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4 rounded-xl border border-gold/20 bg-gold/5 px-6 py-5">
          <Camera className="mt-0.5 size-5 shrink-0 text-gold/70" />
          <p className="text-sm leading-relaxed text-foreground/60">
            {photoshootNotice}
          </p>
        </div>
      </div>

      {/* ─── Photo Gallery ─── */}
      {images.length > 1 && (
        <section className="relative overflow-hidden bg-forest/5">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_var(--gold)_1px,_transparent_0)] bg-[size:48px_48px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="mb-14 flex items-center gap-6">
              <h2 className="font-heading text-3xl md:text-4xl tracking-tight text-foreground">
                {galleryLabel}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <ImageGallery images={images} alt={title} />
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <div className="size-1.5 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gold/40" />
          </div>

          <p className="mb-8 text-lg text-cream/60 font-light tracking-wide">
            {contactLabel}
          </p>

          <Link
            href="/#contact-form"
            className="inline-flex items-center gap-2.5 rounded-lg border-2 border-gold/60 bg-gold/10 px-8 py-4 font-medium text-gold-light tracking-wide transition-all duration-300 hover:bg-gold/20 hover:border-gold hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(180,150,80,0.15)] active:scale-[0.98]"
          >
            <span className="text-base">{ctaLabel}</span>
          </Link>
        </div>
      </section>

      {/* Bottom back link */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>
      </div>
    </>
  );
}
