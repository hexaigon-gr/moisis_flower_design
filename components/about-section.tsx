"use client";

import { useTranslations } from "next-intl";
import { Award, Sparkles, HeartHandshake } from "lucide-react";
import { CircleIcon } from "@/components/CircleIcon";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

const HIGHLIGHTS = [
  { key: "quality", icon: <Award className="size-5" /> },
  { key: "creativity", icon: <Sparkles className="size-5" /> },
  { key: "service", icon: <HeartHandshake className="size-5" /> },
] as const;

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Left column — Text */}
          <FadeIn direction="left" className="lg:w-3/5">
            <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-foreground mb-4">
              {t("title")}
            </h2>

            {/* Gold accent bar */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-0.5 w-16 bg-gold rounded-full" />
              <div className="size-1 rounded-full bg-gold" />
            </div>

            <p className="text-lg font-medium text-muted-foreground mb-4 leading-relaxed">
              {t("subtitle")}
            </p>

            <p className="text-base text-muted-foreground/80 leading-relaxed max-w-xl">
              {t("description")}
            </p>
          </FadeIn>

          {/* Right column — Highlight cards */}
          <StaggerChildren staggerDelay={0.15} className="lg:w-2/5 w-full flex flex-col gap-5">
            {HIGHLIGHTS.map(({ key, icon }) => (
              <StaggerItem key={key}>
                <div className="group relative rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30">
                <div className="flex items-start gap-4">
                  <CircleIcon
                    color="oklch(0.74 0.1 85)"
                    icon={icon}
                    size={48}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1.5 text-base">
                      {t(`highlights.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`highlights.${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
