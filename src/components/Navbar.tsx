"use client";

import { useState, useEffect, useRef } from "react";
import {
    Menu,
    X,
    PhoneCall,
    ChevronDown,
    ChevronRight,
    Sparkles,
    Eye,
    ArrowRight,
    Compass,
    Ticket,
    CalendarCheck,
} from "lucide-react";
import { triggerCrmChat } from "@/components/ChatBubbleWidget";
import { triggerVapiCall } from "@/components/VapiCallModal";
import { isPorVapiEnabled } from "@/lib/featureFlags";
import { ACTIVITY_CATEGORIES, ActivityCategory, ActivityItem } from "@/lib/activityMenuData";
import {
    RESERVAS_CATEGORIES,
    RESERVAS_TYPE_SHORTCUTS,
    ReservaCategory,
    ReservaItem,
} from "@/lib/reservasMenuData";

interface MenuItem {
    label: string;
    href: string;
    dayNum?: number;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isActividadesOpen, setIsActividadesOpen] = useState(false);
    const [activeCatId, setActiveCatId] = useState<string>("yoga-meditacion");
    const [mobileActividadesOpen, setMobileActividadesOpen] = useState(true);
    const [mobileOpenCatId, setMobileOpenCatId] = useState<string | null>(null);

    const [isReservarOpen, setIsReservarOpen] = useState(false);
    const [activeReservarCatId, setActiveReservarCatId] = useState<string>("yoga_meditacion");
    const [mobileReservarOpen, setMobileReservarOpen] = useState(true);
    const [mobileOpenReservarCatId, setMobileOpenReservarCatId] = useState<string | null>(null);

    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const desktopDropdownRef = useRef<HTMLDivElement | null>(null);

    const leaveReservarTimerRef = useRef<NodeJS.Timeout | null>(null);
    const desktopReservarDropdownRef = useRef<HTMLDivElement | null>(null);

    const showPorVapi = isPorVapiEnabled();

    const menuItems: MenuItem[] = [
        { label: "Inicio", href: "/#inicio" },
        { label: "Sobre Mí", href: "/#sobre-mi" },
        { label: "Yoga Terapéutico", href: "/#dia-1", dayNum: 1 },
        { label: "Baños del Gong", href: "/#dia-3", dayNum: 3 },
        { label: "Actividades", href: "/#itinerario", dayNum: 1 },
        { label: "Testimonios", href: "/#testimonios" },
        { label: "Qué Incluye", href: "/#incluye" },
        { label: "Plazas y Precios", href: "/#precios" },
        { label: "Consultas / Reservas por Email ó Wassap o Telegram", href: "/#contacto" },
    ];

    // Close desktop dropdowns on outside click or Esc key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.closest("[data-hero-actividades-trigger]") ||
                    target.closest("[data-hero-reservar-trigger]"))
            ) {
                return;
            }
            if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(target as Node)) {
                setIsActividadesOpen(false);
            }
            if (
                desktopReservarDropdownRef.current &&
                !desktopReservarDropdownRef.current.contains(target as Node)
            ) {
                setIsReservarOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsActividadesOpen(false);
                setIsReservarOpen(false);
            }
        };

        const handleOpenTopActividadesMenu = (e?: Event) => {
            if (e) {
                e.stopPropagation();
            }

            const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1280;

            if (isDesktop) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setIsReservarOpen(false);
                    setIsActividadesOpen(true);
                }, 60);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(true);
                setMobileActividadesOpen(true);
                setMobileOpenCatId(null);
            }
        };

        const handleOpenTopReservarMenu = (e?: Event) => {
            if (e) {
                e.stopPropagation();
            }

            const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1280;

            if (isDesktop) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setIsActividadesOpen(false);
                    setIsReservarOpen(true);
                }, 60);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(true);
                setMobileReservarOpen(true);
                setMobileOpenReservarCatId(null);
            }
        };

        window.addEventListener("open-top-actividades-menu", handleOpenTopActividadesMenu);
        window.addEventListener("open-actividades-menu", handleOpenTopActividadesMenu);
        window.addEventListener("open-top-reservar-menu", handleOpenTopReservarMenu);
        window.addEventListener("open-reservar-menu", handleOpenTopReservarMenu);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("open-top-actividades-menu", handleOpenTopActividadesMenu);
            window.removeEventListener("open-actividades-menu", handleOpenTopActividadesMenu);
            window.removeEventListener("open-top-reservar-menu", handleOpenTopReservarMenu);
            window.removeEventListener("open-reservar-menu", handleOpenTopReservarMenu);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
            if (leaveReservarTimerRef.current) clearTimeout(leaveReservarTimerRef.current);
        };
    }, []);

    const handleDesktopMouseEnter = () => {
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }
        setIsReservarOpen(false);
        setIsActividadesOpen(true);
    };

    const handleDesktopMouseLeave = () => {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = setTimeout(() => {
            setIsActividadesOpen(false);
        }, 220);
    };

    const handleReservarMouseEnter = () => {
        if (leaveReservarTimerRef.current) {
            clearTimeout(leaveReservarTimerRef.current);
            leaveReservarTimerRef.current = null;
        }
        setIsActividadesOpen(false);
        setIsReservarOpen(true);
    };

    const handleReservarMouseLeave = () => {
        if (leaveReservarTimerRef.current) clearTimeout(leaveReservarTimerRef.current);
        leaveReservarTimerRef.current = setTimeout(() => {
            setIsReservarOpen(false);
        }, 220);
    };

    // Handler para selección de ACTIVIDADES (lleva a #itinerario en portada)
    const handleActivitySelect = (dayNum: number, hrefPortada: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsActividadesOpen(false);
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

    const handleNavClick = (e: React.MouseEvent, item: MenuItem) => {
        const isInicio = item.label.toLowerCase() === "inicio";
        if (typeof window !== "undefined") {
            if (isInicio) {
                e.preventDefault();
                if (window.location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (window.location.hash) {
                        history.replaceState(null, "", "/");
                    }
                } else {
                    window.location.href = "/";
                }
                return;
            }

            if (item.dayNum !== undefined) {
                if (window.location.pathname === "/") {
                    e.preventDefault();
                    const hashTarget = item.href.replace("/", "");
                    window.history.replaceState(null, "", hashTarget);
                    window.dispatchEvent(new CustomEvent("select-activity-day", { detail: item.dayNum }));
                    const el = document.getElementById("itinerario");
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    return;
                }
            }
        }
    };

    const handleInicioClick = (e: React.MouseEvent) => handleNavClick(e, { label: "Inicio", href: "/#inicio" });

    const currentCategory = ACTIVITY_CATEGORIES.find((c) => c.id === activeCatId) || ACTIVITY_CATEGORIES[0];
    const currentReservarCategory =
        RESERVAS_CATEGORIES.find((c) => c.code === activeReservarCatId || c.id === activeReservarCatId) ||
        RESERVAS_CATEGORIES[0];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#C5A059]/15 shadow-sm font-sans">
            {/* Desktop Centered Header Layout */}
            <div className="hidden xl:flex flex-col items-center pt-2.5 pb-2.5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                {/* Logo Image absolutely positioned on top left */}
                <a
                    href="/"
                    onClick={handleInicioClick}
                    className="absolute left-6 lg:left-8 top-2.5 group select-none cursor-pointer z-10"
                    title="Centro de Yoga Salvadora Conesa - Inicio"
                >
                    <img
                        src="/imagenes/logo/logo.png"
                        alt="Centro de Yoga Salvadora Conesa en Fuenlabrada"
                        className="h-[52px] w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                </a>

                {/* Centered Brand Text Block */}
                <a href="/" onClick={handleInicioClick} className="flex flex-col items-center leading-tight mb-2.5 select-none cursor-pointer">
                    <div className="flex items-center space-x-1.5 text-[10px] tracking-widest text-[#96680E] uppercase font-extrabold">
                        <span>CENTRO DE YOGA FUENLABRADA</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#800020] tracking-wide uppercase font-editorial">
                        Salvadora Conesa
                    </h2>
                </a>

                {/* Submenu links with vertical pipes */}
                <nav className="flex items-center justify-center space-x-2.5 lg:space-x-3.5 xl:space-x-4 text-[10px] xl:text-[10.5px] font-bold uppercase tracking-widest text-stone-600">
                    {menuItems.map((item, idx) => {
                        const isInicio = item.label.toLowerCase() === "inicio";
                        const isActividades = item.label.toLowerCase() === "actividades";

                        if (isActividades) {
                            return (
                                <span key={item.label} className="flex items-center space-x-2.5 lg:space-x-3.5 xl:space-x-4">
                                    {idx > 0 && <span className="text-[#C5A059]/40 select-none font-light">|</span>}

                                    {/* 1. ACTIVIDADES (LLEVA AL ITINERARIO DE LA PORTADA) */}
                                    <div
                                        ref={desktopDropdownRef}
                                        className="relative inline-flex items-center"
                                        onMouseEnter={handleDesktopMouseEnter}
                                        onMouseLeave={handleDesktopMouseLeave}
                                    >
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                setIsActividadesOpen((prev) => !prev);
                                                setIsReservarOpen(false);
                                            }}
                                            aria-expanded={isActividadesOpen}
                                            className={`hover:text-[#800020] transition duration-200 inline-flex items-center gap-1 cursor-pointer font-extrabold py-1 ${
                                                isActividadesOpen ? "text-[#800020]" : ""
                                            }`}
                                        >
                                            <span>Actividades</span>
                                            <ChevronDown
                                                className={`w-3 h-3 text-[#C5A059] transition-transform duration-200 ${
                                                    isActividadesOpen ? "rotate-180 text-[#800020]" : ""
                                                }`}
                                            />
                                        </button>

                                        {/* CASCADING MENU PANEL (DESKTOP - ACTIVIDADES ITINERARIO PORTADA) */}
                                        {isActividadesOpen && (
                                            <div
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-fadeIn"
                                                style={{ width: "min(780px, calc(100vw - 32px))" }}
                                            >
                                                <div className="bg-white rounded-2xl border border-[#C5A059]/30 shadow-2xl overflow-hidden font-sans">
                                                    <div className="h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020]" />

                                                    {/* Header bar */}
                                                    <div className="px-5 py-3 bg-[#0D1F18] text-white flex items-center justify-between border-b border-[#C5A059]/30">
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                                            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C378]">
                                                                Menú en Cascada · Actividades en Portada
                                                            </span>
                                                        </div>
                                                        <span className="text-[11px] text-stone-300 font-medium">
                                                            9 Disciplinas del Itinerario
                                                        </span>
                                                    </div>

                                                    {/* 2-Column Cascading Body */}
                                                    <div className="grid grid-cols-12 min-h-[390px]">
                                                        {/* Left Column: Categorías */}
                                                        <div className="col-span-5 bg-[#FAF9F6] p-3 border-r border-stone-200 flex flex-col justify-between">
                                                            <div className="space-y-1.5">
                                                                <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                                                                    Áreas en Portada
                                                                </div>
                                                                {ACTIVITY_CATEGORIES.map((cat) => {
                                                                    const isActive = activeCatId === cat.id;
                                                                    return (
                                                                        <button
                                                                            key={cat.id}
                                                                            type="button"
                                                                            onMouseEnter={() => setActiveCatId(cat.id)}
                                                                            onClick={() => setActiveCatId(cat.id)}
                                                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition duration-150 cursor-pointer ${
                                                                                isActive
                                                                                    ? "bg-white text-[#800020] shadow-sm font-bold border border-[#C5A059]/40"
                                                                                    : "text-stone-700 hover:bg-stone-200/50 hover:text-stone-900"
                                                                            }`}
                                                                        >
                                                                            <div className="flex items-center gap-2.5 truncate">
                                                                                <span className="text-base">{cat.icon}</span>
                                                                                <div>
                                                                                    <div className="text-xs font-semibold leading-tight truncate">
                                                                                        {cat.name}
                                                                                    </div>
                                                                                    <div className="text-[10px] text-stone-400 font-normal">
                                                                                        {cat.activities.length} disciplinas
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <ChevronRight
                                                                                className={`w-3.5 h-3.5 transition ${
                                                                                    isActive ? "text-[#800020] translate-x-0.5" : "text-stone-400 opacity-60"
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
                                                                    onClick={(e) => {
                                                                        setIsActividadesOpen(false);
                                                                        handleNavClick(e, { label: "Actividades", href: "/#itinerario", dayNum: 1 });
                                                                    }}
                                                                    className="w-full py-2.5 px-3 text-center rounded-xl bg-stone-100 hover:bg-[#800020] hover:text-white text-[#800020] text-[11px] font-bold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                                                                >
                                                                    <Compass className="w-3.5 h-3.5" />
                                                                    <span>Ver Itinerario Completo (1 a 9)</span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Right Column: Actividades */}
                                                        <div className="col-span-7 p-4 bg-white flex flex-col justify-between">
                                                            {currentCategory && (
                                                                <div className="space-y-3">
                                                                    <div className="pb-2 border-b border-stone-100">
                                                                        <div className="flex items-center justify-between">
                                                                            <h4 className="text-sm font-bold text-[#800020] font-editorial">
                                                                                {currentCategory.icon} {currentCategory.name}
                                                                            </h4>
                                                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#FAF9F6] border border-[#C5A059]/30 text-[#96680E] rounded-full">
                                                                                {currentCategory.activities.length} disciplinas
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-[11px] text-stone-500 mt-0.5">
                                                                            {currentCategory.shortDesc}
                                                                        </p>
                                                                    </div>

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

                                                                                <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            handleActivitySelect(act.dayNum, act.hrefPortada);
                                                                                        }}
                                                                                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#800020] hover:bg-[#96680E] text-white text-[10.5px] font-bold tracking-wide transition cursor-pointer shadow-2xs"
                                                                                        title="Mostrar esta actividad en el itinerario de portada"
                                                                                    >
                                                                                        <Eye className="w-3.5 h-3.5 text-[#E5C378]" />
                                                                                        <span>Mostrar en Portada (#dia-{act.dayNum})</span>
                                                                                    </button>
                                                                                    <a
                                                                                        href={act.hrefDedicated}
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setIsActividadesOpen(false);
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
                                                                💡 Pulsa «Mostrar en Portada» para activar la ficha con horarios, vídeos y recorrido del centro.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </span>
                            );
                        }

                        return (
                            <span key={item.label} className="flex items-center space-x-2.5 lg:space-x-3.5 xl:space-x-4">
                                {idx > 0 && <span className="text-[#C5A059]/40 select-none font-light">|</span>}
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item)}
                                    className={`hover:text-[#800020] transition duration-200 ${isInicio ? "cursor-pointer font-extrabold text-[#800020]" : ""}`}
                                >
                                    {item.label}
                                </a>
                            </span>
                        );
                    })}

                    {/* 2. RESERVAR PLAZA (LLEVA A LA OTRA PANTALLA: /servicios CON CATÁLOGO DE RESERVAS) */}
                    <span className="text-[#C5A059]/40 select-none font-light">|</span>
                    <div
                        ref={desktopReservarDropdownRef}
                        className="relative inline-flex items-center"
                        onMouseEnter={handleReservarMouseEnter}
                        onMouseLeave={handleReservarMouseLeave}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                setIsReservarOpen((prev) => !prev);
                                setIsActividadesOpen(false);
                            }}
                            aria-expanded={isReservarOpen}
                            className={`hover:text-[#96680E] transition duration-200 inline-flex items-center gap-1 cursor-pointer font-extrabold py-1 text-[#800020] ${
                                isReservarOpen ? "text-[#96680E] underline" : ""
                            }`}
                        >
                            <span>Reservar Plaza</span>
                            <ChevronDown
                                className={`w-3 h-3 text-[#C5A059] transition-transform duration-200 ${
                                    isReservarOpen ? "rotate-180 text-[#800020]" : ""
                                }`}
                            />
                        </button>

                        {/* CASCADING RESERVATION MENU PANEL (DESKTOP - PANTALLA /servicios) */}
                        {isReservarOpen && (
                            <div
                                className="absolute top-full right-0 pt-2.5 z-50 animate-fadeIn"
                                style={{ width: "min(840px, calc(100vw - 32px))" }}
                            >
                                <div className="bg-white rounded-2xl border border-[#C5A059]/30 shadow-2xl overflow-hidden font-sans">
                                    <div className="h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020]" />

                                    {/* Header bar */}
                                    <div className="px-5 py-3 bg-[#0D1F18] text-white flex items-center justify-between border-b border-[#C5A059]/30">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="w-4 h-4 text-[#D4AF37]" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C378]">
                                                Menú en Cascada · Opciones de Reserva (/servicios)
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-stone-300 font-medium">
                                            Catálogo Oficial de Tarifas y Cuotas
                                        </span>
                                    </div>

                                    {/* 2-Column Cascading Body */}
                                    <div className="grid grid-cols-12 min-h-[410px]">
                                        {/* Left Column: Categorías de Reserva */}
                                        <div className="col-span-5 bg-[#FAF9F6] p-3 border-r border-stone-200 flex flex-col justify-between">
                                            <div className="space-y-1.5">
                                                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                                                    Categorías de Reserva
                                                </div>
                                                {RESERVAS_CATEGORIES.map((cat) => {
                                                    const isActive =
                                                        activeReservarCatId === cat.code ||
                                                        activeReservarCatId === cat.id;
                                                    return (
                                                        <div
                                                            key={cat.id || cat.code}
                                                            onMouseEnter={() => setActiveReservarCatId(cat.code)}
                                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition duration-150 ${
                                                                isActive
                                                                    ? "bg-white text-[#800020] shadow-sm font-bold border border-[#C5A059]/40"
                                                                    : "text-stone-700 hover:bg-stone-200/50 hover:text-stone-900"
                                                            }`}
                                                        >
                                                            <a
                                                                href={cat.hrefCategory}
                                                                onClick={() => setIsReservarOpen(false)}
                                                                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                                                            >
                                                                <span className="text-base shrink-0">{cat.icon}</span>
                                                                <div className="min-w-0">
                                                                    <div className="text-xs font-semibold leading-tight truncate">
                                                                        {cat.name}
                                                                    </div>
                                                                    <div className="text-[10px] text-stone-400 font-normal">
                                                                        {cat.services.length} servicios en catálogo
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a
                                                                href={cat.hrefCategory}
                                                                onClick={() => setIsReservarOpen(false)}
                                                                title={`Ir a ${cat.name}`}
                                                                className="p-1 cursor-pointer"
                                                            >
                                                                <ChevronRight
                                                                    className={`w-3.5 h-3.5 shrink-0 transition ${
                                                                        isActive ? "text-[#800020] translate-x-0.5" : "text-stone-400 opacity-60"
                                                                    }`}
                                                                />
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Accesos rápidos por Tipo de Reserva */}
                                            <div className="pt-2.5 border-t border-stone-200 mt-2 space-y-1">
                                                <div className="text-[9.5px] font-bold uppercase tracking-wider text-stone-400 px-1">
                                                    Filtrar Catálogo por Tipo:
                                                </div>
                                                <div className="grid grid-cols-2 gap-1 text-[10px]">
                                                    {RESERVAS_TYPE_SHORTCUTS.map((sc) => (
                                                        <a
                                                            key={sc.label}
                                                            href={sc.href}
                                                            onClick={() => setIsReservarOpen(false)}
                                                            className="px-2 py-1.5 rounded-lg bg-stone-100 hover:bg-[#800020] hover:text-white text-stone-700 font-semibold truncate transition text-center"
                                                        >
                                                            {sc.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Servicios de la categoría seleccionada */}
                                        <div className="col-span-7 p-4 bg-white flex flex-col justify-between">
                                            {currentReservarCategory && (
                                                <div className="space-y-3">
                                                    <div className="pb-2 border-b border-stone-100 flex items-start justify-between gap-2">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-sm font-bold text-[#800020] font-editorial">
                                                                    {currentReservarCategory.icon} {currentReservarCategory.name}
                                                                </h4>
                                                            </div>
                                                            <p className="text-[11px] text-stone-500 mt-0.5">
                                                                {currentReservarCategory.shortDesc}
                                                            </p>
                                                        </div>
                                                        <a
                                                            href={currentReservarCategory.hrefCategory}
                                                            onClick={() => setIsReservarOpen(false)}
                                                            className="text-[10px] font-bold text-[#800020] hover:text-white hover:bg-[#800020] shrink-0 bg-stone-50 px-2.5 py-1.5 rounded-md border border-stone-200 transition"
                                                        >
                                                            Ver {currentReservarCategory.services.length} servicios desplegados →
                                                        </a>
                                                    </div>

                                                    {/* Listado de Opciones de Reserva con Precio */}
                                                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                                        {currentReservarCategory.services.map((reserva) => (
                                                            <div
                                                                key={reserva.id}
                                                                className="p-3 rounded-xl border border-stone-200 hover:border-[#800020] hover:shadow-sm transition bg-[#FAF9F6]/60 hover:bg-white flex flex-col justify-between gap-2"
                                                            >
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div className="flex items-start gap-2">
                                                                        <span className="text-base shrink-0 mt-0.5">{reserva.icon}</span>
                                                                        <div>
                                                                            <h5 className="text-xs font-bold text-stone-900 leading-snug">
                                                                                {reserva.title}
                                                                            </h5>
                                                                            <p className="text-[10.5px] text-stone-600 leading-relaxed mt-0.5">
                                                                                {reserva.subtitle}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right shrink-0">
                                                                        <span className="inline-block text-xs font-black text-[#800020] bg-amber-50 px-2 py-0.5 rounded-md border border-[#C5A059]/40 font-mono">
                                                                            {reserva.price}
                                                                        </span>
                                                                        <span className="block text-[9px] uppercase font-semibold text-emerald-800 mt-0.5">
                                                                            {reserva.badge}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="pt-1.5 border-t border-stone-200/70 flex items-center justify-between gap-2">
                                                                    <span className="text-[9.5px] text-stone-400 italic">
                                                                        Pago seguro en el centro
                                                                    </span>
                                                                    <a
                                                                        href={reserva.href}
                                                                        onClick={() => setIsReservarOpen(false)}
                                                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#800020] hover:bg-[#96680E] text-white text-[10.5px] font-bold tracking-wide transition shadow-2xs"
                                                                        title="Ir a la pantalla de Servicios con esta categoría desplegada"
                                                                    >
                                                                        <Ticket className="w-3.5 h-3.5 text-[#E5C378]" />
                                                                        <span>Ver Servicios Desplegados</span>
                                                                        <ArrowRight className="w-3 h-3" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-2 text-[10px] text-stone-400 italic text-center border-t border-stone-100 mt-2">
                                                💡 Al pulsar, vas a la pantalla de servicios con los servicios de esta categoría desplegados.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {showPorVapi && (
                        <>
                            <span className="text-[#C5A059]/40 select-none font-light">|</span>
                            <button
                                type="button"
                                onClick={() => triggerVapiCall({ inquiry: "Consulta general sobre servicios y horarios" })}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#C5A059]/50 text-[#800020] hover:bg-[#800020] hover:text-white bg-[#FAF9F6] transition duration-200 cursor-pointer text-[10px] font-extrabold uppercase tracking-wider shadow-2xs group"
                                title="Pedir llamada inmediata gratuita con nuestro Asistente de Voz"
                            >
                                <PhoneCall className="w-3 h-3 text-[#C5A059] group-hover:text-white transition-colors" />
                                <span>Te Llamamos</span>
                            </button>
                        </>
                    )}
                </nav>
            </div>

            {/* Mobile / Tablet Header Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between xl:hidden relative h-[64px]">
                {/* Left side: Hamburger button + Logo */}
                <div className="flex items-center space-x-2 select-none shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#800020] hover:text-[#96680E] focus:outline-none p-1.5 rounded-lg cursor-pointer"
                        aria-label="Abrir menú de navegación"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <a href="/" onClick={handleInicioClick} className="flex items-center space-x-2 select-none cursor-pointer">
                        <img
                            src="/imagenes/logo/logo.png"
                            alt="Logo Salvadora Conesa"
                            className="h-10 w-auto object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-[8.5px] tracking-wider text-[#96680E] uppercase font-black leading-tight">
                                Centro de Yoga Fuenlabrada
                            </span>
                            <span className="font-serif text-sm font-bold text-[#800020] tracking-wide uppercase font-editorial leading-tight">
                                Salvadora Conesa
                            </span>
                        </div>
                    </a>
                </div>

                {/* Right side spacer to balance layout */}
                <div className="w-[76px] shrink-0" aria-hidden="true" />
            </div>

            {/* Mobile / Tablet Drawer Overlay */}
            {isOpen && (
                <div className="xl:hidden bg-white border-t border-[#C5A059]/15 py-4 px-4 sm:px-6 absolute top-full left-0 right-0 shadow-xl max-h-[85vh] overflow-y-auto animate-slideDown">
                    <nav className="flex flex-col space-y-3 font-semibold text-xs uppercase tracking-widest text-[#1C1C1C]/75">
                        {menuItems.map((item) => {
                            const isInicio = item.label.toLowerCase() === "inicio";
                            const isActividades = item.label.toLowerCase() === "actividades";
                            const isBanosGong =
                                item.label.toLowerCase().includes("baños del gong") ||
                                item.label.toLowerCase().includes("baño de gong");

                            // Requisito 2 & 3: En móviles, sustituimos el enlace directo "Baños del Gong" por "RESERVAR PLAZA (MENÚ EN CASCADA /servicios)"
                            if (isBanosGong) {
                                return (
                                    <div key="reservar-plaza-mobile" className="pt-1 pb-1">
                                        <div className="border border-[#C5A059]/30 rounded-xl overflow-hidden bg-stone-50/70">
                                            <button
                                                type="button"
                                                onClick={() => setMobileReservarOpen((prev) => !prev)}
                                                className="w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider text-[#800020] bg-white cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Ticket className="w-4 h-4 text-[#C5A059]" />
                                                    <span>Reservar Plaza (Menú en Cascada)</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-[#C5A059] transition-transform duration-200 ${
                                                        mobileReservarOpen ? "rotate-180 text-[#800020]" : ""
                                                    }`}
                                                />
                                            </button>

                                            {mobileReservarOpen && (
                                                <div className="p-2 space-y-2 bg-[#FAF9F6] border-t border-[#C5A059]/20">
                                                    {RESERVAS_CATEGORIES.map((cat) => {
                                                        const isCatOpen = mobileOpenReservarCatId === cat.code;
                                                        return (
                                                            <div key={cat.code} className="bg-white rounded-lg border border-stone-200/80 overflow-hidden">
                                                                <div className="w-full flex items-center justify-between p-2.5 text-left text-xs font-bold text-stone-800">
                                                                    <a
                                                                        href={cat.hrefCategory}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="flex items-center gap-2 hover:text-[#800020] flex-1 truncate cursor-pointer"
                                                                    >
                                                                        <span>{cat.icon}</span>
                                                                        <span className="truncate">{cat.name}</span>
                                                                        <span className="text-[10px] text-stone-400 font-normal">
                                                                            ({cat.services.length})
                                                                        </span>
                                                                    </a>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setMobileOpenReservarCatId(isCatOpen ? null : cat.code)}
                                                                        className="p-1 text-stone-400 hover:text-[#800020] cursor-pointer shrink-0"
                                                                        aria-label={`Desplegar subopciones de ${cat.name}`}
                                                                    >
                                                                        <ChevronDown
                                                                            className={`w-4 h-4 transition-transform ${
                                                                                isCatOpen ? "rotate-180 text-[#800020]" : ""
                                                                            }`}
                                                                        />
                                                                    </button>
                                                                </div>

                                                                {isCatOpen && (
                                                                    <div className="p-2.5 pt-0 space-y-2 border-t border-stone-100">
                                                                        {cat.services.map((reserva) => (
                                                                            <div
                                                                                key={reserva.id}
                                                                                className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 hover:border-[#800020] hover:bg-white transition flex flex-col gap-1.5"
                                                                            >
                                                                                <div className="flex items-start justify-between gap-1">
                                                                                    <div>
                                                                                        <div className="flex items-center gap-1.5">
                                                                                            <span className="text-xs">{reserva.icon}</span>
                                                                                            <span className="font-bold text-[11px] text-stone-900 leading-snug">
                                                                                                {reserva.title}
                                                                                            </span>
                                                                                        </div>
                                                                                        <p className="text-[10.5px] text-stone-600 mt-0.5 leading-relaxed">
                                                                                            {reserva.subtitle}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="text-right shrink-0">
                                                                                        <span className="inline-block text-[11px] font-black text-[#800020] bg-amber-50 px-2 py-0.5 rounded border border-[#C5A059]/40 font-mono">
                                                                                            {reserva.price}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                                <a
                                                                                    href={reserva.href}
                                                                                    onClick={() => setIsOpen(false)}
                                                                                    className="w-full py-1.5 px-2 rounded bg-[#800020] hover:bg-[#96680E] text-white text-[10px] font-bold text-center cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                                                                                >
                                                                                    <Ticket className="w-3 h-3 text-[#E5C378]" />
                                                                                    <span>Ver Servicios Desplegados</span>
                                                                                    <ArrowRight className="w-3 h-3" />
                                                                                </a>
                                                                            </div>
                                                                        ))}

                                                                        <a
                                                                            href={cat.hrefCategory}
                                                                            onClick={() => setIsOpen(false)}
                                                                            className="block w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-[#800020] text-stone-700 hover:text-white text-[10.5px] font-bold text-center transition"
                                                                        >
                                                                            Ver los {cat.services.length} servicios desplegados →
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}

                                                    <a
                                                        href="/servicios"
                                                        onClick={() => setIsOpen(false)}
                                                        className="block w-full py-2.5 rounded-lg bg-[#800020] text-white text-[11px] font-bold uppercase tracking-wider text-center cursor-pointer shadow-xs"
                                                    >
                                                        📋 Ver Catálogo Completo de Reservas (/servicios)
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            // ACTIVIDADES (Itinerario de portada)
                            if (isActividades) {
                                return (
                                    <div key={item.label} className="pt-1 pb-1">
                                        <div className="border border-[#C5A059]/30 rounded-xl overflow-hidden bg-stone-50/70">
                                            <button
                                                type="button"
                                                onClick={() => setMobileActividadesOpen((prev) => !prev)}
                                                className="w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider text-[#800020] bg-white cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                                                    <span>Actividades (Menú en Cascada)</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-[#C5A059] transition-transform duration-200 ${
                                                        mobileActividadesOpen ? "rotate-180 text-[#800020]" : ""
                                                    }`}
                                                />
                                            </button>

                                            {mobileActividadesOpen && (
                                                <div className="p-2 space-y-2 bg-[#FAF9F6] border-t border-[#C5A059]/20">
                                                    {ACTIVITY_CATEGORIES.map((cat) => {
                                                        const isCatOpen = mobileOpenCatId === cat.id;
                                                        return (
                                                            <div key={cat.id} className="bg-white rounded-lg border border-stone-200/80 overflow-hidden">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setMobileOpenCatId(isCatOpen ? null : cat.id)}
                                                                    className="w-full flex items-center justify-between p-2.5 text-left text-xs font-bold text-stone-800 hover:text-[#800020] cursor-pointer"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span>{cat.icon}</span>
                                                                        <span>{cat.name}</span>
                                                                        <span className="text-[10px] text-stone-400 font-normal">
                                                                            ({cat.activities.length})
                                                                        </span>
                                                                    </div>
                                                                    <ChevronDown
                                                                        className={`w-3.5 h-3.5 text-stone-400 transition-transform ${
                                                                            isCatOpen ? "rotate-180 text-[#800020]" : ""
                                                                        }`}
                                                                    />
                                                                </button>

                                                                {isCatOpen && (
                                                                    <div className="p-2.5 pt-0 space-y-2 border-t border-stone-100">
                                                                        {cat.activities.map((act) => (
                                                                            <div
                                                                                key={act.dayNum}
                                                                                onClick={() => handleActivitySelect(act.dayNum, act.hrefPortada)}
                                                                                className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 hover:border-[#800020] hover:bg-white cursor-pointer transition"
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
                                                        onClick={(e) => {
                                                            setIsOpen(false);
                                                            handleNavClick(e, { label: "Actividades", href: "/#itinerario", dayNum: 1 });
                                                        }}
                                                        className="w-full py-2.5 rounded-lg bg-[#800020] text-white text-[11px] font-bold uppercase tracking-wider text-center cursor-pointer shadow-xs"
                                                    >
                                                        ✨ Ver Todas las Actividades (1 a 9)
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        setIsOpen(false);
                                        handleNavClick(e, item);
                                    }}
                                    className={`hover:text-[#800020] py-1 transition ${isInicio ? "font-extrabold text-[#800020]" : ""}`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}

                        {showPorVapi && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    triggerVapiCall({ inquiry: "Consulta general sobre servicios y horarios" });
                                }}
                                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#C5A059] rounded text-xs font-bold uppercase tracking-widest text-[#800020] bg-[#FAF9F6] hover:bg-[#800020] hover:text-white transition shadow-xs cursor-pointer"
                            >
                                <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                                <span>Te Llamamos Gratis (IA)</span>
                            </button>
                        )}
                        <a
                            href="/servicios"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center py-2.5 border border-transparent rounded text-xs font-bold uppercase tracking-widest text-white bg-[#800020] hover:bg-[#800020]/90 transition"
                        >
                            Ver Todas las Plazas y Tarifas
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
