import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PujaDeGongExperience from "@/components/PujaDeGongExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "La Puja de Gong en Fuenlabrada y Madrid | Ceremonia Nocturna 11h · Salvadora Conesa",
  description:
    "Ceremonia sagrada de la Puja de Gong en Fuenlabrada (Madrid) con Salvadora Conesa (+40 años de experiencia). 11 horas de vibración continua de gongs tocados en relevos mientras descansas. Convocatoria especial con plazas limitadas.",
  keywords: [
    "Puja de Gong en Fuenlabrada",
    "Puja de Gong Madrid",
    "Ceremonia nocturna de gong",
    "Noche de gong Madrid",
    "Sonoterapia nocturna",
    "Salvadora Conesa",
    "Gongs sinfónicos Fuenlabrada",
    "Reseteo celular con gong",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/puja-de-gong",
  },
  openGraph: {
    title: "La Puja de Gong en Fuenlabrada · Noche Sagrada de Sonido y Silencio",
    description:
      "Inmersión nocturna de 11 horas con gongs sinfónicos y maestros en relevo en el Centro de Yoga Salvadora Conesa de Fuenlabrada (Madrid). Incluye desayuno ceremonial matinal.",
    url: "https://salvadoraconesa.es/puja-de-gong",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg",
        width: 1920,
        height: 1080,
        alt: "La Puja de Gong en Fuenlabrada - Ceremonia sagrada nocturna con gongs en el Centro de Yoga Salvadora Conesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Puja de Gong en Fuenlabrada | Salvadora Conesa",
    description:
      "Noche sagrada de sonido ininterrumpido (11 horas) para un reseteo biológico y celular completo.",
    images: ["https://salvadoraconesa.es/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg"],
  },
};

export default async function PujaDeGongPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("puja-de-gongs", services) ||
    findActivityBySlugOrId("puja", services) ||
    services.find((s) => /puja/i.test(s.name));

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "La Ceremonia Sagrada de la Puja de Gong (11h)",
    description:
      "Inmersión sonora nocturna ininterrumpida de 11 horas (de 21:00 a 08:00 h) con relevos continuos de maestros de gong sinfónicos conducida por Salvadora Conesa en Fuenlabrada.",
    image: "https://salvadoraconesa.es/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Centro de Yoga Salvadora Conesa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle de las Navas, 17",
        addressLocality: "Fuenlabrada",
        postalCode: "28944",
        addressRegion: "Madrid",
        addressCountry: "ES",
      },
    },
    offers: {
      "@type": "Offer",
      price: activity?.price || "90.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://salvadoraconesa.es/puja-de-gong",
    },
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
          <span className="text-[#800020] font-bold">La Puja de Gong</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <PujaDeGongExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
