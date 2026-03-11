"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { BUSINESS, PRODUCTS } from "@/lib/general/constants";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

export function ProductsSection() {
  const t = useTranslations("Products");

  return (
    <section
      id="products"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-12 md:mb-16">
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
        </FadeIn>

        {/* Products grid — compact tiles */}
        <StaggerChildren
          staggerDelay={0.05}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.slug}>
              <a
                href={`${BUSINESS.wolt}${product.href.replace("/en/grc/athens/venue/misis-flower-design", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Square image */}
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={t(`items.${product.slug}`)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  {/* External link icon on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="size-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                      <ExternalLink className="size-3 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="px-3 py-2.5">
                  <h3 className="text-xs md:text-sm font-medium text-foreground leading-tight line-clamp-2 text-center">
                    {t(`items.${product.slug}`)}
                  </h3>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
