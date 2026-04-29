"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";
import { Button } from "@/components/ui/button";
import { TodayCelebration } from "@/components/today-celebration";

export function HeroSection() {
  const t = useTranslations("Hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Background video — WebM first (smaller), MP4 fallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero/hero.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/videos/hero-video.webm" type="video/webm" />
        <source src="/images/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/30" />

      {/* Subtle animated grain texture for luxury feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-24 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-4 md:mb-5 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          <Image
            src="/images/mini_logo.png"
            alt="MΩISIS logo"
            width={64}
            height={64}
            className="size-14 md:size-16"
          />
        </div>

        {/* Headline */}
        <h1 className="font-heading text-[2.75rem] md:text-7xl text-white tracking-tight leading-[1.1] mb-2 md:mb-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          {t("headline")}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gold-light/90 tracking-[0.2em] uppercase font-light mb-5 md:mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          {t("headlineSubtitle")}
        </p>

        {/* Decorative separator */}
        <div className="flex items-center gap-4 mb-5 md:mb-6 animate-in fade-in duration-700 delay-300">
          <div className="h-px w-12 bg-gold/50" />
          <div className="size-1.5 rounded-full bg-gold" />
          <div className="h-px w-12 bg-gold/50" />
        </div>

        {/* Subheadline */}
        <p className="text-base md:text-xl text-cream/80 max-w-md md:max-w-2xl font-light leading-relaxed mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          {t("subheadline")}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          {/* Contact CTA — Gold outline */}
          <Button
            asChild
            variant="outline"
            className="w-45 gap-2 border-2 border-gold/60 bg-transparent text-gold-light hover:bg-gold/10 hover:border-gold hover:text-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <a href="/#contact">
              <MessageCircle className="size-4 text-gold" />
              <span className="text-sm sm:text-base tracking-wide">
                {t("contactButton")}
              </span>
            </a>
          </Button>
        </div>

        {/* Phone number */}
        <a
          href={BUSINESS.phoneHref}
          className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white/90 animate-in fade-in duration-700 delay-700"
        >
          <Phone className="size-3.5" />
          <span className="text-sm tracking-wider font-light">
            {BUSINESS.phone}
          </span>
        </a>

        {/* Today's celebration widget */}
        <TodayCelebration />
      </div>
    </section>
  );
}
