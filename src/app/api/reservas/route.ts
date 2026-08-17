import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const MAX_PLAZAS = 999999;

export async function GET() {
    try {
        return NextResponse.json({
            maxPlazas: MAX_PLAZAS,
            totalPaidPlazas: 0,
            availablePlazas: MAX_PLAZAS,
        });
    } catch (error: any) {
        console.error("Error at reservations query API:", error);
        return NextResponse.json(
            { error: "Error al consultar las plazas disponibles." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, telefono, numeroPlazas, tipoHabitacion, comentarios } = body;

        // Server-side validation
        if (!nombre || !email || !telefono || !numeroPlazas || !tipoHabitacion) {
            return NextResponse.json(
                { error: "Todos los campos obligatorios deben estar completos." },
                { status: 400 }
            );
        }

        const plazasCount = parseInt(numeroPlazas, 10);
        if (isNaN(plazasCount) || plazasCount < 1) {
            return NextResponse.json(
                { error: "El número de plazas debe ser mayor o igual a 1." },
                { status: 400 }
            );
        }

        const validAccommodations = ["mensual", "mensual_premium", "gong", "puja", "retiro_doble", "retiro_individual"];
        if (!validAccommodations.includes(tipoHabitacion)) {
            return NextResponse.json(
                { error: "La modalidad de inscripción seleccionada no es válida." },
                { status: 400 }
            );
        }

        // Availability check removed

        // Price calculation
        let unitPrice = 60;
        if (tipoHabitacion === "mensual") unitPrice = 60;
        else if (tipoHabitacion === "mensual_premium") unitPrice = 70;
        else if (tipoHabitacion === "gong") unitPrice = 25;
        else if (tipoHabitacion === "puja") unitPrice = 70;
        else if (tipoHabitacion === "retiro_doble") unitPrice = 250;
        else if (tipoHabitacion === "retiro_individual") unitPrice = 320;
        const totalAmount = plazasCount * unitPrice;

        const normalizedEmail = email.trim().toLowerCase();

        // Verify or create User registration
        let user = await prisma.usuario.findUnique({
            where: { correo: normalizedEmail },
        });

        if (!user) {
            user = await prisma.usuario.create({
                data: {
                    correo: normalizedEmail,
                    nombre,
                    movil: telefono,
                    idrolusuario: 3,
                    estadoVerificacion: "verificado", // Automatic verification because they filled the form
                },
            });
        } else {
            // Update name and phone
            user = await prisma.usuario.update({
                where: { correo: normalizedEmail },
                data: {
                    nombre,
                    movil: telefono,
                },
            });
        }

        // Create reservation in DB with 'pendiente_pago' state
        const reserva = await prisma.reserva.create({
            data: {
                nombre,
                email: normalizedEmail,
                telefono,
                numeroPlazas: plazasCount,
                tipoHabitacion,
                importeTotal: totalAmount,
                estado: "pendiente_pago",
                comentarios: comentarios || "",
            },
        });

        return NextResponse.json({
            success: true,
            reservaId: reserva.id,
            reserva,
        });
    } catch (error: any) {
        console.error("Error creating reservation:", error);
        return NextResponse.json(
            { error: "Error interno del servidor al registrarse: " + error.message },
            { status: 500 }
        );
    }
}
