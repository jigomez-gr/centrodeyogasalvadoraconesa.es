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
      {
        source: "/pages/el_espacio_para_mejorar_las_asanas.html",
        destination: "/mejorar-asanas",
      },
      {
        source: "/pages/el_espacio_para_mejorar_las_asanas",
        destination: "/mejorar-asanas",
      },
    ];
  },
};

export default nextConfig;
