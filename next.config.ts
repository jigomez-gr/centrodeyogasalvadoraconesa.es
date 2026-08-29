import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/pages/nagna__yoga.html",
        destination: "/nagna-yoga",
      },
      {
        source: "/pages/nagna_yoga.html",
        destination: "/nagna-yoga",
      },
    ];
  },
};

export default nextConfig;
