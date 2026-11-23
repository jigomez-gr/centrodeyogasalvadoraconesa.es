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
} from "lucide-react";
import { triggerCrmChat } from "@/components/ChatBubbleWidget";
import { triggerVapiCall } from "@/components/VapiCallModal";
import { isPorVapiEnabled } from "@/lib/featureFlags";
import { ACTIVITY_CATEGORIES, ActivityCategory, ActivityItem } from "@/lib/activityMenuData";

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
    const [mobileOpenCatId, setMobileOpenCatId] = useState<string | null>("yoga-meditacion");

    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const desktopDropdownRef = useRef<HTMLDivElement | null>(null);

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

    // Close desktop dropdown on outside click or Esc key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && target.closest("[data-hero-actividades-trigger]")) {
                return;
            }
            if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(target as Node)) {
                setIsActividadesOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsActividadesOpen(false);
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
                    setIsActividadesOpen(true);
                }, 60);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(true);
                setMobileActividadesOpen(true);
            }
        };

        window.addEventListener("open-top-actividades-menu", handleOpenTopActividadesMenu);
        window.addEventListener("open-actividades-menu", handleOpenTopActividadesMenu);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("open-top-actividades-menu", handleOpenTopActividadesMenu);
            window.removeEventListener("open-actividades-menu", handleOpenTopActividadesMenu);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        };
    }, []);

    const handleDesktopMouseEnter = () => {
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }
        setIsActividadesOpen(true);
    };

    const handleDesktopMouseLeave = () => {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = setTimeout(() => {
            setIsActividadesOpen(false);
        }, 220);
    };

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

                                    {/* ACTIVIDADES WITH MULTI-LEVEL CASCADING DROPDOWN */}
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

                                        {/* CASCADING MENU PANEL (DESKTOP) */}
                                        {isActividadesOpen && (
                                            <div
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-fadeIn"
                                                style={{ width: "min(780px, calc(100vw - 32px))" }}
                                            >
                                                <div className="bg-white rounded-2xl border border-[#C5A059]/30 shadow-2xl overflow-hidden font-sans">
                                                    {/* Decorative top gold gradient */}
                                                    <div className="h-1 bg-gradient-to-r from-[#800020] via-[#C5A059] to-[#800020]" />

                                                    {/* Header bar */}
                                                    <div className="px-5 py-3 bg-[#0D1F18] text-white flex items-center justify-between border-b border-[#C5A059]/30">
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                                            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C378]">
                                                                Menú en Cascada · Actividades y Disciplinas
                                                            </span>
                                                        </div>
                                                        <span className="text-[11px] text-stone-300 font-medium">
                                                            9 Disciplinas del Centro
                                                        </span>
                                                    </div>

                                                    {/* 2-Column Cascading Body */}
                                                    <div className="grid grid-cols-12 min-h-[390px]">
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
                                                                    onClick={(e) => {
                                                                        setIsActividadesOpen(false);
                                                                        handleNavClick(e, { label: "Actividades", href: "/#itinerario", dayNum: 1 });
                                                                    }}
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

                                                                                    {/* Actions: Direct select to show the activity card below */}
                                                                                    <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleActivitySelect(act.dayNum, act.hrefPortada);
                                                                                            }}
                                                                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#800020] hover:bg-[#96680E] text-white text-[10.5px] font-bold tracking-wide transition cursor-pointer shadow-2xs"
                                                                                            title="Mostrar esta actividad interactiva en la sección de servicios (Segunda Pantalla)"
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
                                                                💡 Pulsa «Mostrar en Portada» para activar la ficha con horarios, vídeos y reserva directa.
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
                    <span className="text-[#C5A059]/40 select-none font-light">|</span>
                    <a
                        href="/servicios"
                        className="text-[#800020] font-extrabold hover:underline transition duration-200"
                    >
                        Reservar Plaza
                    </a>
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
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#1C1C1C] hover:text-[#800020] focus:outline-none p-1 cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-700" />}
                    </button>
                    <a href="/" onClick={handleInicioClick} className="cursor-pointer">
                        <img
                            src="/imagenes/logo/logo.png"
                            alt="Centro de Yoga Salvadora Conesa en Fuenlabrada"
                            className="h-11 w-auto object-contain transition duration-200"
                        />
                    </a>
                </div>

                {/* Center: Brand TEXT */}
                <div className="flex-1 flex flex-col items-center justify-center select-none text-center px-2 leading-tight min-w-0">
                    <span className="text-[8.5px] xs:text-[9.5px] tracking-wider text-[#96680E] uppercase font-extrabold truncate max-w-full">
                        CENTRO DE YOGA FUENLABRADA
                    </span>
                    <span className="font-serif text-[15px] xs:text-[18px] font-black text-[#800020] uppercase tracking-wide leading-none mt-1 font-editorial truncate max-w-full">
                        Salvadora Conesa
                    </span>
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

                            if (isActividades) {
                                return (
                                    <div key={item.label} className="pt-1 pb-1">
                                        {/* Multi-level accordion for mobile/tablets */}
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
                            Reservar Plaza
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
