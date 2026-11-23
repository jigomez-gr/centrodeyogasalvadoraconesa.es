"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Activity,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Send,
  Phone,
  ChevronDown,
  Play,
  ArrowRight,
  HelpCircle,
  Ticket,
  Maximize2,
  X,
  Compass,
  Smile,
  Trees,
  Sun,
  Award,
  Leaf,
  Droplets,
  HeartHandshake,
  ArrowUpRight,
  FileText,
  Flame,
} from "lucide-react";
import {
  CrmService,
  formatServicePrice,
  FALLBACK_CRM_SERVICES,
} from "@/lib/crmServices";
import { getNumeroWassap } from "@/lib/featureFlags";
import { triggerCrmChat } from "@/components/ChatBubbleWidget";
import { triggerVapiCall } from "@/components/VapiCallModal";
import TelegramBookingModal from "@/components/TelegramBookingModal";

interface BienestarExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function BienestarExperience({
  activity: propActivity,
  isEmbedded = false,
}: BienestarExperienceProps) {
  // Sincronización con el servicio del CRM
  const fallbackBienestar =
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "469fa9b9-227d-4168-bda7-cac5cf3e7f46" ||
        /bienestar/i.test(s.name)
    ) || FALLBACK_CRM_SERVICES[1];

  const activity = propActivity || fallbackBienestar;

  // Estado del acordeón de FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estado del modal multimedia
  const [activeMediaModal, setActiveMediaModal] = useState<
    "video-particular" | "video-actividad" | "video-madrid" | "flyer" | "flyer-general" | null
  >(null);

  // Estado del modal de Telegram
  const [tgModalOpen, setTgModalOpen] = useState(false);

  // Datos prácticos
  const datesText =
    activity.eventDatesText ||
    activity.scheduleText ||
    "Viernes por la tarde · Convocatorias anuales y periódicas";

  const priceLabel = formatServicePrice(activity);
  const scheduleText = activity.scheduleText || "Viernes tarde / Fin de semana";
  const wassapPhone = getNumeroWassap();

  const wassapUrl =
    activity.whatsappBookingUrl ||
    `https://wa.me/${wassapPhone}?text=${encodeURIComponent(
      "Hola Salvadora, me gustaría consultar información sobre Bienestar Experience y las Actividades Especiales del centro."
    )}`;

  const faqs = [
    {
      q: "¿Qué es Bienestar Experience y en qué consisten las Actividades Especiales?",
      a: "Bienestar Experience es un punto de encuentro dedicado a la salud integrativa, la consciencia y el bienestar global del ser humano. En colaboración con profesionales de primer nivel como Txiki Soto y Giulliana Gabaldoni, abordamos aspectos fundamentales de la vida: nutrición celular, descanso, gestión del estrés, resiliencia emocional y equilibrio vital, concluyendo cada jornada con un Baño de Gong conducido por Salvadora Conesa.",
    },
    {
      q: "¿A quién están dirigidos estos encuentros?",
      a: "Están abiertos a cualquier persona interesada en cuidar su salud de manera proactiva, personas en procesos de recuperación o cambio de hábitos vitales, familiares y acompañantes, así como terapeutas y profesionales de la salud que deseen ampliar su mirada hacia un modelo más humano, amplio y preventivo.",
    },
    {
      q: "¿Es necesario tener experiencia previa en yoga o meditación?",
      a: "No, en absoluto. Las ponencias y dinámicas están diseñadas con un lenguaje claro, accesible y cercano para todos los públicos. La clausura con Baño de Gong no requiere ninguna postura física activa: se experimenta tumbado o cómodamente sentado sobre esterillas con mantas, simplemente permitiendo que las frecuencias sonoras armonicen tu cuerpo.",
    },
    {
      q: "¿Por qué se incluye un Baño de Gong como clausura de la jornada?",
      a: "Porque tras varias horas de ponencias, reflexiones y asimilación de conceptos, el sonido terapéutico del gong facilita que toda la información recibida se integre en un plano profundo y sereno. La vibración disuelve la tensión mental acumulada y lleva al sistema nervioso a un estado de calma restaurativa incomparable.",
    },
    {
      q: "¿Dónde se celebran los eventos y cómo puedo inscribirme?",
      a: "Los grandes encuentros anuales de Bienestar Experience suelen celebrarse en sedes emblemáticas de Madrid (como Impact Hub Gobernador), mientras que los talleres preparatorios, charlas y baños de gong continuados se llevan a cabo en el Centro de Yoga Salvadora Conesa en Fuenlabrada. Puedes solicitar tu plaza o consultar próximas fechas por WhatsApp o Telegram.",
    },
    {
      q: "¿Cómo se gestiona el abono de la entrada o aportación?",
      a: "Siguiendo la política de cercanía y transparencia del centro, el abono se formaliza de forma directa en el centro de yoga o a través del canal oficial del evento según la convocatoria específica. No se exigen pagos automáticos con tarjeta por adelantado sin confirmación previa de tu plaza.",
    },
    {
      q: "¿Habrá nuevas ediciones de Bienestar Experience en el futuro?",
      a: "Sí, el equipo de Bienestar Experience y el Centro de Yoga Salvadora Conesa preparan periódicamente nuevas convocatorias con temáticas actualizadas en torno a la longevidad, la salud integrativa, el descanso celular y el autoconocimiento.",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO EDITORIAL Y CONVERSIÓN RÁPIDA
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#12241D] via-[#1A2E26] to-[#0E1B15] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#C5A059]/30">
        {/* Adorno visual de fondo */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#800020]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center sm:text-left">
          {/* Badges superiores */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#C5A059]/20 text-[#E5C378] border border-[#C5A059]/40 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              Actividades Especiales & Colaboradores
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              <HeartHandshake className="w-3.5 h-3.5" />
              Salud Integrativa & Consciencia
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-200 border border-amber-400/40">
              <Award className="w-3.5 h-3.5" />
              Bienestar Experience
            </span>
          </div>

          {/* Título y subtítulo */}
          <div>
            {isEmbedded ? (
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Bienestar Experience y Actividades Especiales
              </h2>
            ) : (
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Bienestar Experience y Actividades Especiales
              </h1>
            )}
            <p className="mt-3 text-base sm:text-xl text-stone-200 font-serif italic text-balance">
              Espacios de encuentro, salud integrativa, longevidad y terapias complementarias en Madrid y Fuenlabrada
            </p>
          </div>

          {/* Texto de introducción */}
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
            A través de Bienestar Experience y nuestras convocatorias especiales, reunimos a profesionales de referencia, propuestas terapéuticas innovadoras y experiencias prácticas que nos invitan a mirar la salud desde una perspectiva más amplia, humana y consciente. Un puente entre el conocimiento científico, la consciencia vital y el descanso armónico.
          </p>

          {/* Ficha técnica rápida */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center sm:text-left">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3 h-3 text-[#C5A059]" /> Sedes
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate">
                Madrid & Fuenlabrada
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center sm:text-left">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="w-3 h-3 text-[#C5A059]" /> Convocatoria
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#E5C378] mt-0.5 block truncate">
                {datesText}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center sm:text-left">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                <Users className="w-3 h-3 text-[#C5A059]" /> Ponentes
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate">
                Txiki Soto, G. Gabaldoni, S. Conesa
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center sm:text-left">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                <Ticket className="w-3 h-3 text-[#C5A059]" /> Entrada Oficial
              </span>
              <span className="text-xs sm:text-sm font-black text-white mt-0.5 block">
                {priceLabel}
              </span>
            </div>
          </div>

          {/* Botones de acción rápida */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
            <a
              href="#reservar-bienestar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#800020] via-[#990026] to-[#800020] hover:from-[#990026] hover:to-[#660019] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition duration-200 cursor-pointer"
            >
              <span>Consultar / Reservar Plaza</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setActiveMediaModal("video-particular")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-white/20 transition duration-200 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#E5C378] fill-current" />
              <span>Ver Vídeo Promocional</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMediaModal("flyer")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-white/20 transition duration-200 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#E5C378]" />
              <span>Ver Cartel Oficial</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ESCAPARATE MULTIMEDIA: VÍDEOS Y CARTELES OFICIALES
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="seccion-multimedia-bienestar" className="space-y-6">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800020] block mb-1">
            Galería y Documentación
          </span>
          <h3
            id="seccion-multimedia-bienestar"
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900"
          >
            Material Audiovisual Oficial de Bienestar Experience
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Descubre los vídeos oficiales de los encuentros, el cartel conmemorativo de la edición en Madrid y los detalles del cierre sonoro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Vídeo Promocional 1920x1080 */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/videos/Promo_Bienestar-Experience-2026_1920x1080-poster.jpg"
                alt="Vídeo Promocional Oficial Bienestar Experience 2026"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90"
              />
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-particular")}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#800020]/90 hover:bg-[#800020] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition cursor-pointer"
                title="Reproducir Vídeo Promocional Oficial"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                Vídeo Oficial · 1920x1080
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-serif text-base font-bold text-[#800020]">
                Vídeo Promocional · Más allá del tumor
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Presentación de la edición 2026 con Txiki Soto, Giulliana Gabaldoni y el cierre sonoro con Salvadora Conesa.
              </p>
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-particular")}
                className="text-xs font-bold text-[#800020] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span>Ver vídeo a pantalla completa</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tarjeta 2: Vídeo de la Actividad (Itinerario 9) */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/videos/itinerario-9-poster.jpg"
                alt="Vídeo Resumen de Actividades Especiales"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90"
              />
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#800020]/90 hover:bg-[#800020] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition cursor-pointer"
                title="Reproducir Vídeo de la Actividad"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                Vídeo de la Actividad
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-serif text-base font-bold text-[#800020]">
                Espacio de Salud y Encuentro
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Recorrido por las actividades complementarias, talleres de longevidad consciente y la sala principal del centro.
              </p>
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="text-xs font-bold text-[#800020] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span>Ver vídeo de la actividad</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tarjeta 3: Cartel Oficial / Flyer */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="relative aspect-video bg-stone-100 overflow-hidden flex items-center justify-center p-2">
              <img
                src="/flyers/flyer13nov2026vivemasparticular.jpeg"
                alt="Cartel oficial de Bienestar Experience Más allá del tumor"
                className="h-full w-auto object-contain group-hover:scale-105 transition duration-300"
              />
              <button
                type="button"
                onClick={() => setActiveMediaModal("flyer")}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#800020]/90 hover:bg-[#800020] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition cursor-pointer"
                title="Ampliar Cartel Oficial"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                Flyer Oficial
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-serif text-base font-bold text-[#800020]">
                Cartel Oficial · Madrid
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cartel en alta definición con el programa detallado, horarios, ubicación y ponentes del encuentro.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("flyer")}
                  className="text-xs font-bold text-[#800020] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ampliar cartel 2026</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("flyer-general")}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900 underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Flyer general</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BLOQUES EDITORIALES: ENFOQUE INTEGRATIVO Y PONENTES
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="enfoque-editorial-heading" className="space-y-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#96680E] font-extrabold block mb-1">
              Visión Integral de la Salud
            </span>
            <h3
              id="enfoque-editorial-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]"
            >
              Una mirada que une conocimiento, consciencia y descanso
            </h3>
          </div>

          <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base font-sans">
            <p className="font-medium text-stone-900 text-base sm:text-lg">
              A menudo observamos por separado aspectos de nuestra vida que están profundamente interconectados: lo que comemos, cómo descansamos, lo que sentimos, cómo respiramos y la forma en la que habitamos nuestro día a día.
            </p>
            <p>
              En <strong>Bienestar Experience</strong> reunimos a profesionales, divulgadores y terapeutas que ayudan a tender puentes entre la salud física, el equilibrio psicoemocional y la espiritualidad laica. No se trata únicamente de debatir sobre diagnósticos o patologías: se trata de comprender a la persona en su totalidad, facilitando herramientas vivenciales para fortalecer el terreno biológico y la serenidad interior.
            </p>
            <div className="bg-[#FAF9F6] p-4 sm:p-6 rounded-2xl border-l-4 border-[#800020] text-stone-800 italic">
              &ldquo;La verdadera medicina preventiva comienza cuando nos permitimos parar, escuchar al cuerpo sin juicio y reconciliar mente, biología y corazón.&rdquo;
            </div>
          </div>

          {/* Tres ponentes / facilitadores */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Txiki Soto */}
            <div className="bg-[#FAF9F6] p-5 sm:p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#800020]/10 text-[#800020] font-serif text-xl font-bold flex items-center justify-center border border-[#800020]/20">
                  TS
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    Txiki Soto
                  </h4>
                  <span className="text-xs uppercase tracking-wider text-[#96680E] font-extrabold block mt-0.5">
                    Salud Integrativa y Terreno Biológico
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Experto en divulgación y acompañamiento en salud global. Su ponencia <em>«Más allá del tumor»</em> aborda cómo entender la enfermedad como un proceso biológico comprensible, centrando la atención en la persona y sus recursos vitales.
                </p>
              </div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block pt-2 border-t border-stone-200">
                Ponencia Magistral
              </span>
            </div>

            {/* Giulliana Gabaldoni */}
            <div className="bg-[#FAF9F6] p-5 sm:p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#800020]/10 text-[#800020] font-serif text-xl font-bold flex items-center justify-center border border-[#800020]/20">
                  GG
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    Giulliana Gabaldoni
                  </h4>
                  <span className="text-xs uppercase tracking-wider text-[#96680E] font-extrabold block mt-0.5">
                    Diseña tu Vida & Consciencia
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Mentora de transformación personal y conferenciante. Conduce dinámicas vivenciales para identificar creencias limitantes, reordenar prioridades vitales y participar activamente en la construcción de tu propio bienestar.
                </p>
              </div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block pt-2 border-t border-stone-200">
                Taller Vivencial Práctico
              </span>
            </div>

            {/* María Salvadora Conesa */}
            <div className="bg-[#FAF9F6] p-5 sm:p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#800020]/10 text-[#800020] font-serif text-xl font-bold flex items-center justify-center border border-[#800020]/20">
                  SC
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    María Salvadora Conesa
                  </h4>
                  <span className="text-xs uppercase tracking-wider text-[#96680E] font-extrabold block mt-0.5">
                    Sonoterapia & Baño de Gong
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Directora del centro con más de 40 años dedicados al yoga, 30 a retiros de salud y 26 a la terapia Gestalt. Cierra la jornada con un Baño de Gong inmersivo para facilitar la integración armónica de todo lo vivido.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#800020] uppercase tracking-wider block pt-2 border-t border-stone-200">
                Clausura e Integración Sonora
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PILARES DE LA SALUD INTEGRAL (DARK BENEFIT GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl bg-[#12241D] text-white p-6 sm:p-10 lg:p-12 space-y-8 border border-[#C5A059]/30 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
            Fundamentos Biológicos y Emocionales
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Cuatro Pilares para la Transformación del Bienestar
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Cada edición de Bienestar Experience entrelaza estas dimensiones para una regeneración integral de la persona.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Pilar 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-white/10 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">
              1. Terreno Biológico y Célula
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Comprender el impacto de la inflamación crónica, la nutrición densa en micronutrientes y las pausas digestivas para cuidar el microbioma y la longevidad celular.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-white/10 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">
              2. Ritmos Circadianos y Sueño
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              La sincronización con la luz natural, la gestión de pantallas nocturnas y el descanso profundo como el reparador celular más potente de la fisiología humana.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-white/10 transition">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">
              3. Sonido y Sistema Nervioso
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              El poder del Gong y los cuencos para pasar del estado de hiperalerta simpática al modo parasimpático de reparación orgánica, reduciendo el cortisol de forma inmediata.
            </p>
          </div>

          {/* Pilar 4 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-white/10 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">
              4. Sentido Vital y Resiliencia
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Alinear nuestras decisiones cotidianas con lo que de verdad valoramos, cultivando una actitud consciente ante los retos de salud y fortaleciendo la paz interior.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PROGRAMA DEL ENCUENTRO (CRONOGRAMA DE LA JORNADA)
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="programa-bienestar-heading" className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs uppercase tracking-widest text-[#96680E] font-extrabold block mb-1">
            Estructura de la Jornada
          </span>
          <h3
            id="programa-bienestar-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]"
          >
            Programa del Encuentro · Bienestar Experience
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Diseñado para alternar la comprensión teórica con dinámicas vivenciales y la calma sonora integradora.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              time: "16:30 h",
              title: "Recepción, Acreditación y Bienvenida Consciente",
              desc: "Apertura de puertas, acomodación en sala y bienvenida a cargo del equipo organizador de Bienestar Experience.",
              badge: "Apertura",
            },
            {
              time: "17:00 h",
              title: "Ponencia Magistral: Más allá del tumor (Txiki Soto)",
              desc: "Una aproximación a la salud integrativa que invita a ampliar la mirada sobre la enfermedad, situando a la persona y sus recursos regenerativos en el centro.",
              badge: "Salud Integrativa",
            },
            {
              time: "18:30 h",
              title: "Taller Vivencial: Diseña tu vida (Giulliana Gabaldoni)",
              desc: "Dinámica participativa orientada a reflexionar sobre hábitos cotidianos, toma de decisiones y presencia activa en la construcción del bienestar personal.",
              badge: "Consciencia Vital",
            },
            {
              time: "19:45 h",
              title: "Pausa Consciente & Encuentro con Asistentes",
              desc: "Momento para hidratación, preguntas a los ponentes, intercambio de impresiones y contacto con la comunidad del encuentro.",
              badge: "Networking",
            },
            {
              time: "20:30 h - 21:30 h",
              title: "Clausura e Integración Sonora: Baño de Gong (Salvadora Conesa)",
              desc: "Cierre inmersivo con gong sinfónico y cuencos armónicos. Una experiencia de relajación total para reposar cuerpo y mente y consolidar lo vivido.",
              badge: "Baño de Gong",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80 hover:border-[#800020]/30 transition"
            >
              <div className="w-24 shrink-0 font-mono text-sm font-bold text-[#800020]">
                {item.time}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    {item.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#800020]/10 text-[#800020]">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SECCIÓN DESTACADA: SOBRE EL VÍDEO Y ACTIVIDADES ESPECIALES
      ───────────────────────────────────────────────────────────── */}
      <section
        id="sobre-bienestar-experience"
        aria-labelledby="sobre-bienestar-heading"
        className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8"
      >
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs uppercase tracking-widest text-[#96680E] font-extrabold block mb-1">
            Espacio y Comunidad
          </span>
          <h3
            id="sobre-bienestar-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]"
          >
            Sobre Bienestar Experience y Nuestras Actividades Especiales
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Un proyecto colaborativo nacido para divulgar salud consciente y crear espacios donde cuidarnos juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Reproductor de vídeo integrado */}
          <div className="lg:col-span-6 space-y-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-stone-200">
              <video
                src="/videos/itinerario-9.mp4"
                poster="/videos/itinerario-9-poster.jpg"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta el formato de vídeo MP4.
              </video>
            </div>
            <p className="text-[11px] text-stone-500 italic text-center">
              Vídeo oficial de las Actividades Especiales · Centro de Yoga Salvadora Conesa
            </p>
          </div>

          {/* Texto explicativo de Salvadora Conesa */}
          <div className="lg:col-span-6 space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
            <h4 className="font-serif text-lg font-bold text-stone-900">
              El valor de los encuentros multidisciplinares
            </h4>
            <p>
              En el <strong>Centro de Yoga Salvadora Conesa</strong> entendemos la salud como un viaje continuo que trasciende la esterilla de yoga. Por ello, abrimos nuestras puertas a proyectos como <strong>Bienestar Experience</strong>, aunando la sabiduría ancestral del yoga, el poder curativo del sonido del Gong y los descubrimientos más actuales en medicina del estilo de vida e higiene biológica.
            </p>
            <p>
              Tanto si asistes a los grandes eventos en Madrid capital como si participas en nuestros talleres monográficos y baños de sonido en Fuenlabrada, encontrarás un espacio cuidado al detalle, libre de prisas y concebido para devolverte el protagonismo en tu propia salud.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                ✓ Sede oficial Madrid & Fuenlabrada
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                ✓ Plazas reducidas para garantizar intimidad
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                ✓ Acompañamiento cercano y humano
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PREGUNTAS FRECUENTES (FAQ ACCORDION CON SCHEMA JSON-LD)
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="faqs-bienestar-heading" className="space-y-6">
        {/* Schema FAQPage estructurado para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />

        <div className="text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#800020] font-extrabold block mb-1">
            Dudas Habituales
          </span>
          <h3
            id="faqs-bienestar-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900"
          >
            Preguntas Frecuentes sobre Bienestar Experience
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Resolvemos las consultas principales sobre el formato, las entradas y la participación en el evento.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-stone-900 hover:text-[#800020] transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#800020]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TARJETA FINAL DE RESERVA Y CONVERSIÓN (#reservar-bienestar)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-bienestar"
        className="rounded-3xl bg-gradient-to-b from-[#12241D] via-[#1A2E26] to-[#0E1B15] text-white p-6 sm:p-10 lg:p-12 text-center space-y-6 shadow-2xl border border-[#C5A059]/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
            Plazas Limitadas por Aforo de la Sala
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Participa en Bienestar Experience y Actividades Especiales
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Regálate una tarde de conocimiento transformador, reflexión consciente y el abrazo sonoro del Baño de Gong. Consulta disponibilidad de próximas fechas y reserva tu plaza directamente con nosotros.
          </p>

          {/* Resumen de aportación */}
          <div className="py-2 inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-xs sm:text-sm">
            <span className="text-stone-300">Entrada Oficial:</span>
            <span className="font-bold text-[#E5C378] text-base">
              {priceLabel}
            </span>
            <span className="text-stone-400">· Acceso completo a ponencias y Gong</span>
          </div>

          {/* Botones principales de reserva */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={wassapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#25D366] via-[#20BD5A] to-[#1BA84E] hover:from-[#20BD5A] hover:to-[#1BA84E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950/40 hover:scale-103 active:scale-97 transition duration-200 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Consultar o Reservar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setTgModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#0088cc] via-[#0077b5] to-[#006699] hover:from-[#0077b5] hover:to-[#006699] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-sky-950/40 hover:scale-103 active:scale-97 transition duration-200 cursor-pointer"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span>Consultar o Reservar por Telegram</span>
            </button>

            <button
              type="button"
              onClick={() =>
                triggerVapiCall({
                  inquiry: "Información y entradas para Bienestar Experience",
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-[#C5A059]/50 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:border-[#C5A059] transition duration-200 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Llamar / Asistente IA</span>
            </button>
          </div>

          {/* Garantías y confirmación */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Confirmación inmediata por WhatsApp y Telegram
            </span>
            <span>·</span>
            <span>Pago en el centro</span>
            <span>·</span>
            <button
              type="button"
              onClick={() =>
                triggerCrmChat(
                  "Hola, me gustaría consultar detalles del próximo encuentro Bienestar Experience y actividades especiales.",
                  true
                )
              }
              className="text-[#E5C378] underline hover:text-white cursor-pointer"
            >
              Abrir chat del centro
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. MODAL MULTIMEDIA INTERACTIVO (VÍDEOS Y CARTELES)
      ───────────────────────────────────────────────────────────── */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del modal con selector de pestañas */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-stone-800/90 border-b border-stone-700 gap-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("video-particular")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeMediaModal === "video-particular"
                      ? "bg-[#800020] text-white"
                      : "bg-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  Vídeo Promocional
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("video-actividad")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeMediaModal === "video-actividad"
                      ? "bg-[#800020] text-white"
                      : "bg-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  Vídeo Actividad (Sede)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("video-madrid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeMediaModal === "video-madrid"
                      ? "bg-[#800020] text-white"
                      : "bg-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  Vídeo Madrid
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("flyer")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeMediaModal === "flyer"
                      ? "bg-[#800020] text-white"
                      : "bg-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  Cartel Oficial 2026
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("flyer-general")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeMediaModal === "flyer-general"
                      ? "bg-[#800020] text-white"
                      : "bg-stone-700 text-stone-300 hover:text-white"
                  }`}
                >
                  Flyer General
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="w-8 h-8 rounded-full bg-stone-700 hover:bg-stone-600 text-white flex items-center justify-center transition cursor-pointer ml-auto"
                title="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido según la pestaña activa */}
            <div className="p-2 sm:p-4 bg-black flex items-center justify-center">
              {activeMediaModal === "video-particular" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/Promo_Bienestar-Experience-2026_1920x1080.mp4"
                    poster="/videos/Promo_Bienestar-Experience-2026_1920x1080-poster.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Tu navegador no soporta el formato de vídeo MP4.
                  </video>
                </div>
              )}

              {activeMediaModal === "video-actividad" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/itinerario-9.mp4"
                    poster="/videos/itinerario-9-poster.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Tu navegador no soporta el formato de vídeo MP4.
                  </video>
                </div>
              )}

              {activeMediaModal === "video-madrid" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/bienestar_madrid.mp4"
                    poster="/videos/bienestar_madrid-poster.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Tu navegador no soporta el formato de vídeo MP4.
                  </video>
                </div>
              )}

              {activeMediaModal === "flyer" && (
                <div className="max-h-[80vh] overflow-auto flex items-center justify-center p-2">
                  <img
                    src="/flyers/flyer13nov2026vivemasparticular.jpeg"
                    alt="Cartel oficial de Bienestar Experience Más allá del tumor"
                    className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}

              {activeMediaModal === "flyer-general" && (
                <div className="max-h-[80vh] overflow-auto flex items-center justify-center p-2">
                  <img
                    src="/flyers/bienestar.png"
                    alt="Cartel oficial general de Bienestar Experience"
                    className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10. MODAL DE VINCULACIÓN CON TELEGRAM
      ───────────────────────────────────────────────────────────── */}
      <TelegramBookingModal
        isOpen={tgModalOpen}
        onClose={() => setTgModalOpen(false)}
        serviceName="Bienestar Experience"
      />
    </div>
  );
}
