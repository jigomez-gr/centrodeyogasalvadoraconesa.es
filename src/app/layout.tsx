import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Centro de Yoga Fuenlabrada | Salvadora Conesa",
  description: "Clases de Nagna y Kundalini yoga, baños y puja de gong, meditación guiada y retiros de ayuno terapéutico en Fuenlabrada, dirigido por Salvadora Conesa.",
};

import { ChatBubbleWidget } from "@/components/ChatBubbleWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#1C1C1C]">
        {children}
        <ChatBubbleWidget agentKey="booking" brandColor="#800020" />
      </body>
    </html>
  );
}
