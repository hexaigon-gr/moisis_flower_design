"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Flower, CalendarHeart, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/general/utils";
import { BUSINESS } from "@/lib/general/constants";

const WOLT_FLOWERS_URL = `${BUSINESS.wolt}/items/menucategory-19`;

interface NamedayResponse {
  names: string[];
  holiday: { el: string; en: string } | null;
  date: string;
}

export function TodayCelebration() {
  const t = useTranslations("TodayCelebration");
  const locale = useLocale();
  const [data, setData] = useState<NamedayResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/namedays/today")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: NamedayResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Skeleton for hero context (translucent on dark bg)
  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-6 animate-in fade-in duration-500">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <Skeleton className="size-8 rounded-full bg-white/10" />
            <Skeleton className="h-4 w-36 bg-white/10" />
          </div>
          <Skeleton className="h-3.5 w-full bg-white/10 mb-2" />
          <Skeleton className="h-3.5 w-2/3 bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !data) return null;

  const hasNames = data.names.length > 0;
  const hasHoliday = data.holiday !== null;

  if (!hasNames && !hasHoliday) return null;

  const holidayText = data.holiday
    ? data.holiday[locale as "el" | "en"]
    : null;

  const todayFormatted = new Date().toLocaleDateString(
    locale === "el" ? "el-GR" : "en-GB",
    { weekday: "long", day: "numeric", month: "long" }
  );

  return (
    <div className="w-full max-w-md mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-gold/20">
              <Flower className="size-4 text-gold" />
            </div>
            <h2 className="text-sm font-semibold text-white/90 tracking-wide">
              {t("title")}
            </h2>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70 capitalize">
            {todayFormatted}
          </span>
        </div>

        {/* Names */}
        {hasNames && (
          <p className="text-sm text-white/70 leading-relaxed mb-2">
            {data.names.join(", ")}
          </p>
        )}

        {/* Holiday */}
        {hasHoliday && holidayText && (
          <div className="flex items-center gap-1.5 mb-3 text-xs text-gold-light/80">
            <CalendarHeart className="size-3.5" />
            <span>
              {t("holidayLabel")}: {holidayText}
            </span>
          </div>
        )}

        {/* CTA */}
        <a
          href={WOLT_FLOWERS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-1 inline-flex items-center gap-2 rounded-lg bg-gold/15 px-4 py-2",
            "text-xs font-medium text-gold-light transition-all duration-300",
            "hover:bg-gold/25 hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {t("cta")}
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}
