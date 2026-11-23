"use client";

export default function MeditacionSection() {
  const videos = [
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
    <section id="meditacion" className="scroll-mt-24 pt-8 border-t border-[#C5A059]/20">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
            Claves de la Práctica Interior
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

        {/* Videos Subsection */}
        <div className="space-y-8 pt-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
            Vídeos
          </h3>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="w-full max-w-sm mx-auto md:max-w-none bg-white rounded-xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
              >
                <div className="relative aspect-video bg-black border-b border-stone-100 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full p-3.5 sm:p-0 flex items-center justify-center">
                    <video
                      src={vid.src}
                      poster={vid.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
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
  );
}
