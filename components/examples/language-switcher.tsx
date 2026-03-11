"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "el",
    name: "Ελληνικά",
    flag: "🇬🇷",
  },
] as const;

interface LanguageSwitcherProps {
  /** When true, clicking toggles between locales directly (no dropdown). Ideal for mobile. */
  toggle?: boolean;
}

export const LanguageSwitcher = ({ toggle }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (languageCode: string) => {
    router.replace(pathname, { locale: languageCode });
  };

  if (toggle) {
    const nextLocale = locale === "el" ? "en" : "el";
    const nextLanguage = languages.find((l) => l.code === nextLocale)!;
    return (
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => handleLanguageChange(nextLocale)}
        aria-label={nextLanguage.name}
      >
        <Globe className="size-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <Globe className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2 cursor-pointer"
            disabled={language.code === locale}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
