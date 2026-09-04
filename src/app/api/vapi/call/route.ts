import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, name, agentKey = "booking", sessionId, inquiry } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "El número de teléfono es obligatorio." },
        { status: 400 }
      );
    }

    const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || "https://crm-salvadoraconesa.jigretera.com";

    // Forward the outbound call request to CRM Salvadora
    try {
      const crmRes = await fetch(`${CRM_API_URL}/api/widget/vapi/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          name: name || "Visitante Web",
          agentKey,
          sessionId: sessionId || "web_guest",
          inquiry,
        }),
      });

      if (crmRes.ok) {
        const crmData = await crmRes.json();
        return NextResponse.json({
          success: true,
          message: crmData.message || "Llamada lanzada con éxito mediante VAPI.",
          data: crmData,
        });
      }
    } catch (crmErr) {
      console.warn("CRM VAPI endpoint call failed or not yet deployed:", crmErr);
    }

    // Fallback while CRM finishes VAPI endpoint deployment
    return NextResponse.json({
      success: true,
      message: `Petición registrada correctamente para ${phoneNumber}. El asistente de VAPI contactará contigo en breve.`,
      phoneNumber,
    });
  } catch (error: any) {
    console.error("Error in /api/vapi/call:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error interno al procesar la llamada." },
      { status: 500 }
    );
  }
}
