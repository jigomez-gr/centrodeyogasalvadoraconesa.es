"use client";

import { ChevronDown } from "lucide-react";

export default function HeroReservarButton() {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-top-reservar-menu"));
        }
    };

    return (
        <button
            type="button"
            data-hero-reservar-trigger="true"
            onClick={handleClick}
            className="hero-cta-btn w-full sm:w-auto flex items-center justify-center gap-1.5 h-12 px-6 sm:px-8 border border-[#800020] text-xs font-bold uppercase tracking-widest rounded-md text-white bg-[#800020] hover:bg-[#800020]/90 shadow-md hover:scale-102 transition duration-250 text-center cursor-pointer select-none group"
            title="Desplegar menú de reserva de plaza"
        >
            <span>RESERVAR YOGA, BAÑO DE GONG Y OTROS EVENTOS</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#E5C378] group-hover:text-white transition-transform duration-200" />
        </button>
    );
}
