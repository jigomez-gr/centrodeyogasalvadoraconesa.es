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
  UserCheck,
  Video,
  Award,
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

interface GestaltExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function GestaltExperience({
  activity,
  isEmbedded = false,
}: GestaltExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const gestaltService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "076c81be-6ce8-4f14-87a9-f507b01ba465" ||
        /gestalt/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[4];

  const priceFormatted = formatServicePrice(gestaltService) || "35 €";
  const scheduleText =
    gestaltService.scheduleText || "Lunes y algún Miércoles (con cita convenida)";
  const durationText = gestaltService.durationMinutes
    ? `${gestaltService.durationMinutes} minutos`
    : "60 minutos por sesión";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar disponibilidad y solicitar cita para una sesión de Terapia Gestalt (presencial u online).`
  )}`;

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

  // SEO: H1 sólo en página propia; H2 cuando está embebido en home
  const HeadingTag = isEmbedded ? "h2" : "h1";

  // Pilares didácticos de la sección "SOBRE LA TERAPIA GESTALT"
  const gestaltPillars = [
    {
      id: "1",
      num: "I.",
      title: "El Aquí y el Ahora: Vivir en Presente",
      description:
        "La Terapia Gestalt no busca teorizar sobre el pasado ni perderse en hipótesis futuras. El trabajo se fundamenta en qué te ocurre aquí y ahora, en cómo sientes tu respiración y qué emociones se manifiestan en tu cuerpo en el momento en que hablas de tu dolor o tu anhelo.",
      image: "/imagenes/gestalt/01_gestalt_consulta_intima_1920x1080.jpg",
      tag: "Presencia y Conciencia",
    },
    {
      id: "2",
      num: "II.",
      title: "El Darse Cuenta (Awareness) y Escucha Corporal",
      description:
        "Hacernos conscientes de los mecanismos automáticos con los que nos defendemos: la introyección, la culpa, la desconexión emocional o la complacencia. Al escuchar los mensajes sutiles de la musculatura y el pecho, recuperas tu brújula interna y la verdad de lo que necesitas.",
      image: "/imagenes/gestalt/03_gestalt_escucha_y_acompanamiento_1920x1080.jpg",
      tag: "Cuerpo y Emoción",
    },
    {
      id: "3",
      num: "III.",
      title: "Cierre de Asuntos Inconclusos y Autoapoyo",
      description:
        "Duelos postergados, palabras no dichas a familiares o exparejas, y heridas de infancia generan un gasto energético constante. A través del diálogo vivencial y la técnica gestáltica, cerramos esos ciclos para pasar del apoyo dependiente externo al autoapoyo y la libertad interior.",
      image: "/imagenes/gestalt/terapia_gestalt_1920x1080/02_terapia_gestalt_sesiones_presenciales_1920x1080.jpg",
      tag: "Sanación Relacional",
    },
  ];

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — TERAPIA GESTALT INDIVIDUAL
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#13231E] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/gestalt/01_gestalt_consulta_intima_1920x1080.jpg"
            alt="Terapia Gestalt en Fuenlabrada y Online - Consulta de psicoterapia humanista con Salvadora Conesa"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08] transition-transform duration-1000 ease-out hover:scale-102"
            loading="eager"
          />

          {/* Degradados de integración cinematográfica */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1713]/95 via-[#0B1713]/50 to-[#0B1713]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1713]/25 to-[#0B1713]/70 pointer-events-none" />

          {/* Contenido textual superpuesto */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8 flex flex-col items-center text-center justify-center min-h-[500px] sm:min-h-full">
            {/* Badge de profesionalidad y enfoque */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A332B]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>PSICOTERAPIA HUMANISTA · FUENLABRADA (MADRID) Y ONLINE</span>
            </div>

            {/* Título Principal */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md max-w-4xl">
              Terapia Gestalt
            </HeadingTag>

            {/* Subtítulo inspirador */}
            <p className="mt-2 text-stone-200 text-sm sm:text-lg md:text-xl font-light italic max-w-2xl text-balance drop-shadow-sm font-serif">
              «El arte del aquí y el ahora para sanar heridas, cerrar ciclos y recuperar tu autenticidad»
            </p>

            {/* Ficha técnica compacta */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-stone-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                {scheduleText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {durationText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Ticket className="w-3.5 h-3.5 text-[#C5A059]" />
                {priceFormatted} / sesión
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Video className="w-3.5 h-3.5 text-[#C5A059]" />
                Presencial u Online
              </span>
            </div>

            {/* Destacado informativo sobre la terapeuta */}
            <div className="mt-4 max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/15 text-stone-200 text-xs sm:text-sm text-left">
              <p className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Acompañamiento con Salvadora Conesa:</strong> Más de 26 años como terapeuta Gestalt y 40 años facilitando procesos de crecimiento personal y consciencia corporal. Sesiones individuales en un entorno cálido, íntimo y seguro.
                </span>
              </p>
            </div>

            {/* Botonera de acción principal y multimedia */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <a
                href="#reservar-gestalt"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38F48] hover:to-[#C5A059] text-[#12241D] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <span>Solicitar Consulta o Cita</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-rose-900/80 hover:bg-rose-900 text-white font-medium text-xs sm:text-sm rounded-xl border border-rose-500/40 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-rose-300" />
                <span>Ver Vídeo de la Terapia</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-sala")}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#C5A059]" />
                <span>Ver Espacio y Sala</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaModal("flyer")}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 bg-black/40 hover:bg-black/60 text-stone-300 hover:text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                <span>Cartel Informativo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SECCIÓN 1: QUÉ ES LA TERAPIA GESTALT Y CÓMO SE VIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              1. Enfoque Terapéutico Humanista
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Una terapia viva orientada al contacto, el presente y el autodescubrimiento
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              La psicoterapia Gestalt no se enfoca en poner etiquetas diagnósticas ni en juzgar tu comportamiento. Es un espacio de encuentro genuino donde comprender cómo te relacionas contigo mismo y con el mundo, permitiéndote tomar las riendas de tu vida.
            </p>
          </div>

          {/* Bloque 1: Presencia y toma de conciencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>La Experiencia del Aquí y el Ahora</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Del análisis intelectual a la vivencia sentida
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                A menudo gastamos una enorme energía rumiando sucesos pasados o anticipando con angustia el porvenir. En consulta aprendemos a posar la atención en lo que ocurre en este instante exacto:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Identificar qué sientes ahora mismo:</strong> Dar voz a la tristeza, el enfado o el miedo que sueles reprimir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>El cuerpo como testigo:</strong> El nudo en la garganta, la presión en el pecho o la rigidez en la mandíbula son señales directas de emociones no expresadas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Desactivar el piloto automático:</strong> Tomar conciencia de cómo saboteas tus propias necesidades para complacer a los demás.</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <img
                src="/imagenes/gestalt/02_gestalt_espacio_consulta_1920x1080.jpg"
                alt="Espacio íntimo de consulta de Terapia Gestalt con Salvadora Conesa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Espacio íntimo y seguro en Fuenlabrada
              </span>
            </div>
          </div>

          {/* Bloque 2: La relación terapéutica y el acompañamiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm md:flex-row-reverse">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md md:order-last">
              <img
                src="/imagenes/gestalt/03_gestalt_escucha_y_acompanamiento_1920x1080.jpg"
                alt="Escucha empática y acompañamiento en terapia Gestalt con Salvadora Conesa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Escucha activa sin juicio moral
              </span>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Vínculo de Confianza y Calidez</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Acompañamiento cercano de persona a persona
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Salvadora Conesa ofrece una mirada respetuosa y lúcida nacida de más de dos décadas y media de práctica terapéutica. No hay distancia fría ni jerarquías dogmáticas:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Confidencialidad absoluta:</strong> Un refugio donde soltar máscaras y expresar lo que no te atreves a contar en tu entorno cotidiano.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Técnicas vivenciales adaptadas:</strong> Diálogos con partes internas (la silla vacía), trabajo con polaridades, sueños y respiración consciente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Recuperación de la soberanía personal:</strong> Pasar del victimismo o la culpa a la responsabilidad consciente de tu bienestar y decisiones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS TERAPÉUTICOS Y EMOCIONALES (DARK GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="rounded-3xl bg-[#0F1E19] border border-[#C5A059]/40 p-6 sm:p-12 text-white shadow-xl">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
                2. Beneficios Clínicos y Vivenciales
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Qué transforma la Terapia Gestalt en tu vida
              </h2>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
                Un proceso de cambio profundo que no se queda en las palabras, sino que transforma tus sensaciones corporales y tu manera de vincularte con los demás.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Alivio de la Ansiedad y el Estrés Crónico
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Al traer la atención al presente y al cuerpo, el sistema nervioso simpático disminuye su hiperactivación, disolviendo la opresión torácica, el insomnio y la aceleración mental.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Cierre de Asuntos Inconclusos y Duelos
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Permite transitar duelos enquistados, rupturas dolorosas y rencores no resueltos con figuras significativas del pasado, liberando la energía atrapada en el resentimiento.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Límites Sanos y Relaciones Equilibradas
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Aprender a decir «no» sin sentir culpa, dejar de asumir cargas ajenas y comunicar tus deseos con honestidad y firmeza, mejorando tus vínculos de pareja, familia o trabajo.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Smile className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Autoestima y Autoapoyo Genuino
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Desactivar la voz del crítico interno y dejar de depender de la aprobación de los demás para sentirte valioso. Construyes un apoyo interno incondicional ante la adversidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: EL PROCESO TERAPÉUTICO PASO A PASO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              3. Metodología de Consulta
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              El proceso terapéutico paso a paso
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Cada sesión tiene un ritmo vivo adaptado a lo que traes en ese momento, siguiendo un marco de seguridad y respeto.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/50 space-y-8 sm:space-y-10 my-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Primera Consulta y Encuadre Terapéutico
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Nos conocemos, clarificamos el motivo que te impulsa a pedir ayuda y acordamos los objetivos del proceso. Definimos la frecuencia de las sesiones y establecemos las bases de confidencialidad y confianza.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Exploración del Presente y del Síntoma
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                ¿Qué te está sucediendo hoy? Observamos cómo te afecta en tu cuerpo, qué pensamientos recurrentes aparecen y qué emociones pugnan por expresarse sin que te des cuenta.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Trabajo Vivencial y Toma de Conciencia
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Aplicamos experimentos gestálticos: dar voz a partes internas en conflicto, dialogar con un ser querido mediante la técnica de la silla vacía, o profundizar en la respiración para desbloquear la tensión acumulada.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                4
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Integración, Cierre y Recursos para tu Día a Día
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Sintetizamos lo aprendido en la sesión y encontramos herramientas prácticas para aplicar en tus relaciones familiares, laborales y contigo mismo durante la semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN 4: PARA QUIÉN ES IDEAL Y MODALIDADES
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              4. Indicaciones y Formatos
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Para quién es ideal y cómo realizar tus sesiones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Especialmente recomendada si experimentas:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Ansiedad, crisis de angustia y estrés crónico:</strong> Cuando la mente va acelerada y el cuerpo no logra relajarse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Procesos de duelo o rupturas afectivas:</strong> Acompañamiento en el dolor de una pérdida para elaborar el adiós y recuperar el equilibrio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Dificultades en relaciones y dependencia:</strong> Patrones repetitivos de complacencia, miedo al rechazo o problemas de apego.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Sensación de vacío o estancamiento vital:</strong> Necesidad de reorientar tu propósito de vida y reconectar con lo que verdaderamente te importa.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-5 h-5 text-amber-700" />
                <span>Modalidades disponibles:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Sesión Presencial en Fuenlabrada:</strong> En el Centro de Yoga Salvadora Conesa (C/ de las Navas, 17). Un entorno tranquilo, acogedor y libre de ruidos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Sesión Online por Videoconferencia:</strong> Con la misma calidez y cercanía para personas que residen fuera de Madrid o necesitan flexibilidad horaria.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Duración y Precio Accesible:</strong> Sesiones de 60 minutos a 35 € por sesión, con pago directo en el centro o por transferencia/Bizum para online.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Horarios Flexibles:</strong> Citas convenidas preferentemente los Lunes y algún Miércoles según disponibilidad de agenda.</span>
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
              Preguntas Frecuentes sobre la Terapia Gestalt
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Resolvemos las dudas más comunes sobre la metodología, la duración del proceso y cómo empezar.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿En qué se diferencia la Terapia Gestalt de la psicología tradicional o el psicoanálisis?",
                a: "A diferencia de enfoques puramente analíticos que investigan el pasado durante años o intentan corregir pensamientos de forma racional, la Terapia Gestalt se centra en la vivencia presente (el «aquí y ahora») y en la integración cuerpo-emoción. No nos quedamos en explicar por qué te pasa algo, sino en experimentar cómo lo vives y qué necesitas transformar en este momento.",
              },
              {
                q: "¿Cómo es una primera sesión con Salvadora Conesa?",
                a: "La primera sesión es un espacio de acogida cálida, distendida y confidencial. Hablamos de lo que te preocupa o te hace sufrir actualmente, de qué esperas de la terapia y resolvemos cualquier duda. Es un encuentro para comprobar si te sientes a gusto y seguro/a con el acompañamiento de Salvadora.",
              },
              {
                q: "¿Es igualmente efectiva la sesión online que la presencial?",
                a: "Sí, absolutamente. La sesión online por videollamada ofrece un clima de intimidad excelente desde la comodidad de tu hogar. Muchas personas prefieren la modalidad online por ahorro de tiempo en desplazamientos o por residir fuera de Madrid, lográndose la misma conexión y profundidad emocional.",
              },
              {
                q: "¿Cuántas sesiones se suelen necesitar para notar avances?",
                a: "La Terapia Gestalt es una terapia orientada al cambio vivencial. La mayoría de personas experimentan alivio y mayor claridad mental desde las primeras 3 a 5 sesiones. La duración total del proceso depende de tus necesidades: desde un acompañamiento puntual de pocas semanas para resolver una crisis concreta, hasta procesos más profundos de autoconocimiento.",
              },
              {
                q: "¿Necesito tener algún problema grave para acudir a terapia?",
                a: "No. Aunque la terapia es muy efectiva en momentos de crisis aguda (ansiedad, duelos o rupturas), muchas personas acuden simplemente porque desean conocerse mejor, aprender a poner límites, mejorar su comunicación de pareja o encontrar un sentido más pleno a su vida cotidiana.",
              },
              {
                q: "¿Cuál es el coste de cada sesión y cómo se gestiona la reserva?",
                a: "La aportación es de 35 € por sesión individual de 60 minutos. Las citas se acuerdan de forma individual por WhatsApp o Telegram, garantizando un horario cómodo para ambas partes. El pago se efectúa en el centro en las sesiones presenciales o de forma electrónica para sesiones online.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-[#12241D] hover:bg-stone-50/80 transition cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#800020] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF9F6]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Schema.org FAQPage para SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿En qué se diferencia la Terapia Gestalt de la psicología tradicional?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "La Terapia Gestalt se centra en la vivencia presente (el aquí y ahora) y en la integración cuerpo-emoción, facilitando el darse cuenta y el autoapoyo en lugar de teorizar sobre el pasado.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Cómo es una primera sesión de Terapia Gestalt con Salvadora Conesa?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Es un espacio de acogida confidencial y cercana en Fuenlabrada u online, donde explorar tu situación actual, clarificar tus objetivos y comprobar la sintonía terapéutica sin juicio.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Cuál es el precio de la sesión individual de Terapia Gestalt?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "El precio es de 35 € por sesión individual de 60 minutos, tanto en modalidad presencial en Fuenlabrada como online.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE LA TERAPIA GESTALT Y EL ACOMPAÑAMIENTO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              6. Pilares del Enfoque Gestáltico
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Sobre la Terapia Gestalt y el Acompañamiento de Salvadora Conesa
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Descubre los fundamentos teóricos y vivenciales que hacen de la Gestalt una de las psicoterapias más transformadoras y liberadoras del ser humano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gestaltPillars.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col hover:border-[#C5A059]/60 transition duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider text-white bg-[#800020]/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#12241D]">
                      {p.num} {p.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cita de Fritz Perls / Salvadora Conesa */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 text-center space-y-3 max-w-3xl mx-auto shadow-xs">
            <p className="font-serif text-base sm:text-lg italic text-[#12241D] leading-relaxed">
              «Sé como eres, de manera que puedas ver quién eres y cómo eres. Deja por unos momentos lo que debes hacer y descubre lo que realmente estás haciendo.»
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] block">
              — Fritz Perls · Fundador de la Terapia Gestalt
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-gestalt")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-gestalt"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Atención Individual Personalizada</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Regálate un Espacio de Escucha, Comprensión y Alivio
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Horarios convenidos individualmente (<strong>{scheduleText}</strong>). Sesión individual de 60 minutos presencial en Fuenlabrada u online por videoconferencia.
            </p>

            {/* Microficha resumen */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Modalidad:</span>
                <span>Presencial en Fuenlabrada u Online</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Aportación:</span>
                <span className="font-bold text-emerald-300">{priceFormatted} / sesión de 1 hora</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E5C378] font-bold">Terapeuta:</span>
                <span>Salvadora Conesa (+26 años de experiencia)</span>
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
                <span>Pedir Cita por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setTgModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#0088cc] via-[#0077b5] to-[#006699] hover:from-[#0077b5] hover:to-[#006699] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-sky-950/40 hover:scale-103 active:scale-97 transition duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>Pedir Cita por Telegram</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerVapiCall({
                    inquiry: "Consulta de disponibilidad e información para Terapia Gestalt",
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
                Reserva confidencial y sin permanencia
              </span>
              <span>·</span>
              <span>Pago por sesión individual</span>
              <span>·</span>
              <button
                type="button"
                onClick={() =>
                  triggerCrmChat(
                    `Hola, me gustaría consultar dudas sobre la Terapia Gestalt con Salvadora Conesa.`,
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
          9. MODALES MULTIMEDIA (VÍDEO ACTIVIDAD / VÍDEO SALA / FLYER)
      ───────────────────────────────────────────────────────────── */}
      {activeMediaModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-900 border border-stone-700/80 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del modal */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-stone-950/80 border-b border-stone-800">
              <span className="text-xs sm:text-sm font-semibold text-stone-200">
                {activeMediaModal === "video-actividad" &&
                  "Vídeo Resumen · Terapia Gestalt y Consulta"}
                {activeMediaModal === "video-sala" &&
                  "Vídeo del Espacio y Centro de Yoga"}
                {activeMediaModal === "flyer" &&
                  "Cartel Oficial · Terapia Gestalt"}
              </span>
              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido según el modal seleccionado */}
            <div className="p-2 sm:p-4 bg-black flex items-center justify-center">
              {activeMediaModal === "video-actividad" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/itinerario-5.mp4"
                    poster="/videos/itinerario-5-poster.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Tu navegador no soporta el formato de vídeo MP4.
                  </video>
                </div>
              )}

              {activeMediaModal === "video-sala" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/itinerario-1.mp4"
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
                    src="/flyers/gestalt.jpeg"
                    alt="Cartel informativo oficial de Terapia Gestalt con Salvadora Conesa"
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
        serviceName="Terapia Gestalt (Sesión Individual)"
      />
    </div>
  );
}
