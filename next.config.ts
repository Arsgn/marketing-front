import type { NextConfig } from "next";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.new-brz.net",
      },
    ],
  },
};

module.exports = nextConfig;
