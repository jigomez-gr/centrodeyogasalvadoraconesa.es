import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AyunoExperience from "@/components/AyunoExperience";
import { fetchCrmServices } from "@/lib/crmServices";
import { findActivityBySlugOrId } from "@/lib/activitySlug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Retiro de Ayuno Terapéutico en Madrid y Naturaleza | Desintoxicación y Autofagia · Salvadora Conesa",
  description:
    "Retiro de ayuno terapéutico e higienista guiado por Salvadora Conesa (+30 años guiando retiros de ayuno). Protocolo seguro con caldos e infusiones ecológicas, descanso celular, autofagia, senderismo consciente y yoga suave en Madrid y entorno natural. Plazas limitadas.",
  keywords: [
    "Retiro de Ayuno Terapéutico en Madrid",
    "Ayuno higienista guiado Madrid",
    "Desintoxicación y autofagia España",
    "Retiro de ayuno y descanso Fuenlabrada",
    "Salvadora Conesa ayuno terapéutico",
    "Ayuno Buchinger España",
    "Limpieza hepática y descanso digestivo",
    "Retiro détox en naturaleza Madrid",
  ],
  alternates: {
    canonical: "https://salvadoraconesa.es/ayuno",
  },
  openGraph: {
    title: "Retiro de Ayuno Terapéutico · Desintoxicación, Autofagia y Calma | Salvadora Conesa",
    description:
      "4 días para renovar tu salud biológica, claridad mental y energía vital en un entorno natural y cuidado médico-terapéutico. Conducido por Salvadora Conesa.",
    url: "https://salvadoraconesa.es/ayuno",
    siteName: "Centro de Yoga Salvadora Conesa",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://salvadoraconesa.es/imagenes/ayuno_terapeutico/301_ayuno_terapeutico_bienestar_natural_1920x1080.jpg",
        width: 1920,
        height: 1080,
        alt: "Retiro de Ayuno Terapéutico con Salvadora Conesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retiro de Ayuno Terapéutico | Salvadora Conesa",
    description:
      "Desintoxicación biológica profunda, autofagia y descanso consciente en la naturaleza.",
    images: ["https://salvadoraconesa.es/imagenes/ayuno_terapeutico/301_ayuno_terapeutico_bienestar_natural_1920x1080.jpg"],
  },
};

export default async function AyunoPage() {
  const { services } = await fetchCrmServices();
  const activity =
    findActivityBySlugOrId("ayuno", services) ||
    findActivityBySlugOrId("ayunos", services) ||
    findActivityBySlugOrId("ayuno-terapeutico", services) ||
    services.find((s) => /ayuno/i.test(s.name));

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Retiro de Ayuno Terapéutico - Regeneración y Autofagia",
    description:
      "Retiro residencial de 4 días de ayuno terapéutico guiado por Salvadora Conesa con caldos e infusiones biológicas, paseos conscientes, yoga suave y talleres de reintroducción alimentaria.",
    image: "https://salvadoraconesa.es/imagenes/ayuno_terapeutico/301_ayuno_terapeutico_bienestar_natural_1920x1080.jpg",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Centro de Retiros y Naturaleza Salvadora Conesa",
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
      name: "Plaza Retiro de Ayuno Terapéutico (4 días)",
      price: activity?.price || "250.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://salvadoraconesa.es/ayuno",
    },
    performer: {
      "@type": "Person",
      name: "Salvadora Conesa",
      jobTitle: "Directora del Centro de Yoga, Guía de Retiros de Ayuno (+30 años de experiencia)",
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
          <span className="text-[#800020] font-bold">Retiro de Ayuno Terapéutico</span>
        </nav>

        {/* Experiencia inmersiva con estructura unificada */}
        <AyunoExperience activity={activity} isEmbedded={false} />
      </main>

      <Footer />
    </div>
  );
}
