"use client";

import { ShoppingCart } from "lucide-react";

import { BUSINESS } from "@/lib/general/constants";
import { cn } from "@/lib/general/utils";

type WoltButtonSize = "small" | "normal";

interface WoltButtonProps {
  size?: WoltButtonSize;
  className?: string;
}

export function WoltButton({ size = "normal", className }: WoltButtonProps) {
  const isSmall = size === "small";

  return (
    <a
      href={BUSINESS.wolt}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-300 active:scale-[0.98]",
        isSmall
          ? "gap-1.5 px-2.5 py-1.5 bg-wolt-blue hover:bg-wolt-blue/90 hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(0,157,224,0.35)]"
          : "gap-2.5 px-7 py-3.5 text-base border-2 border-wolt-blue bg-transparent text-wolt-blue hover:bg-wolt-blue/10 hover:shadow-[0_0_24px_rgba(0,157,224,0.2)] hover:scale-[1.02]",
        className
      )}
      aria-label="Order on Wolt"
    >
      {!isSmall && (
        <ShoppingCart className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isSmall ? "/images/wolt-icon.webp" : "/images/wolt-logo.png"}
        alt="Wolt"
        className={cn(
          "w-auto shrink-0 transition-transform duration-300 group-hover:scale-110",
          isSmall ? "h-4 brightness-0 invert" : "h-5"
        )}
      />
    </a>
  );
}
