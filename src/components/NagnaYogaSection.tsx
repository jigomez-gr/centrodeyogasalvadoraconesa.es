"use client";

import { Video } from "lucide-react";

export default function NagnaYogaSection() {
  const videos = [
    {
      id: "1",
      num: "I.",
      title: "El origen del conocimiento",
      description:
        "Una primera toma de contacto con el espíritu del Nagna Yoga: de dónde viene, y qué sentido tiene detenerse a comprender antes de practicar.",
      src: "/videos/nagna_yoga/nagnayoga1.mp4",
      poster: "/imagenes/yoga/01_05_yoga_sala_centro_1920x1080.jpg",
    },
    {
      id: "2",
      num: "II.",
      title: "La respiración consciente",
      description:
        "Claves sencillas sobre el papel de la respiración en la práctica, y cómo convertirla en la guía silenciosa de cada movimiento.",
      src: "/videos/nagna_yoga/nagnayoga2.mp4",
      poster: "/imagenes/yoga/07_04_yoga_respiracion_1920x1080.jpg",
    },
    {
      id: "3",
      num: "III.",
      title: "Anatomía del cuerpo en movimiento",
      description:
        "Nociones de anatomía aplicadas a la práctica, para entender qué le estamos pidiendo al cuerpo en cada postura.",
      src: "/videos/nagna_yoga/nagnayoga3.mp4",
      poster: "/imagenes/yoga/03_02_yoga_postura_brazos_arriba_1920x1080.jpg",
    },
    {
      id: "4",
      num: "IV.",
      title: "El silencio como maestro",
      description:
        "Un acercamiento a la quietud y a la escucha interior como parte esencial del aprendizaje del yoga.",
      src: "/videos/nagna_yoga/nagnayoga4.mp4",
      poster: "/imagenes/meditacion/01_meditacion_silencio_ventana_1920x1080.jpg",
    },
  ];

  return (
    <div className="space-y-16 my-12">
      {/* 1. Green Banner Card (matching Image 2) */}
      <a
        href="#nagna-yoga"
        className="block bg-gradient-to-br from-[#1E3E2B] via-[#2E5A44] to-[#1D3D2C] p-8 sm:p-12 md:p-16 rounded-2xl border border-[#C5A059]/30 shadow-2xl hover:shadow-[#2E5A44]/30 hover:scale-[1.01] transition duration-300 text-center text-white relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <span className="text-xs sm:text-sm tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-3">
          GNANI YOGA
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Nagna Yoga, <span className="italic text-[#E9C168]">el yoga del conocimiento</span>
        </h3>
        <p className="text-sm sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-sans font-light">
          Un espacio vivo donde sigo compartiendo, en pequeñas píldoras de apenas cinco minutos, todo lo que el yoga me ha ido enseñando a lo largo del camino.
        </p>
        <div className="mt-6 inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#E9C168] group-hover:underline">
          <span>Ver colección de vídeos de Nagna Yoga</span>
          <span>↓</span>
        </div>
      </a>

      {/* 2. Nagna Yoga Content & Video Gallery (matching Image 3) */}
      <section id="nagna-yoga" className="scroll-mt-24 pt-8 border-t border-[#C5A059]/20">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Section Header */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
              Yoga del Conocimiento
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              NAGNA YOGA
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed font-sans bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/20 shadow-sm">
              <p>
                Nagna Yoga es el yoga del conocimiento. Es un espacio que he creado con mucho cariño para seguir haciendo, poco a poco, pequeños vídeos de unos cinco minutos con los que enseñar y compartir conocimientos de yoga: anatomía aplicada a la práctica, claves de la respiración, fundamentos de la filosofía yóguica y esos pequeños matices que marcan la diferencia entre hacer una postura y habitarla de verdad.
              </p>
              <p>
                Cada vídeo es una semilla de conocimiento pensada para acompañarte más allá de la esterilla: puedes volver a verla las veces que necesites, a tu ritmo, y dejar que poco a poco vaya calando en tu propia práctica. Iré ampliando esta colección con nuevas entregas, así que este es un espacio que crecerá contigo.
              </p>
            </div>
          </div>

          {/* Videos Subsection */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
              Vídeos
            </h3>

            {/* 2x2 Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid) => (
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
                      className="w-full h-full object-cover"
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
                Muy pronto iré añadiendo más vídeos y contenidos a esta colección. Si alguno de ellos despierta en ti una pregunta, tráela a clase: el Nagna Yoga también se sigue construyendo entre tod@s.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
