"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, RotateCcw, Bot, Trash2, ShieldCheck, Check } from "lucide-react";

interface ChatMessage {
  id: string;
  direction: "inbound" | "outbound";
  body: string;
}

interface ChatBubbleProps {
  agentKey?: string;
  apiUrl?: string;
  businessName?: string;
  brandColor?: string;
  welcomeMessage?: string;
}

export function ChatBubbleWidget({
  agentKey = process.env.NEXT_PUBLIC_DEFAULT_AGENT_KEY || "booking",
  apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL || "https://crm-salvadoraconesa.jigretera.com",
  businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Centro de Yoga y Bienestar Salvadora",
  brandColor = "#800020",
  welcomeMessage = "¡Hola! 👋 Soy tu asistente de consultas de nuestros servicios, reservas y citas del Centro de Yoga. ¿En qué puedo ayudarte hoy?",
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [rgpdAccepted, setRgpdAccepted] = useState(true);
  const [clearToast, setClearToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for duplicate chat bubbles in the DOM before mounting this instance
  useEffect(() => {
    if (typeof document !== "undefined") {
      const existingBubbles = document.querySelectorAll("[data-crm-chat-bubble='true']");
      existingBubbles.forEach((el) => {
        if (containerRef.current && el !== containerRef.current) {
          el.remove();
        }
      });
    }
  }, []);

  useEffect(() => {
    let sid = "";
    try {
      sid = localStorage.getItem("crm_widget_session_id") || "";
      const consent = localStorage.getItem("crm_widget_rgpd_consent");
      setRgpdAccepted(consent === "accepted");

      const saved = localStorage.getItem("crm_widget_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {}

    if (!sid) {
      sid = "web_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      try {
        localStorage.setItem("crm_widget_session_id", sid);
      } catch {}
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initial = [
        {
          id: "welcome-" + Date.now(),
          direction: "inbound" as const,
          body: welcomeMessage,
        },
      ];
      setMessages(initial);
      try {
        localStorage.setItem("crm_widget_messages", JSON.stringify(initial));
      } catch {}
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("crm_widget_messages", JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Event listener for opening the chat from any button
  useEffect(() => {
    const handleOpenChat = (e: CustomEvent<{ message?: string }>) => {
      setIsOpen(true);
      if (e?.detail?.message) {
        setInputValue(e.detail.message);
      }
    };
    window.addEventListener("open-crm-chat" as any, handleOpenChat as EventListener);
    return () => window.removeEventListener("open-crm-chat" as any, handleOpenChat as EventListener);
  }, []);

  const handleAcceptRgpd = () => {
    try {
      localStorage.setItem("crm_widget_rgpd_consent", "accepted");
    } catch {}
    setRgpdAccepted(true);
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = (customText || inputValue).trim();
    if (!text || isTyping) return;

    if (!rgpdAccepted) {
      handleAcceptRgpd();
    }

    const userMsgId = "user-" + Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, direction: "outbound", body: text }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch(`${apiUrl}/api/widget/chat/${agentKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || "web_guest",
          channel: "widget",
        }),
      });

      if (!res.ok) throw new Error("Error en el servidor CRM");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          direction: "inbound",
          body: data.reply || "He recibido tu mensaje. ¿Deseas reservar tu plaza?",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          direction: "inbound",
          body: "Lo siento, ha habido un problema de conexión con el CRM. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    const sid = "web_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    try {
      localStorage.setItem("crm_widget_session_id", sid);
      localStorage.removeItem("crm_widget_messages");
    } catch {}
    setSessionId(sid);
    const initial: ChatMessage[] = [
      {
        id: "welcome-" + Date.now(),
        direction: "inbound",
        body: welcomeMessage,
      },
    ];
    setMessages(initial);
    try {
      localStorage.setItem("crm_widget_messages", JSON.stringify(initial));
    } catch {}
    setClearToast(true);
    setTimeout(() => setClearToast(false), 2500);
  };

  const tooltipText = "Asistente reservas citas, reprogramaciones y cancelaciones";

  return (
    <div
      ref={containerRef}
      data-crm-chat-bubble="true"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end"
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 flex h-[590px] max-h-[85vh] w-[390px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white shadow-sm"
            style={{ backgroundColor: brandColor }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                <Bot className="h-5.5 w-5.5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold leading-tight">{businessName}</h3>
                <p className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span> En línea (Asistente IA)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Borrar historial de conversación"
                aria-label="Borrar historial"
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={handleClearHistory}
                title="Reiniciar conversación"
                aria-label="Reiniciar"
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Cerrar"
                aria-label="Cerrar chat"
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification when History is Cleared */}
          {clearToast && (
            <div className="bg-emerald-600 text-white text-xs px-3 py-1.5 text-center font-medium flex items-center justify-center gap-1.5 shadow-sm animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Historial de conversación borrado
            </div>
          )}

          {/* Messages List */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4">
            {/* Friendly Non-Threatening AI Disclaimer Badge */}
            <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-[#C5A059]/15 text-[#800020] rounded-full text-[11px] font-semibold border border-[#C5A059]/30 mx-auto max-w-fit select-none">
              <Bot className="w-3.5 h-3.5" />
              <span>Asistente virtual con IA · Respuestas inmediatas 24h</span>
            </div>

            {messages.map((m) => {
              const isUser = m.direction === "outbound";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-base sm:text-sm leading-relaxed shadow-sm font-sans ${
                      isUser
                        ? "rounded-br-none text-white font-medium"
                        : "rounded-bl-none border border-stone-200/90 bg-white text-stone-900"
                    }`}
                    style={isUser ? { backgroundColor: brandColor } : {}}
                  >
                    <p className="whitespace-pre-wrap">{m.body}</p>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-stone-200/90 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Clear History Link inside message list if conversation ongoing */}
            {messages.length > 2 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] text-stone-400 hover:text-[#800020] flex items-center gap-1 transition cursor-pointer py-1 px-2.5 rounded-lg hover:bg-stone-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Borrar historial de conversación</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* RGPD Consent Card before sending (if not yet accepted) */}
          {!rgpdAccepted && (
            <div className="mx-3 mb-2 p-3 bg-amber-50/95 border border-amber-300/80 rounded-xl text-xs text-stone-800 space-y-2 shadow-sm animate-in fade-in">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-xs">Aviso de Privacidad y RGPD</p>
                  <p className="text-[11px] leading-relaxed text-stone-600">
                    Este chat utiliza <strong>Inteligencia Artificial</strong> para responder a tus consultas y tramitar reservas. Tus datos serán tratados conforme al RGPD europeo y nuestra{" "}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] underline font-bold hover:text-[#800020]/80"
                    >
                      Política de Privacidad
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleAcceptRgpd}
                  className="px-3.5 py-1 bg-[#800020] text-white font-bold rounded-lg text-xs hover:bg-[#800020]/90 transition shadow-xs cursor-pointer"
                >
                  Aceptar y Continuar
                </button>
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => handleSendMessage(e)}
            className="flex items-center gap-2 border-t border-stone-200 bg-white p-3 sm:p-3.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu consulta o reserva..."
              className="flex-1 rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 sm:py-2.5 text-base sm:text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-[#800020] focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Enviar mensaje"
              className="flex h-11 w-11 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40 cursor-pointer"
              style={{ backgroundColor: brandColor }}
            >
              <Send className="h-5 w-5 sm:h-4.5 sm:w-4.5" />
            </button>
          </form>

          {/* Permanent Legal & AI Footer in Chat Window */}
          <div className="px-3.5 py-1.5 bg-stone-100 border-t border-stone-200/80 text-[10px] text-stone-500 flex items-center justify-between select-none">
            <span className="flex items-center gap-1 truncate">
              <ShieldCheck className="w-3 h-3 text-[#800020] shrink-0" />
              Cumple RGPD (UE 2016/679) · Asistente IA
            </span>
            <a
              href="/politica-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800020] underline shrink-0 ml-2"
            >
              Privacidad
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with Tooltip */}
      <div className="relative group flex items-center">
        {/* Tooltip visible on hover/focus */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0 translate-x-2 z-50">
            <div className="bg-stone-900/95 text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-2xl whitespace-nowrap backdrop-blur-xs border border-white/15 tracking-wide">
              {tooltipText}
            </div>
            <div className="w-2 h-2 bg-stone-900/95 rotate-45 -ml-1 border-r border-t border-white/15" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={tooltipText}
          title={tooltipText}
          className="flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 border-2 border-white/30 cursor-pointer"
          style={{ backgroundColor: brandColor }}
        >
          {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
        </button>
      </div>
    </div>
  );
}

// Global helper function to trigger the CRM widget from any button or component
export function triggerCrmChat(message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-crm-chat", { detail: { message } }));
  }
}
