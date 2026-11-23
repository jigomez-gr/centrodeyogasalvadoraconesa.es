export interface ActivityItem {
    dayNum: number;
    title: string;
    subtitle: string;
    tag: string;
    icon: string;
    hrefPortada: string;
    hrefDedicated: string;
}

export interface ActivityCategory {
    id: string;
    name: string;
    shortDesc: string;
    icon: string;
    activities: ActivityItem[];
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
    {
        id: "yoga-meditacion",
        name: "Yoga y Meditación",
        shortDesc: "Alineación corporal, presencia y respiración consciente",
        icon: "🧘‍♀️",
        activities: [
            {
                dayNum: 1,
                title: "1. Hatha Yoga Terapéutico",
                subtitle: "Clases semanales regulares, asanas conscientes y relajación profunda.",
                tag: "Clases regulares",
                icon: "🧘",
                hrefPortada: "/#dia-1",
                hrefDedicated: "/practica-yoga",
            },
            {
                dayNum: 2,
                title: "2. Meditación y Centramiento",
                subtitle: "Sesiones de centramiento mental, silencio interior y presencia consciente.",
                tag: "Lunes y Jueves",
                icon: "🕯️",
                hrefPortada: "/#dia-2",
                hrefDedicated: "/meditacion",
            },
        ],
    },
    {
        id: "sonoterapia-gongs",
        name: "Sonoterapia y Gongs",
        shortDesc: "Inmersión acústica, relajación celular y vibración sonora",
        icon: "🔔",
        activities: [
            {
                dayNum: 3,
                title: "3. Baños de Gong",
                subtitle: "Sesión mensual de sonido armónico envolvente para armonizar cuerpo y mente.",
                tag: "Mensual (Sábados)",
                icon: "🔔",
                hrefPortada: "/#dia-3",
                hrefDedicated: "/banos-de-gong",
            },
            {
                dayNum: 4,
                title: "4. Puja de Gong (Noche Sagrada)",
                subtitle: "11 horas ininterrumpidas de vibración sonora sanadora durante toda la noche.",
                tag: "Evento Especial (11h)",
                icon: "✨",
                hrefPortada: "/#dia-4",
                hrefDedicated: "/puja-de-gong",
            },
        ],
    },
    {
        id: "terapia-crecimiento",
        name: "Terapia y Crecimiento",
        shortDesc: "Psicoterapia humanista, constelaciones y círculos vivenciales",
        icon: "🌿",
        activities: [
            {
                dayNum: 5,
                title: "5. Terapia Gestalt Individual",
                subtitle: "Acompañamiento psicoterapéutico centrado en el aquí y el ahora.",
                tag: "Individual",
                icon: "🌱",
                hrefPortada: "/#dia-5",
                hrefDedicated: "/terapia-gestalt",
            },
            {
                dayNum: 6,
                title: "6. Constelaciones Familiares",
                subtitle: "Sanación de vínculos familiares, dinámicas ocultas y orden sistémico.",
                tag: "Talleres Mensuales",
                icon: "👥",
                hrefPortada: "/#dia-6",
                hrefDedicated: "/constelaciones-familiares",
            },
            {
                dayNum: 7,
                title: "7. Encuentros y Círculos de Mujeres",
                subtitle: "Espacio seguro de escucha, ciclicidad femenina y reconexión interna.",
                tag: "Círculos grupales",
                icon: "🌸",
                hrefPortada: "/#dia-7",
                hrefDedicated: "/encuentros-de-mujeres",
            },
        ],
    },
    {
        id: "retiros-salud",
        name: "Retiros y Salud Integral",
        shortDesc: "Inmersiones residenciales, descanso digestivo y bienestar profundo",
        icon: "🍃",
        activities: [
            {
                dayNum: 8,
                title: "8. Retiro de Ayuno Terapéutico",
                subtitle: "4 días de regeneración celular, caldos biológicos, autofagia y silencio.",
                tag: "Retiro Residencial",
                icon: "🍃",
                hrefPortada: "/#dia-8",
                hrefDedicated: "/ayuno-terapeutico",
            },
            {
                dayNum: 9,
                title: "9. Actividades Especiales y Bienestar",
                subtitle: "Acompañamiento 'Más allá del tumor', longevidad, salud y vitalidad.",
                tag: "Bienestar & Salud",
                icon: "☀️",
                hrefPortada: "/#dia-9",
                hrefDedicated: "/bienestar-experience",
            },
        ],
    },
];
