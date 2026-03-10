import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/general/constants";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
