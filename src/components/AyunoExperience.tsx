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
  AlertTriangle,
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

interface AyunoExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function AyunoExperience({
  activity,
  isEmbedded = false,
}: AyunoExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const ayunoService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "6bfc9e2b-bef8-42d5-9c25-bd3b7554229a" ||
        /ayuno/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[7];

  const priceFormatted = formatServicePrice(ayunoService) || "250 €";
  const nextDateText =
    ayunoService.eventDatesText ||
    ayunoService.scheduleText ||
    "Del viernes 9 al lunes 12 de octubre (4 días de inmersión)";
  const durationText = ayunoService.durationMinutes
    ? `${Math.round(ayunoService.durationMinutes / 1440)} días completos`
    : "4 días (de viernes a lunes)";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar fechas y disponibilidad de plazas para el Retiro de Ayuno Terapéutico (${nextDateText}).`
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
    "video-particular" | "video-actividad" | "flyer" | null
  >(null);

  // SEO: H1 sólo en página propia; H2 cuando está embebido en home
  const HeadingTag = isEmbedded ? "h2" : "h1";

  // Vídeo formativo de la sección "SOBRE EL AYUNO TERAPÉUTICO"
  const ayunoVideo = {
    id: "1",
    num: "I.",
    title: "El descanso que renueva tu salud",
    description:
      "Dar descanso al aparato digestivo permite que el organismo concentre toda su energía en depurar riñones, equilibrar niveles de colesterol y resetear el sistema metabólico. Cuatro días de reposo alimentario consciente con líquidos y caldos en la naturaleza suponen una auténtica renovación celular y biológica.",
    src: "/videos/ayuno/Serie_4_ayuno.mp4",
    poster: "/videos/ayuno/Serie_4_ayuno-poster.jpg",
  };

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — RETIRO DE AYUNO TERAPÉUTICO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#13231E] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/ayuno_terapeutico/301_ayuno_terapeutico_bienestar_natural_1920x1080.jpg"
            alt="Retiro de Ayuno Terapéutico en la Naturaleza con Salvadora Conesa - Depuración celular y descanso consciente"
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
              <span>DEPURACIÓN CELULAR, NATURALEZA Y VITALIDAD · SALVADORA CONESA</span>
            </div>

            {/* Título Principal */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md max-w-4xl">
              Retiro de Ayuno Terapéutico
            </HeadingTag>

            {/* Subtítulo inspirador */}
            <p className="mt-2 text-stone-200 text-sm sm:text-lg md:text-xl font-light italic max-w-2xl text-balance drop-shadow-sm font-serif">
              «Depuración celular, reposo digestivo consciente y renovación integral de tu energía vital»
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
                <Ticket className="w-3.5 h-3.5 text-[#C5A059]" />
                {priceFormatted} (Pensión completa y actividades)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                Aforo limitado (20 plazas)
              </span>
            </div>

            {/* Destacado informativo sobre la facilitación */}
            <div className="mt-4 max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/15 text-stone-200 text-xs sm:text-sm text-left">
              <p className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Dirigido por Salvadora Conesa:</strong> Más de 30 años guiando retiros de ayuno consciente, 40 años como profesora de yoga y 26 como terapeuta Gestalt. Un acompañamiento cercano, seguro y holístico en un paraje natural aislado y protegido.
                </span>
              </p>
            </div>

            {/* Botonera de acción principal y multimedia */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
              <a
                href="#reservar-ayuno"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#B38F48] hover:to-[#C5A059] text-[#12241D] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <span>Reservar Plaza en el Retiro</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-particular")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-rose-900/80 hover:bg-rose-900 text-white font-medium text-xs sm:text-sm rounded-xl border border-rose-500/40 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-rose-300" />
                <span>Ver Vídeo del Retiro</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#C5A059]" />
                <span>Ver Convivencia</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaModal("flyer")}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 bg-black/40 hover:bg-black/60 text-stone-300 hover:text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                <span>Cartel del Retiro</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SECCIÓN 1: QUÉ ES EL AYUNO TERAPÉUTICO Y CÓMO SE VIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              1. Salud, Depuración y Fisiología
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D] tracking-tight">
              Regala a tu cuerpo el descanso más profundo y reparador
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              El ayuno terapéutico no es pasar hambre ni una dieta restrictiva: es una pausa biológica consciente donde el organismo deja de destinar el 70% de su energía a la digestión para volcarse en depurar órganos, desinflamar tejidos y autorrepararse.
            </p>
          </div>

          {/* Bloque 1: Reposo digestivo y caldos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5" />
                <span>El Reposo Digestivo Asistido</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Caldos ecológicos, infusiones y agua mineralizada
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Durante los 4 días del retiro el cuerpo no ingiere sólidos, pero recibe un aporte constante de minerales, electrolitos y oligoelementos que evitan la debilidad y sostienen la vitalidad:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Caldos vegetales depurativos:</strong> Elaborados con verduras ecológicas ricas en potasio, magnesio y silicio para alcalinizar la sangre.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Infusiones hepáticas y renales:</strong> Plantas medicinales que favorecen el drenaje de toxinas (cardo mariano, diente de león, cola de caballo).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Desaparición del hambre a las 24 horas:</strong> Al entrar en cetosis suave, la sensación de apetito desaparece de forma natural y da paso a una sorprendente ligereza.</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <img
                src="/imagenes/ayuno_terapeutico/ayunos_arreglados/202_ayuno_energia_y_compania_1920x1080.jpg"
                alt="Convivencia y alegría compartida en el Retiro de Ayuno Terapéutico con Salvadora Conesa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Energía, vitalidad y apoyo grupal continuo
              </span>
            </div>
          </div>

          {/* Bloque 2: Actividades en naturaleza y relajación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm md:flex-row-reverse">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md md:order-last">
              <img
                src="/imagenes/ayuno_terapeutico/302_ayuno_terapeutico_junto_al_mar_1920x1080.jpg"
                alt="Paseos conscientes y conexión en plena naturaleza durante el retiro de ayuno"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Entorno natural paradisíaco y silencioso
              </span>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/5 text-[#800020] text-xs font-bold uppercase tracking-wider">
                <Trees className="w-3.5 h-3.5" />
                <span>Naturaleza, Yoga y Baños de Gong</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#12241D]">
                Un programa integral de actividades cada día
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                El ayuno no se hace en la cama ni con aburrimiento. Las jornadas están diseñadas para activar el cuerpo con suavidad y calmar la mente:
              </p>
              <ul className="space-y-2 text-stone-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Activación y paseo al amanecer:</strong> Respirar el rocío de la mañana, activar la circulación y recibir los primeros rayos de sol.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Yoga suave y estiramientos conscientes:</strong> Práctica diaria a mediodía para flexibilizar la columna y desbloquear articulaciones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong>Meditación al atardecer y Baño de Gong nocturno:</strong> La vibración sonora de los gongs facilita un descanso profundo y reparador cada noche.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS FISIOLÓGICOS Y VIVENCIALES (DARK GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="rounded-3xl bg-[#0F1E19] border border-[#C5A059]/40 p-6 sm:p-12 text-white shadow-xl">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
                2. Beneficios Médicos y Celulares
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Qué ocurre en tu cuerpo durante 4 días de ayuno
              </h2>
              <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
                Avalado por la investigación científica en autofagia (Premio Nobel 2016) y por tres décadas de experiencia clínica de Salvadora Conesa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Autofagia y Reciclaje Celular Profundo
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Las células eliminan proteínas defectuosas, orgánulos dañados y desechos acumulados, renovando el sistema inmune y frenando el envejecimiento prematuro.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Desinflamación y Drenaje de Órganos Vitales
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Hígado, riñones y colon se descongestionan. Se normalizan los marcadores de glucosa, triglicéridos y colesterol, aliviando dolores articulares y digestivos.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Claridad Mental y Calma Emocional
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  La producción de cuerpos cetónicos actúa como un combustible limpio para el cerebro, despejando la niebla mental y aportando serenidad y lucidez sin picos de azúcar.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#162B23] p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#C5A059]/50 transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#E5C378]">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Reinicio de la Relación con la Comida
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Rompe la dependencia emocional de azúcares, cafeína y ultraprocesados. Aprendes a distinguir entre el hambre fisiológica real y la ansiedad o el aburrimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: EL PROGRAMA DIARIO DEL RETIRO PASO A PASO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold block">
              3. Rutina de Salud Circadiana
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Un día típico en el Retiro de Ayuno
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Equilibrio entre actividad revitalizante, reposo reparador y cuidados específicos para potenciar la depuración sin agotamiento.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/50 space-y-8 sm:space-y-10 my-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                08:00 h · Saludo al Sol y Paseo Matinal al Alba
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Despertar suave con gimnasia de activación y paseo por senderos naturales. Sintonizamos con el biorritmo del amanecer y activamos el sistema linfático.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                09:30 h · Infusión Depurativa y Pautas del Día
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Reunión en círculo para tomar las infusiones medicinales y caldos calientes. Salvadora revisa cómo se siente cada participante y resuelve dudas de adaptación.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                11:30 h · Sesión de Hatha Yoga Suave y Baño de Mar / Río
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Práctica adaptada al estado de ayuno: asanas sin sobreesfuerzo, estiramientos de cadenas musculares y, si el clima lo permite, baño tonificante en aguas limpias.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                4
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                14:00 h · Reposo Hepático, Envolturas de Calor y Siesta
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Aplicación de compresas calientes sobre el hígado para aumentar el flujo sanguíneo y facilitar la desintoxicación, acompañado de silencio, descanso o lectura.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                5
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                19:30 h · Caldo de la Tarde, Meditación y Baño de Gong Nocturno
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Toma del caldo mineralizante vespertino, charla de salud y nutrición consciente, y sesión de baño de gong sinfónico para inducir un sueño profundo y reparador.
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
              4. Indicaciones y Seguridad Médica
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Para quién está indicado y contraindicaciones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Especialmente recomendado para:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Personas con digestiones pesadas, hinchazón abdominal o sensación de intoxicación alimentaria.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Cansancio crónico, falta de energía al levantarse o necesidad de tomar café continuamente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Quienes deseen iniciar un cambio profundo de alimentación y romper adicciones a azúcares o procesados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Practicantes de yoga y meditación que buscan afinar su sensibilidad y presencia interior.</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span>Contraindicaciones importantes:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>Embarazo y período de lactancia materna activa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>Trastornos graves de la conducta alimentaria (anorexia o bulimia activas).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>Insuficiencia renal grave o hepática avanzada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>Personas en tratamiento con medicación estricta incompatible (consultar previamente con Salvadora).</span>
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
              Preguntas Frecuentes sobre el Retiro de Ayuno
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Aclaramos las dudas más comunes sobre la sensación de hambre, la preparación previa y la seguridad del proceso.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Voy a pasar mucha hambre durante los 4 días de ayuno?",
                a: "Es la duda más común antes de venir. La respuesta es un rotundo no. Alrededor del segundo día, el cuerpo entra en cetosis metabólica y el apetito disminuye de forma drástica. Además, la toma periódica de caldos vegetales ecológicos calientes e infusiones sacia y reconforta el estómago de forma sorprendente.",
              },
              {
                q: "¿Qué se toma exactamente durante el retiro?",
                a: "Se ingieren caldos vegetales depurativos sin sólidos, infusiones medicinales específicas para el hígado y los riñones, agua mineralizada y, en momentos puntuales, un poco de limón o agua de mar isotónica. Este aporte mantiene los electrolitos en equilibrio y evita bajadas de tensión.",
              },
              {
                q: "¿Hay que hacer alguna preparación antes de llegar al retiro?",
                a: "Sí. Una semana antes de comenzar enviamos a todos los participantes una guía sencilla de 'descenso alimentario': ir retirando progresivamente carnes rojas, fritos, café, alcohol y azúcares para que la entrada al ayuno sea muy suave y sin dolores de cabeza por abstinencia.",
              },
              {
                q: "¿Cómo se hace la salida y la vuelta a la comida sólida?",
                a: "El último día del retiro realizamos juntos la 'ruptura del ayuno' de forma muy cuidada con manzana asada o compota suave. Te entregamos pautas detalladas para los días siguientes en casa para consolidar los beneficios y no sobrecargar el aparato digestivo.",
              },
              {
                q: "¿Dónde se realiza el retiro y qué incluye la inversión?",
                a: "Se realiza en una casa rural aislada y tranquila en plena naturaleza a hora y media de Madrid. La inversión incluye el alojamiento completo de 4 días y 3 noches, todos los caldos e infusiones ecológicas, y todas las actividades diarias (yoga, meditación, paseos y baños de gong nocturnos).",
              },
              {
                q: "¿Cuál es la política de reserva y precio anticipado?",
                a: "El aforo está estrictamente limitado a 20 plazas para asegurar una supervisión personalizada por parte de Salvadora Conesa. La inversión habitual es de 250 €, con descuento a 230 € reservando con antelación o viniendo en grupo/acompañado.",
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
                    name: "¿Se pasa hambre durante el Retiro de Ayuno Terapéutico?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No; a las 24-48 horas el cuerpo entra en cetosis y la sensación de hambre desaparece. Los caldos vegetales e infusiones calientes aportan saciedad y minerales.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué incluye el Retiro de Ayuno con Salvadora Conesa?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Incluye alojamiento completo de 4 días en naturaleza, caldos e infusiones ecológicas, sesiones diarias de yoga suave, meditación, paseos y baños de gong nocturnos.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Quién dirige el retiro de ayuno?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Salvadora Conesa, con más de 30 años de experiencia guiando grupos de ayuno consciente, 40 años como profesora de yoga y 26 como terapeuta Gestalt.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE EL AYUNO TERAPÉUTICO (VÍDEO Y EXPLICACIONES)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="sobre-el-ayuno-terapeutico"
        className="mt-16 sm:mt-24 pt-8 border-t border-[#C5A059]/20 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header de la sección */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              6. Salud, Regeneración y Descanso Celular
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              SOBRE EL AYUNO TERAPÉUTICO
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed font-sans bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/20 shadow-sm">
              <p>
                El ayuno terapéutico es una de las prácticas más ancestrales y transformadoras para restablecer el equilibrio interno. No se trata simplemente de dejar de comer, sino de regalarle al aparato digestivo el reposo necesario para que el cuerpo active de forma natural sus procesos de desintoxicación, autorreparación y ligereza.
              </p>
              <p>
                En nuestros encuentros y retiros en plena naturaleza, acompañamos este proceso con hábitos que armonizan los ritmos circadianos: ver amanecer, caminar descalzos en la tierra, yoga suave y momentos de silencio y descanso profundo. En este vídeo reflexiono sobre por qué parar y vaciar es el primer paso para llenarse de verdadera vitalidad.
              </p>
            </div>
          </div>

          {/* Vídeo Subsection */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
              Vídeo Explicativo
            </h3>

            {/* Tarjeta del Vídeo Formativo */}
            <div className="flex justify-center">
              <div className="w-full md:w-[calc(60%)] lg:w-[calc(50%)] bg-white rounded-xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">
                <div className="relative aspect-video bg-stone-900 border-b border-stone-100">
                  <video
                    src={ayunoVideo.src}
                    poster={ayunoVideo.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  >
                    Tu navegador no soporta el formato de vídeo MP4.
                  </video>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020] mb-2">
                      {ayunoVideo.num} {ayunoVideo.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                      {ayunoVideo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concluding Note */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#C5A059]/30 text-center space-y-2 mt-8">
              <p className="text-xs sm:text-sm text-[#1C1C1C]/85 font-medium leading-relaxed max-w-3xl mx-auto">
                Un par de descansos digestivos al año pueden transformar por completo cómo te sientes y prevenir múltiples dolencias. Si deseas informarte sobre nuestros próximos retiros de ayuno, consúltanos en el centro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-ayuno")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-ayuno"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Aforo Estrictamente Limitado (20 Plazas)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Vive 4 Días de Silencio, Depuración y Renovación Profunda
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Fechas: <strong>{nextDateText}</strong>. Las plazas son reducidas para garantizar que cada asistente reciba acompañamiento y supervisión individualizada de Salvadora Conesa.
            </p>

            {/* Microficha resumen */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Duración:</span>
                <span>4 Días y 3 Noches (de viernes a lunes)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Aportación:</span>
                <span className="font-bold text-emerald-300">{priceFormatted} (230 € reserva anticipada)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E5C378] font-bold">Incluye:</span>
                <span>Alojamiento, caldos ecológicos, yoga, paseos y baños de gong</span>
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
                    inquiry: "Información y fechas del Retiro de Ayuno Terapéutico",
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
              <span>Pago seguro con reserva previa</span>
              <span>·</span>
              <button
                type="button"
                onClick={() =>
                  triggerCrmChat(
                    `Hola, me gustaría consultar dudas sobre el Retiro de Ayuno Terapéutico con Salvadora Conesa.`,
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
          9. MODALES MULTIMEDIA (VÍDEO PARTICULAR / VÍDEO CONVIVENCIA / FLYER)
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
                  "Vídeo Particular · Retiro de Ayuno Terapéutico"}
                {activeMediaModal === "video-actividad" &&
                  "Vídeo de la Convivencia y Naturaleza"}
                {activeMediaModal === "flyer" &&
                  "Cartel Oficial · Retiro de Ayuno"}
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
                    src="/videos/ayunoterapeuticoparticular.mp4"
                    poster="/videos/ayunoterapeuticoparticular-poster.jpg"
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
                    src="/videos/itinerario-8.mp4"
                    poster="/videos/itinerario-8-poster.jpg"
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
                    src="/flyers/ayuno_particular.jpg"
                    alt="Cartel oficial del Retiro de Ayuno Terapéutico con Salvadora Conesa"
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
        serviceName="Retiro de Ayuno Terapéutico"
      />
    </div>
  );
}
