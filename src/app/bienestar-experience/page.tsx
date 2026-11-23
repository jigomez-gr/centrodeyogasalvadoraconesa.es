import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BienestarExperience from "@/components/BienestarExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bienestar Experience y Actividades Especiales | Salud Integrativa y Gong en Madrid",
  description:
    "Encuentros de salud integrativa, longevidad y consciencia en Madrid y Fuenlabrada con Txiki Soto, Giulliana Gabaldoni y María Salvadora Conesa (+ Baño de Gong de clausura). Consulta próximas convocatorias y reserva tu plaza.",
  keywords: [
    "Bienestar Experience Madrid",
    "Actividades especiales yoga Fuenlabrada",
    "Salud integrativa Madrid",
    "Más allá del tumor Txiki Soto",
    "Giulliana Gabaldoni diseña tu vida",
    "Salvadora Conesa Baño de Gong Madrid",
    "Longevidad activa y biohacking consciente",
    "Encuentros de bienestar Madrid",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/bienestar-experience",
  },
  openGraph: {
    title: "Bienestar Experience y Actividades Especiales · Salud Integrativa y Baño de Gong",
    description:
      "Una mirada amplia y consciente sobre la salud, la biología y las emociones. Ponencias magistrales, talleres vivenciales y clausura armónica con Gong en Madrid.",
    url: "https://salvadoraconesa.es/bienestar-experience",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/flyers/flyer13nov2026vivemasparticular.jpeg",
        width: 1200,
        height: 630,
        alt: "Bienestar Experience Más allá del tumor en Madrid",
      },
      {
        url: "https://salvadoraconesa.es/flyers/bienestar.png",
        width: 1200,
        height: 630,
        alt: "Cartel General Bienestar Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bienestar Experience y Actividades Especiales | Salvadora Conesa",
    description:
      "Salud integrativa, consciencia vital y descanso armónico con Baño de Gong en Madrid.",
    images: ["https://salvadoraconesa.es/flyers/flyer13nov2026vivemasparticular.jpeg"],
  },
};

export default async function BienestarPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("bienestar-experience", services) ||
    findActivityBySlugOrId("bienestar", services) ||
    findActivityBySlugOrId("actividades-especiales", services) ||
    services.find((s) => /bienestar|longevidad/i.test(s.name));

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Bienestar Experience · Salud Integrativa y Baño de Gong",
    description:
      "Encuentro multidisciplinar dedicado al cuidado integral de la persona, con ponencias sobre terreno biológico, talleres de consciencia vital y clausura con Baño de Gong.",
    image: [
      "https://salvadoraconesa.es/flyers/flyer13nov2026vivemasparticular.jpeg",
      "https://salvadoraconesa.es/flyers/bienestar.png",
    ],
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Impact Hub Gobernador (Madrid) & Centro Salvadora Conesa (Fuenlabrada)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle del Gobernador, 26",
        addressLocality: "Madrid",
        postalCode: "28014",
        addressRegion: "Madrid",
        addressCountry: "ES",
      },
    },
    offers: {
      "@type": "Offer",
      name: "Entrada Oficial Bienestar Experience",
      price: activity?.price || "19.99",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://salvadoraconesa.es/bienestar-experience",
    },
    performer: [
      {
        "@type": "Person",
        name: "Txiki Soto",
        jobTitle: "Divulgador en Salud Integrativa y Terreno Biológico",
      },
      {
        "@type": "Person",
        name: "Giulliana Gabaldoni",
        jobTitle: "Mentora de Consciencia y Vida Consciente",
      },
      {
        "@type": "Person",
        name: "María Salvadora Conesa",
        jobTitle: "Directora del Centro de Yoga y Sonoterapeuta de Gong",
      },
    ],
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C] min-h-screen flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb accesible */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500"
        >
          <Link
            href="/"
            className="hover:text-[#800020] transition inline-flex items-center gap-1"
          >
            <span>Inicio</span>
          </Link>
          <span>/</span>
          <Link
            href="/servicios"
            className="hover:text-[#800020] transition inline-flex items-center gap-1"
          >
            <span>Actividades</span>
          </Link>
          <span>/</span>
          <span className="text-[#800020] font-bold">Bienestar Experience & Actividades Especiales</span>
        </nav>

        {/* Experiencia inmersiva unificada */}
        <BienestarExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
