"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, RotateCcw, Bot } from "lucide-react";

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
  welcomeMessage = "¡Hola! 👋 Soy tu asistente de reservas y citas del Centro de Yoga. ¿En qué puedo ayudarte hoy?",
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sid = "";
    try {
      sid = localStorage.getItem("crm_widget_session_id") || "";
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
      setMessages([
        {
          id: "welcome-" + Date.now(),
          direction: "inbound",
          body: welcomeMessage,
        },
      ]);
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Event listener for opening the chat from any "Reservar Plaza" / "Inscribirse" button on the site
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

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = (customText || inputValue).trim();
    if (!text || isTyping) return;

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

  const handleResetChat = () => {
    const sid = "web_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    try {
      localStorage.setItem("crm_widget_session_id", sid);
    } catch {}
    setSessionId(sid);
    setMessages([
      {
        id: "welcome-" + Date.now(),
        direction: "inbound",
        body: welcomeMessage,
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 flex h-[520px] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white shadow-sm"
            style={{ backgroundColor: brandColor }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold leading-tight">{businessName}</h3>
                <p className="flex items-center gap-1 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> En línea (Asistente IA)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reiniciar conversación"
                className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Cerrar"
                className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4">
            {messages.map((m) => {
              const isUser = m.direction === "outbound";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "rounded-br-none text-white"
                        : "rounded-bl-none border border-stone-200/80 bg-white text-stone-800"
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
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-stone-200/80 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => handleSendMessage(e)}
            className="flex items-center gap-2 border-t border-stone-200 bg-white p-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu consulta o reserva..."
              className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-[#800020] focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: brandColor }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de asistencia de reservas"
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95 border border-white/20"
        style={{ backgroundColor: brandColor }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}

// Global helper function to trigger the CRM widget from any button or component
export function triggerCrmChat(message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-crm-chat", { detail: { message } }));
  }
}
