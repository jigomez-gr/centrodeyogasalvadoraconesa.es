import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConstelacionesExperience from "@/components/ConstelacionesExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Constelaciones Familiares en Fuenlabrada y Madrid | Salvadora Conesa",
  description:
    "Taller vivencial de Constelaciones Familiares en Fuenlabrada (Madrid) facilitado por Salvadora Conesa (+26 años de experiencia). Sanación transgeneracional, reconciliación con padres, orden en los vínculos y paz interior. Modalidad constelar y participante. Consulta fechas y reserva.",
  keywords: [
    "Constelaciones Familiares en Fuenlabrada",
    "Taller de Constelaciones Familiares Madrid",
    "Constelaciones familiares Madrid sur",
    "Salvadora Conesa",
    "Bert Hellinger Madrid",
    "Terapia sistémica Fuenlabrada",
    "Constelar asunto propio Fuenlabrada",
    "Sanación transgeneracional Madrid",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/constelaciones",
  },
  openGraph: {
    title: "Constelaciones Familiares en Fuenlabrada · Sanación de Vínculos del Corazón",
    description:
      "Taller vivencial mensual de 4 horas en el Centro de Yoga Salvadora Conesa (Fuenlabrada). Ordena tus vínculos familiares y desata lealtades invisibles. Modalidades: Constelar (60 €) y Participante (20 €).",
    url: "https://salvadoraconesa.es/constelaciones",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/constelaciones/101_constelaciones_circulo_sereno_1920x1080.jpg",
        width: 1920,
        height: 1080,
        alt: "Círculo de trabajo sistémico en el Taller de Constelaciones Familiares en Fuenlabrada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Constelaciones Familiares en Fuenlabrada | Salvadora Conesa",
    description:
      "Ordenación de los vínculos del corazón para reconciliar tu pasado y liberar tu presente.",
    images: ["https://salvadoraconesa.es/imagenes/constelaciones/101_constelaciones_circulo_sereno_1920x1080.jpg"],
  },
};

export default async function ConstelacionesPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("constelaciones-familiares", services) ||
    findActivityBySlugOrId("constelaciones", services) ||
    services.find((s) => /constelaci/i.test(s.name));

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Taller Vivencial de Constelaciones Familiares en Fuenlabrada",
    description:
      "Taller grupal mensual de 4 horas de sanación transgeneracional y ordenación de vínculos familiares facilitado por Salvadora Conesa en Fuenlabrada (Madrid).",
    image: "https://salvadoraconesa.es/imagenes/constelaciones/101_constelaciones_circulo_sereno_1920x1080.jpg",
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
    offers: [
      {
        "@type": "Offer",
        name: "Modalidad Constelar (Asunto Propio)",
        price: "60.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
        url: "https://salvadoraconesa.es/constelaciones",
      },
      {
        "@type": "Offer",
        name: "Modalidad Participante / Representante",
        price: "20.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
        url: "https://salvadoraconesa.es/constelaciones",
      },
    ],
    performer: {
      "@type": "Person",
      name: "Salvadora Conesa",
      jobTitle: "Terapeuta Gestalt y Facilitadora de Constelaciones Familiares",
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
          <span className="text-[#800020] font-bold">Constelaciones Familiares</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <ConstelacionesExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
