import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This defines the allowed quality values for the Image component
    qualities: [20,75, 90], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kitsu.io',
      },
      {
        protocol: 'https',
        hostname: 'media.kitsu.app',
      },
    ],
  },
};

export default nextConfig;