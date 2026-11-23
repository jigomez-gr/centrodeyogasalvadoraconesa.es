"use client";

import { ChevronDown } from "lucide-react";

export default function HeroActividadesDropdown() {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-top-actividades-menu"));
        }
    };

    return (
        <button
            type="button"
            data-hero-actividades-trigger="true"
            onClick={handleClick}
            className="hero-cta-btn w-full sm:w-auto flex items-center justify-center gap-1.5 h-[40px] sm:h-12 px-7 sm:px-8 border border-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-md text-[#800020] hover:text-white bg-white hover:bg-[#800020] shadow-sm hover:scale-102 transition duration-250 cursor-pointer select-none group"
            title="Desplegar menú de actividades en la barra superior"
        >
            <span>Ver Actividades</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-white transition-transform duration-200" />
        </button>
    );
}
