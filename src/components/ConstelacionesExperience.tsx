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
  Award,
  Layers,
  CircleDot,
  Eye,
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

interface ConstelacionesExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function ConstelacionesExperience({
  activity,
  isEmbedded = false,
}: ConstelacionesExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const constelarService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "a1dde6cd-f1bf-4175-95ee-34a53f4838e9" ||
        /constelar/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[5];

  const nextDateText =
    constelarService.eventDatesText ||
    constelarService.scheduleText ||
    "Talleres mensuales en fin de semana (Próxima convocatoria en preparación)";
  const durationText = constelarService.durationMinutes
    ? `${Math.round(constelarService.durationMinutes / 60)} horas`
    : "4 horas vivenciales";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar fechas y disponibilidad de plazas para el Taller de Constelaciones Familiares en Fuenlabrada.`
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
    "video-actividad" | "video-particular" | "video-sala" | "flyer" | null
  >(null);

  // SEO: H1 sólo en página propia; H2 cuando está embebido en home
  const HeadingTag = isEmbedded ? "h2" : "h1";

  // Pilares sistémicos de la sección "SOBRE LAS CONSTELACIONES FAMILIARES"
  const constelacionesPillars = [
    {
      id: "1",
      num: "I.",
      title: "El Orden y la Pertenencia (Bert Hellinger)",
      description:
        "Cada miembro del clan familiar tiene el mismo derecho inalienable a pertenecer. Cuando alguien es excluido, olvidado, juzgado o silenciado por dolor o vergüenza, un descendiente asumirá inconscientemente su carga o destino para restablecer el equilibrio en el sistema.",
      image: "/imagenes/constelaciones/101_constelaciones_circulo_sereno_1920x1080.jpg",
      tag: "Órdenes del Amor",
    },
    {
      id: "2",
      num: "II.",
      title: "El Campo Morfogenético y la Representación",
      description:
        "Al elegir representantes dentro del grupo para los miembros de tu familia, ocurre un fenómeno asombroso: los representantes sienten sensaciones corporales, miradas y emociones reales del sistema sin conocer su historia. Es el campo de información viva que se hace visible.",
      image: "/imagenes/constelaciones/102_constelaciones_vinculos_grupo_1920x1080.jpg",
      tag: "El Campo Que Sana",
    },
    {
      id: "3",
      num: "III.",
      title: "La Reconciliación y las Frases Sanadoras",
      description:
        "A través de movimientos pausados y frases de asentimiento profundo a lo que fue («Te veo», «Tomo la vida que me diste al precio que te costó», «Dejo contigo lo tuyo y me quedo con lo mío»), el alma descansa, las lealtades invisibles se desatan y el amor vuelve a fluir.",
      image: "/imagenes/constelaciones/103_constelaciones_trabajo_relacional_1920x1080.jpg",
      tag: "Sanación del Alma",
    },
  ];

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — CONSTELACIONES FAMILIARES
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#13231E] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/constelaciones/101_constelaciones_circulo_sereno_1920x1080.jpg"
            alt="Taller de Constelaciones Familiares en Fuenlabrada - Círculo de trabajo sistémico en el Centro de Yoga Salvadora Conesa"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.10] transition-transform duration-1000 ease-out hover:scale-102"
            loading="eager"
          />

          {/* Degradados de integración cinematográfica */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1713]/95 via-[#0B1713]/50 to-[#0B1713]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1713]/25 to-[#0B1713]/70 pointer-events-none" />

          {/* Contenido textual superpuesto */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8 flex flex-col items-center text-center justify-center min-h-[500px] sm:min-h-full">
            {/* Badge de exclusividad y temática */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A332B]/85 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>SANACIÓN TRANSGENERACIONAL Y SISTÉMICA · FUENLABRADA (MADRID)</span>
            </div>

            {/* Título Principal */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md max-w-4xl">
              Constelaciones Familiares
            </HeadingTag>

            {/* Subtítulo inspirador */}
            <p className="mt-2 text-stone-200 text-sm sm:text-lg md:text-xl font-light italic max-w-2xl text-balance drop-shadow-sm font-serif">
              «Ordenación de los vínculos del corazón para reconciliar tu pasado y liberar tu presente»
            </p>

            {/* Ficha técnica compacta */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-stone-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                Talleres Mensuales
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {durationText} (10:00 a 14:00 h)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Ticket className="w-3.5 h-3.5 text-[#C5A059]" />
                60 € Constelar · 20 € Participar
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                Aforo reducido (25 plazas)
              </span>
            </div>

            {/* Destacado informativo sobre la facilitación */}
            <div className="mt-4 max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/15 text-stone-200 text-xs sm:text-sm text-left">
              <p className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Facilitado por Salvadora Conesa:</strong> Terapeuta Gestalt y facilitadora de Constelaciones Familiares con más de 26 años de trayectoria sosteniendo campos de sanación grupal con profundo respeto, confidencialidad y amor consciente.
                </span>
              </p>
            </div>

            {/* Botonera de acción principal y multimedia */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <a
                href="#reservar-constelaciones"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38F48] hover:to-[#C5A059] text-[#12241D] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <span>Reservar Plaza en el Taller</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-particular")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-rose-900/80 hover:bg-rose-900 text-white font-medium text-xs sm:text-sm rounded-xl border border-rose-500/40 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-rose-300" />
                <span>Ver Vídeo del Taller</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-sala")}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#C5A059]" />
                <span>Ver Sala Principal</span>
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
          2. SECCIÓN 1: QUÉ SON LAS CONSTELACIONES Y CÓMO FUNCIONAN
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              1. Terapia Sistémica y Transgeneracional
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Hacer visible lo invisible para que el amor vuelva a fluir
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Las Constelaciones Familiares, creadas por Bert Hellinger, son un método terapéutico vivencial que permite sacar a la luz las lealtades invisibles, los nudos y los desórdenes en nuestro sistema de origen que condicionan nuestras relaciones, salud, economía y paz mental.
            </p>
          </div>

          {/* Bloque 1: El círculo y la experiencia en sala */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <CircleDot className="w-3.5 h-3.5" />
                <span>La Fuerza del Círculo Grupal</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Un campo de compasión, respeto y verdad
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                El trabajo en grupo crea un contenedor energético y emocional extraordinario donde cada participante aporta su presencia. Durante el taller:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Configuración de la constelación:</strong> La persona que constela plantea su asunto brevemente y elige a representantes de entre los presentes para su familia o elementos del problema.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>El movimiento del alma:</strong> Guiados por la facilitadora, los representantes expresan lo que sienten corporalmente, revelando bloqueos ocultos durante generaciones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Restablecimiento del orden:</strong> Cuando cada miembro ocupa su lugar legítimo, se genera un alivio instantáneo que resuena en todo el árbol genealógico.</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <img
                src="/imagenes/constelaciones/102_constelaciones_vinculos_grupo_1920x1080.jpg"
                alt="Grupo en el Taller de Constelaciones Familiares en Fuenlabrada con Salvadora Conesa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Círculo de trabajo sistémico en Fuenlabrada
              </span>
            </div>
          </div>

          {/* Bloque 2: Las dos formas de vivir el taller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm md:flex-row-reverse">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md md:order-last">
              <img
                src="/imagenes/constelaciones/103_constelaciones_trabajo_relacional_1920x1080.jpg"
                alt="Trabajo relacional y mirada sistémica en Constelaciones Familiares"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Sanación de vínculos y reconciliación profunda
              </span>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Dos Modalidades de Participación</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Constelar tu propio asunto o participar como representante
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                No es indispensable constelar para experimentar una profunda transformación interior:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Modalidad Constelar (60 €):</strong> Abres tu propia constelación personal para trabajar un síntoma, conflicto de pareja, relación con tus padres o bloqueo vital concreto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Modalidad Participante / Representante (20 €):</strong> Participas en el taller representando roles de otras familias u observando. Es asombroso cómo los roles que te tocan resuenan directamente con heridas de tu propia vida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Beneficio compartido:</strong> En un taller de constelaciones todos los asistentes sanan, porque las dinámicas humanas (padres, hijos, pérdidas, amor) son universales.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS SISTÉMICOS Y EMOCIONALES (DARK GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="rounded-3xl bg-[#0F1E19] border border-[#C5A059]/40 p-6 sm:p-12 text-white shadow-xl">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
                2. Beneficios Vivenciales y Terapéuticos
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Qué libera y reordena una Constelación Familiar
              </h2>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
                Una mirada amplia que trasciende la mente lógica para llegar a la raíz emocional y transgeneracional de lo que te inquieta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Reconciliación con la Madre y el Padre
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Tomar a los padres tal como son y fueron es la llave maestra para tomar la vida, la abundancia y el éxito. Liberas reproches y dejas de esperar que ellos cambien.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Desactivar Lealtades Invisibles y Repeticiones
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Dejar de pagar por culpas o sufrimientos de ancestros fallecidos. Romper patrones familiares repetitivos de ruina económica, soledad o enfermedades compartidas.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Armonía en la Pareja y Relaciones con los Hijos
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Comprender de dónde vienen las dificultades afectivas, dar su lugar a parejas anteriores y evitar que los hijos carguen con asuntos de los adultos de la familia.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Smile className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Paz Interior, Ligereza y Claridad Vital
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Al volver a ocupar tu lugar en la jerarquía familiar (el lugar de hijo o hermano, no de padre de tus padres), experimentas una enorme ligereza física y serenidad profunda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: CÓMO SE DESARROLLA EL TALLER PASO A PASO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              3. Metodología del Taller (4 Horas)
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              El desarrollo de una jornada sistémica
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Una sesión de 4 horas guiada con delicadeza, cuidado y estricta confidencialidad por Salvadora Conesa.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/50 space-y-8 sm:space-y-10 my-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                10:00 h · Bienvenida, Centramiento y Ejercicio de Apertura
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Recepción de los asistentes, creación del círculo de confianza y breve meditación de presencia y respeto hacia nuestros orígenes para sintonizar con el campo del taller.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                10:30 a 13:30 h · Constelaciones Individuales Sostenidas por el Grupo
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Se abren los asuntos de las personas que han venido a constelar. Salvadora entrevista brevemente a quien constela, se eligen representantes y se acompaña el movimiento hasta alcanzar una imagen de solución y paz.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                13:30 a 14:00 h · Dinámica Grupal de Integración y Cierre
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Ejercicio conjunto para asimilar lo vivido sin intelectualizar ni comentar las constelaciones, permitiendo que la imagen sanadora actúe en el alma de cada participante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN 4: PARA QUIÉN ES IDEAL Y QUÉ ASUNTOS CONSTELAR
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              4. Aplicaciones y Temas de Trabajo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Qué asuntos puedes llevar a una Constelación
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Asuntos habituales para constelar:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Relación con padres e hijos:</strong> Distanciamientos dolorosos, conflictos persistentes o dificultad para poner límites sanos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Conflictos de pareja y rupturas:</strong> Dificultad para encontrar pareja estable, celos, dependencia o separaciones no cerradas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Salud y síntomas físicos:</strong> Escuchar el mensaje de enfermedades crónicas, ansiedad recurrente o dolores sin causa médica clara.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Bloqueos laborales y dinero:</strong> Sensación de no merecimiento, dificultad para generar o retener ingresos, o estancamiento profesional.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-5 h-5 text-amber-700" />
                <span>Recomendaciones prácticas para el taller:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Ropa cómoda y calcetines:</strong> En la sala se trabaja descalzo o con calcetines sobre suelo cálido y acogedor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>No hace falta que vengan tus familiares:</strong> El trabajo lo realizas tú individualmente apoyado por los representantes del grupo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Confidencialidad absoluta:</strong> Lo que se ve y se siente en la sala permanece en la sala con el máximo respeto hacia todas las historias.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Actitud de apertura y silencio:</strong> Venir con disposición a contemplar sin juzgar ni intentar explicarlo todo con la lógica racional.</span>
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
              Preguntas Frecuentes sobre las Constelaciones Familiares
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Aclaramos las dudas más frecuentes sobre la mecánica de la sesión, los roles y la preparación previa.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Qué diferencia hay entre la modalidad 'Constelar' y 'Participar/Representante'?",
                a: "En la modalidad 'Constelar' (60 €) planteas tu asunto o síntoma personal para que Salvadora dirija tu constelación específica durante el taller. En la modalidad 'Participar' (20 €) formas parte activa del círculo, pudiendo ser elegido/a como representante en las constelaciones de los demás. Esta segunda modalidad es enormemente rica y terapéutica, ideal para tu primera vez.",
              },
              {
                q: "¿Cómo es posible que los representantes sientan cosas de personas que no conocen?",
                a: "Es el fenómeno del 'campo del conocimiento' o campo mórfico descrito por la física y la biología contemporánea (Rupert Sheldrake) y constatado en la psicoterapia sistémica. Cuando nos colocamos al servicio del sistema de otra persona con respeto, nuestro cuerpo capta percepciones, tensiones y emociones de forma espontánea y precisa.",
              },
              {
                q: "¿Es necesario que asista algún familiar conmigo al taller?",
                a: "No, en absoluto. De hecho, suele ser preferible acudir solo/a para tener total libertad emocional y no sentirte condicionado/a. Toda la información del árbol genealógico vive ya en tu interior.",
              },
              {
                q: "¿Necesito conocer muchos datos sobre la historia de mis antepasados?",
                a: "Solo los hechos significativos y verificables si los conoces: muertes tempranas de padres o hijos, abortos, exclusiones, suicidios, ruinas económicas o migraciones forzadas. No hacen falta chismes ni conjeturas psicológicas; los hechos reales tienen su propia fuerza en el campo.",
              },
              {
                q: "¿Qué ocurre después del taller de Constelaciones?",
                a: "Se recomienda dejar reposar la experiencia sin comentarla ni analizarla durante las siguientes semanas. Las constelaciones continúan actuando en un nivel profundo del alma y a menudo desencadenan cambios espontáneos en las actitudes de familiares que ni siquiera sabían del taller.",
              },
              {
                q: "¿Cómo se reserva la plaza y cómo se realiza el pago?",
                a: "El aforo está estrictamente limitado a 25 personas para preservar un clima íntimo. Puedes solicitar tu plaza por WhatsApp o Telegram. El abono de la aportación (60 € para constelar o 20 € para participar) se realiza en el centro de forma directa el día del encuentro.",
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
                    name: "¿Qué diferencia hay entre constelar y participar como representante en Constelaciones Familiares?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Constelar (60 €) permite trabajar un asunto propio con constelación personalizada. Participar (20 €) permite formar parte del círculo y actuar como representante, viviendo una experiencia igualmente sanadora.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Dónde se realiza el Taller de Constelaciones Familiares?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "En el Centro de Yoga Salvadora Conesa en Fuenlabrada (Madrid), en un entorno seguro y con aforo limitado a 25 personas.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Quién facilita las Constelaciones Familiares en Fuenlabrada?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Salvadora Conesa, terapeuta Gestalt y facilitadora de Constelaciones Familiares con más de 26 años de experiencia en acompañamiento terapéutico y crecimiento personal.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE LAS CONSTELACIONES Y LA MIRADA SISTÉMICA
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              6. Fundamentos y Filosofía Sistémica
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Sobre las Constelaciones Familiares y los Órdenes del Amor
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Conoce los principios esenciales desarrollados por Bert Hellinger y transmitidos por Salvadora Conesa para comprender la sabiduría oculta en los vínculos familiares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {constelacionesPillars.map((p) => (
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

          {/* Cita de Bert Hellinger */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 text-center space-y-3 max-w-3xl mx-auto shadow-xs">
            <p className="font-serif text-base sm:text-lg italic text-[#12241D] leading-relaxed">
              «El amor llena lo que el orden abarca. El orden precede al amor, y el amor sólo puede desarrollarse dentro del orden.»
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] block">
              — Bert Hellinger · Creador de las Constelaciones Familiares
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-constelaciones")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-constelaciones"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Aforo Estrictamente Limitado (25 Plazas)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Vive un Encuentro de Sanación y Claridad para tu Linaje
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Taller vivencial de 4 horas conducido por Salvadora Conesa en Fuenlabrada (Madrid). Elige tu modalidad: constelar tu propio asunto o participar como representante.
            </p>

            {/* Microficha resumen con ambas aportaciones */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Modalidad Constelar:</span>
                <span className="font-bold text-emerald-300">60 € (Constelación individual en el taller)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Modalidad Participante:</span>
                <span className="font-bold text-emerald-300">20 € (Representante y observador en sala)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E5C378] font-bold">Horario y Lugar:</span>
                <span>4 Horas vivenciales · Centro de Yoga Salvadora Conesa (Fuenlabrada)</span>
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
                    inquiry: "Consulta de fechas e información para el Taller de Constelaciones Familiares",
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
              <span>Pago en el centro sin compromiso previo</span>
              <span>·</span>
              <button
                type="button"
                onClick={() =>
                  triggerCrmChat(
                    `Hola, me gustaría consultar fechas del próximo taller de Constelaciones Familiares con Salvadora Conesa.`,
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
                {activeMediaModal === "video-particular" &&
                  "Vídeo Explicativo · Constelaciones Familiares"}
                {activeMediaModal === "video-actividad" &&
                  "Vídeo Resumen · El Círculo de Constelaciones"}
                {activeMediaModal === "video-sala" &&
                  "Vídeo del Espacio y Centro de Yoga"}
                {activeMediaModal === "flyer" &&
                  "Cartel Oficial · Taller de Constelaciones Familiares"}
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
              {activeMediaModal === "video-particular" && (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    src="/videos/constelacionesparticular.mp4"
                    poster="/videos/constelacionesparticular-poster.jpg"
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
                    src="/videos/itinerario-6.mp4"
                    poster="/videos/itinerario-6-poster.jpg"
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
                    src="/flyers/constelaciones_familiares_particular.jpg"
                    alt="Cartel informativo oficial del Taller de Constelaciones Familiares con Salvadora Conesa"
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
        serviceName="Constelaciones Familiares (Constelar / Participar)"
      />
    </div>
  );
}
