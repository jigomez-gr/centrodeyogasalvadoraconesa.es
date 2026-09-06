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
      {
        source: "/pages/politica_de_privacidad.html",
        destination: "/politica-de-privacidad",
      },
      {
        source: "/pages/politica_de_cookies.html",
        destination: "/politica-de-cookies",
      },
      {
        source: "/pages/ley_de_proteccion_de_datos.html",
        destination: "/ley-de-proteccion-de-datos",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog", </.well-known/mcp/server-card.json>; rel="service-desc", </llms.txt>; rel="service-doc", </.well-known/agent-card.json>; rel="describedby"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
