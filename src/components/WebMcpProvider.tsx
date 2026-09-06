"use client";

import { useEffect } from "react";

export function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !("modelContext" in navigator)) {
      return;
    }

    try {
      const controller = new AbortController();
      const modelContext = (navigator as unknown as {
        modelContext?: {
          registerTool: (
            tool: {
              name: string;
              description: string;
              inputSchema: Record<string, unknown>;
              execute: (params: unknown) => Promise<unknown>;
            },
            options?: { signal?: AbortSignal }
          ) => void;
        };
      }).modelContext;

      if (typeof modelContext?.registerTool === "function") {
        modelContext.registerTool(
          {
            name: "get_yoga_classes",
            description:
              "Consulta las clases de yoga, horarios y disciplinas disponibles en el Centro de Yoga Salvadora Conesa.",
            inputSchema: {
              type: "object",
              properties: {
                discipline: {
                  type: "string",
                  description:
                    "Disciplina deseada: Kundalini, Nagna, Meditacion o Todas",
                },
              },
            },
            execute: async () => {
              return {
                status: "success",
                classes: [
                  {
                    name: "Kundalini Yoga",
                    schedule: "Lunes y Miércoles 19:00",
                    duration: "75 min",
                  },
                  {
                    name: "Nagna Yoga",
                    schedule: "Viernes 19:30",
                    duration: "90 min",
                  },
                  {
                    name: "Baños de Gong",
                    schedule: "Sábados quincenales 11:00",
                    duration: "60 min",
                  },
                ],
              };
            },
          },
          { signal: controller.signal }
        );

        modelContext.registerTool(
          {
            name: "book_yoga_session",
            description:
              "Inicia el proceso de reserva para una clase de yoga o sesión de gong.",
            inputSchema: {
              type: "object",
              required: ["service", "clientName", "clientPhone"],
              properties: {
                service: {
                  type: "string",
                  description: "Nombre del servicio o clase",
                },
                clientName: {
                  type: "string",
                  description: "Nombre del cliente",
                },
                clientPhone: {
                  type: "string",
                  description: "Teléfono o WhatsApp del cliente",
                },
              },
            },
            execute: async (params) => {
              const p = params as {
                service: string;
                clientName: string;
                clientPhone: string;
              };
              return {
                status: "success",
                bookingUrl: "https://centrodeyogasalvadoraconesa.es/reserva",
                message: `Reserva pre-registrada para ${p.clientName} en ${p.service}.`,
              };
            },
          },
          { signal: controller.signal }
        );
      }

      return () => {
        controller.abort();
      };
    } catch (e) {
      console.warn("WebMCP registration error:", e);
    }
  }, []);

  return null;
}
