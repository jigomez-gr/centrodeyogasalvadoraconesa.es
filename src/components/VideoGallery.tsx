"use client";

import { useState } from "react";
import { Play, Calendar, Film, ArrowRight, ShieldCheck, Compass, Sparkles, MapPin } from "lucide-react";

interface VideoGalleryProps {
    videosExist: {
        "itinerario-1": boolean;
        "itinerario-2": boolean;
        "itinerario-3": boolean;
        "itinerario-4": boolean;
        "itinerario-5": boolean;
        "itinerario-6": boolean;
        "itinerario-7": boolean;
        "itinerario-8": boolean;
        "itinerario-9": boolean;
        resumen: boolean;
    };
}

interface VideoDetail {
    title: string;
    description: string;
    filePath: string;
    duration?: string;
    subtitle?: string;
    youtubeUrl?: string;
}

interface DayItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    image: string;
    videos: VideoDetail[];
}

const DAYS_DATA: DayItem[] = [
    {
        id: 1,
        title: "Hatha Yoga & Yoga Nidra",
        category: "ALINEACIÓN Y RELAJACIÓN",
        description: "Clases semanales centradas en el cuidado corporal mediante asanas y la relajación psíquica profunda.",
        date: "Clases Regulares",
        image: "/imagenes/yoga/01_05_yoga_sala_centro_1920x1080.jpg",
        videos: [
            {
                title: "Hatha Yoga y Relajación",
                description: "Introducción y demostración práctica de posturas y respiración consciente.",
                filePath: "/videos/itinerario-1.mp4"
            }
        ]
    },
    {
        id: 2,
        title: "Kundalini & Meditación",
        category: "TECNOLOGÍA DE LA CONSCIENCIA",
        description: "Prácticas dinámicas de elevación de la energía vital combinando kriyas, pranayama y mantras.",
        date: "Clases Regulares",
        image: "/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg",
        videos: [
            {
                title: "Clase de Kundalini Yoga",
                description: "Demostración de una kriya de Kundalini y cantos meditativos.",
                filePath: "/videos/itinerario-2.mp4"
            }
        ]
    },
    {
        id: 3,
        title: "Baños de Gong",
        category: "SONOTERAPIA",
        description: "Terapia vibracional de armonización celular y disolución de tensiones a través de gongs sinfónicos.",
        date: "Talleres Mensuales",
        image: "/imagenes/gong/04_maria_con_cuenco_y_gong_1920x1080.jpg",
        videos: [
            {
                title: "Inmersión en Baño de Gong",
                description: "Extracto de una sesión vibracional de relajación profunda e integración armónica.",
                filePath: "/videos/itinerario-3.mp4"
            }
        ]
    },
    {
        id: 4,
        title: "La Puja de Gong",
        category: "CEREMONIA SAGRADA",
        description: "Una experiencia sublime de 8 horas continuadas de gongs en relevos durante toda la noche.",
        date: "Eventos Especiales",
        image: "/imagenes/gong/06_experiencia_de_relajacion_sonora_1920x1080.jpg",
        videos: [
            {
                title: "Ceremonia Puja de Gong",
                description: "Momento culmen del toque de gongs ininterrumpido durante la noche sagrada.",
                filePath: "/videos/itinerario-4.mp4"
            }
        ]
    },
    {
        id: 5,
        title: "Terapia Gestalt",
        category: "PRESENCIA Y ACOMPAÑAMIENTO",
        description: "Espacio de presencia y autoconocimiento enfocado en el aquí y el ahora para el acompañamiento emocional.",
        date: "Consulta Individual",
        image: "/imagenes/centro/401_interior_centro_yoga_1920x1080.jpg",
        videos: [
            {
                title: "Acompañamiento Gestáltico",
                description: "Introducción a los talleres y terapia Gestalt enfocada en la integración personal.",
                filePath: "/videos/itinerario-5.mp4"
            }
        ]
    },
    {
        id: 6,
        title: "Constelaciones Familiares",
        category: "SANACIÓN TRANSGENERACIONAL",
        description: "Terapia sistémica grupal para traer orden y claridad a las implicaciones e historias familiares inconscientes.",
        date: "Talleres Mensuales",
        image: "/imagenes/yoga/01_05_yoga_sala_centro_1920x1080.jpg",
        videos: [
            {
                title: "Talleres de Constelaciones",
                description: "Dinámica y reconciliación sistémica grupal de los lazos familiares transgeneracionales.",
                filePath: "/videos/itinerario-6.mp4"
            }
        ]
    },
    {
        id: 7,
        title: "Encuentros de Mujeres",
        category: "SORORIDAD Y RECONEXIÓN",
        description: "Espacios de cuidado mutuo, círculos de palabra y de escucha profunda en la naturaleza.",
        date: "Retiros Anuales",
        image: "/imagenes/ayuno_terapeutico/ayunos_arreglados/201_ayuno_bienvenida_y_colores_1920x1080.jpg",
        videos: [
            {
                title: "Círculo de Mujeres",
                description: "Diálogos al fuego y senderismo consciente en la naturaleza profunda.",
                filePath: "/videos/itinerario-7.mp4"
            }
        ]
    },
    {
        id: 8,
        title: "Ayuno Terapéutico y Retiros",
        category: "DEPURACIÓN Y RETIROS",
        description: "Desintoxicación y depuración celular con zumos y caldos depurativos en un entorno de paz profunda.",
        date: "Retiros Anuales",
        image: "/imagenes/ayuno_terapeutico/ayunos_arreglados/201_ayuno_bienvenida_y_colores_1920x1080.jpg",
        videos: [
            {
                title: "Experiencia de Ayuno Terapéutico",
                description: "Testimonios y dinámicas de purificación en la naturaleza durante los retiros organizados.",
                filePath: "/videos/itinerario-8.mp4"
            }
        ]
    },
    {
        id: 9,
        title: "Otras Disciplinas y Más",
        category: "COLABORADORES Y SALUD",
        description: "Sesiones de Taichí, Ninjutsú, Defensa personal y salud de la mano de profesionales colaboradores.",
        date: "Programación Abierta",
        image: "/imagenes/centro/401_interior_centro_yoga_1920x1085.jpg",
        videos: [
            {
                title: "Otras Disciplinas de Defensa y Salud",
                description: "Clases y demostraciones prácticas de Taichí y Ninjutsú para la defensa y fuerza.",
                filePath: "/videos/itinerario-9.mp4"
            }
        ]
    }
];

export default function VideoGallery({ videosExist }: VideoGalleryProps) {
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
    const [playingVideoPath, setPlayingVideoPath] = useState<string | null>(null);
    const [galleryMediaTypes, setGalleryMediaTypes] = useState<{ [key: string]: "completo" | "resumen" }>({});

    const activeDay = DAYS_DATA.find(d => d.id === selectedDayId);

    const handlePlayVideo = (filePath: string) => {
        setPlayingVideoPath(filePath);
    };

    return (
        <div className="space-y-12">
            {/* GRID OF DAY SELECTOR CARDS - Style mimicking ccmfalla.com interpreter list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {DAYS_DATA.map((day) => {
                    const isSelected = selectedDayId === day.id;
                    return (
                        <div
                            key={day.id}
                            onClick={() => {
                                setSelectedDayId(isSelected ? null : day.id);
                                setPlayingVideoPath(null);
                            }}
                            className={`relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-md border focus:outline-none transition-all duration-300 ${isSelected
                                ? "border-[#800020] ring-4 ring-[#800020]/15"
                                : "border-[#C5A059]/25 hover:border-[#800020]/50"
                                }`}
                        >
                            {/* Card Background Image */}
                            <img
                                src={day.image}
                                alt={day.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* ccmfalla.com Interpreter Mask Overlay */}
                            <div className="absolute inset-0 bg-black/45 group-hover:bg-[#800020]/65 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                                {/* Title */}
                                <h5 className="text-[17px] sm:text-[19px] font-bold text-white tracking-wide leading-snug drop-shadow-sm">
                                    {day.title}
                                </h5>

                                {/* Subtitle / Category Label: Montserrat gold uppercase style */}
                                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#E9C168] mt-1.5 uppercase select-none">
                                    {day.category}
                                </span>

                                {/* Italic serif description/details count */}
                                <p className="text-[12px] sm:text-[13px] italic text-[#FAF9F6]/95 mt-2 font-serif font-light max-w-[280px]">
                                    {day.videos.length} {day.videos.length === 1 ? "vídeo disponible" : "vídeos disponibles"}
                                </p>

                                {/* Date */}
                                <span className="text-[10px] text-stone-300 font-sans tracking-wide mt-2.5 opacity-85 select-none">
                                    {day.date}
                                </span>

                                {/* Rounded Circle Play Action Indicator */}
                                <div className="mt-4 flex items-center justify-center">
                                    <div className="w-9 h-9 rounded-full border border-white/50 flex flex-col items-center justify-center bg-black/10 group-hover:bg-[#800020]/90 group-hover:scale-110 shadow-md transition-all duration-300">
                                        <svg className={`w-3.5 h-3.5 fill-current text-white transition duration-300 ${isSelected ? 'rotate-90' : 'translate-x-[0.5px]'}`} viewBox="0 0 24 24">
                                            {isSelected ? (
                                                <path d="M19 13H5v-2h14v2z" />
                                            ) : (
                                                <path d="M8 5v14l11-7z" />
                                            )}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* EXPANDED DAY VIDEOS CONTAINER (Collapsible Accordion layout under the selector row) */}
            {activeDay && (
                <div className="bg-[#FAF9F6] border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 shadow-xl shadow-[#800020]/5 animate-fadeIn space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#C5A059]/20 pb-4">
                        <div>
                            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
                                Auditorio Digital • Pilar {activeDay.id} ({activeDay.date})
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020] mt-1">
                                {activeDay.title}
                            </h3>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedDayId(null);
                                setPlayingVideoPath(null);
                            }}
                            className="text-xs font-semibold text-[#800020] hover:text-[#C5A059] transition uppercase tracking-wider mt-3 sm:mt-0"
                        >
                            Cerrar galería del día
                        </button>
                    </div>

                    {/* Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {activeDay.videos.map((vid, idx) => {
                            const isPlaying = playingVideoPath === vid.filePath;
                            const videoKey = `${activeDay.id}-${idx}`;
                            const mediaType = galleryMediaTypes[videoKey] || "completo";
                            const videoSrc = mediaType === "resumen" ? vid.filePath.replace(".mp4", "_resumen.mp4") : vid.filePath;

                            if (vid.youtubeUrl) {
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                                    >
                                        {/* Video Link Card Display */}
                                        <a
                                            href={vid.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100 cursor-pointer group block"
                                        >
                                            {/* Mini Overlay Cover with Day Photo */}
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300 z-10" />
                                            <img
                                                src={activeDay.image}
                                                alt={vid.title}
                                                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                            />

                                            {/* Centered Play YouTube Button */}
                                            <div
                                                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#E62117] text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#FAF9F6] z-20"
                                                aria-label={`Ver ${vid.title} en YouTube`}
                                            >
                                                <Play className="w-6 h-6 fill-current translate-x-0.5" />
                                            </div>

                                            {/* YouTube Call to Action Label */}
                                            <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold z-20 flex items-center gap-1">
                                                <span>Ver en YouTube</span>
                                                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                                                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-8z" />
                                                </svg>
                                            </div>
                                        </a>

                                        {/* Video metadata */}
                                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                                                        {vid.title}
                                                    </h4>
                                                    <span className="text-[10px] bg-red-100 text-[#E62117] border border-red-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                                                        YouTube
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed mb-4">
                                                    {vid.description}
                                                </p>
                                                <a
                                                    href={vid.youtubeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs font-bold text-[#E62117] hover:text-[#800020] uppercase tracking-wider transition gap-1.5 focus:outline-none"
                                                >
                                                    Enlace al vídeo en YouTube &rarr;
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                                >
                                    {/* Dual Player Toggle Switch */}
                                    <div className="flex border-b border-stone-100 bg-[#FAF9F6] text-xs">
                                        <button
                                            onClick={() => setGalleryMediaTypes(prev => ({ ...prev, [videoKey]: "completo" }))}
                                            className={`flex-1 py-2 text-center font-bold tracking-wider uppercase transition ${mediaType === "completo" ? "bg-[#800020] text-white" : "text-stone-600 hover:bg-[#800020]/10"
                                                }`}
                                        >
                                            ▶ Vídeo Completo
                                        </button>
                                        <button
                                            onClick={() => setGalleryMediaTypes(prev => ({ ...prev, [videoKey]: "resumen" }))}
                                            className={`flex-1 py-2 text-center font-bold tracking-wider uppercase transition ${mediaType === "resumen" ? "bg-[#800020] text-white" : "text-stone-600 hover:bg-[#800020]/10"
                                                }`}
                                        >
                                            ⏱ Resumen Corto
                                        </button>
                                    </div>

                                    {/* Video Player Display */}
                                    <div className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100">
                                        {isPlaying ? (
                                            <video
                                                key={videoSrc}
                                                src={videoSrc}
                                                controls
                                                autoPlay
                                                playsInline
                                                muted={false}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                onClick={() => handlePlayVideo(vid.filePath)}
                                                className="relative w-full h-full cursor-pointer group"
                                            >
                                                {/* Mini Overlay Cover with Day Photo */}
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300" />
                                                <img
                                                    src={activeDay.image}
                                                    alt={vid.title}
                                                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                                />

                                                {/* Centered Play Button */}
                                                <button
                                                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#800020]/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#E9C168]"
                                                    aria-label={`Reproducir ${vid.title}`}
                                                >
                                                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                                                </button>

                                                {/* Play Call to Action Label */}
                                                <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold">
                                                    Reproducir {mediaType === "resumen" ? "Resumen" : "Fragmento"}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Video metadata */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020] mb-2">
                                                {vid.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                                                {vid.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
