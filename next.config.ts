import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageproxy.wolt.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");
export default withNextIntl(nextConfig);
