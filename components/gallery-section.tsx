"use client";

import { useTranslations } from "next-intl";
import { ImageGallery } from "@/components/image-gallery";

const GALLERY_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/gallery/${i + 1}.jpg`);

export function GallerySection() {
  const t = useTranslations("Gallery");

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 bg-muted/50 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/40" />
            <div className="size-1.5 rounded-full bg-gold/60" />
            <div className="h-px w-10 bg-gold/40" />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ImageGallery images={GALLERY_IMAGES} />
        </div>
      </div>
    </section>
  );
}
