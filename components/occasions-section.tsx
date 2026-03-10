"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { OCCASIONS } from "@/lib/general/constants";

export function OccasionsSection() {
  const t = useTranslations("Occasions");

  return (
    <section
      id="occasions"
      className="relative py-24 md:py-32 bg-muted/50 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          {/* Decorative separator above title */}
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

        {/* Occasions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {OCCASIONS.map((occasion, index) => (
            <div
              key={occasion.slug}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* Photo background */}
              <Image
                src={`/images/occasions/${occasion.slug}.jpg`}
                alt={t(`items.${occasion.slug}.title`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
              />

              {/* Dark gradient overlay — stronger at bottom, shifts on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/40" />

              {/* Subtle gold edge glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-gold/30 group-hover:ring-2" />

              {/* Content — pinned to bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end">
                <h3 className="font-heading text-xl md:text-2xl text-white tracking-wide mb-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                  {t(`items.${occasion.slug}.title`)}
                </h3>
                <p className="text-sm md:text-base text-white/70 font-light leading-relaxed transition-all duration-300 group-hover:text-white/90">
                  {t(`items.${occasion.slug}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
