"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { EVENTS } from "@/lib/general/constants";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/general/utils";

export function EventsSection() {
  const t = useTranslations("Events");

  return (
    <section id="events" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <FadeIn className="mb-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-gold/50" />
            <div className="size-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Events grid — wedding spans full width on desktop */}
        <StaggerChildren staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EVENTS.map((event) => {
            const isWedding = event.slug === "wedding";
            return (
            <StaggerItem key={event.slug} className={isWedding ? "md:col-span-2" : ""}>
            <Link
              href={`/events/${event.slug}`}
              className={cn(
                "group relative block overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                isWedding ? "aspect-4/3 md:aspect-21/9" : "aspect-4/3 md:aspect-16/10"
              )}
            >
              {/* Background image with hover zoom */}
              <Image
                src={`/images/events/${event.slug}/1.jpg`}
                alt={t(`items.${event.slug}.title`)}
                fill
                className={cn("object-cover transition-transform duration-500 ease-out group-hover:scale-110", isWedding && "object-[center_35%]")}
                sizes={isWedding ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                quality={80}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 transition-colors duration-300 group-hover:from-black/85 group-hover:via-black/45" />

              {/* Content pinned to bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl text-white tracking-tight mb-2">
                  {t(`items.${event.slug}.title`)}
                </h3>
                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-4 max-w-md">
                  {t(`items.${event.slug}.description`)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-gold-light text-sm font-medium tracking-wide transition-all duration-300 group-hover:gap-2.5">
                  {t("seeMore")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
