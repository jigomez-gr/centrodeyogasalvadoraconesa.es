"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Send, Loader2, Play, X } from "lucide-react";

interface VideoHelpModalData {
  type: "whatsapp" | "telegram";
  title: string;
  description: string;
  src: string;
  poster: string;
}

export default function WhatsAppQuickBanner() {
  const rawNumber =
    process.env.NEXT_PUBLIC_NUMEROWASSAP ||
    process.env.NUMEROWASSAP ||
    "34 646 03 42 31";

  const cleanNumber = rawNumber.replace(/\D/g, "");
  const formattedDisplay = rawNumber.trim().startsWith("+")
    ? rawNumber.trim()
    : `+${rawNumber.trim()}`;

  const wassapUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "🤖 ¡Hola! Soy el asistente virtual del Centro de Yoga Salvadora Conesa. ¿En qué puedo ayudarte hoy?"
  )}`;

  const [botUsername, setBotUsername] = useState<string>(
    (process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "").replace(/^@/, "")
  );
  const [tgConnecting, setTgConnecting] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoHelpModalData | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/crm/services")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (data.telegramBotUsername) {
          setBotUsername(String(data.telegramBotUsername).replace(/^@/, ""));
        }
      })
      .catch(() => null);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const handleTelegramConnect = async () => {
    setTgConnecting(true);
    const crmApiUrl =
      process.env.NEXT_PUBLIC_CRM_API_URL || "https://crm-salvadoraconesa.jigretera.com";
    const sessionId =
      (typeof window !== "undefined" && localStorage.getItem("crm_widget_session_id")) ||
      "web_guest";

    let storedName = "";
    let storedPhone = "";
    let storedEmail = "";
    try {
      const rawSim = localStorage.getItem("salvadora_simulador_diagnostico_v1");
      if (rawSim) {
        const parsed = JSON.parse(rawSim);
        storedName = parsed?.nombre || "";
        storedPhone = parsed?.telefono || "";
        storedEmail = parsed?.correo || "";
      }
    } catch {}

    try {
      const res = await fetch(`${crmApiUrl}/api/widget/handoff-telegram/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: storedName || undefined,
          phone: storedPhone || undefined,
          email: storedEmail || undefined,
          note: "Conexión iniciada desde el bloque de Telegram en la landing web (#contacto).",
        }),
      });
      const data = await res.json().catch(() => null);
      setTgConnecting(false);

      if (data?.telegramUrl) {
        window.open(data.telegramUrl, "_blank", "noopener,noreferrer");
        return;
      }
    } catch {
      setTgConnecting(false);
    }

    const fallbackBot = botUsername || "SalvadoraConesaBot";
    window.open(`https://t.me/${fallbackBot}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="space-y-3.5 sm:space-y-4 mb-3.5 sm:mb-4 font-sans">
        {/* Bloque WhatsApp 24/7 */}
        <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-[#25D366]/35 rounded-2xl p-4 sm:p-5 shadow-sm shadow-emerald-900/5 flex flex-col lg:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#25D366] shadow-sm bg-stone-100 flex items-center justify-center">
                <img
                  src="/imagenes/asistente_whatsapp.png"
                  alt="Asistente Escuela Yoga"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/imagenes/yoga/facebooksalvadora.jpeg";
                  }}
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px] shadow-sm font-bold"
                title="WhatsApp Activo 24/7"
              >
                ✓
              </span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#128C7E] text-[10.5px] font-bold uppercase tracking-wider mb-1">
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>Atención Inmediata 24/7 por WhatsApp</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                ¿Prefieres consultar o reservar al instante por WhatsApp?
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Chatea con nuestro <strong>Asistente Escuela Yoga</strong> al{" "}
                <span className="font-mono font-bold text-[#128C7E]">
                  {formattedDisplay}
                </span>{" "}
                para citas, plazas y consultas inmediatas.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href={wassapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#25D366]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chatear por WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() =>
                setActiveVideo({
                  type: "whatsapp",
                  title: "Ayuda Multimedia • Nuevo Canal de WhatsApp",
                  description:
                    "Vídeo tutorial explicativo sobre cómo consultar y reservar plaza con nuestro Asistente de WhatsApp.",
                  src: "/videos/ayuda/Centro_Yoga_Salvadora_Conesa_Nuevo_Canal_WhatsApp.mp4",
                  poster:
                    "/videos/ayuda/Centro_Yoga_Salvadora_Conesa_Nuevo_Canal_WhatsApp-poster.jpg",
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#128C7E] hover:bg-[#0c6b60] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#128C7E]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer"
              title="Ver vídeo explicativo de ayuda para WhatsApp"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ayuda Multimedia</span>
            </button>
          </div>
        </div>

        {/* Bloque Telegram 24/7 (Análogo al de WhatsApp) */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-[#0088cc]/35 rounded-2xl p-4 sm:p-5 shadow-sm shadow-sky-900/5 flex flex-col lg:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0088cc] shadow-sm bg-stone-100 flex items-center justify-center">
                <img
                  src="/imagenes/asistente_whatsapp.png"
                  alt="Asistente Escuela Yoga Telegram"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/imagenes/yoga/facebooksalvadora.jpeg";
                  }}
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-[10px] shadow-sm font-bold"
                title="Telegram Activo 24/7"
              >
                ✓
              </span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0088cc]/15 text-[#006699] text-[10.5px] font-bold uppercase tracking-wider mb-1">
                <Send className="w-3 h-3 fill-current" />
                <span>Atención Inmediata 24/7 por Telegram</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                ¿Prefieres consultar o reservar al instante por Telegram?
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Chatea con nuestro <strong>Asistente Escuela Yoga</strong> en Telegram
                {botUsername ? (
                  <>
                    {" "}
                    (<span className="font-mono font-bold text-[#006699]">@{botUsername}</span>)
                  </>
                ) : null}{" "}
                para citas, plazas, confirmaciones y consultas inmediatas.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              type="button"
              onClick={handleTelegramConnect}
              disabled={tgConnecting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#0088cc]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer disabled:opacity-60"
            >
              {tgConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 fill-current" />
              )}
              <span>Chatear por Telegram</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveVideo({
                  type: "telegram",
                  title: "Ayuda Multimedia • Asistente en Telegram",
                  description:
                    "Vídeo tutorial explicativo sobre cómo interactuar con el bot asistente oficial en Telegram.",
                  src: "/videos/ayuda/Centro_Yoga_Salvadora_Conesa_Asistente_Telegram.mp4",
                  poster:
                    "/videos/ayuda/Centro_Yoga_Salvadora_Conesa_Asistente_Telegram-poster.jpg",
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#006699] hover:bg-[#004f77] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#006699]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer"
              title="Ver vídeo explicativo de ayuda para Telegram"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ayuda Multimedia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Reproductor de Vídeo de Ayuda Multimedia */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-stone-900 border border-stone-700/80 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col text-white relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-stone-800 bg-stone-950/80">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeVideo.type === "whatsapp"
                      ? "bg-[#25D366]/20 text-[#25D366]"
                      : "bg-[#0088cc]/20 text-[#0088cc]"
                  }`}
                >
                  {activeVideo.type === "whatsapp" ? (
                    <MessageCircle className="w-5 h-5 fill-current" />
                  ) : (
                    <Send className="w-5 h-5 fill-current" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-100 leading-tight">
                    {activeVideo.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-400 hidden sm:block mt-0.5">
                    {activeVideo.description}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition duration-150 cursor-pointer"
                title="Cerrar vídeo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ventana de Reproducción del Vídeo */}
            <div className="relative aspect-video bg-black w-full flex items-center justify-center">
              <video
                key={activeVideo.src}
                src={activeVideo.src}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Footer con Acciones Directas */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-stone-800 bg-stone-950/90 text-xs">
              <span className="text-stone-400 text-center sm:text-left text-[11px] sm:text-xs">
                {activeVideo.type === "whatsapp"
                  ? "Tutorial oficial de uso para el canal de WhatsApp 24/7."
                  : "Tutorial oficial de uso para el asistente de Telegram 24/7."}
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {activeVideo.type === "whatsapp" ? (
                  <a
                    href={wassapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-[#25D366]/20 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Abrir WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      handleTelegramConnect();
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-[#0088cc]/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 fill-current" />
                    <span>Abrir Telegram</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
