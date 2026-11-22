"use client";

export default function AyunoSection() {
  const video = {
    id: "1",
    num: "I.",
    title: "El descanso que renueva tu salud",
    description:
      "Dar descanso al aparato digestivo permite que el organismo concentre toda su energía en depurar riñones, equilibrar niveles de colesterol y resetear el sistema metabólico. Cuatro días de reposo alimentario consciente con líquidos y caldos en la naturaleza suponen una auténtica renovación celular y biológica.",
    src: "/videos/ayuno/Serie_4_ayuno.mp4",
    poster: "/videos/ayuno/Serie_4_ayuno-poster.jpg",
  };

  return (
    <section id="ayuno-terapeutico" className="scroll-mt-24 pt-8 border-t border-[#C5A059]/20">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
            Salud, Regeneración y Descanso Celular
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

        {/* Video Subsection */}
        <div className="space-y-8 pt-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020]">
            Vídeo
          </h3>

          {/* Centered Single Video Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">
              <div className="relative aspect-video bg-stone-900 border-b border-stone-100">
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020] mb-2">
                    {video.num} {video.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                    {video.description}
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
  );
}
