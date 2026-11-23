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
  Wind,
  Smile,
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

interface MeditacionExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function MeditacionExperience({
  activity,
  isEmbedded = false,
}: MeditacionExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const meditacionService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "8d243111-8e4c-40e3-ac5a-b4301fe6cfb9" ||
        /meditaci/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[1];

  const priceFormatted = formatServicePrice(meditacionService);
  const scheduleText =
    meditacionService.scheduleText || "Lunes y Jueves de 09:15 a 09:45";
  const durationText = meditacionService.durationMinutes
    ? `${meditacionService.durationMinutes} minutos`
    : "30 minutos de centramiento";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone, display: formattedPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar horarios y reservar plaza para las clases de Meditación y Kundalini Yoga en Fuenlabrada (${scheduleText}).`
  )}`;

  const telegramBotUser = (
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ||
    "escuelayogasalvadoraconesa_bot"
  ).replace(/^@/, "").trim();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Telegram Handoff Modal
  const [tgModalOpen, setTgModalOpen] = useState(false);

  // Video / Flyer Lightbox State
  const [activeMediaModal, setActiveMediaModal] = useState<
    "video-actividad" | "video-sala" | "flyer" | null
  >(null);

  // SEO: H1 sólo en página dedicada; H2 cuando está embebido en home
  const HeadingTag = isEmbedded ? "h2" : "h1";

  // Vídeos formativos de la sección "SOBRE LA MEDITACIÓN"
  const videosFormatite = [
    {
      id: "1",
      num: "I.",
      title: "Mente en síntesis",
      description:
        "El blanco no es ausencia de color, sino la síntesis de todos ellos. Meditar no es forzar la mente a no pensar, sino ralentizar el flujo de pensamientos y ensanchar el espacio de silencio entre ellos, alcanzando una paz profunda donde se apagan las preocupaciones cotidianas.",
      src: "/videos/meditacion/Serie_2_mente_en_sintesis.mp4",
      poster: "/videos/meditacion/Serie_2_mente_en_sintesis-poster.jpg",
    },
    {
      id: "2",
      num: "II.",
      title: "¿Solo o en grupo?",
      description:
        "La práctica compartida crea una resonancia única que facilita la concentración, como ciclistas que ruedan juntos en pelotón. Aunque un guía marque pautas iniciales de respiración, el silencio es indispensable: si alguien habla continuamente es visualización, no meditación. Con 7 a 11 minutos diarios se asienta el hábito.",
      src: "/videos/meditacion/Serie_6_solo_o_acompanado.mp4",
      poster: "/videos/meditacion/Serie_6_solo_o_acompanado-poster.jpg",
    },
    {
      id: "3",
      num: "III.",
      title: "Meditar sentado y con la columna erguida",
      description:
        "Tumbados en la cama es muy fácil dormirse porque el cerebro cambia de ondas cerebrales. La meditación requiere presencia: mantener la columna erguida (en esterilla o en una silla con respaldo si la espalda lo necesita) nos permite permanecer despiertos, activos y con el sistema nervioso en calma profunda.",
      src: "/videos/meditacion/Serie_7_meditar_sentado.mp4",
      poster: "/videos/meditacion/Serie_7_meditar_sentado-poster.jpg",
    },
  ];

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — MEDITACIÓN & KUNDALINI YOGA
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#0D1F18] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg"
            alt="Meditación Guiada y Kundalini Yoga en Fuenlabrada - Espacio de silencio y presencia en el Centro de Yoga Salvadora Conesa"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-1000 ease-out hover:scale-102"
            loading="eager"
          />

          {/* Degradados de fondo para máxima legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1612]/95 via-[#0A1612]/45 to-[#0A1612]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A1612]/20 to-[#0A1612]/70 pointer-events-none" />

          {/* Contenido textual superpuesto */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8 flex flex-col items-center text-center justify-center min-h-[500px] sm:min-h-full">
            {/* Badge de exclusividad y ubicación */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/80 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Atención Plena & Kundalini Yoga · Fuenlabrada (Madrid)</span>
            </div>

            {/* Título principal semántico */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight break-words">
              Meditaciones Guiadas
            </HeadingTag>

            {/* Subtítulo */}
            <p className="font-serif italic text-lg sm:text-2xl text-[#E5C378] mt-2 max-w-3xl text-shadow-sm font-light">
              «Tecnología de la consciencia para la energía vital, la serenidad y el silencio interior»
            </p>

            {/* Microficha de horarios y condiciones */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-200 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {scheduleText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {durationText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-[#E5C378] font-bold">
                <Ticket className="w-3.5 h-3.5 text-[#D4AF37]" />
                {priceFormatted}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Gratis para alumnos de Yoga
              </span>
            </div>

            {/* Información Específica del Servicio */}
            {meditacionService.description && (
              <div className="mt-4 w-full max-w-2xl mx-auto rounded-xl border border-[#C5A059]/50 bg-[#0D1F18]/90 backdrop-blur-md p-3 sm:p-4 text-left shadow-xl">
                <div className="flex items-start gap-2.5">
                  <span className="text-base sm:text-lg flex-shrink-0">📌</span>
                  <div className="space-y-1">
                    <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E5C378]">
                      Información Específica del Servicio:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line font-sans">
                      {meditacionService.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción rápida en Hero */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href="#reservar-meditacion"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38D45] hover:from-[#D4AF37] hover:to-[#C5A059] text-[#0D1F18] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-amber-900/30 hover:scale-103 active:scale-97 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Reservar mi plaza</span>
              </a>

              {/* Botón Vídeo de la Actividad (itinerario-2.mp4) */}
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#800020]/90 hover:bg-[#800020] text-white border border-[#C5A059]/60 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#E5C378] fill-current" />
                <span>Ver Vídeo de la Actividad</span>
              </button>

              {/* Botón Vídeo de Sala */}
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-sala")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:border-[#C5A059] transition-all duration-200 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>Ver Vídeo de Sala</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SECCIÓN 1: QUÉ ES LA MEDITACIÓN Y CÓMO SE VIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-14 sm:mt-18">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              1. La Magia del Silencio Interior
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Qué es una Meditación Guiada y cómo se vive
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Lejos de exigencias o de «dejar la mente en blanco», la meditación es el arte de aprender a parar, aquietar la respiración y regresar al centro natural de sosiego y paz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Wind className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                Tecnología de la Consciencia
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Integramos pranayamas (técnicas respiratorias precisas), kriyas energéticos y mudras de Kundalini Yoga que calman el sistema nervioso y desbloquean tensiones antes de sentarnos en silencio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Heart className="w-6 h-6 text-[#800020]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                La Mente en Síntesis
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                El blanco no es ausencia de color, sino la síntesis de todos ellos. No luchamos contra los pensamientos; aprendemos a ralentizarlos y ensanchar el espacio de calma entre uno y otro.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Smile className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                Resonancia Grupal y Silencio
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Meditar en grupo genera una atmósfera protectora y envolvente que multiplica la concentración. La guía experimentada de Salvadora Conesa (+40 años de trayectoria) te sostiene paso a paso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS DE LA MEDITACIÓN (FONDO OSCURO)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20 bg-gradient-to-b from-[#12241D] via-[#0E1C17] to-[#12241D] text-white rounded-3xl p-6 sm:p-12 shadow-md border border-[#C5A059]/25 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
              2. Bienestar y Salud Integral
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Beneficios de la Meditación para tu Salud y Sistema Nervioso
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Respaldada por la ciencia y avalada por décadas de práctica: regular la respiración y aquietar la mente transforma la química interna del organismo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🌿</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Alivio del Estrés
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Desciende los niveles de cortisol y activa de inmediato la rama parasimpática, disolviendo la fatiga mental y la sensación de agobio constante.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🎯</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Foco y Claridad Mental
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Reduce el ruido mental y el pensamiento rumiante. Aporta lucidez, concentración profunda y mayor facilidad para tomar decisiones serenas.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🕊️</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Regulación Emocional
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Crea una distancia saludable con las emociones intensas o reactivas, permitiendo responder a las situaciones de la vida con calma y madurez.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🌙</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Descanso y Sueño Reparador
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Al enseñar al cerebro a transitar de ondas beta a ondas alfa y theta, se facilita un descanso nocturno profundo y una sensación renovada de vitalidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: LA PRÁCTICA PASO A PASO (TIMELINE)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              3. La Experiencia Paso a Paso
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Cómo transcurre una sesión de Meditación en la Escuela
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Un recorrido progresivo y estructurado para que tanto personas principiantes como practicantes avanzados encuentren su propio espacio de quietud.
            </p>
          </div>

          <div className="relative border-l-2 border-[#C5A059]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Llegada, Acomodación y Postura Cómoda
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Entras a la Sala de Silencio, descalzo/a y en un entorno cuidado con luz cálida. Puedes sentarte en zafu sobre esterilla o en una silla con respaldo ergonómico para mantener la espalda erguida sin esfuerzo lumbar.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Pranayama y Kriya Energético Suave
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Comenzamos con respiraciones conscientes guiadas que ralentizan el pulso. A continuación, movimientos dinámicos suaves de Kundalini Yoga liberan rigideces en hombros, cuello y columna.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                La Meditación: Enfoque, Silencio y Presencia
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                A través de un punto de concentración (la respiración, un mantra sagrado o la autoobservación), la atención se fija. Se abre el espacio de silencio puro donde no hay nada que resolver, solo ser.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                4
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Integración, Cierre y Vuelta a la Cotidianidad
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Finalizamos con una respiración profunda de arraigo y unos instantes de integración para llevar la serenidad obtenida a tus actividades diarias y a tu hogar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN 4: PARA QUIÉN ES IDEAL
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              4. Indicaciones y Adaptabilidad
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Para quién es ideal la Meditación
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Especialmente recomendada para:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Personas con estrés laboral, ansiedad, dispersión o fatiga mental crónica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Principiantes absolutos que creen que «no saben meditar» o que «su mente va demasiado rápido».</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Practicantes de yoga que desean asentar su práctica interior y profundizar en el silencio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Quienes buscan un grupo regular guiado por una maestra con más de 40 años de experiencia.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-5 h-5 text-amber-700" />
                <span>Adaptabilidad y Comodidad Garantizadas:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Sin posturas forzadas:</strong> Puedes meditar cómodamente en silla si tu columna, caderas o rodillas lo requieren.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Material incluido:</strong> Dispones de zafus, cojines, mantas y esterillas higienizadas en el centro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Ambiente seguro y acogedor:</strong> Sin dogmas, respetando los ritmos de cada asistente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Gratuita para alumnos de Yoga:</strong> Incluida en la cuota habitual de yoga del centro.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SECCIÓN 5: PREGUNTAS FRECUENTES (FAQ) CON SCHEMA JSON-LD
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#132A21] text-xs font-bold uppercase tracking-wider border border-[#132A21]/15">
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>5. Dudas Habituales</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Preguntas Frecuentes sobre la Meditación
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Todo lo que necesitas saber antes de venir a tu primera sesión en nuestro centro de Fuenlabrada.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Tengo que saber poner la mente en blanco para empezar?",
                a: "No, en absoluto. La idea de «poner la mente en blanco» es un mito extendido que genera frustración. Meditar consiste en entrenar la atención, comprender cómo funciona la mente y ensanchar poco a poco el espacio de sosiego entre pensamientos, sin forzar ni pelear con ellos.",
              },
              {
                q: "¿Puedo meditar en silla si me molestan las rodillas o la espalda?",
                a: "Por supuesto. Lo fundamental para la meditación es mantener la columna erguida para facilitar la respiración y mantenernos despiertos. En la sala contamos con sillas cómodas para que cualquier persona, sin importar su flexibilidad, pueda meditar con total confort.",
              },
              {
                q: "¿Qué diferencia hay entre meditación y visualización guiada?",
                a: "En una visualización guiada la mente sigue activamente una historia o imagen mental inducida por la voz. En la verdadera meditación, tras unas pautas iniciales de respiración y centramiento, el silencio es indispensable para que la mente descanse en su centro y experimente quietud real.",
              },
              {
                q: "¿Cuánto tiempo dura una sesión y qué ropa debo llevar?",
                a: "Las sesiones habituales de meditación y centramiento duran entre 30 y 45 minutos (o 90 minutos en formato combinado con Kundalini Yoga). Es recomendable traer ropa cómoda que no apriete el abdomen y calcetines para entrar a la sala.",
              },
              {
                q: "¿Las meditaciones son gratuitas para alumnos de Yoga?",
                a: "Sí. Para todos los alumnos matriculados en las clases regulares de Hatha Yoga o Kundalini Yoga del Centro de Yoga Salvadora Conesa, el acceso a las sesiones semanales de meditación es gratuito. Para alumnos externos la aportación es de solo 15 €/mes.",
              },
              {
                q: "¿Cómo reservo mi plaza o solicito información?",
                a: "Puedes contactar directamente por WhatsApp o Telegram a través de los botones de esta página o llamando a nuestro Asistente Inteligente. Te confirmaremos los turnos disponibles de mañana o tarde.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition cursor-pointer"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#12241D]">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#12241D] text-[#E5C378] rotate-180"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
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

          {/* JSON-LD Schema FAQPage para Posicionamiento SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿Tengo que saber poner la mente en blanco para empezar?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No, en absoluto. La meditación consiste en entrenar la atención, comprender cómo funciona la mente y ensanchar poco a poco el espacio de sosiego entre pensamientos, sin forzar ni pelear con ellos.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Puedo meditar en silla si me molestan las rodillas o la espalda?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Por supuesto. Lo fundamental para la meditación es mantener la columna erguida. En la sala disponemos de sillas cómodas para meditar sin esfuerzo lumbar.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué diferencia hay entre meditación y visualización guiada?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "En la meditación el silencio es indispensable para que la mente descanse en su centro y experimente quietud real, a diferencia de la visualización donde la mente sigue una historia continua.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Las meditaciones son gratuitas para alumnos de Yoga?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sí. Para todos los alumnos matriculados en las clases regulares de Yoga del centro, las sesiones semanales de meditación están incluidas sin coste adicional.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE LA MEDITACIÓN (VÍDEOS Y EXPLICACIONES)
      ───────────────────────────────────────────────────────────── */}
      <section id="sobre-la-meditacion" className="mt-16 sm:mt-24 pt-8 border-t border-[#C5A059]/20 scroll-mt-24">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header de la sección */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              6. Claves de la Práctica Interior
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              SOBRE LA MEDITACIÓN
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed font-sans bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/20 shadow-sm">
              <p>
                La meditación no consiste en vaciar la mente como quien apaga un interruptor, sino en comprender su naturaleza y aprender a entrar en sosiego con la respiración y los sentidos. A través del entrenamiento diario, ralentizamos el ritmo mental y abrimos espacios de calma interior donde la preocupación deja paso a la serenidad.
              </p>
              <p>
                En estos tres vídeos breves comparto reflexiones y pautas esenciales de nuestra práctica en la escuela: el verdadero sentido de la mente en calma, las ventajas de la energía grupal y el porqué de la postura erguida para sostener una presencia lúcida y relajada.
              </p>
            </div>
          </div>

          {/* Grid de Vídeos Formativos */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
              Vídeos Explicativos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videosFormatite.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                >
                  <div className="relative aspect-video bg-stone-900 border-b border-stone-100">
                    <video
                      src={vid.src}
                      poster={vid.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020] mb-2">
                        {vid.num} {vid.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                        {vid.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Concluding Note */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#C5A059]/30 text-center space-y-2 mt-8">
              <p className="text-xs sm:text-sm text-[#1C1C1C]/85 font-medium leading-relaxed max-w-3xl mx-auto">
                La meditación es un entrenamiento constante y amable hacia uno mismo. Con solo unos minutos de práctica continuada al día, la mente aprende a descansar en su centro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-meditacion")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-meditacion"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Plazas Reducidas para Cuidar el Silencio</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Regálate un espacio de profunda calma, presencia y serenidad interior
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Horarios: <strong>{scheduleText}</strong>. Las plazas son limitadas para garantizar que cada practicante disfrute de la atmósfera y la calma de la sala.
            </p>

            {/* Microficha resumen */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Horarios oficiales:</span>
                <span>{scheduleText}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Aportación:</span>
                <span className="font-bold text-emerald-300">
                  {priceFormatted} (Gratis para alumnos de Yoga)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E5C378] font-bold">Ubicación:</span>
                <span>Centro de Yoga Salvadora Conesa · Fuenlabrada</span>
              </div>
            </div>

            {/* BOTONES PRINCIPALES (WHATSAPP + TELEGRAM CON MODAL + VAPI IA) */}
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
                    inquiry: "Información y horarios de las sesiones de Meditación",
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
                    `Hola, me gustaría consultar dudas sobre las sesiones de Meditación en Fuenlabrada (${scheduleText}).`,
                    true
                  )
                }
                className="text-[#E5C378] underline hover:text-white cursor-pointer"
              >
                Abrir chat del centro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MODAL LIGHTBOX PARA VÍDEOS Y CARTEL
      ───────────────────────────────────────────────────────────── */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative bg-[#0D1F18] border border-[#C5A059]/40 rounded-2xl max-w-3xl w-full p-4 sm:p-6 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("video-actividad")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeMediaModal === "video-actividad"
                      ? "bg-[#C5A059] text-[#0D1F18]"
                      : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Vídeo Actividad</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("video-sala")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeMediaModal === "video-sala"
                      ? "bg-[#C5A059] text-[#0D1F18]"
                      : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Vídeo de Sala</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaModal("flyer")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeMediaModal === "flyer"
                      ? "bg-[#C5A059] text-[#0D1F18]"
                      : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Cartel</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="self-end sm:self-auto p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido Modal */}
            {activeMediaModal === "video-actividad" && (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
                <video
                  src="/videos/itinerario-2.mp4"
                  poster="/videos/itinerario-2-poster.jpg"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {activeMediaModal === "video-sala" && (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
                <video
                  src="/videos/itinerario-1.mp4"
                  poster="/videos/itinerario-1-poster.jpg"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {activeMediaModal === "flyer" && (
              <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-black/50 rounded-xl p-2">
                <img
                  src="/imagenes/meditacion/fliermeditacion.jpeg"
                  alt="Cartel oficial de Meditaciones Guiadas en el Centro de Yoga Salvadora Conesa"
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="pt-3 text-center">
              <span className="text-xs text-stone-400">
                {activeMediaModal === "video-actividad"
                  ? "Vídeo de Kundalini Yoga y Meditación Guiada (itinerario-2.mp4)"
                  : activeMediaModal === "video-sala"
                  ? "Vídeo de Sala del Centro de Yoga Salvadora Conesa (itinerario-1.mp4)"
                  : "Cartel Oficial de Meditaciones Guiadas"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Telegram Handoff */}
      <TelegramBookingModal
        isOpen={tgModalOpen}
        onClose={() => setTgModalOpen(false)}
        serviceName="Meditaciones Guiadas y Kundalini Yoga"
        note="Reserva de Meditación desde la landing web (#dia-2)."
        prefillMessage={`Hola Salvadora, me gustaría consultar horarios y reservar plaza para las clases de Meditación en Fuenlabrada (${scheduleText}).`}
      />
    </div>
  );
}
