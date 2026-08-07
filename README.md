# Centro de Yoga Salvadora Conesa — Copia Local

Copia local funcional del sitio web **https://salvadoraconesa.es/**

Descargada el: **07/08/2026**

---

## Cómo abrir la copia local

### Opción A — Live Server (recomendado en VS Code)

1. Abre VS Code.
2. Abre la carpeta `NUEVO_PROYECTO`.
3. Instala la extensión **Live Server** (ritwickdey.liveserver) si no la tienes.
4. Haz clic derecho en `index.html` → **Open with Live Server**.

### Opción B — Servidor local con Python

```
python -m http.server 8080
```

y abre `http://localhost:8080/`.

### Opción C — Directamente desde el navegador

Arrastra `index.html` a Chrome, Firefox o Edge. El sitio no usa AJAX ni rutas dinámicas, así que funciona igual sin servidor.

---

## Estructura del proyecto

```
NUEVO_PROYECTO/
├── index.html                  ← Página de inicio
├── pages/
│   ├── sobre__mi.html          ← Sobre Mí
│   ├── practica__yoga.html     ← Practica Yoga
│   └── banos__gong.html        ← Baños de Gong
├── assets/
│   ├── css/style.css           ← Único CSS del sitio
│   ├── img/                    ← 14 imágenes descargadas
│   ├── js/                     ← vacío (el sitio no usa JS local)
│   └── pdf/                    ← vacío
└── README.md
```

---

## Páginas disponibles

| Página | Archivo |
|--------|---------|
| Inicio | `index.html` |
| Sobre Mí | `pages/sobre__mi.html` |
| Practica Yoga | `pages/practica__yoga.html` |
| Baños de Gong | `pages/banos__gong.html` |

## Páginas NO descargadas

El menú del sitio original enlaza a muchas más secciones (Meditación, Terapia Gestalt, Constelaciones Familiares, Talleres de fin de semana, Asociación Tara Granada y sus 8 sub-secciones, Ayuno Terapéutico, Eventos, Contacto, Política de Privacidad/Cookies/Protección de Datos), pero **todas apuntan a `#`** en el sitio en vivo — no existen todavía como páginas reales, así que no había nada que descargar para ellas.

---

## Qué funciona

- ✅ Visualización completa de las 4 páginas descargadas
- ✅ Navegación entre páginas mediante el menú (incluido el menú móvil, que es CSS puro vía checkbox hack — no requiere JS)
- ✅ Imágenes locales (14 imágenes)
- ✅ CSS local (`assets/css/style.css`, un único fichero, sin dependencias externas)
- ✅ Tipografía: el sitio usa fuentes de sistema (Arial/Helvetica) — no depende de ningún CDN de fuentes

## Qué no funciona / limitaciones conocidas

- ❌ Todas las secciones de menú que en el sitio original apuntan a `#` (ver arriba) — no son páginas reales todavía, ni aquí ni en la web original
- ⚠️ **Enlace roto heredado del sitio original**: `<link rel="stylesheet" href="https://salvadoraconesa.es/js/menu/menu.js">` en el `<head>` de cada página apunta a una URL que devuelve 404 en el sitio original. Se ha mantenido tal cual por fidelidad a la fuente; es inofensivo (no es realmente un CSS y el navegador lo ignora al fallar la petición)
- ❌ No hay formulario de contacto ni backend — el sitio original tampoco parece tenerlo en las páginas descargadas

---

## Notas técnicas

- Sitio original: HTML estático hecho a mano (sin CMS ni builder detectado), un único CSS, sin JS de terceros
- Descargado con `wget --mirror --page-requisites --convert-links`
- Reorganizado a la convención `index.html` / `pages/*.html` / `assets/{css,img,js,pdf}/` para mantener consistencia con el resto de proyectos de este repositorio
