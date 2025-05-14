import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/coins",
      permanent: true,
    }
  ]
};

export default nextConfig;
