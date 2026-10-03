import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "indorenursery.com" },
      { protocol: "https", hostname: "**.indorenursery.com" },
      { protocol: "https", hostname: "tattvasri.com" },
      { protocol: "https", hostname: "**.tattvasri.com" },
      { protocol: "https", hostname: "sg11fantasyindia.com" },
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "thelaundryhouseindia.com" },
      { protocol: "https", hostname: "**.thelaundryhouseindia.com" },
      { protocol: "https", hostname: "viacation.com" },
      { protocol: "https", hostname: "**.viacation.com" },
    ],
  },
};

export default nextConfig;
