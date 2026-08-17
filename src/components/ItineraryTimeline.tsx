"use client";

import { useState, useEffect } from "react";
import { Music, MapPin, Calendar, Clock, Utensils, CheckCircle } from "lucide-react";

interface TimelineDay {
    id: number;
    date: string;
    dayName: string;
    title: string;
    desc: string;
    events: {
        time?: string;
        title: string;
        description: string;
        type: "visit" | "concert" | "meal" | "transport";
        venue?: string;
    }[];
}

const ITIN_DATA: TimelineDay[] = [
    {
        id: 1,
        date: "Yoga",
        dayName: "Hatha Yoga & Yoga Nidra",
        title: "Prácticas de Alineación Física, Respiración y Relajación Mental Consciente",
        desc: "",
        events: [
            {
                time: "Semanal",
                title: "Hatha Yoga Regular",
                description: "Práctica física centrada en el asana, pranayama (control del aire) y alineación corporal, apta para todos los niveles y edades.",
                type: "visit",
                venue: "Sala Principal",
            },
            {
                time: "Sesiones",
                title: "Yoga Nidra",
                description: "El yoga del sueño psíquico. Una técnica de meditación y relajación profunda que equivale a varias horas de sueño para regenerar el sistema nervioso.",
                type: "visit",
                venue: "Sala Principal",
            },
        ],
    },
    {
        id: 2,
        date: "Meditación",
        dayName: "Kundalini Yoga & Meditación",
        title: "Tecnología de la Consciencia para la Energía Vital y el Silencio",
        desc: "",
        events: [
            {
                time: "Semanal",
                title: "Kriyas y Mantras",
                description: "Sesiones de yoga energético que combinan asanas dinámicas, pranayamas potentes, mudras y cantos de mantras sagrados.",
                type: "visit",
                venue: "Sala Principal",
            },
            {
                time: "Meditación",
                title: "Práctica de Silencio y Presencia",
                description: "Técnicas de observación y concentración mental orientadas al autoconocimiento, la atención plena y la reducción del estrés diario.",
                type: "visit",
                venue: "Sala de Silencio",
            },
        ],
    },
    {
        id: 3,
        date: "Baños de Gong",
        dayName: "Baños de Gong",
        title: "Terapia Vibracional con Gong y Cuencos Celestiales",
        desc: "",
        events: [
            {
                time: "Taller mensual",
                title: "Bañarse en Sonido",
                description: "Inmersión en ondas sonoras de frecuencias sanadoras producidas por gongs y cuencos tibetanos de cuarzo.",
                type: "concert",
                venue: "Sala Principal",
            },
            {
                time: "Efectos",
                title: "Armonización Integral",
                description: "Disolución de bloqueos físicos e inestabilidad emocional induciendo estados alfa y theta cerebrales.",
                type: "concert",
            },
        ],
    },
    {
        id: 4,
        date: "Puja de Gong",
        dayName: "La Puja de Gong",
        title: "Celebración Sagrada del Sonido Eterno y Transformación Espiritual",
        desc: "",
        events: [
            {
                time: "22:00 h",
                title: "Preparación y Bienvenida",
                description: "Recepción de los participantes, preparación de los espacios de descanso y meditación preliminar grupal.",
                type: "visit",
                venue: "Sala Principal",
            },
            {
                time: "23:00 h",
                title: "Comienzo de la Puja",
                description: "Inicio del toque ininterrumpido de múltiples gongs por relevos a lo largo de toda la noche (8 horas).",
                type: "concert",
                venue: "Sala Principal",
            },
            {
                time: "07:00 h",
                title: "Despertar y Compartir",
                description: "Finalización de la vibración del gong, retorno suave a la consciencia y desayuno compartido de integración.",
                type: "meal",
                venue: "Patio Interior",
            },
        ],
    },
    {
        id: 5,
        date: "Retiro Ayuno Terapéutico",
        dayName: "Ayuno Terapéutico y Retiros",
        title: "Procesos de Depuración Orgánica, Desintoxicación y Meditación en la Naturaleza",
        desc: "",
        events: [
            {
                time: "Retiros",
                title: "Fin de Semana Consciente",
                description: "Encuentros residenciales en plena naturaleza dedicados a la sanación, el ayuno, el yoga y la introspección guiada.",
                type: "visit",
                venue: "Hospedería del Retiro",
            },
            {
                time: "Limpieza",
                title: "Nutrición Celular y Caldos",
                description: "Acompañamiento integrativo con caldos depurativos ecológicos, zumos verdes de temporada e infusiones de hierbas orgánicas.",
                type: "meal",
            },
        ],
    },
    {
        id: 6,
        date: "Nuestros Colaboradores y Centro",
        dayName: "Colaboradores y Otras Disciplinas",
        title: "Formaciones Complementarias y Salud con Diversos Especialistas",
        desc: "",
        events: [
            {
                time: "Salud",
                title: "Entrenamiento Funcional, Ninjutsú y Taichí",
                description: "Sesiones especiales impartidas por distinguidos colaboradores para cultivar fuerza, autodefensa consciente, flexibilidad y equilibrio dinámico.",
                type: "visit",
                venue: "Zonas específicas",
            },
            {
                time: "Formación",
                title: "Talleres Temáticos Especiales",
                description: "Seminarios mensuales sobre salud integral, terapias alternativas, Kai sai Budo y técnicas avanzadas de meditación y consciencia.",
                type: "visit",
                venue: "Sala Multiusos",
            },
        ],
    },
];

interface ItineraryTimelineProps {
    videosExist: {
        "itinerario-1": boolean;
        "itinerario-2": boolean;
        "itinerario-3": boolean;
        "itinerario-4": boolean;
        "itinerario-5": boolean;
        "itinerario-6": boolean;
        resumen: boolean;
    };
}

const DAY_THUMBNAILS: { [key: number]: { src: string; caption: string } } = {
    1: {
        src: "/imagenes/yoga/01_05_yoga_sala_centro_1920x1080.jpg",
        caption: "Hatha Yoga & Yoga Nidra"
    },
    2: {
        src: "/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg",
        caption: "Kundalini & Meditación diaria"
    },
    3: {
        src: "/imagenes/gong/04_maria_con_cuenco_y_gong_1920x1080.jpg",
        caption: "Sesiones y Baños de Gong"
    },
    4: {
        src: "/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg",
        caption: "La Ceremonia de la Puja de Gong"
    },
    5: {
        src: "/imagenes/ayuno_terapeutico/ayunos_arreglados/201_ayuno_bienvenida_y_colores_1920x1080.jpg",
        caption: "Retiros de Ayuno Terapéutico"
    },
    6: {
        src: "/imagenes/centro/401_interior_centro_yoga_1920x1080.jpg",
        caption: "Nuestros Colaboradores y Centro"
    }
};

const DAY_OVERLAY_DETAILS: { [key: number]: { title: string; category: string; description: string; date: string } } = {
    1: {
        title: "Hatha Yoga & Nidra",
        category: "ALINEACIÓN Y SUEÑO CONSCIENTE",
        description: "Clases semanales para calmar la mente y reequilibrar el sistema muscular",
        date: "Clases Semanales"
    },
    2: {
        title: "Kundalini & Meditaciones",
        category: "TECNOLOGÍA DE LA CONSCIENCIA",
        description: "Sesiones de pranayama, kriyas y cantos de mantras",
        date: "Clases Semanales"
    },
    3: {
        title: "Baños de Gong",
        category: "TERAPIA VIBRACIONAL DE SONIDO",
        description: "Sumérgete en frecuencias sonoras de sanación y restauración",
        date: "Talleres Mensuales"
    },
    4: {
        title: "La Gran Puja de Gong",
        category: "CEREMONIA NOCTURNA DE 8 HORAS",
        description: "Toque ininterrumpido de gongs por relevos durante la noche",
        date: "Eventos Especiales"
    },
    5: {
        title: "Ayuno Terapéutico",
        category: "RETIROS EN LA NATURALEZA",
        description: "Limpieza orgánica, senderismo consciente y descanso integral",
        date: "Retiros Anuales"
    },
    6: {
        title: "Otras Disciplinas y Más",
        category: "COLABORADORES Y FORMACIONES",
        description: "Taichí, Ninjutsú, Defensa personal y talleres de salud",
        date: "Programación Abierta"
    }
};

const ITINERARY_VIDEOS: { [key: number]: { title: string; filePath: string; youtubeUrl?: string }[] } = {
    1: [
        { title: "Vídeo Hatha Yoga", filePath: "/videos/itinerario-1.mp4" }
    ],
    2: [
        { title: "Vídeo Kundalini", filePath: "/videos/itinerario-2.mp4" }
    ],
    3: [
        { title: "Vídeo Baño Gong", filePath: "/videos/itinerario-3.mp4" }
    ],
    4: [
        { title: "Vídeo Puja Gong", filePath: "/videos/itinerario-4.mp4" }
    ],
    5: [
        { title: "Vídeo Ayuno", filePath: "/videos/itinerario-5.mp4" }
    ],
    6: [
        { title: "Vídeo Centro", filePath: "/videos/itinerario-6.mp4" }
    ]
};


export default function ItineraryTimeline({ videosExist }: ItineraryTimelineProps) {
    const [activeVideoIndexes, setActiveVideoIndexes] = useState<{ [key: number]: number }>({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
    });
    const [timelineMediaTypes, setTimelineMediaTypes] = useState<{ [key: number]: "completo" | "resumen" }>({
        1: "completo", 2: "completo", 3: "completo", 4: "completo", 5: "completo", 6: "completo"
    });

    const [activeDay, setActiveDay] = useState(1);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith("#dia-")) {
                const dayNum = parseInt(hash.replace("#dia-", ""), 10);
                if (dayNum >= 1 && dayNum <= 6) {
                    setActiveDay(dayNum);
                    setTimeout(() => {
                        const el = document.getElementById("itinerario");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }, 80);
                }
            }
        };

        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);
    const [selectedModes, setSelectedModes] = useState<{ [key: number]: "summary" | "video" }>({
        1: "summary",
        2: "summary",
        3: "summary",
        4: "summary",
        5: "summary",
        6: "summary"
    });

    const currentMode = selectedModes[activeDay] || "summary";

    const setMode = (dayId: number, mode: "summary" | "video") => {
        setSelectedModes(prev => ({ ...prev, [dayId]: mode }));
    };

    const getVideoKey = (dayId: number): keyof ItineraryTimelineProps["videosExist"] => {
        return `itinerario-${dayId}` as any;
    };

    const getVideoPath = (dayId: number): string => {
        return `/videos/itinerario-${dayId}.mp4`;
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Mobile Day Selector (Horizontal Scroll) */}
            <div className="flex sm:hidden overflow-x-auto pb-4 gap-2 scrollbar-none px-4 mb-4">
                {ITIN_DATA.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => {
                            setActiveDay(day.id);
                        }}
                        className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-full border transition-all ${activeDay === day.id
                            ? "bg-[#800020] text-white border-[#800020]"
                            : "bg-white text-[#1C1C1C]/75 border-stone-200"
                            }`}
                    >
                        Día {day.id} ({day.date})
                    </button>
                ))}
            </div>

            {/* Desktop Day Selector (Tabs) */}
            <div className="hidden sm:flex justify-between border-b border-[#C5A059]/30 mb-8 px-4 sm:px-0">
                {ITIN_DATA.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => {
                            setActiveDay(day.id);
                        }}
                        className={`pb-4 px-2 text-center border-b-2 text-sm transition-all focus:outline-none ${activeDay === day.id
                            ? "border-[#800020] text-[#800020] font-bold"
                            : "border-transparent text-[#1C1C1C]/60 hover:text-[#800020]"
                            }`}
                    >
                        <span className="block font-serif text-lg">Día {day.id}</span>
                        <span className="block text-xs uppercase tracking-widest mt-1 font-semibold">{day.date}</span>
                    </button>
                ))}
            </div>

            {/* Selected Day Content with Split Layout */}
            {ITIN_DATA.map((day) => {
                if (day.id !== activeDay) return null;

                const videoKey = getVideoKey(day.id);
                const hasVideo = videosExist?.[videoKey];
                const thumb = DAY_THUMBNAILS[day.id];

                return (
                    <div key={day.id} className="animate-fadeIn grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-0 items-start">

                        {/* LEFT COLUMN: Vertical event timeline (col-span-7) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Day Header */}
                            <div className="border-l-4 border-[#800020] pl-4 sm:pl-6 py-1 bg-gradient-to-r from-[#FAF9F6] to-transparent rounded-r-md">
                                <span className="text-[#C5A059] font-serif italic text-sm uppercase tracking-wider block">
                                    {day.dayName}
                                </span>
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1 whitespace-pre-wrap">
                                    {day.title}
                                </h3>
                                {day.desc && (
                                    <p className="text-stone-600 mt-2 text-sm italic leading-relaxed">
                                        "{day.desc}"
                                    </p>
                                )}
                            </div>

                            {/* Events Vertical Timeline */}
                            <div className="relative border-l border-stone-200 ml-4 pl-6 sm:pl-8 py-3 space-y-6">
                                {day.events.map((evt, index) => (
                                    <div key={index} className="relative">
                                        {/* Timeline Dot Indicator */}
                                        <span className={`absolute -left-[37px] sm:-left-[41px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full border-2 bg-white transition-all ${evt.type === "concert"
                                            ? "border-[#800020] text-[#800020] shadow-md ring-4 ring-[#800020]/10"
                                            : evt.type === "meal"
                                                ? "border-[#2E5A44] text-[#2E5A44]"
                                                : evt.type === "transport"
                                                    ? "border-[#C5A059] text-[#C5A059]"
                                                    : "border-stone-400 text-stone-600"
                                            }`}>
                                            {evt.type === "concert" ? (
                                                <Music className="w-3.5 h-3.5 animate-pulse" />
                                            ) : evt.type === "meal" ? (
                                                <Utensils className="w-3.5 h-3.5" />
                                            ) : (
                                                <CheckCircle className="w-3.5 h-3.5" />
                                            )}
                                        </span>

                                        {/* Event Details Card */}
                                        <div className={`p-4 rounded-lg border transition duration-200 ${evt.type === "concert"
                                            ? "bg-[#800020]/5 border-[#800020]/20 shadow-md shadow-[#800020]/5"
                                            : evt.type === "meal"
                                                ? "bg-[#2E5A44]/5 border-[#2E5A44]/15"
                                                : "bg-white border-stone-150 hover:border-[#C5A059]/30"
                                            }`}>
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <div className="flex items-center space-x-2">
                                                    {evt.time && (
                                                        <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {evt.time}
                                                        </span>
                                                    )}
                                                    <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${evt.type === "concert"
                                                        ? "bg-[#800020]/15 text-[#800020]"
                                                        : evt.type === "meal"
                                                            ? "bg-[#2E5A44]/10 text-[#2E5A44]"
                                                            : evt.type === "transport"
                                                                ? "bg-[#C5A059]/15 text-[#C5A059]"
                                                                : "bg-stone-100 text-stone-600"
                                                        }`}>
                                                        {evt.type === "concert" ? "Música / Recital" : evt.type === "meal" ? "Gastronomía" : evt.type === "transport" ? "Trayecto" : "Visita Cultural"}
                                                    </span>
                                                </div>

                                                {evt.venue && (
                                                    <span className="inline-flex items-center text-xs text-[#1C1C1C]/65 font-medium">
                                                        <MapPin className="w-3 h-3 mr-1 text-[#C5A059]" />
                                                        {evt.venue}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                                                {evt.title}
                                            </h4>

                                            <p className="text-xs text-[#1C1C1C]/80 leading-relaxed whitespace-pre-wrap">
                                                {evt.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Multimedia display with toggle cards (col-span-5) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4 w-full">
                            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#C5A059]/25 shadow-lg shadow-[#800020]/5 w-full">
                                {/* Title of the Multimedia Block */}
                                <div className="text-center pb-3 border-b border-[#C5A059]/10 mb-4 select-none">
                                    <h4 className="font-serif text-[#800020] uppercase font-bold text-sm tracking-widest">
                                        Diario Visual del Día
                                    </h4>
                                    <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-semibold">
                                        Resumen multimedia • Día {day.id}
                                    </span>
                                </div>

                                {/* Mode Selector Toggle Tabs */}
                                <div className="flex border border-[#C5A059]/25 rounded-lg overflow-hidden text-[10px] uppercase font-bold tracking-wider mb-4">
                                    <button
                                        onClick={() => setMode(day.id, "summary")}
                                        className={`flex-1 py-2 text-center transition focus:outline-none ${currentMode === "summary"
                                            ? "bg-[#800020] text-white"
                                            : "bg-[#FAF9F6] text-stone-600 hover:text-[#800020]"
                                            }`}
                                    >
                                        Resumen Visual
                                    </button>
                                    <button
                                        onClick={() => setMode(day.id, "video")}
                                        className={`flex-1 py-2 text-center transition focus:outline-none ${currentMode === "video"
                                            ? "bg-[#800020] text-white"
                                            : "bg-[#FAF9F6] text-stone-600 hover:text-[#800020]"
                                            }`}
                                    >
                                        Vídeos Relacionados
                                    </button>
                                </div>

                                {/* Video or Summary Image Box */}
                                <div className="relative aspect-video rounded-md overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                                    {currentMode === "summary" ? (
                                        hasVideo ? (
                                            <div className="w-full h-full bg-[#1C1C1C] relative aspect-video">
                                                <video
                                                    src={getVideoPath(day.id)}
                                                    controls
                                                    playsInline
                                                    muted={false}
                                                    className="w-full h-full object-cover"
                                                    poster={thumb.src}
                                                />
                                            </div>
                                        ) : (
                                            /* SUMMARY IMAGE WITH INTERPRETER-STYLE OVERLAY */
                                            <div
                                                onClick={() => setMode(day.id, "video")}
                                                className="relative w-full h-full cursor-pointer group"
                                                title="Haz clic para ver los vídeos relacionados"
                                            >
                                                <img
                                                    src={thumb.src}
                                                    alt={thumb.caption}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                                {/* ccmfalla.com interpreter card theme overlay: dark filter with centered elegant elements */}
                                                <div className="absolute inset-0 bg-black/45 group-hover:bg-[#800020]/65 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                                                    {/* Title */}
                                                    <h5 className="text-[17px] sm:text-[19px] font-bold text-white tracking-wide leading-snug drop-shadow-sm">
                                                        {DAY_OVERLAY_DETAILS[day.id].title}
                                                    </h5>

                                                    {/* Subtitle / Category: all caps gold accent */}
                                                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#E9C168] mt-1.5 uppercase">
                                                        {DAY_OVERLAY_DETAILS[day.id].category}
                                                    </span>

                                                    {/* Small details description in italic (Alegreya/Cormorant feel) */}
                                                    <p className="text-[12px] sm:text-[13px] italic text-[#FAF9F6]/90 mt-2 font-serif font-light max-w-[280px]">
                                                        {DAY_OVERLAY_DETAILS[day.id].description}
                                                    </p>

                                                    {/* Date */}
                                                    <span className="text-[10px] text-stone-300 font-sans tracking-wider mt-2.5 opacity-85">
                                                        {DAY_OVERLAY_DETAILS[day.id].date}
                                                    </span>

                                                    {/* Play Button Icon: Hollow white circle with custom play triangle arrow */}
                                                    <div className="mt-4 flex items-center justify-center">
                                                        <div className="w-9 h-9 rounded-full border border-white/50 flex flex-col items-center justify-center bg-black/10 group-hover:bg-[#800020]/80 group-hover:scale-110 shadow-md transition-all duration-300">
                                                            <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[0.5px]" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        /* VIDEO PLAYLIST PLAYER & DUAL PLAYER CONTROLS */
                                        (() => {
                                            const dayVideos = ITINERARY_VIDEOS[day.id] || [];
                                            const activeIdx = activeVideoIndexes[day.id] || 0;
                                            const currentVideo = dayVideos[activeIdx];
                                            const mediaType = timelineMediaTypes[day.id] || "completo";
                                            const videoSrc = mediaType === "resumen" && currentVideo ? currentVideo.filePath.replace(".mp4", "_resumen.mp4") : currentVideo?.filePath;

                                            if (currentVideo) {
                                                if (currentVideo.youtubeUrl) {
                                                    return (
                                                        <div className="w-full h-full flex flex-col justify-between bg-[#1C1C1C] relative">
                                                            {/* Cover Image and Clickable Link */}
                                                            <a
                                                                href={currentVideo.youtubeUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="relative w-full h-full cursor-pointer group flex items-center justify-center aspect-video"
                                                            >
                                                                {/* Mini Overlay Cover with Day Photo */}
                                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300 z-10" />
                                                                <img
                                                                    src={thumb.src}
                                                                    alt={currentVideo.title}
                                                                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                                                />

                                                                {/* Centered YouTube Play Button */}
                                                                <div
                                                                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#E62117] text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#FAF9F6] z-20"
                                                                    aria-label={`Ver ${currentVideo.title} en YouTube`}
                                                                >
                                                                    <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>

                                                                {/* YouTube Label */}
                                                                <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold z-20 flex items-center gap-1">
                                                                    <span>Ver en YouTube</span>
                                                                    <svg className="w-3 h-3 fill-current text-white" viewBox="0 0 24 24">
                                                                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-8z" />
                                                                    </svg>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="w-full h-full flex flex-col justify-between bg-[#1C1C1C]">
                                                        {/* Dual Player Toggle Switch (Timeline version) */}
                                                        <div className="flex border-b border-stone-850 bg-stone-900 text-[10px] z-10">
                                                            <button
                                                                onClick={() => setTimelineMediaTypes(prev => ({ ...prev, [day.id]: "completo" }))}
                                                                className={`flex-1 py-1.5 text-center font-bold uppercase transition ${mediaType === "completo" ? "bg-[#800020] text-white" : "text-stone-300 hover:bg-[#800020]/20"
                                                                    }`}
                                                            >
                                                                ▶ Completo
                                                            </button>
                                                            <button
                                                                onClick={() => setTimelineMediaTypes(prev => ({ ...prev, [day.id]: "resumen" }))}
                                                                className={`flex-1 py-1.5 text-center font-bold uppercase transition ${mediaType === "resumen" ? "bg-[#800020] text-white" : "text-stone-300 hover:bg-[#800020]/20"
                                                                    }`}
                                                            >
                                                                ⏱ Resumen
                                                            </button>
                                                        </div>
                                                        <div className="flex-1 min-h-0 relative aspect-video">
                                                            <video
                                                                key={`${day.id}-${activeIdx}-${mediaType}`}
                                                                src={videoSrc}
                                                                controls
                                                                autoPlay
                                                                playsInline
                                                                muted={false}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                /* Fallback if video does not exist yet */
                                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF9F6] border border-dashed border-[#C5A059]/30">
                                                    <div className="w-10 h-10 rounded-full bg-[#800020]/5 flex items-center justify-center text-[#800020] mb-2 animate-bounce">
                                                        <Music className="w-5 h-5" />
                                                    </div>
                                                    <h5 className="font-serif text-sm font-bold text-[#800020]">Vídeo en Sincronización</h5>
                                                    <p className="text-[10px] text-stone-500 mt-1 max-w-[200px]">
                                                        El fragmento cinematográfico está siendo mezclado con el audio del concierto.
                                                    </p>
                                                </div>
                                            );
                                        })()
                                    )}
                                </div>

                                {/* Playlist selection buttons for day videos */}
                                {currentMode === "video" && (ITINERARY_VIDEOS[day.id]?.length || 0) > 1 && (
                                    <div className="mt-3 border-t border-stone-100 pt-3 select-none">
                                        <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                                            Lista de Reproducción del Día
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ITINERARY_VIDEOS[day.id].map((vid, idx) => {
                                                const activeIdx = activeVideoIndexes[day.id] || 0;
                                                const isCurrent = activeIdx === idx;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveVideoIndexes(prev => ({ ...prev, [day.id]: idx }))}
                                                        className={`text-[9px] uppercase tracking-wider font-bold py-1 px-2 rounded-md transition ${isCurrent
                                                            ? "bg-[#800020] text-white"
                                                            : "bg-[#FAF9F6] text-stone-600 hover:bg-[#800020]/10 hover:text-[#800020] border border-stone-200"
                                                            }`}
                                                    >
                                                        {vid.title}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Caption at bottom of framed element */}
                                <div className="mt-3 text-center select-none text-[10px] border-t border-[#C5A059]/10 pt-3">
                                    <p className="font-serif italic font-bold text-[#800020] text-[11px]">
                                        "{thumb.caption}"
                                    </p>
                                    <p className="text-[9px] text-stone-400 mt-0.5">
                                        Copyright © Centro de Yoga Fuenlabrada Salvadora Conesa. Todos los derechos reservados.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
