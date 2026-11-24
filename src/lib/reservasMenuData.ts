export interface ReservaItem {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    badge: string;
    icon: string;
    href: string;
}

export interface ReservaCategory {
    id: string;
    code: string;
    name: string;
    shortDesc: string;
    icon: string;
    hrefCategory: string;
    services: ReservaItem[];
}

/**
 * Categorías y Servicios idénticos a los del catálogo oficial en vivo (/servicios).
 * Al pulsar en la categoría o en cualquiera de sus servicios, navega a:
 * /servicios?categoria=<codigo>
 * desplegando la categoría completa con todos sus servicios asociados visibles en pantalla.
 */
export const RESERVAS_CATEGORIES: ReservaCategory[] = [
    {
        id: "cat_yoga",
        code: "yoga_meditacion",
        name: "Clases Regulares de Yoga y Meditación",
        shortDesc: "1ª Clase de regalo (0 €) · Turnos fijos mensuales con plazas garantizadas · Pago en el centro",
        icon: "🧘",
        hrefCategory: "/servicios?categoria=yoga_meditacion",
        services: [
            {
                id: "7cf9b55a-3249-4eee-a043-ea8e6bf6be7e",
                title: "Hatha Yoga Terapéutico (Prueba Gratis)",
                subtitle: "Práctica consciente de asanas, alineación corporal, respiración terapéutica y relajación profunda. 1ª clase de prueba sin compromiso.",
                price: "0,00 € (Prueba)",
                badge: "Prueba Gratis (0€)",
                icon: "🎁",
                href: "/servicios?categoria=yoga_meditacion",
            },
            {
                id: "d3b4566d-e1da-430c-be1f-b2bd1d0a0bad",
                title: "Hatha Yoga Terapéutico (1 clase semanal)",
                subtitle: "Clases regulares de 90 min. Martes (9:45, 11:15, 17:00, 18:30, 20:00), Miércoles (20:15) y Jueves (9:45, 11:15, 16:00, 17:30, 19:00). Pago en el centro.",
                price: "25 €/mes",
                badge: "1 clase semanal",
                icon: "🧘",
                href: "/servicios?categoria=yoga_meditacion",
            },
            {
                id: "15f33ff9-210c-45ab-b6fd-e660854505b4",
                title: "Hatha Yoga Terapéutico (2 clases semanales)",
                subtitle: "Práctica consciente 2 días por semana. Flexibilidad de recuperaciones hasta 90 días en cualquier otro turno disponible.",
                price: "42 €/mes",
                badge: "2 clases semanales",
                icon: "🧘‍♀️",
                href: "/servicios?categoria=yoga_meditacion",
            },
            {
                id: "8d243111-8e4c-40e3-ac5a-b4301fe6cfb9",
                title: "Meditaciones Guiadas",
                subtitle: "Lunes y Jueves (9:15 a 9:45). Centramiento y silencio consciente. Gratuitas para alumnos matriculados en el centro de Yoga.",
                price: "15 €/mes",
                badge: "Gratis Alumnos Yoga",
                icon: "🕯️",
                href: "/servicios?categoria=yoga_meditacion",
            },
        ],
    },
    {
        id: "cat_salud",
        code: "salud_terapeutica",
        name: "Salud Terapéutica y Sesiones Individuales",
        shortDesc: "Acompañamiento psicoterapéutico individualizado con Salvadora Conesa · Pago en el centro",
        icon: "🌿",
        hrefCategory: "/servicios?categoria=salud_terapeutica",
        services: [
            {
                id: "076c81be-6ce8-4f14-87a9-f507b01ba465",
                title: "Terapia Gestalt (Sesión Individual)",
                subtitle: "Sesión individual de psicoterapia Gestalt presencial u online de 60 min. Enfoque humanista y toma de conciencia. Requiere cita previa.",
                price: "35 € / sesión",
                badge: "Cita Individual (1h)",
                icon: "🌱",
                href: "/servicios?categoria=salud_terapeutica",
            },
        ],
    },
    {
        id: "cat_talleres",
        code: "talleres_eventos",
        name: "Talleres Vivenciales, Retiros y Eventos",
        shortDesc: "Baños de Gong, Pujas de 11h, Constelaciones y Retiros de Ayuno · Pago en el centro",
        icon: "🔔",
        hrefCategory: "/servicios?categoria=talleres_eventos",
        services: [
            {
                id: "3886172f-4a00-4af7-9d5f-5c4015e07f9c",
                title: "Baño de Gong y Meditación Sonora",
                subtitle: "Sesión mensual (2 horas) en fin de semana. Frecuencias armónicas y relajación celular profunda. Próxima: Sábado 21 de Noviembre (18:00 a 20:00). Aforo 30 personas.",
                price: "16 €",
                badge: "14 € con acompañante",
                icon: "🔔",
                href: "/servicios?categoria=talleres_eventos",
            },
            {
                id: "f929b07c-3505-42b8-907f-be7a1bca9af6",
                title: "Puja de Gongs (Noche Sagrada - 11h)",
                subtitle: "Inmersión y transformación sonora durante toda la noche (11 horas continuas de sonido). Próximamente y Marzo 2027. Aforo 30 plazas.",
                price: "Por confirmar",
                badge: "Noche Sagrada 11h",
                icon: "✨",
                href: "/servicios?categoria=talleres_eventos",
            },
            {
                id: "a1dde6cd-f1bf-4175-95ee-34a53f4838e9",
                title: "Constelaciones Familiares (Constelar / Asunto Propio)",
                subtitle: "Taller vivencial mensual para trabajar y sanar un asunto o síntoma personal propio. Fecha por confirmar. Aforo 25 personas.",
                price: "60 €",
                badge: "Constelar Asunto Propio",
                icon: "👥",
                href: "/servicios?categoria=talleres_eventos",
            },
            {
                id: "2acd3c74-abae-47d0-9b67-147cbbe1a657",
                title: "Constelaciones Familiares (Participante / Representante)",
                subtitle: "Participación activa como representante u observador en el campo de trabajo vivencial del grupo.",
                price: "20 €",
                badge: "Participante / Representante",
                icon: "👤",
                href: "/servicios?categoria=talleres_eventos",
            },
            {
                id: "6bfc9e2b-bef8-42d5-9c25-bd3b7554229a",
                title: "Retiro de Ayuno Terapéutico",
                subtitle: "Del viernes 9 al lunes 12 de Octubre de 2026. 4 días de silencio, desintoxicación, senderismo, yoga y gong. Aforo estricto 20 plazas.",
                price: "250 €",
                badge: "Retiro 4 Días / 3 Noches",
                icon: "🥑",
                href: "/servicios?categoria=talleres_eventos",
            },
            {
                id: "5f0693fa-adf1-4e65-a8ea-e4eda92ff942",
                title: "Encuentro de Mujeres (Primavera)",
                subtitle: "Círculo y espacio de conexión femenina, dinámicas grupales vivenciales, sanación emocional y meditación.",
                price: "Por confirmar",
                badge: "Círculo Vivencial",
                icon: "🌸",
                href: "/servicios?categoria=talleres_eventos",
            },
        ],
    },
    {
        id: "cat_longevidad",
        code: "longevidad_artes",
        name: "Actividades Especiales",
        shortDesc: "Bienestar Experience, longevidad activa, biohacking y disciplinas complementarias · Pago en el centro",
        icon: "🌟",
        hrefCategory: "/servicios?categoria=longevidad_artes",
        services: [
            {
                id: "469fa9b9-227d-4168-bda7-cac5cf3e7f46",
                title: "Bienestar Experience (Longevidad y Bienestar Integral)",
                subtitle: "Espacio de encuentro dedicado al bienestar integral y longevidad activa con Txiki Soto, Giulliana Gabaldoni y Salvadora Conesa.",
                price: "19,99 €",
                badge: "Entrada Oficial",
                icon: "☀️",
                href: "/servicios?categoria=longevidad_artes",
            },
        ],
    },
];

export const RESERVAS_TYPE_SHORTCUTS = [
    { label: "🗓️ Clases Regulares", href: "/servicios?tipo=recurring" },
    { label: "✨ Eventos y Retiros", href: "/servicios?tipo=event" },
    { label: "🌟 Actividades Especiales", href: "/servicios?tipo=special" },
    { label: "📋 Catálogo Completo (12)", href: "/servicios" },
];
