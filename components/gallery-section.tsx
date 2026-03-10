"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/gallery/${i + 1}.jpg`,
  index: i,
}));

export function GallerySection() {
  const t = useTranslations("Gallery");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  return (
    <>
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

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 max-w-6xl mx-auto [column-fill:balance]">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className="group relative mb-4 md:mb-5 break-inside-avoid overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <Image
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  width={600}
                  height={[800, 600, 700][index % 3]}
                  className="w-full h-auto object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                />

                {/* Hover overlay with gold accent */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-gold/30 group-hover:ring-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 animate-in fade-in duration-300"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
            aria-label={t("close")}
          >
            <X className="size-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 md:left-6 z-10 flex size-11 md:size-12 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
            aria-label={t("previous")}
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 md:right-6 z-10 flex size-11 md:size-12 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
            aria-label={t("next")}
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Current image */}
          <div
            className="relative max-w-4xl w-full mx-4 md:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[85vh] flex items-center justify-center">
              <Image
                src={GALLERY_IMAGES[currentIndex].src}
                alt={`Gallery image ${currentIndex + 1}`}
                width={1200}
                height={900}
                className="max-h-[85vh] w-auto mx-auto rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                sizes="(max-width: 768px) 95vw, 80vw"
                quality={90}
                priority
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-white/80 backdrop-blur-sm font-light tracking-wide">
            <span className="font-medium text-white">
              {currentIndex + 1}
            </span>
            <span>{t("imageOf")}</span>
            <span className="font-medium text-white">
              {GALLERY_IMAGES.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
