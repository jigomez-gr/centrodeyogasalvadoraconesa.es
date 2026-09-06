import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PAGE_MARKDOWN: Record<string, string> = {
  "/": `# Centro de Yoga y Bienestar Salvadora Conesa — Fuenlabrada

> Clases de Kundalini Yoga, Nagna Yoga, baños y puja de gong, meditación guiada y retiros de ayuno terapéutico en Fuenlabrada (Madrid), dirigido por Salvadora Conesa.

Bienvenido al Centro de Yoga y Bienestar Salvadora Conesa, un espacio de más de 15 años dedicado a la salud integral, el autocuidado y la expansión de la conciencia.

## Oferta Formativa y Terapéutica

1. **Kundalini Yoga**: Práctica milenaria para activar la vitalidad, armonizar los chakras y equilibrar el sistema nervioso a través de kriyas, respiraciones y mantras.
2. **Nagna Yoga (Yoga Desnudo Consciente)**: Práctica sin vestimentas en un marco de respeto ético y confidencialidad para descondicionar el cuerpo, superar complejos y cultivar la autoaceptación.
3. **Baños de Gong**: Inmersión en frecuencias armónicas con gongs y cuencos tibetanos para inducir estados meditativos profundos (ondas theta y delta) y liberar tensiones musculares.
4. **Pujas de Gong**: Ceremonia sagrada nocturna con horas continuadas de vibración de gong, celebrada dos veces al año.
5. **Retiros de Ayuno Terapéutico**: Experiencias de depuración física y mental en la naturaleza con caminatas en silencio, yoga suave y descanso consciente.
6. **Taller Mejorar Asanas**: Alineación postural y biomecánica consciente para una práctica segura y profunda.

## Enlaces Rápidos
- [Servicios y Clases](/servicios): Catálogo completo de disciplinas y horarios.
- [Reserva Online](/reserva): Reserva directa de clases y experiencias.
- [Nagna Yoga](/nagna-yoga): Información detallada de la práctica.
- [Mejorar Asanas](/mejorar-asanas): Contenido del taller postural.
- [Política de Privacidad](/politica-de-privacidad): Información sobre tratamiento de datos (RGPD).

## Contacto
- **Dirección**: Fuenlabrada, Madrid, España
- **Email**: salvadora@centrodeyogasalvadoraconesa.es
- **Teléfono / WhatsApp**: +34 695 17 26 25
- **Web**: https://centrodeyogasalvadoraconesa.es
`,

  "/servicios": `# Servicios y Clases — Centro de Yoga Salvadora Conesa

Explora todas las disciplinas, talleres y actividades impartidas por Salvadora Conesa y su equipo de colaboradores.

## Clases y Talleres Destacados

### Kundalini Yoga
- **Enfoque**: Respiración (pranayama), posturas (asanas), cantos de mantras y meditaciones transformadoras.
- **Duración**: Sesiones de 75 a 90 minutos.
- **Modalidades**: Presencial en sala acondicionada.

### Nagna Yoga
- **Enfoque**: Yoga desnudo consciente para la autoaceptación, el desprendimiento de prejuicios estéticos y la reconexión íntima con el propio ser.
- **Ambiente**: Máximo respeto, cuidado y espacio seguro libre de juicios.

### Baños de Gong
- **Enfoque**: Terapia de sonido con gongs sinfónicos y cuencos tibetanos.
- **Beneficios**: Alivio del estrés crónico, regeneración celular y descanso profundo del sistema nervioso.

### Taller Mejorar Asanas
- **Enfoque**: Perfeccionamiento técnico, biomecánica y ajustes posturales personalizados.

### Actividades de Colaboradores
- Tai Chi, Yoga Nidra, Entrenamiento Funcional, Aiki, Ninjutsu y Defensa Personal Policial.

## Reservas
Para reservar plaza o consultar horarios actualizados, visita [Página de Reservas](/reserva) o contacta por WhatsApp al [+34 695 17 26 25](https://wa.me/34695172625).
`,

  "/reserva": `# Reserva de Clases y Sesiones — Centro de Yoga Salvadora Conesa

Gestiona tu plaza para clases regulares, talleres especiales y baños de gong.

## Opciones de Reserva
1. **Reserva Directa Online**: Selecciona la actividad, fecha y horario deseado a través de nuestra pasarela segura.
2. **Asistente Virtual**: Puedes interactuar con nuestro agente conversacional en la web para coordinar tu cita o resolver dudas sobre disponibilidad.
3. **Atención por WhatsApp**: Escríbenos directamente al [+34 695 17 26 25](https://wa.me/34695172625) para resolver preguntas personalizadas.

## Condiciones
- Se recomienda llegar 10 minutos antes de la hora acordada.
- Material incluido en la sala (esterillas, mantas, zafus y cojines de meditación).
- Cancelaciones con al menos 24 horas de antelación para reprogramar tu sesión.
`,

  "/nagna-yoga": `# Nagna Yoga — Yoga Desnudo Consciente en Fuenlabrada

El Nagna Yoga es una disciplina milenaria que propone la práctica del yoga sin ropa como vehículo de liberación interior, desmitificación del cuerpo y conexión con la esencia pura.

## Principios Fundamentales
- **Aceptación Corporal**: Mirar y sentir el propio cuerpo sin las etiquetas ni exigencias del mundo exterior.
- **Espacio Seguro y Sagrado**: Las sesiones se rigen por un código estricto de respeto, confidencialidad y ausencia de intencionalidad sexual.
- **Fluidez y Movimiento**: Sin la resistencia de tejidos o costuras, la respiración y el estiramiento son percibidos con total nitidez.

## A quién va dirigido
A cualquier persona que desee reconciliarse con su corporeidad, liberar tensiones arraigadas o experimentar una práctica de yoga profunda y libre.

## Reservar plaza
Consulta fechas y grupos reducidos en [Reservas](/reserva) o llama al [+34 695 17 26 25](https://wa.me/34695172625).
`,

  "/mejorar-asanas": `# Taller Mejorar Asanas — Alineación y Profundización Postural

Taller técnico enfocado en la biomecánica corporal, la corrección de hábitos posturales y el desarrollo de una práctica segura y duradera.

## Contenido del Taller
1. **Base y Apoyo**: Conciencia de la pisada y el enraizamiento (Pada Bandha).
2. **Alineación de Columna**: Prevención de hiperlordosis y sobrecargas cervicales o lumbares.
3. **Transiciones Fluídas**: Cómo entrar y salir de cada postura manteniendo la respiración consciente.
4. **Adaptaciones**: Variantes con apoyos (bloques, cinturones, mantas) según la anatomía individual.

## Información de Reserva
- Plazas limitadas para garantizar atención individualizada.
- Reserva a través de [la sección de reservas](/reserva).
`,

  "/politica-de-privacidad": `# Política de Privacidad — Centro de Yoga Fuenlabrada Salvadora Conesa

Conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD).

- **Responsable**: Centro de Yoga Fuenlabrada Salvadora Conesa
- **Finalidad**: Gestión de citas, reservas, suscripciones y atención de consultas de los usuarios.
- **Legitimación**: Consentimiento del interesado y relación precontractual/contractual.
- **Destinatarios**: No se cederán datos a terceros salvo obligación legal expresa.
- **Derechos**: Acceso, rectificación, supresión, oposición y portabilidad enviando solicitud a salvadora@centrodeyogasalvadoraconesa.es.
`,

  "/politica-de-cookies": `# Política de Cookies — Centro de Yoga Salvadora Conesa

Este sitio web utiliza cookies técnicas imprescindibles para la navegación y la gestión de sesiones de reserva.

- **Cookies Técnicas**: Necesarias para el correcto funcionamiento de la plataforma y el asistente de reservas.
- **Cookies Analíticas**: Utilizadas para medir el tráfico y mejorar la experiencia de usuario (anonimizadas).
- **Gestión**: Puedes configurar o deshabilitar las cookies desde las preferencias de tu navegador web.
`,

  "/ley-de-proteccion-de-datos": `# Ley de Protección de Datos (RGPD y LOPDGDD)

Información detallada sobre las garantías, protocolos de seguridad y derechos digitales de los clientes del Centro de Yoga Salvadora Conesa.

Garantizamos la confidencialidad absoluta en todos los canales de interacción, incluyendo formularios web, reservas online y asistentes inteligentes de soporte.
`,
};

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  // Check if client explicitly requests Markdown
  if (accept.includes("text/markdown")) {
    const pathname = request.nextUrl.pathname;
    const normalizedPath = pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

    const markdown = PAGE_MARKDOWN[normalizedPath] || PAGE_MARKDOWN["/"];
    const estimatedTokens = Math.ceil(markdown.length / 3.8);

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(estimatedTokens),
        "Vary": "Accept",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all page routes, exclude internal Next.js assets, API, and static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|pdf|txt|ico)).*)",
  ],
};
