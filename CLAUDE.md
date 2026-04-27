# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for **NorSon Supplies** — construction materials distributor in Mexico. Goal: lead capture and commercial contact (not e-commerce). Primary channel: WhatsApp (`wa.me/526313035892`) and phone (`tel:6313035892`).

## Stack

- Astro 5+ — static generation, minimal client JS via islands only
- Tailwind CSS v4 — CSS-first config via `@theme {}`, no `tailwind.config.js`
- TypeScript strict in component frontmatter and island logic

## Commands

> Requires Node >=20. Shell default may be v18 — run `nvm use 22` first (`.nvmrc` is set to 22).

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Static build to dist/
npm run preview   # Preview the build
npm run check     # TypeScript check via astro check
```

## Architecture

```
src/
  components/     # Reusable pieces (buttons, product cards, etc.)
  sections/       # Full landing sections (Hero, Catalog, Contact…)
  layouts/        # BaseLayout.astro
  styles/
    global.css    # @theme {}, custom @utility definitions
  pages/
    index.astro   # Single entry point
public/
  images/         # Product images copied from seed/images/ at build
seed/             # Source data — never modified
  images/         # 34 product .webp files (filename = product name)
  catalog.csv     # Columns: Categoría, Producto, Descripción, Imagen
  info.txt        # Company description, mission, values, services
```

## Default color palette

```css
@theme {
  --color-primary: #1a3a5c;   /* trust blue */
  --color-accent:  #f97316;   /* CTA orange */
  --color-surface: #f8fafc;
  --color-text:    #1e293b;
  --color-muted:   #64748b;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

## Implementation rules

- Tailwind: all theme customization in `src/styles/global.css` inside `@theme {}`. No config file.
- No JS frameworks for static content. Islands only when real client state is needed.
- All images via `<Image />` from `astro:assets`, never raw `<img>`.
- Catalog data parsed from CSV at build time — never hardcoded in components.
- Mobile-first: base (375px) → `md:` → `lg:`. No horizontal scroll at any breakpoint.
- No code comments unless the WHY is non-obvious.

## Seed data

**catalog.csv** — 12 categories: Cementos y Morteros, Estucos y Recubrimientos, Cubiertas para Techos, Tejas, Accesorios para Techos, Aditivos, Impermeabilización, Agregados, Acero de Refuerzo, Fijación, Block y Mampostería, Obra Negra.

The `Imagen` field maps to the `.webp` filename in `seed/images/` — minor casing/accent differences exist, verify match before use.

## Agents

| Agent | Role |
|---|---|
| `@orquestador` | Decomposes tasks, decides agent order |
| `@ux-experto` | Section structure, copy, CTAs, mobile/desktop behavior |
| `@ui-experto` | Astro + Tailwind implementation, Astro config, performance |
| `@seo-experto` | Meta tags, structured data, sitemap, Core Web Vitals |

Rule: for new sections, always `@ux-experto` before `@ui-experto`.
