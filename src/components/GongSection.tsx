"use client";

export default function GongSection() {
  const videos = [
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
      title: "Once minutos y el Gong como maestro",
      description:
        "Bastan once minutos continuados de práctica para que la mente comience a reorganizarse en calma. El Gong es un maestro vivo: su sonido muta según la energía de la sala, guiándonos hacia un estado meditativo instantáneo donde el esfuerzo desaparece.",
      src: "/videos/gong/Serie_5_once_minutos_y_gong.mp4",
      poster: "/videos/gong/Serie_5_once_minutos_y_gong-poster.jpg",
    },
  ];

  return (
    <section id="gong" className="scroll-mt-24 pt-8 border-t border-[#C5A059]/20">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
            Vibración, Sonido y Armonización
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
            SOBRE EL GONG
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed font-sans bg-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/20 shadow-sm">
            <p>
              El Gong no es un instrumento musical al uso, sino una herramienta terapéutica ancestral que trabaja a través de la vibración del sonido. Cada vez que lo toco, el Gong suena y vibra de forma única: responde a la temperatura, a la atmósfera y, sobre todo, a la energía y relajación de las personas presentes en la sala. Por eso decimos que el Gong es, ante todo, un maestro.
            </p>
            <p>
              A través de sus frecuencias armónicas, el sonido penetra en cada célula, aflojando tensiones físicas arraigadas y silenciando el diálogo mental sin necesidad de forzar la concentración. En estos dos vídeos reflexiono sobre su capacidad sanadora y cómo nos ayuda a profundizar en la práctica interior.
            </p>
          </div>
        </div>

        {/* Videos Subsection */}
        <div className="space-y-8 pt-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
            Vídeos
          </h3>

          {/* Video Grid (2 items balanced layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
  );
}
