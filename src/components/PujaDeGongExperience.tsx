"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  Moon,
  Sun,
  Heart,
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
  Activity,
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

interface PujaDeGongExperienceProps {
  activity?: CrmService;
  isEmbedded?: boolean;
}

export default function PujaDeGongExperience({
  activity,
  isEmbedded = false,
}: PujaDeGongExperienceProps) {
  // Datos dinámicos del CRM con fallback seguro
  const pujaService =
    activity ||
    FALLBACK_CRM_SERVICES.find(
      (s) =>
        s.id === "9e51e7fa-61c0-40e1-b472-a400913f41dc" ||
        /puja/i.test(s.name)
    ) ||
    FALLBACK_CRM_SERVICES[3];

  const priceFormatted = formatServicePrice(pujaService) || "90 €";
  const nextDateText =
    pujaService.eventDatesText ||
    pujaService.scheduleText ||
    "Dos encuentros: la primera puja es próximamente y la segunda en marzo 2027";
  const durationText = pujaService.durationMinutes
    ? `${Math.round(pujaService.durationMinutes / 60)} horas`
    : "11 horas continuadas";

  // Enlaces de contacto WhatsApp y Telegram
  const { clean: cleanPhone } = getNumeroWassap();
  const wassapUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola Salvadora, me gustaría consultar disponibilidad y fechas para la Ceremonia de Puja de Gongs en Fuenlabrada (${nextDateText}).`
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

  // Vídeos formativos de la sección "SOBRE EL GONG"
  const gongVideos = [
    {
      id: "1",
      num: "I.",
      title: "El olfato que volvió",
      description:
        "Un testimonio conmovedor sobre el impacto profundo de la terapia de sonido: cómo la vibración pura del Gong desbloquea canales sutiles en el organismo, reactiva terminaciones nerviosas y puede devolver facultades que creíamos perdidas, como el sentido del olfato.",
      src: "/videos/gong/Serie_1_el_olfato_que_volvio.mp4",
      poster: "/videos/gong/Serie_1_el_olfato_que_volvio-poster.jpg",
    },
    {
      id: "2",
      num: "II.",
      title: "El Gong es un maestro",
      description:
        "El Gong nunca suena igual: vibra y responde a la atmósfera, la temperatura y la energía de las personas en la sala. Entrar en meditación con el Gong permite una armonización profunda sin esfuerzo, donde el sonido guía la relajación de todo el grupo.",
      src: "/videos/gong/Serie_3_el_gong_es_un_maestro.mp4",
      poster: "/videos/gong/Serie_3_el_gong_es_un_maestro-poster.jpg",
    },
    {
      id: "3",
      num: "III.",
      title: "Once minutos y la vibración del sonido",
      description:
        "Bastan once minutos continuados de práctica para que la mente comience a reorganizarse en calma. El Gong es un maestro vivo: su sonido muta según la energía de la sala, guiándonos hacia un estado meditativo instantáneo donde el esfuerzo desaparece.",
      src: "/videos/gong/Serie_5_once_minutos_y_gong.mp4",
      poster: "/videos/gong/Serie_5_once_minutos_y_gong-poster.jpg",
    },
  ];

  return (
    <div className="w-full text-stone-800 font-sans selection:bg-[#C5A059]/30 selection:text-[#12241D]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CINEMATOGRÁFICO — LA PUJA DE GONG (11H)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md bg-[#0D1F18] border border-[#C5A059]/30">
        <div className="relative w-full sm:aspect-[1920/780] min-h-[520px] py-8 sm:py-6 flex items-center justify-center overflow-hidden">
          {/* Fotografía protagonista */}
          <img
            src="/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg"
            alt="La Puja de Gong en Fuenlabrada - Noche sagrada de sonido y relajación profunda en el Centro de Yoga Salvadora Conesa"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-transform duration-1000 ease-out hover:scale-102"
            loading="eager"
          />

          {/* Degradados de integración cinematográfica */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1612]/95 via-[#0A1612]/45 to-[#0A1612]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A1612]/20 to-[#0A1612]/70 pointer-events-none" />

          {/* Contenido textual superpuesto */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8 flex flex-col items-center text-center justify-center min-h-[500px] sm:min-h-full">
            {/* Badge de exclusividad y ubicación */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/80 backdrop-blur-md border border-[#C5A059]/50 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Ceremonia Sagrada Nocturna (11 Horas) · Fuenlabrada (Madrid)</span>
            </div>

            {/* Título principal semántico */}
            <HeadingTag className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight break-words">
              La Puja de Gong
            </HeadingTag>

            {/* Subtítulo */}
            <p className="font-serif italic text-lg sm:text-2xl text-[#E5C378] mt-2 max-w-3xl text-shadow-sm font-light">
              «Noche sagrada de vibración ininterrumpida, silencio y regeneración celular profunda»
            </p>

            {/* Microficha de fecha, duración y plazas */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-200 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {nextDateText}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {durationText} (21:00 a 08:00 h)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-[#E5C378] font-bold">
                <Ticket className="w-3.5 h-3.5 text-[#D4AF37]" />
                {priceFormatted}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Desayuno matinal incluido
              </span>
            </div>

            {/* Información Específica del Servicio */}
            {pujaService.textoespecifico && (
              <div className="mt-4 w-full max-w-2xl mx-auto rounded-xl border border-[#C5A059]/50 bg-[#0D1F18]/90 backdrop-blur-md p-3 sm:p-4 text-left shadow-xl">
                <div className="flex items-start gap-2.5">
                  <span className="text-base sm:text-lg flex-shrink-0">📌</span>
                  <div className="space-y-1">
                    <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E5C378]">
                      Información Específica del Servicio:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line font-sans">
                      {pujaService.textoespecifico}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción rápida en Hero */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href="#reservar-puja"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38D45] hover:from-[#D4AF37] hover:to-[#C5A059] text-[#0D1F18] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-amber-900/30 hover:scale-103 active:scale-97 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Reservar mi plaza</span>
              </a>

              {/* Botón Vídeo de la Ceremonia (itinerario-4.mp4) */}
              <button
                type="button"
                onClick={() => setActiveMediaModal("video-actividad")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#800020]/90 hover:bg-[#800020] text-white border border-[#C5A059]/60 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#E5C378] fill-current" />
                <span>Ver Vídeo de la Puja</span>
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
          2. SECCIÓN 1: QUÉ ES LA PUJA DE GONG Y CÓMO SE VIVE
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-14 sm:mt-18">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              1. La Magia de la Noche Sagrada
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Qué es una Puja de Gong y cómo se vive
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              La Puja de Gong es una ceremonia milenaria de 11 horas donde los gongs suenan de manera continua y suave a lo largo de toda la noche mientras duermes y descansas en la sala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Moon className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                10 Ciclos de 45 Minutos
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Según la tradición sagrada del Kundalini Yoga, 10 ciclos de 45 minutos (7,5 horas de toque continuo) equivalen a un reseteo biológico completo. El sonido te acompaña mientras tu cuerpo descansa profundamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Users className="w-6 h-6 text-[#800020]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                Relevo de Maestros de Gong
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Varios sonoterapeutas experimentados se alternan en relevos armonizados. El volumen se modula cuidadosamente en niveles terapéuticos suaves para acunar el sueño sin sobresaltos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#C5A059]/40 flex items-center justify-center mb-4 text-[#800020]">
                <Sun className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800020] mb-2">
                Despertar del Silencio y Desayuno
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Con la luz del amanecer, el sonido cesa gradualmente dando paso a un silencio conmovedor. Tras la sintonización matinal, compartimos un desayuno reconfortante para integrar la vivencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECCIÓN 2: BENEFICIOS Y EFECTOS TERAPÉUTICOS (FONDO OSCURO)
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20 bg-gradient-to-b from-[#12241D] via-[#0E1C17] to-[#12241D] text-white rounded-3xl p-6 sm:p-12 shadow-md border border-[#C5A059]/25 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E5C378] font-bold block">
              2. Frecuencias Regenerativas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Efectos Terapéuticos y Fisiológicos de la Puja de Gong
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Dormir inmerso durante 11 horas en el campo armónico de los gongs sinfónicos reorganiza el sistema nervioso a nivel celular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">⚡</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Reseteo Celular Profundo
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Las ondas armónicas inducen estados cerebrales Delta y Theta sostenidos durante horas, facilitando la reparación celular y aliviando el estrés crónico acumulado.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🕊️</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Desbloqueo Inconsciente
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Al estar la mente analítica dormida, la vibración penetra en memorias corporales y tensiones subconscientes sin generar resistencia mental ni desgaste emocional.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">🌙</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Sueño Reparador Único
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Los asistentes describen levantarse con una sensación de ligereza y descanso equivalente a varios días de desconexión en la naturaleza más pura.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-[#C5A059]/50 transition">
              <div className="text-2xl mb-3 text-[#E5C378]">✨</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#E5C378] mb-1.5">
                Estado de Shunya
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                El silencio sagrado del ego: al cesar la actividad mental reactiva, surge una claridad intuitiva profunda, serenidad interior y una viva alegría de existir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN 3: EL DESARROLLO DE LA NOCHE PASO A PASO
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              3. Cronograma Ceremonial
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              El Desarrollo de la Noche: De 21:00 a 08:00 Horas
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Un viaje nocturno cuidadosamente orquestado para que descanses con total comodidad y tranquilidad.
            </p>
          </div>

          <div className="relative border-l-2 border-[#C5A059]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                1
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                21:00 h · Bienvenida y Acondicionamiento del Espacio
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Recepción de los participantes en el centro. Cada asistente prepara su esterilla, saco de dormir, almohada y mantas para asegurar un descanso cálido e impecable durante toda la noche.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                2
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                22:00 h · Apertura del Círculo y Sintonización Suave
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Estiramiento consciente y respiraciones guiadas por Salvadora Conesa para soltar el estrés del día y fijar la intención personal de sanación y descanso antes de acostarse.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                3
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                22:30 a 06:30 h · La Noche de los Gongs Ininterrumpida
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Los sonoterapeutas tocan en turnos continuados. Las ondas de sonido llenan la sala suavemente como un océano de paz mientras los participantes duermen, descansan o meditan.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#12241D] text-[#E5C378] flex items-center justify-center text-xs font-bold border-2 border-[#C5A059]">
                4
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                07:00 a 08:30 h · El Silencio del Alba y Desayuno Sagrado
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                El sonido se apaga suavemente y deja paso al Gran Silencio matinal. Despertar suave, cánticos armónicos de cierre y desayuno completo compartido en el centro antes de la despedida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN 4: PARA QUIÉN ES IDEAL Y QUÉ TRAER
      ───────────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              4. Indicaciones y Recomendaciones
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#12241D]">
              Para quién es ideal la Puja de Gong
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Indicada especialmente para:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Personas que buscan un reseteo profundo de cuerpo y mente en una sola noche.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Amantes de la sonoterapia y del poder de los gongs que desean ir más allá de una sesión de 2 horas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Practicantes de yoga y meditación que quieran experimentar el estado de vacío mental (*Shunya*).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Cualquier persona que necesite descansar profundamente y recuperar energía vital.</span>
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
                  <span><strong>Esterilla o colchoneta:</strong> Para colocar en el suelo y asegurar un buen aislamiento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Saco de dormir o edredón + manta:</strong> El cuerpo se enfría de noche al descender la frecuencia cardíaca.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Almohada cómoda y ropa holgada:</strong> Preferiblemente de algodón y colores claros o blancos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">✓</span>
                  <span><strong>Botella de agua y antifaz:</strong> Si eres sensible a la penumbra o luces suaves de las velas.</span>
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
              Preguntas Frecuentes sobre la Puja de Gong
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Resolvemos todas las cuestiones prácticas sobre la ceremonia nocturna de 11 horas.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Se puede dormir durante la Puja de Gong?",
                a: "Sí, ese es precisamente el propósito central. El gong se toca a un volumen terapéutico suave y continuo para inducir ondas cerebrales Delta y Theta. Dormir bajo este campo armónico produce un descanso y una reparación celular incomparables.",
              },
              {
                q: "¿El sonido no es demasiado fuerte o estruendoso para dormir?",
                a: "No. A diferencia de momentos climáticos de un baño de gong diurno, en la Puja nocturna los maestros modulan el volumen para mantener una caricia sonora homogénea y acogedora que sostiene el sueño sin sobresaltos.",
              },
              {
                q: "¿Qué ocurre si necesito levantarme al baño durante la noche?",
                a: "Puedes levantarte con total naturalidad y en silencio en cualquier momento. La sala está acondicionada con iluminación muy tenue para que te desplaces sin perturbar el descanso del grupo.",
              },
              {
                q: "¿Qué incluye la aportación de la Puja de Gong?",
                a: "Incluye la participación completa en la ceremonia de 11 horas (de 21:00 a 08:00 h), el espacio reservado en sala para tu esterilla y descanso, el acompañamiento de sonoterapeutas durante toda la noche y el desayuno completo ceremonial de la mañana.",
              },
              {
                q: "¿Se necesita experiencia previa en meditación o yoga?",
                a: "Ninguna. No hay que hacer ningún esfuerzo físico ni mental: solo venir con ropa cómoda, tumbarse, abrigarse y dejarse mecer por la vibración del sonido.",
              },
              {
                q: "¿Cómo se confirma la reserva de plaza?",
                a: "Las plazas son muy limitadas por acústica y para garantizar que cada asistente duerma con holgura. Puedes solicitar tu plaza por WhatsApp o Telegram a través de esta página; el pago se formaliza en el centro.",
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

          {/* JSON-LD Schema FAQPage */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿Se puede dormir durante la Puja de Gong?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sí, es el propósito central. El gong se toca a volumen terapéutico suave para inducir ondas Delta y Theta, permitiendo un descanso reparador profundo.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué incluye la aportación de la Puja de Gong?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Incluye la ceremonia nocturna de 11 horas, espacio acondicionado en sala y desayuno completo matinal.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Se necesita experiencia previa?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No se requiere ninguna experiencia previa; solo tumbarse, descansar y dejarse envolver por el sonido.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECCIÓN 6: SOBRE EL GONG (VÍDEOS Y EXPLICACIONES)
      ───────────────────────────────────────────────────────────── */}
      <section id="sobre-el-gong" className="mt-16 sm:mt-24 pt-8 border-t border-[#C5A059]/20 scroll-mt-24">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header de la sección */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              6. Vibración, Sonido y Armonización
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              SOBRE EL GONG
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed font-sans bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/20 shadow-sm">
              <p>
                El Gong no es un instrumento musical al uso, sino una herramienta terapéutica ancestral que trabaja a través de la vibración del sonido. Cada vez que lo toco, el Gong suena y vibra de forma única: responde a la temperatura, a la atmósfera y, sobre todo, a la energía y relajación de las personas presentes en la sala. Por eso decimos que el Gong es, ante todo, un maestro.
              </p>
              <p>
                A través de sus frecuencias armónicas, el sonido penetra en cada célula, aflojando tensiones físicas arraigadas y silenciando el diálogo mental sin necesidad de forzar la concentración. En estos vídeos reflexiono sobre su capacidad sanadora y cómo nos ayuda a profundizar en la práctica interior.
              </p>
            </div>
          </div>

          {/* Grid de Vídeos Formativos */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
              Vídeos Explicativos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gongVideos.map((vid) => (
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
                El Gong se experimenta con todo el cuerpo. Si sientes la llamada de sumergirte en sus baños de sonido o en las Pujas de Gong nocturnas, te esperamos en nuestras sesiones especiales en el Centro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECCIÓN 7: CTA FINAL DE RESERVA (ID="reservar-puja")
      ───────────────────────────────────────────────────────────── */}
      <section
        id="reservar-puja"
        className="mt-16 sm:mt-24 scroll-mt-24"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1F18] via-[#0A1612] to-[#142920] border border-[#C5A059]/40 p-6 sm:p-12 shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241D]/90 border border-[#C5A059]/40 text-[#E5C378] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Plazas Reducidas por Descanso en Sala</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Vive la Noche Sagrada de Sonido y Regeneración Integral
            </h2>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Convocatorias: <strong>{nextDateText}</strong>. Las plazas son estrictamente limitadas para asegurar que cada asistente duerma con máximo espacio y confort acústico.
            </p>

            {/* Microficha resumen */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xl mx-auto text-left text-xs text-stone-200 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Horario de la Noche:</span>
                <span>21:00 a 08:00 h (11 Horas Continuadas)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#E5C378] font-bold">Aportación:</span>
                <span className="font-bold text-emerald-300">{priceFormatted} (Desayuno ceremonial incluido)</span>
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
                    inquiry: "Información y fechas de la Ceremonia de Puja de Gongs",
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
                    `Hola, me gustaría consultar dudas sobre la Puja de Gongs en Fuenlabrada (${nextDateText}).`,
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
                  <span>Vídeo Ceremonia</span>
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
                  src="/videos/itinerario-4.mp4"
                  poster="/videos/itinerario-4-poster.jpg"
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
                  src="/videos/Bano-de-Gong_particular.mp4"
                  poster="/videos/Bano-de-Gong_particular-poster.jpg"
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
                  src="/flyers/banogong.jpeg"
                  alt="Cartel oficial de la Puja de Gong en el Centro de Yoga Salvadora Conesa"
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="pt-3 text-center">
              <span className="text-xs text-stone-400">
                {activeMediaModal === "video-actividad"
                  ? "Vídeo Ceremonia Puja de Gong (itinerario-4.mp4)"
                  : activeMediaModal === "video-sala"
                  ? "Vídeo de Sala del Centro de Yoga Salvadora Conesa (Bano-de-Gong_particular.mp4)"
                  : "Cartel Oficial de la Convocatoria"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Telegram Handoff */}
      <TelegramBookingModal
        isOpen={tgModalOpen}
        onClose={() => setTgModalOpen(false)}
        serviceName="Puja de Gongs (Noche Sagrada de Sonido - 11h)"
        note="Reserva de Puja de Gong desde la landing web (#dia-4)."
        prefillMessage={`Hola Salvadora, me gustaría consultar disponibilidad y fechas para la Ceremonia de Puja de Gongs en Fuenlabrada (${nextDateText}).`}
      />
    </div>
  );
}
