# TechToJob — Landing (Torneo #2)

Web oficial de [TechToJob](https://techtojob.com), la comunidad de desarrolladores y empresas tech en español.

**TechToJob no es un portal de empleo.** Es una comunidad donde desarrolladores, ingenieros y empresas se conocen antes de que exista una vacante: participas, construyes cosas y las oportunidades aparecen solas.

Esta landing es el resultado de un **torneo de la comunidad**: el Torneo #2 · Landing TechToJob. Los torneos son retos abiertos con jurado y criterios públicos, donde se construye algo real para la comunidad y el ganador se lleva más que un premio. Esta web que estás viendo salió del torneo, y los próximos (Torneo #3 y #4) ya se anuncian dentro de la propia landing.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| UI | React 19 |
| Lenguaje | TypeScript ^5 |
| Estilos | Tailwind CSS v4 |
| Iconos | `@tabler/icons-react` |
| Animaciones | GSAP + ScrollTrigger |
| Scroll suave | Lenis |
| Fuente | Sora (Google Fonts) |

## Scripts

```bash
npm run dev     # Limpia .next (predev) y levanta el dev server
npm run build   # next build (sin --turbopack: rompe el parseo de Tailwind v4)
npm run start   # Sirve el build de producción
npm run lint    # ESLint
```

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx        # Root layout: fuentes, SE metadata y SmoothScroll
│   ├── metadata.ts       # metadata (SEO) + jsonLd
│   ├── page.tsx          # Composición de la landing
│   └── (grid: icon.svg)
├── components/
│   ├── ui/               # Primitivas reutilizables
│   │   ├── glue-balls/   # Fondo glue (metaballs) en WebGL
│   │   ├── logo-symbol/  # Símbolo del logo
│   │   └── reveal/       # Animación de aparición al scroll
│   ├── layout/           # Chrome de la página
│   │   ├── site-header/  # Header sticky con menú y anclas
│   │   ├── smooth-scroll/# Lenis sincronizado con ScrollTrigger
│   │   ├── closing/      # CTA final (sección sticky)
│   │   └── footer/
│   └── sections/         # Secciones de la landing
│       ├── hero/         # Hero con zoom de laptop (GSAP pin)
│       ├── talento/
│       ├── empresas/
│       ├── tournaments/
│       ├── networking/
│       ├── news/
│       ├── testimonials/
│       ├── newsletter/
│       └── how-it-works/
├── global/style.css      # Estilos globales y design tokens de Tailwind v4
├── messages/es.json      # Todo el contenido en español (i18n simple por archivo)
└── types/                # Tipos e interfaces del proyecto (uno por archivo)
```

## Características

- **Hero con efecto de zoom**: la laptop de la portada se escala hasta llenar la pantalla con GSAP `scrollTrigger` + `pin`.
- **Scroll suave**: Lenis con easing propio, sincronizado con ScrollTrigger.
- **Anclas suaves**: los links del menú se desplazan con Lenis.
- **Animaciones de aparición**: `Reveal` con GSAP ScrollTrigger, respeta `prefers-reduced-motion`.
- **Fondo metaballs**: canvas WebGL (`glue-balls`) con física simple de bolas.
- **Footer "reveal"**: cierre y footer con `position: sticky` que se revelan al final del scroll.
- **Responsive y accesible**: menú móvil, `aria-*`, `:focus-visible` y `srOnly`.
- **SEO**: Open Graph, Twitter cards, JSON-LD de la organización y sitemap en `metadata.ts`.

## Identidad

Paleta base: `#2f3436` (dark) · `#84c0bf` (teal) · `#ffffff`. Tipografía: Sora. Detalles en [LANDING-REQUIREMENTS.md](./LANDING-REQUIREMENTS.md).

## Comunidad

- [Discord](https://discord.gg/h9FFgKdkRd)
- [LinkedIn](https://www.linkedin.com/company/techtojob/)
- [X](https://x.com/techtojob)
- [Instagram](https://www.instagram.com/techtojob)