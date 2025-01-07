import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
