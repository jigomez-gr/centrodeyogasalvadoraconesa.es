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

export const RESERVAS_CATEGORIES: ReservaCategory[] = [
    {
        id: "cat_yoga",
        code: "yoga_meditacion",
        name: "Clases Regulares de Yoga y Meditación",
        shortDesc: "1ª Clase de regalo (0 €) · Turnos fijos mensuales con plazas garantizadas",
        icon: "🧘",
        hrefCategory: "/servicios?categoria=yoga_meditacion",
        services: [
            {
                id: "d3b4566d-e1da-430c-be1f-b2bd1d0a0bad",
                title: "Hatha Yoga Terapéutico (1 clase/sem)",
                subtitle: "Clases semanales regulares de 90 min. 1ª clase de prueba gratis. Pago en el centro.",
                price: "25 €/mes",
                badge: "1ª Clase Gratis (0€)",
                icon: "🧘",
                href: "/servicios?categoria=yoga_meditacion&servicio=d3b4566d-e1da-430c-be1f-b2bd1d0a0bad#servicio-d3b4566d-e1da-430c-be1f-b2bd1d0a0bad",
            },
            {
                id: "15f33ff9-210c-45ab-b6fd-e660854505b4",
                title: "Hatha Yoga Terapéutico (2 clases/sem)",
                subtitle: "Práctica consciente 2 días por semana. Flexibilidad de recuperaciones hasta 90 días.",
                price: "42 €/mes",
                badge: "Turno Fijo Garantizado",
                icon: "🧘‍♀️",
                href: "/servicios?categoria=yoga_meditacion&servicio=15f33ff9-210c-45ab-b6fd-e660854505b4#servicio-15f33ff9-210c-45ab-b6fd-e660854505b4",
            },
            {
                id: "8d243111-8e4c-40e3-ac5a-b4301fe6cfb9",
                title: "Meditaciones Guiadas",
                subtitle: "Lunes y Jueves (9:15 a 9:45). Centramiento y silencio. Gratis alumnos del centro de Yoga.",
                price: "15 €/mes",
                badge: "Gratis Alumnos Yoga",
                icon: "🕯️",
                href: "/servicios?categoria=yoga_meditacion&servicio=8d243111-8e4c-40e3-ac5a-b4301fe6cfb9#servicio-8d243111-8e4c-40e3-ac5a-b4301fe6cfb9",
            },
        ],
    },
    {
        id: "cat_salud",
        code: "salud_terapeutica",
        name: "Salud Terapéutica y Sesiones Individuales",
        shortDesc: "Acompañamiento psicoterapéutico individualizado con Salvadora Conesa",
        icon: "🌿",
        hrefCategory: "/servicios?categoria=salud_terapeutica",
        services: [
            {
                id: "076c81be-6ce8-4f14-87a9-f507b01ba465",
                title: "Terapia Gestalt (Sesión Individual)",
                subtitle: "Sesión personalizada de 60 min presencial u online. Enfoque humanista y toma de conciencia.",
                price: "35 € / sesión",
                badge: "Cita Individual (1h)",
                icon: "🌱",
                href: "/servicios?categoria=salud_terapeutica&servicio=076c81be-6ce8-4f14-87a9-f507b01ba465#servicio-076c81be-6ce8-4f14-87a9-f507b01ba465",
            },
        ],
    },
    {
        id: "cat_talleres",
        code: "talleres_eventos",
        name: "Talleres Vivenciales, Retiros y Eventos",
        shortDesc: "Baños de Gong, Ceremonias de 11h, Constelaciones y Retiros de Ayuno",
        icon: "🔔",
        hrefCategory: "/servicios?categoria=talleres_eventos",
        services: [
            {
                id: "3886172f-4a00-4af7-9d5f-5c4015e07f9c",
                title: "Baño de Gong y Meditación Sonora",
                subtitle: "Sesión mensual (2 horas) en fin de semana. Frecuencias armónicas y relajación celular.",
                price: "16 €",
                badge: "14 € con acompañante",
                icon: "🔔",
                href: "/servicios?categoria=talleres_eventos&servicio=3886172f-4a00-4af7-9d5f-5c4015e07f9c#servicio-3886172f-4a00-4af7-9d5f-5c4015e07f9c",
            },
            {
                id: "f929b07c-3505-42b8-907f-be7a1bca9af6",
                title: "Puja de Gongs (Noche Sagrada - 11h)",
                subtitle: "11 horas continuas de sonido sanador. Reserva anticipada con plazas limitadas.",
                price: "Por confirmar",
                badge: "Noche Sagrada 11h",
                icon: "✨",
                href: "/servicios?categoria=talleres_eventos&servicio=f929b07c-3505-42b8-907f-be7a1bca9af6#servicio-f929b07c-3505-42b8-907f-be7a1bca9af6",
            },
            {
                id: "a1dde6cd-f1bf-4175-95ee-34a53f4838e9",
                title: "Constelaciones Familiares (Constelar)",
                subtitle: "Taller vivencial mensual de sanación sistémica. Modalidad para trabajar asunto personal propio.",
                price: "60 €",
                badge: "Constelar Asunto Propio",
                icon: "👥",
                href: "/servicios?categoria=talleres_eventos&servicio=a1dde6cd-f1bf-4175-95ee-34a53f4838e9#servicio-a1dde6cd-f1bf-4175-95ee-34a53f4838e9",
            },
            {
                id: "2acd3c74-abae-47d0-9b67-147cbbe1a657",
                title: "Constelaciones Familiares (Participante)",
                subtitle: "Participación activa como representante u observador en el campo de trabajo vivencial.",
                price: "20 €",
                badge: "Participante / Representante",
                icon: "👤",
                href: "/servicios?categoria=talleres_eventos&servicio=2acd3c74-abae-47d0-9b67-147cbbe1a657#servicio-2acd3c74-abae-47d0-9b67-147cbbe1a657",
            },
            {
                id: "6bfc9e2b-bef8-42d5-9c25-bd3b7554229a",
                title: "Retiro de Ayuno Terapéutico",
                subtitle: "4 días de silencio, desintoxicación, senderismo y gong. Aforo estricto 20 plazas.",
                price: "250 €",
                badge: "Retiro 4 Días / 3 Noches",
                icon: "🥑",
                href: "/servicios?categoria=talleres_eventos&servicio=6bfc9e2b-bef8-42d5-9c25-bd3b7554229a#servicio-6bfc9e2b-bef8-42d5-9c25-bd3b7554229a",
            },
            {
                id: "5f0693fa-adf1-4e65-a8ea-e4eda92ff942",
                title: "Encuentros de Mujeres (Primavera)",
                subtitle: "Círculos de palabra, sororidad, cuidado mutuo y reconexión femenina.",
                price: "Por confirmar",
                badge: "Círculo Vivencial",
                icon: "🌸",
                href: "/servicios?categoria=talleres_eventos&servicio=5f0693fa-adf1-4e65-a8ea-e4eda92ff942#servicio-5f0693fa-adf1-4e65-a8ea-e4eda92ff942",
            },
            {
                id: "510e05b8-da1e-4bbb-a9ed-d41b16ca429f",
                title: "Sesión Mensual Fin de Semana",
                subtitle: "Talleres especiales en sábado/domingo de sonido, meditación y bienestar.",
                price: "35 €",
                badge: "Fin de Semana",
                icon: "🗓️",
                href: "/servicios?categoria=talleres_eventos&servicio=510e05b8-da1e-4bbb-a9ed-d41b16ca429f#servicio-510e05b8-da1e-4bbb-a9ed-d41b16ca429f",
            },
        ],
    },
    {
        id: "cat_longevidad",
        code: "longevidad_artes",
        name: "Actividades Especiales",
        shortDesc: "Bienestar Experience, longevidad activa, biohacking y disciplinas complementarias",
        icon: "🌟",
        hrefCategory: "/servicios?categoria=longevidad_artes",
        services: [
            {
                id: "469fa9b9-227d-4168-bda7-cac5cf3e7f46",
                title: "Bienestar Experience (Longevidad y Salud)",
                subtitle: "Encuentro multidisciplinar con Txiki Soto, Giulliana Gabaldoni y Salvadora Conesa.",
                price: "19,99 €",
                badge: "Entrada Oficial",
                icon: "☀️",
                href: "/servicios?categoria=longevidad_artes&servicio=469fa9b9-227d-4168-bda7-cac5cf3e7f46#servicio-469fa9b9-227d-4168-bda7-cac5cf3e7f46",
            },
        ],
    },
];

export const RESERVAS_TYPE_SHORTCUTS = [
    { label: "🗓️ Clases Regulares", href: "/servicios?tipo=recurring" },
    { label: "✨ Eventos y Retiros", href: "/servicios?tipo=event" },
    { label: "🌟 Actividades Especiales", href: "/servicios?tipo=special" },
    { label: "📋 Catálogo Completo", href: "/servicios" },
];
