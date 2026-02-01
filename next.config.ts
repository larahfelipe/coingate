import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/coins',
      permanent: true,
    },
  ],
};

export default nextConfig;
