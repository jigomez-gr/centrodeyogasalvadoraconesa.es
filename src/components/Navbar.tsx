"use client";

import { useState, useEffect } from "react";
import { Menu, X, Music } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: "Inicio", href: "#inicio" },
        { label: "Actividades", href: "#itinerario" },
        { label: "Vídeos", href: "#videos" },
        { label: "Viajes Realizados", href: "#viajes-realizados" },
        { label: "Qué Incluye", href: "#incluye" },
        { label: "Plazas y Precios", href: "#precios" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#C5A059]/15 shadow-sm font-sans">
            {/* Desktop Centered Header Layout */}
            <div className="hidden xl:flex flex-col items-center pt-3 pb-2.5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                {/* Logo Image absolutely positioned on the left (spanning the height of the header) */}
                <a href="#" className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 group select-none">
                    <img
                        src="/imagenes/logo/logo.png"
                        alt="Logo Centro de Yoga Salvadora Conesa"
                        className="h-[74px] w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                </a>

                {/* Centered Brand Text Block */}
                <a href="#" className="flex flex-col items-center leading-tight mb-2 select-none">
                    <div className="flex items-center space-x-1.5 text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold">
                        <span>CENTRO DE YOGA FUENLABRADA</span>
                    </div>
                    <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#800020] tracking-wide uppercase font-editorial">
                        Salvadora Conesa
                    </h2>
                </a>

                {/* Submenu links with vertical pipes */}
                <nav className="flex items-center justify-center space-x-5 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                    {menuItems.map((item, idx) => (
                        <span key={item.label} className="flex items-center space-x-5">
                            {idx > 0 && <span className="text-[#C5A059]/40 select-none font-light">|</span>}
                            <a
                                href={item.href}
                                className="hover:text-[#800020] transition duration-200"
                            >
                                {item.label}
                            </a>
                        </span>
                    ))}
                    <span className="text-[#C5A059]/40 select-none font-light">|</span>
                    <a
                        href="#reserva"
                        className="text-[#800020] font-extrabold hover:underline transition duration-200"
                    >
                        Reservar Plaza
                    </a>
                </nav>
            </div>

            {/* Mobile Header Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between xl:hidden relative">
                {/* Left side: Hamburger toggle button */}
                <div className="w-10 flex justify-start">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#1C1C1C] hover:text-[#800020] focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-700" />}
                    </button>
                </div>

                {/* Center: Logo (Centered) */}
                <div className="flex-1 flex justify-center">
                    <a href="#" className="flex items-center space-x-2">
                        <img
                            src="/imagenes/logo/logo.png"
                            alt="Logo Centro de Yoga Salvadora Conesa"
                            className="h-8 w-auto object-contain"
                        />
                        <div className="flex flex-col items-center leading-tight">
                            <span className="text-[5.5px] tracking-wider text-[#C5A059] uppercase font-bold">CENTRO DE YOGA FUENLABRADA</span>
                            <span className="font-serif text-[9.5px] font-black text-[#800020] uppercase tracking-wide leading-none">Salvadora Conesa</span>
                        </div>
                    </a>
                </div>

                {/* Right side: spacer to keep center logo visually aligned */}
                <div className="w-10 flex justify-end">
                    {/* Empty placeholder */}
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="xl:hidden bg-white border-t border-[#C5A059]/15 py-4 px-6 absolute top-full left-0 right-0 shadow-lg animate-slideDown">
                    <nav className="flex flex-col space-y-4 font-semibold text-xs uppercase tracking-widest text-[#1C1C1C]/60">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="hover:text-[#800020] py-1 transition"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#reserva"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center py-2.5 border border-transparent rounded text-xs font-bold uppercase tracking-widest text-white bg-[#800020] hover:bg-[#800020]/90 transition"
                        >
                            Reservar Plaza
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
