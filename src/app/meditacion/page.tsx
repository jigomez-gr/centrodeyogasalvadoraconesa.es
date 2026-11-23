import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeditacionExperience from "@/components/MeditacionExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meditación Guiada y Kundalini Yoga en Fuenlabrada | Salvadora Conesa",
  description:
    "Clases y sesiones de Meditación Guiada y Kundalini Yoga en Fuenlabrada (Madrid) con Salvadora Conesa (+40 años de experiencia). Pranayama, silencio interior, reducción de estrés y calma mental. Consulta horarios y reserva tu plaza.",
  keywords: [
    "Meditación en Fuenlabrada",
    "Clases de Meditación Fuenlabrada",
    "Kundalini Yoga Fuenlabrada",
    "Meditación guiada Madrid sur",
    "Salvadora Conesa",
    "Reducción de estrés Fuenlabrada",
    "Atención plena Fuenlabrada",
    "Pranayama y meditación Madrid",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/meditacion",
  },
  openGraph: {
    title: "Meditación Guiada en Fuenlabrada · Silencio, Presencia y Calma Interior",
    description:
      "Aprende a ralentizar el flujo mental y cultivar la serenidad con la guía de Salvadora Conesa en Fuenlabrada (Madrid). Sesiones de mañana y tarde.",
    url: "https://salvadoraconesa.es/meditacion",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg",
        width: 1920,
        height: 1080,
        alt: "Meditación Guiada en Fuenlabrada - Sala de Silencio en el Centro de Yoga Salvadora Conesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meditación Guiada en Fuenlabrada | Salvadora Conesa",
    description:
      "Tecnología de la consciencia para la energía vital, la serenidad y el silencio interior.",
    images: ["https://salvadoraconesa.es/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg"],
  },
};

export default async function MeditacionPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("meditaciones-guiadas", services) ||
    findActivityBySlugOrId("meditacion", services) ||
    services.find((s) => /meditaci/i.test(s.name));

  const jsonLdCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Clases de Meditación Guiada y Kundalini Yoga",
    description:
      "Sesiones grupales de meditación, respiración consciente (pranayama) y silencio interior guiadas por Salvadora Conesa en Fuenlabrada.",
    provider: {
      "@type": "Organization",
      name: "Centro de Yoga Salvadora Conesa",
      url: "https://salvadoraconesa.es",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "in-person",
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
    },
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C] min-h-screen flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }}
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
          <span className="text-[#800020] font-bold">Meditaciones Guiadas</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <MeditacionExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
