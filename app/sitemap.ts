import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { BASE_URL } from "@/lib/general/constants";
import { EVENTS, OCCASIONS } from "@/lib/general/constants";

const sitemap = (): MetadataRoute.Sitemap => {
  const locales = routing.locales;
  const now = new Date();

  const homepageEntries = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const eventEntries = EVENTS.flatMap((event) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/events/${event.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  );

  const occasionEntries = OCCASIONS.flatMap((occasion) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/occasions/${occasion.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...homepageEntries, ...eventEntries, ...occasionEntries];
};

export default sitemap;
