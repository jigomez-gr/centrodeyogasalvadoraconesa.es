"use client";

import React, { useState, useEffect } from "react";
import { Send, X, CheckCircle2, User, Phone, Mail, ArrowUpRight, ShieldCheck } from "lucide-react";

interface TelegramBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  note?: string;
  prefillMessage?: string;
}

export default function TelegramBookingModal({
  isOpen,
  onClose,
  serviceName,
  note = "Vinculación con Telegram iniciada desde la landing web.",
  prefillMessage,
}: TelegramBookingModalProps) {
  const [tgName, setTgName] = useState("");
  const [tgPhone, setTgPhone] = useState("");
  const [tgEmail, setTgEmail] = useState("");
  const [tgLoading, setTgLoading] = useState(false);
  const [tgSuccess, setTgSuccess] = useState(false);

  // Pre-fill fields from previous user inputs in diagnostic simulator if available
  useEffect(() => {
    if (isOpen) {
      try {
        const rawSim = localStorage.getItem("salvadora_simulador_diagnostico_v1");
        if (rawSim) {
          const parsed = JSON.parse(rawSim);
          if (parsed?.nombre && !tgName) setTgName(parsed.nombre);
          if (parsed?.telefono && !tgPhone) setTgPhone(parsed.telefono);
          if (parsed?.correo && !tgEmail) setTgEmail(parsed.correo);
        }
      } catch {}
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTelegramHandoff = async (e?: React.FormEvent, directAnonymous = false) => {
    if (e) e.preventDefault();
    setTgLoading(true);

    const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || "https://crm-salvadoraconesa.jigretera.com";
    const currentSession =
      (typeof window !== "undefined" && localStorage.getItem("crm_widget_session_id")) || "web_guest";
    const cleanBot = (process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "escuelayogasalvadoraconesa_bot").replace(/^@/, "");

    const fallbackUrl = prefillMessage
      ? `https://t.me/${cleanBot}?text=${encodeURIComponent(prefillMessage)}`
      : `https://t.me/${cleanBot}`;

    try {
      const res = await fetch(`${CRM_API_URL}/api/widget/handoff-telegram/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentSession,
          name: directAnonymous ? undefined : (tgName.trim() || undefined),
          phone: directAnonymous ? undefined : (tgPhone.trim() || undefined),
          email: directAnonymous ? undefined : (tgEmail.trim() || undefined),
          serviceName: serviceName || undefined,
          note,
        }),
      });

      const data = await res.json().catch(() => ({}));
      setTgLoading(false);

      if (data?.telegramUrl) {
        setTgSuccess(true);
        setTimeout(() => {
          window.open(data.telegramUrl, "_blank", "noopener,noreferrer");
          onClose();
          setTgSuccess(false);
        }, directAnonymous ? 100 : 700);
        return;
      }

      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      onClose();
    } catch {
      setTgLoading(false);
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            onClose();
            setTgSuccess(false);
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sky-600 mb-2">
          <span className="p-2 rounded-xl bg-sky-100">
            <Send className="w-5 h-5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider">
            Conectar con Telegram
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-stone-900 mb-1.5">
          Bot Oficial Centro de Yoga Salvadora Conesa
        </h3>
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          Introduce tu nombre y teléfono o email para <strong>conectar tus avisos por Telegram</strong> (recibirás confirmaciones y recordatorios al pulsar <strong>Iniciar</strong> en el bot), o abre el bot directamente.
        </p>

        {serviceName && (
          <div className="mb-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
            <span className="text-stone-500">Actividad:</span>
            <span className="font-bold text-[#800020]">{serviceName}</span>
          </div>
        )}

        {tgSuccess ? (
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-center space-y-2 text-sky-800 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-sky-600 mx-auto" />
            <p className="text-xs font-bold">¡Enlace seguro generado!</p>
            <p className="text-[11px] text-sky-700">Abriendo Telegram... Pulsa «Iniciar» en el bot para activar tu conexión.</p>
          </div>
        ) : (
          <form onSubmit={(e) => handleTelegramHandoff(e, false)} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Tu Nombre y Apellidos
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={tgName}
                  onChange={(e) => setTgName(e.target.value)}
                  placeholder="Ej: Carmen Moreno"
                  className="w-full bg-stone-50 border border-stone-300 focus:border-sky-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Teléfono Móvil (para vincular tus citas)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={tgPhone}
                  onChange={(e) => setTgPhone(e.target.value)}
                  placeholder="Ej: 611 22 33 44"
                  className="w-full bg-stone-50 border border-stone-300 focus:border-sky-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={tgEmail}
                  onChange={(e) => setTgEmail(e.target.value)}
                  placeholder="Ej: carmen@ejemplo.com"
                  className="w-full bg-stone-50 border border-stone-300 focus:border-sky-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 outline-none transition"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={tgLoading}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {tgLoading ? (
                  "Generando enlace seguro..."
                ) : (
                  <>
                    <span>Vincular y Abrir Telegram</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={tgLoading}
                onClick={() => handleTelegramHandoff(undefined, true)}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Abrir el bot de Telegram sin vincular datos ahora</span>
              </button>
            </div>

            <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3 h-3 text-sky-600" />
              <span>Token de vinculación seguro, temporal y de un solo uso.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
