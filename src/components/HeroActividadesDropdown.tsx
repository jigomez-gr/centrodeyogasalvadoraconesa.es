"use client";

import { useState, useEffect, useRef } from "react";
import {
    ChevronDown,
    ChevronRight,
    Sparkles,
    Eye,
    ArrowRight,
    Compass,
    X,
} from "lucide-react";
import { ACTIVITY_CATEGORIES, ActivityCategory } from "@/lib/activityMenuData";

export default function HeroActividadesDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCatId, setActiveCatId] = useState<string>("yoga-meditacion");
    const [mobileOpenCatId, setMobileOpenCatId] = useState<string | null>("yoga-meditacion");

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Close on click outside or Escape key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleActivitySelect = (dayNum: number, hrefPortada: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsOpen(false);

        if (typeof window !== "undefined") {
            if (window.location.pathname === "/") {
                window.history.replaceState(null, "", hrefPortada);
                window.dispatchEvent(new CustomEvent("select-activity-day", { detail: dayNum }));
                const el = document.getElementById("itinerario");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                window.location.href = hrefPortada;
            }
        }
    };

    const handleSelectAll = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);
        if (typeof window !== "undefined") {
            window.history.replaceState(null, "", "#itinerario");
            window.dispatchEvent(new CustomEvent("select-activity-day", { detail: 1 }));
            const el = document.getElementById("itinerario");
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const currentCategory = ACTIVITY_CATEGORIES.find((c) => c.id === activeCatId) || ACTIVITY_CATEGORIES[0];

    return (
        <div ref={containerRef} className="relative w-full sm:w-auto inline-block text-left">
            {/* The Trigger Button under the Hero */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={`hero-cta-btn w-full sm:w-auto flex items-center justify-center gap-2 h-[40px] sm:h-12 px-7 sm:px-8 border border-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-md transition duration-200 cursor-pointer shadow-sm hover:scale-102 select-none ${
                    isOpen
                        ? "bg-[#800020] text-white border-[#800020]"
                        : "bg-white text-[#800020] hover:bg-[#800020] hover:text-white"
                }`}
                title="Desplegar menú en cascada con las 9 actividades y disciplinas"
            >
                <span>Ver Actividades</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-[#C5A059] group-hover:text-white transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                    }`}
                />
            </button>

            {/* DESKTOP / TABLET CASCADING MENU DROPDOWN (SM AND UP) */}
            {isOpen && (
                <div
                    className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fadeIn"
                    style={{ width: "min(760px, calc(100vw - 32px))" }}
                >
                    <div className="bg-white rounded-2xl border border-[#C5A059]/40 shadow-2xl overflow-hidden font-sans">
                        {/* Decorative top gold gradient */}
                        <div className="h-1.5 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020]" />

                        {/* Header bar */}
                        <div className="px-5 py-3 bg-[#0D1F18] text-white flex items-center justify-between border-b border-[#C5A059]/30">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E5C378]">
                                    Menú en Cascada · Actividades del Centro
                                </span>
                            </div>
                            <span className="text-[11px] text-stone-300 font-medium">
                                9 Disciplinas y Retiros
                            </span>
                        </div>

                        {/* 2-Column Cascading Body */}
                        <div className="grid grid-cols-12 min-h-[380px]">
                            {/* Left Column: Categorías (Level 1) */}
                            <div className="col-span-5 bg-stone-50 border-r border-stone-200/80 p-3.5 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                    <p className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#96680E]">
                                        Disciplinas & Áreas
                                    </p>
                                    {ACTIVITY_CATEGORIES.map((cat) => {
                                        const isActive = activeCatId === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onMouseEnter={() => setActiveCatId(cat.id)}
                                                onClick={() => setActiveCatId(cat.id)}
                                                className={`w-full text-left px-3 py-2.5 rounded-xl transition duration-150 flex items-center justify-between group cursor-pointer ${
                                                    isActive
                                                        ? "bg-white shadow-xs border border-[#C5A059]/50 text-[#800020]"
                                                        : "hover:bg-white/70 text-stone-700"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <span className="text-base select-none shrink-0">{cat.icon}</span>
                                                    <div className="min-w-0">
                                                        <p className={`text-xs font-bold tracking-wide truncate ${isActive ? "text-[#800020]" : "text-stone-800"}`}>
                                                            {cat.name}
                                                        </p>
                                                        <p className="text-[10px] text-stone-500 truncate">
                                                            {cat.activities.length} actividades
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    className={`w-4 h-4 shrink-0 transition-transform ${
                                                        isActive
                                                            ? "text-[#800020] translate-x-0.5"
                                                            : "text-stone-400 group-hover:text-stone-600"
                                                    }`}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Quick link: All activities in Itinerary */}
                                <div className="pt-3 border-t border-stone-200 mt-2">
                                    <button
                                        type="button"
                                        onClick={handleSelectAll}
                                        className="w-full py-2.5 px-3 text-center rounded-xl bg-stone-100 hover:bg-[#800020] hover:text-white text-[#800020] text-[11px] font-bold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                                    >
                                        <Compass className="w-3.5 h-3.5" />
                                        <span>Ver Todas en Portada (1 a 9)</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Actividades de la categoría seleccionada (Level 2) */}
                            <div className="col-span-7 p-4 bg-white flex flex-col justify-between">
                                {currentCategory && (
                                    <div className="space-y-3">
                                        {/* Category Header */}
                                        <div className="pb-2 border-b border-stone-100">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-[#800020] font-editorial">
                                                    {currentCategory.icon} {currentCategory.name}
                                                </h4>
                                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#FAF9F6] border border-[#C5A059]/30 text-[#96680E] rounded-full">
                                                    {currentCategory.activities.length} opciones
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-stone-500 mt-0.5">
                                                {currentCategory.shortDesc}
                                            </p>
                                        </div>

                                        {/* Activities List */}
                                        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                            {currentCategory.activities.map((act) => (
                                                <div
                                                    key={act.dayNum}
                                                    onClick={() => handleActivitySelect(act.dayNum, act.hrefPortada)}
                                                    className="p-3 rounded-xl border border-stone-200 hover:border-[#800020] hover:shadow-sm transition bg-[#FAF9F6]/60 hover:bg-white cursor-pointer group"
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800020] text-white text-[10px] font-black shrink-0">
                                                                {act.dayNum}
                                                            </span>
                                                            <h5 className="text-xs font-bold text-stone-900 group-hover:text-[#800020] transition-colors">
                                                                {act.title}
                                                            </h5>
                                                        </div>
                                                        <span className="text-[9.5px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                                                            {act.tag}
                                                        </span>
                                                    </div>

                                                    <p className="text-[11px] text-stone-600 leading-relaxed mb-2.5">
                                                        {act.subtitle}
                                                    </p>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleActivitySelect(act.dayNum, act.hrefPortada);
                                                            }}
                                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#800020] hover:bg-[#96680E] text-white text-[10.5px] font-bold tracking-wide transition cursor-pointer shadow-2xs"
                                                            title="Mostrar esta actividad interactiva en la sección de abajo"
                                                        >
                                                            <Eye className="w-3.5 h-3.5 text-[#E5C378]" />
                                                            <span>Mostrar en Portada (#dia-{act.dayNum})</span>
                                                        </button>
                                                        <a
                                                            href={act.hrefDedicated}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsOpen(false);
                                                            }}
                                                            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-300 hover:border-[#800020] hover:text-[#800020] text-stone-600 text-[10.5px] font-semibold transition"
                                                            title="Ir a la página monográfica de esta actividad"
                                                        >
                                                            <span>Página</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2 text-[10px] text-stone-400 italic text-center border-t border-stone-100 mt-2">
                                    💡 Haz clic en cualquier actividad para activar su ficha en la sección de abajo.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MOBILE MODAL / BOTTOM SHEET OVERLAY (< SM) */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs animate-fadeIn"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-t border-[#C5A059]/40 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#0D1F18] text-white flex items-center justify-between border-b border-[#C5A059]/30">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#E5C378]">
                                    Menú en Cascada · Actividades
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                                aria-label="Cerrar menú"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Accordion Categories */}
                        <div className="p-4 overflow-y-auto space-y-2.5 bg-[#FAF9F6]">
                            {ACTIVITY_CATEGORIES.map((cat) => {
                                const isCatOpen = mobileOpenCatId === cat.id;
                                return (
                                    <div key={cat.id} className="bg-white rounded-xl border border-stone-200/90 shadow-2xs overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setMobileOpenCatId(isCatOpen ? null : cat.id)}
                                            className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-stone-800 hover:text-[#800020] cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-base">{cat.icon}</span>
                                                <span>{cat.name}</span>
                                                <span className="text-[10px] text-stone-400 font-normal">
                                                    ({cat.activities.length})
                                                </span>
                                            </div>
                                            <ChevronDown
                                                className={`w-4 h-4 text-stone-400 transition-transform ${
                                                    isCatOpen ? "rotate-180 text-[#800020]" : ""
                                                }`}
                                            />
                                        </button>

                                        {isCatOpen && (
                                            <div className="p-3 pt-0 space-y-2 border-t border-stone-100 bg-stone-50/50">
                                                {cat.activities.map((act) => (
                                                    <div
                                                        key={act.dayNum}
                                                        onClick={() => handleActivitySelect(act.dayNum, act.hrefPortada)}
                                                        className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-[#800020] cursor-pointer transition shadow-2xs"
                                                    >
                                                        <div className="flex items-center justify-between gap-1 mb-1">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#800020] text-white text-[9px] font-black shrink-0">
                                                                    {act.dayNum}
                                                                </span>
                                                                <span className="font-bold text-[11px] text-stone-900">
                                                                    {act.title}
                                                                </span>
                                                            </div>
                                                            <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                                                                {act.tag}
                                                            </span>
                                                        </div>
                                                        <p className="text-[10.5px] text-stone-600 mb-2 leading-relaxed">
                                                            {act.subtitle}
                                                        </p>
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleActivitySelect(act.dayNum, act.hrefPortada);
                                                                }}
                                                                className="flex-1 py-1.5 px-2 rounded bg-[#800020] hover:bg-[#96680E] text-white text-[10px] font-bold text-center cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                                                            >
                                                                <Eye className="w-3 h-3 text-[#E5C378]" />
                                                                <span>Mostrar (#dia-{act.dayNum})</span>
                                                            </button>
                                                            <a
                                                                href={act.hrefDedicated}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setIsOpen(false);
                                                                }}
                                                                className="py-1.5 px-2.5 rounded border border-stone-300 text-stone-700 text-[10px] font-semibold text-center hover:border-[#800020] hover:text-[#800020]"
                                                            >
                                                                Página
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="w-full py-3 rounded-xl bg-[#800020] text-white text-xs font-bold uppercase tracking-wider text-center cursor-pointer shadow-md mt-2"
                            >
                                ✨ Ver Todas las Actividades (1 a 9)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
