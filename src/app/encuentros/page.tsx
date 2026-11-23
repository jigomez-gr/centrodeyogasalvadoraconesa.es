import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EncuentrosExperience from "@/components/EncuentrosExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Encuentros de Mujeres en Fuenlabrada y Madrid | Sororidad y Naturaleza · Salvadora Conesa",
  description:
    "Círculos de mujeres, retiros vivenciales y dinámicas en naturaleza en Fuenlabrada y Madrid guiados por Salvadora Conesa (+26 años de experiencia). Espacios seguros de sororidad, sanación del linaje femenino, escucha empática y hoguera. Consulta próximas fechas y reserva tu plaza.",
  keywords: [
    "Encuentros de Mujeres en Madrid",
    "Círculo de mujeres Fuenlabrada",
    "Retiro de mujeres Madrid",
    "Sororidad y crecimiento personal",
    "Salvadora Conesa",
    "Sanación linaje femenino Madrid",
    "Empoderamiento femenino Fuenlabrada",
    "Círculos sagrados femeninos Madrid",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/encuentros",
  },
  openGraph: {
    title: "Encuentros de Mujeres en Fuenlabrada y Madrid · Círculos de Sororidad y Naturaleza",
    description:
      "Regálate un tiempo sagrado de descanso, escucha y reconexión con la naturaleza y tu sabiduría femenina. Conducido por Salvadora Conesa en Fuenlabrada y entorno natural.",
    url: "https://salvadoraconesa.es/encuentros",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/encuentro_mujeres/06_encuentro_mujeres_circulo_bosque.jpeg",
        width: 1920,
        height: 1080,
        alt: "Círculo de mujeres en la naturaleza con Salvadora Conesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encuentros de Mujeres | Salvadora Conesa",
    description:
      "Espacios de sororidad, cuidado compartido y reconexión profunda con tu sabiduría femenina.",
    images: ["https://salvadoraconesa.es/imagenes/encuentro_mujeres/06_encuentro_mujeres_circulo_bosque.jpeg"],
  },
};

export default async function EncuentrosPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("encuentro-mujeres", services) ||
    findActivityBySlugOrId("encuentros", services) ||
    services.find((s) => /mujeres|encuentro/i.test(s.name));

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Encuentro de Mujeres - Círculo de Sororidad y Naturaleza",
    description:
      "Jornada y retiro vivencial de reconexión femenina, movimiento en naturaleza, dinámicas al fuego y meditación guiado por Salvadora Conesa.",
    image: "https://salvadoraconesa.es/imagenes/encuentro_mujeres/06_encuentro_mujeres_circulo_bosque.jpeg",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Centro de Yoga Salvadora Conesa y Entorno Natural",
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
      name: "Reserva de Plaza Encuentro de Mujeres",
      price: activity?.price || "0.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://salvadoraconesa.es/encuentros",
    },
    performer: {
      "@type": "Person",
      name: "Salvadora Conesa",
      jobTitle: "Terapeuta Gestalt y Facilitadora de Círculos Femeninos",
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
          <span className="text-[#800020] font-bold">Encuentros de Mujeres</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <EncuentrosExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
