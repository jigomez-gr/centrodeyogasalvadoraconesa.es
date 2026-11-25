"use client";

import React from "react";
import { triggerCrmChat } from "@/components/ChatBubbleWidget";

interface CrmBookingButtonProps {
  className?: string;
  children?: React.ReactNode;
  message?: string;
  autoSend?: boolean;
  title?: string;
  ariaLabel?: string;
}

export default function CrmBookingButton({
  className = "w-full sm:w-auto flex items-center justify-center h-12 px-8 border border-transparent text-xs font-bold uppercase tracking-widest rounded-md text-white bg-[#800020] hover:bg-[#800020]/95 shadow-md shadow-[#800020]/15 hover:scale-102 transition duration-200 cursor-pointer",
  children = "CONSULTA SERVICIOS",
  message = "Hola, me gustaría consultar los servicios y actividades del Centro de Yoga Salvadora Conesa.",
  autoSend = false,
  title,
  ariaLabel,
}: CrmBookingButtonProps) {
  return (
    <button
      type="button"
      onClick={() => triggerCrmChat(message, autoSend)}
      className={className}
      title={title}
      aria-label={ariaLabel || (typeof children === "string" ? children : title)}
    >
      {children}
    </button>
  );
}
