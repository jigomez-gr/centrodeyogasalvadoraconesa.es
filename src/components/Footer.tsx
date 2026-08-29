"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white py-14 font-sans border-t-2 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        
        {/* Legal Links (matching Image 1) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium text-white/90">
          <Link
            href="/politica-de-privacidad"
            className="hover:text-[#E9C168] transition duration-200 underline-offset-4 hover:underline"
          >
            Política de Privacidad
          </Link>
          <span className="hidden sm:inline text-white/30">•</span>
          <Link
            href="/politica-de-cookies"
            className="hover:text-[#E9C168] transition duration-200 underline-offset-4 hover:underline"
          >
            Política de Cookies
          </Link>
          <span className="hidden sm:inline text-white/30">•</span>
          <Link
            href="/ley-de-proteccion-de-datos"
            className="hover:text-[#E9C168] transition duration-200 underline-offset-4 hover:underline"
          >
            Ley de Protección de Datos
          </Link>
        </div>

        <div className="w-24 h-px bg-[#C5A059]/40 mx-auto" />

        {/* Copyright & WebMaster Credit */}
        <div className="space-y-2 text-xs sm:text-sm text-white/60 font-light">
          <p>
            © {new Date().getFullYear()} Centro de Yoga Fuenlabrada Salvadora Conesa. Todos los derechos reservados.
          </p>
          <p className="text-white/40">
            WebMaster ReagrupamientoAI{" "}
            <a
              href="mailto:contacto@reagrupamientoAI.com"
              className="text-[#E9C168]/80 hover:text-[#E9C168] transition underline"
            >
              @reagrupamientoAI.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
