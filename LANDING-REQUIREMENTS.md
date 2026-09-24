# TechToJob — Landing Page (Torneo #2)

Requisitos, stack y parámetros de diseño para la landing del sitio de TechToJob.

---

## 1. Posicionamiento (NO se toca)

> **TechToJob no es un tablón de anuncios, es una comunidad.**
> En un portal de empleo mandas el CV y desapareces entre cientos. Aquí estás dentro, construyes cosas, y te conocen antes de que haya una vacante.

Si la landing termina pareciendo un portal de empleo más (InfoJobs/LinkedIn), falló lo importante aunque se vea linda.

**Problema que resuelve:** mandas cuarenta candidaturas y nadie te contesta; si eres junior te piden experiencia que no puedes tener.

**Restricciones de contenido:**
- "Gratis" no es diferencial como titular (InfoJobs y LinkedIn también lo son). Mencionarlo donde tranquilice, no como bandera.
- Nunca prometer trabajo garantizado, plazos tipo "encuentra empleo en 30 días" ni cifras no confirmadas.
- No poner números de miembros/empresas (no hay cifra confirmada).

---

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15.5.25 (App Router) |
| UI | React 19.1 |
| Lenguaje | TypeScript ^5 |
| Estilos | Tailwind CSS v4 |
| Iconos | `@tabler/icons-react` ^3.46 |
| Animaciones | GSAP + ScrollTrigger |
| Fuente | Sora (Google Fonts) |

**Scripts:**
- `npm run dev` → limpia `.next` automáticamente (`predev`) y levanta dev server (webpack, Turbopack omitido porque rompe el parseo de Tailwind v4).
- `npm run build` → `next build` sin `--turbopack` (misma razón).
- `npm run lint`

---

## 3. Identidad de marca

### Paleta de color
| Color | Hex | Uso |
|---|---|---|
| Dark | `#2f3436` | Fondos oscuros, texto sobre claro, cuerpo |
| Teal | `#84c0bf` | Acentos, botones, destacados |
| Blanco | `#ffffff` | Fondos, texto sobre oscuro |

- **Solo estos tres colores son base.**
- Se permite gris como soporte (fondos de tarjetas, bordes, placeholders).
- Regla de contraste: teal `#84c0bf` sobre blanco NO pasa contraste (~2:1) para texto pequeño; usar sobre fondos/oscuros o en botones grandes.
- El texto de cuerpo en fondos claros usa `#2f3436` (no gris) para garantizar contraste.
- Los subtítulos/descripciones van en teal `#84c0bf`.
- Los eyebrows (labios de sección) van en blanco sobre secciones oscuras.
- Botones CTA: teal (`btn-discord`), texto oscuro. No usar botón `#2f3436` como primario.

### Tipografía
- **Sora** vía `next/font/google`.
- Tres pesos máx: `400`, `600`, `700`.
- `display: swap`.

### Logos
- Nav: `v2Negativo.svg`
- Footer: `v2Negativo.svg`
- JSON-LD (Organization): `v2Positivo.svg`
- Ilustraciones hand-drawn: `work.svg` y `search.svg` (negro + amarillo `#F2CC68`).

---

## 4. Estructura de la página (10 secciones obligatorias)

Orden y responsable de contenido según brief:

1. **Hero** — En 3s se entiende qué es TechToJob y por qué no es un portal más. Un solo botón: entrar al Discord. Ilustraciones `work.svg` y `search.svg` a distinto nivel conectadas por una ruta tech con luces animadas.
2. **Cómo funciona** — Recorrido en pasos: empezar cuesta poco, las oportunidades salen de participar, no de rellenar formularios.
3. **Ofrécete como talento** — Publica perfil (stack, nivel, disponibilidad). Sin filtro automático que descarte antes de que una persona te lea. No hace falta ser senior. No cuesta dinero.
4. **Publica como empresa** — Empresas ven a la gente trabajar antes de contratar, no solo su CV. Menos criba y más contexto real.
5. **Torneos** — Reto, entregas, jurado con criterios públicos. Sirven para aprender, para tener algo que mostrar en una entrevista y para darse a conocer.
6. **Networking** — Canales por área; los buenos trabajos no se encuentran, te enteras. Este es el sitio donde te enteras.
7. **Noticias** — 3 entradas de ejemplo con título, fecha, categoría y resumen.
8. **Newsletter** — Qué llega, cada cuánto, sin spam. El botón dice lo que la persona quiere recibir (no "Suscribirse").
9. **Cierre** — Último empujón antes del footer ("Último paso").
10. **Footer** — Enlaces por bloques (talento, empresas, comunidad, legal), redes y aviso legal.

### Reveal (animación)
- `Closing` + `Footer` van dentro de un bloque `.reveal` con `position: sticky; bottom: 0` detrás del `main`. Al scrollear al final se deslizan desde atrás (efecto "footer reveal").

---

## 5. Datos reales (no se inventan)

- **Nombre:** TechToJob (así escrito, sin espacios)
- **Discord:** https://discord.gg/h9FFgKdkRd
- **LinkedIn:** https://www.linkedin.com/company/techtojob/
- **X:** https://x.com/techtojob
- **Instagram:** https://www.instagram.com/techtojob

---

## 6. Reglas de tono

- **Tuteo.** Nada de "usted" ni de "nuestros usuarios".
- **Frases cortas.** Si una frase necesita coma para respirar, se parte.
- **Cero palabras de folleto:** sinergia, ecosistema, revolucionar, solución integral, potenciar, disrupción.
- **Habla de la persona, no de nosotros.** "Te encuentran" mejor que "ofrecemos visibilidad".
- **Palabras que la gente busca.** "Conectamos talento con oportunidades" no posiciona; "comunidad de desarrolladores y empresas tech en español" sí.
- **Promete solo lo que se cumple.**

---

## 7. i18n

- Todo el texto en `src/messages/es.json` (todos los strings accesibles a traducción).
- Código en inglés (nombres de componentes, variables, commits).
- Preparado para agregar `en.json` en el futuro.

---

## 8. SEO

- Un solo `<h1>` (en el Hero).
- HTML semántico: `header`, `main`, `section`, `article`, `footer`, `<time>`, `<nav>`.
- Navegación con `<a>` reales (no `div` + `onClick`); textos de enlace descriptivos.
- `<html lang="es">`.
- Metadata: `title` template `%s | TechToJob`, `description`, `canonical`, `metadataBase`.
- Open Graph 1200×630 y Twitter Card `summary_large_image`.
- JSON-LD `Organization` (ld+json).
- Imágenes WebP/AVIF; `loading="lazy"` bajo el fold; `alt` descriptivo (SVGs vectoriales no requieren optimización raster).
- Hero: `priority` en imágenes por encima del fold.

---

## 9. Accesibilidad

- Contraste WCAG AA.
- `prefers-reduced-motion`: GSAP y transiciones CSS se desactivan/simplifican.
- `aria-labelledby` en secciones, `aria-label` en nav y botones.
- `:focus-visible` con outline teal.
- `.srOnly` para labels de formularios.
- Navegación mobile con menú hamburguesa y `aria-expanded`.

---

## 10. Criterios de scoring (relevante para la web)

| Criterio | % |
|---|---|
| Diseño | 25% |
| Contenido | 25% |
| Responsive | 15% |
| Estructura de código | 15% |
| SEO | 10% |
| Accesibilidad | 10% |

---

## 11. Notas de desarrollo conocidas

- **Tailwind v4 + Turbopack:** el parser de CSS de Turbopack tira "Invalid dangling combinator" con el output compilado de Tailwind. Fix: build y dev sin Turbopack (`--turbopack` fuera de los scripts).
- **`.next` corrupta:** los hot-reloads continuos (dev turbopack + build webpack) corrompen la caché → crashes (`__webpack_modules__`, manifest errors). Fix: `predev` borra `.next`.
- **Console Ninja (VSCode/Wallaby):** inyecta un hook en `start-server.js` de Next; si está activa puede crashear el server. Desactivarla si persisten caídas.
- **Capas CSS en Tailwind v4:** el CSS custom debe ir en `@layer components` para que las utilities (`text-white`, etc.) puedan sobreescribirlo.
- **Scrollbar en Windows:** al aparecer la scrollbar cambia el ancho del layout y con `height:auto` las imágenes recalcular su altura (~1px). Fix: `html { overflow-y: scroll; scrollbar-gutter: stable; }`.
- **Footer reveal 1px:** el sticky "settle" al final puede correrse 1px; mitigado con `margin-top: -1px` en `.reveal`.