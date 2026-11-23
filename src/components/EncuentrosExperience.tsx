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
  Flame,
  Trees,
  Sun,
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

interface EncuentrosExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function EncuentrosExperience({
  activity,
  isEmbedded = false,
}: EncuentrosExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const encuentrosService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "5f0693fa-adf1-4e65-a8ea-e4eda92ff942" ||
        /mujeres|encuentro/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[6];

  const nextDateText =
    encuentrosService.eventDatesText ||
    encuentrosService.scheduleText ||
    "Convocatoria de Primavera / Próxima fecha por confirmar";
  const durationText = encuentrosService.durationMinutes
    ? `${Math.round(encuentrosService.durationMinutes / 60)} horas`
    : "Jornada vivencial";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar fechas y disponibilidad para el próximo Encuentro de Mujeres.`
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

  // Pilares vivenciales de la sección "SOBRE LOS ENCUENTROS DE MUJERES"
  const encuentrosPillars = [
    {
      id: "1",
      num: "I.",
      title: "El Círculo Sagrado y la Sororidad Genuina",
      description:
        "Sentarse en círculo iguala a todas las miradas. No hay jerarquías ni expertas: hay mujeres que se escuchan con empatía profunda, rompiendo el aislamiento y sanando la herida histórica de rivalidad para dar paso a la complicidad y el amor fraterno.",
      image: "/imagenes/encuentro_mujeres/02_encuentro_mujeres_grupo.jpeg",
      tag: "Círculo y Escucha",
    },
    {
      id: "2",
      num: "II.",
      title: "La Naturaleza, el Fuego y el Movimiento",
      description:
        "El contacto con la tierra, los árboles y la hoguera nocturna despierta el arraigo corporal y la intuición instintiva. A través de paseos conscientes y dinámicas bioenergéticas, dejamos caer el cansancio mental y reconectamos con nuestra fuerza creadora.",
      image: "/imagenes/encuentro_mujeres/04_encuentro_mujeres_hoguera.jpeg",
      tag: "Fuego y Raíces",
    },
    {
      id: "3",
      num: "III.",
      title: "Sanación del Linaje Femenino y Autoestima",
      description:
        "Mirar con ternura y dignidad la historia de nuestras madres, abuelas y antepasadas nos permite desprendernos de mandatos de sufrimiento, culpa o complacencia, abrazando la soberanía personal y el merecimiento pleno de nuestra alegría de vivir.",
      image: "/imagenes/encuentro_mujeres/01_encuentro_mujeres_movimiento_naturaleza.jpeg",
      tag: "Linaje y Dignidad",
    },
  ];

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — ENCUENTRO DE MUJERES
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#13231E] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/encuentro_mujeres/06_encuentro_mujeres_circulo_bosque.jpeg"
            alt="Encuentro de Mujeres en la Naturaleza con Salvadora Conesa - Círculo de sororidad y crecimiento personal"
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
              <span>CÍRCULOS DE SORORIDAD Y NATURALEZA · FUENLABRADA Y ENTORNO NATURAL</span>
            </div>

            {/* Título Principal */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md max-w-4xl">
              Encuentros de Mujeres
            </HeadingTag>

            {/* Subtítulo inspirador */}
            <p className="mt-2 text-stone-200 text-sm sm:text-lg md:text-xl font-light italic max-w-2xl text-balance drop-shadow-sm font-serif">
              «Espacios de sororidad, cuidado compartido y reconexión profunda con tu sabiduría femenina»
            </p>

            {/* Ficha técnica compacta */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-stone-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                {nextDateText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {durationText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Trees className="w-3.5 h-3.5 text-[#C5A059]" />
                Naturaleza y Sala
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                Grupo Íntimo (25 plazas)
              </span>
            </div>

            {/* Destacado informativo sobre la facilitación */}
            <div className="mt-4 max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/15 text-stone-200 text-xs sm:text-sm text-left">
              <p className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Acompañado por Salvadora Conesa:</strong> Más de 26 años de experiencia como terapeuta Gestalt y facilitadora de grupos. Espacios amorosos, seguros y confidenciales diseñados para descansar de la autoexigencia y celebrar la vida.
                </span>
              </p>
            </div>

            {/* Botonera de acción principal y multimedia */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <a
                href="#reservar-encuentros"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38F48] hover:to-[#C5A059] text-[#12241D] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <span>Consultar o Reservar Plaza</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-rose-900/80 hover:bg-rose-900 text-white font-medium text-xs sm:text-sm rounded-xl border border-rose-500/40 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-rose-300" />
                <span>Ver Vídeo del Encuentro</span>
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
          2. SECCIÓN 1: QUÉ ES EL ENCUENTRO Y CÓMO SE VIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              1. Propósito y Convivencia
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Un refugio donde soltar roles, exigencias y encontrarte contigo misma
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              En la rutina diaria muchas mujeres cargan con el peso invisible del cuidado ajeno, el perfeccionismo y las expectativas sociales. Los Encuentros de Mujeres son un paréntesis sagrado donde volver al cuerpo, nutrirte de afecto genuino y reconectar con tu esencia.
            </p>
          </div>

          {/* Bloque 1: Círculo y sororidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>El Poder del Círculo de Mujeres</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                La medicina de la escucha y la palabra compartida
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Cuando las mujeres se reúnen en un espacio cuidado y sin máscaras, sucede algo transformador. Descubres que tus miedos, anhelos y cansancios son compartidos por las demás:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Desactivar la exigencia de ser «perfecta»:</strong> Darse permiso para mostrar la vulnerabilidad, la duda, la rabia o la fatiga sin temor al juicio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Sororidad en lugar de rivalidad:</strong> Experimentar la calidez del abrazo y el sostén de otras mujeres que se alegran sinceramente de tus logros.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Confidencialidad rigurosa:</strong> Todo lo que se expresa en el círculo se guarda como un tesoro compartido de confianza mutua.</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <img
                src="/imagenes/encuentro_mujeres/02_encuentro_mujeres_grupo.jpeg"
                alt="Grupo de mujeres compartiendo en círculo en el Encuentro de Mujeres con Salvadora Conesa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Cuidado compartido y sororidad genuina
              </span>
            </div>
          </div>

          {/* Bloque 2: Naturaleza y fuego */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm md:flex-row-reverse">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md md:order-last">
              <img
                src="/imagenes/encuentro_mujeres/04_encuentro_mujeres_hoguera.jpeg"
                alt="Hoguera y dinámicas nocturnas al aire libre en el Encuentro de Mujeres"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Rituales al fuego y conexión con los elementos
              </span>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Naturaleza Viva y Diálogos al Fuego</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Enraizamiento corporal y rituales de transformación
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                El entorno natural actúa como un catalizador de sanación. Lejos del ruido y del asfalto, respiramos aire limpio y dejamos que la naturaleza haga su labor restauradora:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Senderismo y respiración consciente:</strong> Caminar en silencio entre árboles, sintiendo el contacto de los pies con la tierra fértil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>La hoguera como símbolo de purificación:</strong> Entregar al fuego aquello que ya no deseas cargar (antiguas culpas, miedos o rencores).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Movimiento y danza libre:</strong> Expresar la emoción a través del movimiento espontáneo sin pautas rígidas ni coreografías.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS EMOCIONALES Y VIVENCIALES (DARK GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="rounded-3xl bg-[#0F1E19] border border-[#C5A059]/40 p-6 sm:p-12 text-white shadow-xl">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
                2. Beneficios para tu Bienestar Integral
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Qué te llevas de este encuentro de reconexión
              </h2>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
                Un impacto que va mucho más allá del taller y se nota en cómo te tratas a ti misma y cómo vives tus relaciones al volver a casa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Reconciliación con el Linaje Femenino
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Honrar las raíces maternas y ancestrales, sanar memorias dolorosas y tomar la fuerza nutricia de las mujeres que vinieron antes que tú.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Desconexión del Estrés y Escucha del Cuerpo
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Bajar el volumen de los pensamientos obsesivos, calmar el sistema nervioso y reconectar con la respiración diafragmática y la pelvis.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Límites Saludables y Autoestima Femenina
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Aprender a priorizar tu energía, dejar de postergarte por los demás y cultivar una relación amorosa y compasiva con tu propia vida.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Alegría, Creatividad y Vitalidad Compartida
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Recuperar la risa espontánea, la complicidad luminosa, el juego y la sensación reconfortante de no estar sola en tu camino.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: CÓMO SE DESARROLLA EL ENCUENTRO PASO A PASO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              3. Estructura de la Jornada
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              El recorrido vivencial paso a paso
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Un flujo orgánico y respetuoso diseñado para transitar de la agitación cotidiana a la quietud y la celebración compartida.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/50 space-y-8 sm:space-y-10 my-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Apertura del Círculo y Creación del Espacio Seguro
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Llegada, toma de contacto, acomodación en círculo y encuadre de confidencialidad. Dinámica inicial de respiración y centramiento para sintonizar con la energía grupal.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Movimiento Consciente, Paseo y Conexión en Naturaleza
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Contacto con la tierra, senderismo consciente y ejercicios de expresión corporal para desbloquear tensiones acumuladas en la pelvis, el pecho y la espalda.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Dinámicas Gestálticas y Diálogos al Fuego
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Reunión ante la lumbre para compartir vivencias profundas, nombrar asuntos inconclusos y realizar rituales simbólicos de liberación de mandatos y cargas del pasado.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                4
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                Integración, Canto Armónico y Cierre Ceremonial
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Asimilación en calma de todo lo movilizado, celebración de los lazos tejidos, agradecimiento al clan de mujeres y regreso al día a día con el corazón en paz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN 4: PARA QUIÉN ES IDEAL Y RECOMENDACIONES
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              4. Indicaciones y Qué Traer
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Para quién es este encuentro y recomendaciones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Especialmente recomendado para ti si:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Sientes agotamiento físico o emocional por el ritmo diario y necesitas un espacio exclusivo de cuidado para ti.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Deseas experimentar la sororidad real y compartir con otras mujeres en un clima de confianza y respeto mutuo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Estás atravesando un cambio vital importante (maternidad, separación, duelo, menopausia o reinvención personal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Buscas reconectar con la naturaleza, la intuición y el disfrute del propio cuerpo en plenitud.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
                <Compass className="w-5 h-5 text-amber-700" />
                <span>Qué traer para tu máxima comodidad:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Ropa cómoda y por capas:</strong> Prendas holgadas para moverte y una chaqueta o chal para la tarde y el aire libre.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Calzado adecuado para naturaleza:</strong> Zapatillas o botas cómodas para caminar por senderos naturales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Cuaderno de notas personal:</strong> Para plasmar reflexiones, tomas de conciencia o palabras que surjan en el círculo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Disposición a recibir y descansar:</strong> Dejar fuera las responsabilidades y regalarte un día entero solo para ti.</span>
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
              Preguntas Frecuentes sobre los Encuentros de Mujeres
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Respondemos a las inquietudes más comunes sobre la dinámica del grupo, la edad de participación y cómo inscribirte.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Qué es exactamente un Encuentro o Círculo de Mujeres?",
                a: "Es un espacio vivencial y terapéutico no mixto donde mujeres de distintas edades y caminos de vida nos reunimos para conversar con el corazón abierto, compartir reflexiones, realizar ejercicios de crecimiento personal, meditar y reconectar con la naturaleza. No es una charla teórica, sino una vivencia sentida y transformadora.",
              },
              {
                q: "¿Es necesario tener experiencia previa en yoga, meditación o terapia?",
                a: "No, en absoluto. Las dinámicas están diseñadas para que cualquier mujer, independientemente de su edad o condición física, pueda sentirse acogida y respetada desde el primer minuto. Lo único necesario es tu deseo de parar y compartir desde la autenticidad.",
              },
              {
                q: "¿Hay límite de edad para participar en los encuentros?",
                a: "No. Precisamente una de las mayores riquezas del círculo es el encuentro intergeneracional: mujeres jóvenes, madres, mujeres maduras y ancianas compartiendo su sabiduría de vida. Esa diversidad enriquece profundamente el aprendizaje mutuo.",
              },
              {
                q: "¿Dónde se celebran los encuentros y cuál es la duración?",
                a: "Los encuentros se celebran en entornos naturales especialmente seleccionados cerca de Madrid y en las instalaciones acogedoras del Centro de Yoga Salvadora Conesa en Fuenlabrada. Suelen tener formato de jornada intensiva de mañana y tarde o fin de semana.",
              },
              {
                q: "¿Cómo se confirma la plaza y cuándo se realiza el pago?",
                a: "Las plazas son limitadas (máximo 25 personas) para asegurar la intimidad y la atención personalizada de Salvadora. La reserva se solicita fácilmente por WhatsApp o Telegram, y el abono se formaliza directamente en el centro el día del encuentro.",
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
                    name: "¿Qué es el Encuentro de Mujeres de Salvadora Conesa?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Es un retiro y círculo vivencial de sororidad, dinámicas de crecimiento personal, meditación y conexión en naturaleza para mujeres en Fuenlabrada y la Sierra de Madrid.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Quién facilita los Encuentros de Mujeres?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Salvadora Conesa, terapeuta Gestalt con más de 26 años de experiencia y formadora de yoga con más de cuatro décadas de trayectoria en acompañamiento de grupos femeninos.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Se requiere experiencia previa para asistir?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No se requiere experiencia previa; el encuentro está abierto a mujeres de todas las edades que deseen un espacio seguro de escucha, descanso y autodescubrimiento.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE LOS ENCUENTROS Y LA SABIDURÍA FEMENINA
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              6. Pilares y Filosofía del Encuentro
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Sobre los Encuentros de Mujeres y la Sabiduría del Alma
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Descubre las tres dimensiones que tejen este espacio de transformación profunda y nutrición emocional guiado por Salvadora Conesa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {encuentrosPillars.map((p) => (
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

          {/* Cita de Clarissa Pinkola Estés */}
          <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 text-center space-y-3 max-w-3xl mx-auto shadow-xs">
            <p className="font-serif text-base sm:text-lg italic text-[#12241D] leading-relaxed">
              «Los círculos de mujeres son un espacio donde se recupera el hilo conductor del instinto, la intuición y la creatividad salvaje que nunca muere en nosotras.»
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] block">
              — Clarissa Pinkola Estés · Autora de Mujeres que corren con los lobos
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-encuentros")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-encuentros"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Plazas Limitadas por Aforo de Convivencia</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Regálate un Tiempo para Ti en Hermandad y Plena Naturaleza
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Convocatorias: <strong>{nextDateText}</strong>. Las plazas son reducidas para garantizar que cada participante reciba atención, espacio y cuidado individual.
            </p>

            {/* Microficha resumen */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Experiencia:</span>
                <span>Encuentro de Mujeres · Círculos de Sororidad y Fuego</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Acompañamiento:</span>
                <span>Salvadora Conesa (+26 años de experiencia terapéutica)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E5C378] font-bold">Ubicación:</span>
                <span>Centro de Yoga Salvadora Conesa y Entorno Natural</span>
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
                    inquiry: "Información y fechas del Encuentro de Mujeres",
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
                    `Hola, me gustaría consultar detalles del próximo Encuentro de Mujeres con Salvadora Conesa.`,
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
                  "Vídeo Resumen · Encuentros de Mujeres"}
                {activeMediaModal === "video-sala" &&
                  "Vídeo del Espacio y Centro de Yoga"}
                {activeMediaModal === "flyer" &&
                  "Cartel Informativo · Encuentro de Mujeres"}
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
                    src="/videos/itinerario-7.mp4"
                    poster="/videos/itinerario-7-poster.jpg"
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
                    src="/flyers/encuentros_mujeres.jpeg"
                    alt="Cartel oficial del Encuentro de Mujeres con Salvadora Conesa"
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
        serviceName="Encuentro de Mujeres"
      />
    </div>
  );
}
