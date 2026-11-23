import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GestaltExperience from "@/components/GestaltExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terapia Gestalt en Fuenlabrada y Online | Sesión Individual · Salvadora Conesa",
  description:
    "Psicoterapia Gestalt individual presencial en Fuenlabrada (Madrid) y online con Salvadora Conesa (+26 años de experiencia como terapeuta). Enfoque humanista en el aquí y ahora, escucha corporal, superación de ansiedad, duelos y gestión emocional. Consulta tarifas y solicita tu cita.",
  keywords: [
    "Terapia Gestalt en Fuenlabrada",
    "Psicoterapia Gestalt Fuenlabrada",
    "Terapeuta Gestalt Madrid sur",
    "Terapia Gestalt online",
    "Salvadora Conesa",
    "Tratamiento ansiedad Fuenlabrada",
    "Superación de duelos y rupturas",
    "Psicología humanista Fuenlabrada",
    "Terapia individual en Fuenlabrada",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/gestalt",
  },
  openGraph: {
    title: "Terapia Gestalt en Fuenlabrada y Online · Salvadora Conesa",
    description:
      "Acompañamiento terapéutico cálido, confidencial y sin juicios para transitar bloqueos, ansiedad y duelos desde el aquí y ahora. Sesiones de 60 minutos presenciales u online.",
    url: "https://salvadoraconesa.es/gestalt",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/gestalt/01_gestalt_consulta_intima_1920x1080.jpg",
        width: 1920,
        height: 1080,
        alt: "Consulta de Terapia Gestalt en Fuenlabrada con Salvadora Conesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terapia Gestalt en Fuenlabrada y Online | Salvadora Conesa",
    description:
      "El arte del aquí y el ahora para sanar heridas, cerrar ciclos y recuperar tu autenticidad.",
    images: ["https://salvadoraconesa.es/imagenes/gestalt/01_gestalt_consulta_intima_1920x1080.jpg"],
  },
};

export default async function GestaltPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("terapia-gestalt", services) ||
    findActivityBySlugOrId("gestalt", services) ||
    services.find((s) => /gestalt/i.test(s.name));

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Terapia Gestalt - Salvadora Conesa",
    description:
      "Servicio de psicoterapia Gestalt y acompañamiento emocional individualizado presencial en Fuenlabrada u online por videoconferencia.",
    image: "https://salvadoraconesa.es/imagenes/gestalt/01_gestalt_consulta_intima_1920x1080.jpg",
    url: "https://salvadoraconesa.es/gestalt",
    priceRange: "35€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle de las Navas, 17",
      addressLocality: "Fuenlabrada",
      postalCode: "28944",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sesiones de Psicoterapia Gestalt",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sesión Individual de Terapia Gestalt (60 min)",
            description: "Acompañamiento humanista enfocado en el presente, resolución de bloqueos y escucha corporal.",
          },
          price: activity?.price || "35.00",
          priceCurrency: "EUR",
        },
      ],
    },
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C] min-h-screen flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
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
          <span className="text-[#800020] font-bold">Terapia Gestalt</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <GestaltExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
