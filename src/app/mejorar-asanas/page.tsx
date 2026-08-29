import Navbar from "@/components/Navbar";
import AsanasSection from "@/components/AsanasSection";
import Link from "next/link";

export default function MejorarAsanasPage() {
  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C] min-h-screen selection:bg-[#800020] selection:text-white">
      <Navbar />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs uppercase font-bold tracking-widest text-[#800020] hover:underline inline-flex items-center space-x-1"
          >
            <span>← Volver al Inicio</span>
          </Link>
        </div>

        <AsanasSection />
      </main>

      <footer className="bg-[#1C1C1C] text-white py-12 font-sans border-t-2 border-[#C5A059]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} Centro de Yoga Fuenlabrada Salvadora Conesa. todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
