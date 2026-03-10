"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/general/constants";
import { FadeIn } from "@/components/motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const t = useTranslations("Reviews");

  return (
    <section id="reviews" className="relative py-24 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-14">
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

        {/* Overall Rating Badge */}
        <FadeIn delay={0.2} className="flex justify-center mb-14">
          <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm px-10 py-8 text-center shadow-lg shadow-gold/5">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />

            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
              {t("overallRating")}
            </p>

            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="font-heading text-6xl md:text-7xl tracking-tight text-foreground leading-none">
                5.0
              </span>
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <GoogleIcon className="size-4" />
                  <span className="text-sm text-muted-foreground font-medium">
                    {t("fromGoogle")}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/70">
              {REVIEWS.length} {t("reviewsCount")}
            </p>
          </div>
        </FadeIn>

        {/* Review Cards Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {REVIEWS.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative h-full rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30">
                  {/* Decorative quote */}
                  <Quote className="absolute top-4 right-4 size-8 text-gold/10 transition-colors duration-300 group-hover:text-gold/20" />

                  {/* Header: name + stars + time */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-base truncate pr-8">
                        {review.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating count={review.rating} />
                      <span className="text-xs text-muted-foreground/60">
                        {review.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    {review.text}
                  </p>

                  {/* Footer: Google badge */}
                  <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-1.5">
                    <GoogleIcon className="size-3.5" />
                    <span className="text-xs text-muted-foreground/50 font-medium">
                      Google
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <CarouselPrevious className="static translate-y-0 size-10 border-border/60 bg-card/80 hover:bg-gold/10 hover:border-gold/40 hover:text-gold" />
            <CarouselNext className="static translate-y-0 size-10 border-border/60 bg-card/80 hover:bg-gold/10 hover:border-gold/40 hover:text-gold" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
