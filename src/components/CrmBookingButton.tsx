"use client";

import React from "react";
import { triggerCrmChat } from "@/components/ChatBubbleWidget";

interface CrmBookingButtonProps {
  className?: string;
  children?: React.ReactNode;
  message?: string;
}

export default function CrmBookingButton({
  className = "w-full sm:w-auto flex items-center justify-center h-12 px-8 border border-transparent text-xs font-bold uppercase tracking-widest rounded-md text-white bg-[#800020] hover:bg-[#800020]/95 shadow-md shadow-[#800020]/15 hover:scale-102 transition duration-200 cursor-pointer",
  children = "Inscribirse",
  message = "Hola, me gustaría inscribirme y reservar mi plaza.",
}: CrmBookingButtonProps) {
  return (
    <button
      type="button"
      onClick={() => triggerCrmChat(message)}
      className={className}
    >
      {children}
    </button>
  );
}
