"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";

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
    <div className="space-y-3.5 sm:space-y-4 mb-3.5 sm:mb-4 font-sans">
      {/* Bloque WhatsApp 24/7 */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-[#25D366]/35 rounded-2xl p-4 sm:p-5 shadow-sm shadow-emerald-900/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
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
        <div className="w-full sm:w-auto shrink-0">
          <a
            href={wassapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#25D366]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chatear por WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Bloque Telegram 24/7 (Análogo al de WhatsApp) */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-[#0088cc]/35 rounded-2xl p-4 sm:p-5 shadow-sm shadow-sky-900/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
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
        <div className="w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleTelegramConnect}
            disabled={tgConnecting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#0088cc]/25 hover:scale-102 active:scale-98 transition duration-200 cursor-pointer disabled:opacity-60"
          >
            {tgConnecting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 fill-current" />
            )}
            <span>Chatear por Telegram</span>
          </button>
        </div>
      </div>
    </div>
  );
}
