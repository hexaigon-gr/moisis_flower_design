"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";
import { cn } from "@/lib/general/utils";

type WoltButtonSize = "small" | "normal";

interface WoltButtonProps {
  size?: WoltButtonSize;
  className?: string;
}

export function WoltButton({ size = "normal", className }: WoltButtonProps) {
  const t = useTranslations("Hero");

  const isSmall = size === "small";

  return (
    <a
      href={BUSINESS.wolt}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-lg border-2 border-wolt-blue bg-transparent font-medium text-white transition-all duration-300 hover:bg-wolt-blue/10 hover:shadow-[0_0_24px_rgba(0,157,224,0.2)] hover:scale-[1.02] active:scale-[0.98]",
        isSmall ? "gap-1.5 px-3 py-1.5 text-sm" : "gap-2.5 px-7 py-3.5 text-base",
        className
      )}
    >
      <ShoppingCart
        className={cn(
          "shrink-0 transition-transform duration-300 group-hover:scale-110",
          isSmall ? "size-3.5" : "size-4"
        )}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/wolt-logo.svg"
        alt="Wolt"
        className={cn(
          "w-auto transition-transform duration-300 group-hover:scale-110",
          isSmall ? "h-4" : "h-5"
        )}
      />
      <span className="tracking-wide">{t("woltButton")}</span>
    </a>
  );
}
