# Project Context — norson-supplies

Single source of truth for current project state. All agents read this before starting and append to ## Log after completing work.

---

## Current state

**Phase:** Wave 1 complete + Nosotros — 2 sections built
**Build status:** `astro build` passes, zero errors
**Node requirement:** >=20 (use `nvm use 22`)

## Architecture (as-built)

```
src/
  layouts/BaseLayout.astro   head + OG tags + slot name="head"
  pages/index.astro          Hero + Nosotros wired
  styles/global.css          @theme {} palette confirmed
  components/                empty
  sections/Hero.astro
  sections/Nosotros.astro
public/images/               34 .webp files (exact filenames with accents)
astro.config.mjs             site=https://norsonsupplies.com (placeholder)
```

## Sections built

- Hero (`src/sections/Hero.astro`) — 2026-04-27
- Nosotros (`src/sections/Nosotros.astro`) — 2026-04-27

## Design decisions

- Palette: defaults confirmed (`--color-primary: #1a3a5c`, `--color-accent: #f97316`)
- Font: Inter via system-ui fallback — no external font loaded yet
- Images: in `public/images/` (bypass astro:assets) — move to `src/assets/` when catalog section is built
- Image filenames: kebab-case, no accents, no spaces (e.g. `cemento-gris.webp`, `lamina-p7.webp`)

## UX decisions

### Productos (defined 2026-04-27)
- Section background: white (#ffffff) — alternates with Nosotros surface (#f8fafc)
- H2: "Todo lo que necesita tu obra, en un solo lugar" — second H2 on page
- Eyebrow: "NUESTROS PRODUCTOS" — decorative `<p>`, same treatment as Nosotros eyebrow
- Filter tabs: horizontal scroll row (no wrap) on mobile; wrapping row on md+; pill shape, primary color active state; "Todos" as first and default
- Filter implementation: Island JS mínimo — static HTML at build, JS island handles button state + data-categoria show/hide only
- Grid: 1 col mobile → 2 col sm → 3 col md → 4 col lg
- Card anatomy: 1:1 image, category badge (small pill, muted bg), product name, 2-line truncated description, WhatsApp CTA
- No-image fallback: primary bg (#1a3a5c) + centered initial letter (white, large) + category label below — no broken img, no placeholder.png
- WhatsApp CTA message pre-filled with product name, e.g. "Hola, me interesa cotizar: Cemento gris"
- Section-level fallback CTA: phone link below grid — ghost style, not accent orange
- Image files: 35 files in public/images/ (34 products + logo-norson.png); 4 Obra Negra products have no image

### Nosotros (defined 2026-04-27)
- Section background: `--color-surface` (#f8fafc) — creates visual alternation from the blue Hero
- H2: "Una distribuidora que trabaja para que tu obra no se detenga" — first H2 on the page
- Optional eyebrow label: "SOBRE NOSOTROS" in small uppercase muted text — decorative, not a heading
- Mission rewritten as client-facing promise titled "Nuestra promesa"; Vision rewritten as regional permanence signal titled "Nuestro compromiso con la region"
- Digital tools / digital media copy from seed suppressed — not relevant to target client (contractor/site foreman)
- Valores: 6 items as icon+label+description cards; "Servicio al cliente" renamed "Atencion directa" for specificity
- Values grid: 2 columns on mobile, 3 columns on md+
- Mission/Vision cards: stacked on mobile, 2-column grid on md+; left border accent treatment (border-l-4 accent)
- Micro-CTA at section close: WhatsApp link, ghost button style using primary color border — NOT accent orange (reserved for primary CTAs)
- No form in this section — section goal is trust-building, not direct conversion
- No scroll animations — static section

### Hero (defined 2026-04-27)
- Background treatment: solid `--color-primary` (#1a3a5c) full-bleed — no product images in hero
- Logo displayed in hero header area (top-left on desktop, centered on mobile)
- H1 is the only H1 on the page; placed as the dominant text element above the fold
- Primary CTA: WhatsApp button — opens `wa.me/526313035892` in new tab
- Secondary CTA: clickable phone number `tel:6313035892`
- Both CTAs visible above the fold on 375px mobile without scrolling
- No form in the Hero — friction must be zero at first touch
- Credibility device: 3 inline trust tokens (numbers/claims) below the CTAs, not above
- Hero min-height: 100svh on mobile, auto (content-driven) with generous padding on desktop
- Decorative element: subtle diagonal or angled bottom edge in accent color to transition into next section — decision deferred to @ui-experto with constraint that it must not obscure CTAs

## SEO decisions

- H1: placed in Hero section — "Materiales de construcción en Sinaloa, listos cuando los necesitas" (finalized by @ux-experto)
- Title tag (index): "Materiales de Construcción en Sinaloa | NorSon Supplies" — 56 chars (IMPLEMENTED)
- Meta description (index): "Distribuidora de materiales de construcción en Sinaloa. Bloques, cemento, lámina, acero y renta de maquinaria. Entrega rápida. Llama a NorSon Supplies." — 154 chars (IMPLEMENTED)
- JSON-LD LocalBusiness: IMPLEMENTED in `src/pages/index.astro` via `<slot name="head">` — address/geo blocks pending client data (TODO markers in frontmatter)
- Domain: placeholder `https://norsonsupplies.com` — real domain unknown
- Address/geo: not provided by client yet — TODO markers in `src/pages/index.astro` frontmatter
- robots.txt: CREATED at `public/robots.txt` — allows all crawlers, points to `https://norsonsupplies.com/sitemap-index.xml`
- OG image: tag wired in `BaseLayout.astro` pointing to `/images/og-default.png` — image file not yet created (1200x630px, dark blue bg, brand lockup spec stands)
- Twitter Card tags: ADDED to `BaseLayout.astro` (summary_large_image, title, description, image)
- Canonical: BaseLayout derives from `Astro.url.href` — correct for static output
- `<slot name="head">` in BaseLayout: confirmed working — JSON-LD script injected correctly at build time
- H2 strategy for upcoming sections: defined per section below
- Nosotros H2: "Una distribuidora que trabaja para que tu obra no se detenga" — no keyword stuffing required; section relies on body copy for keyword reinforcement
- Nosotros H3s: "Nuestra promesa" and "Nuestro compromiso con la región" — trust labels, not keyword targets; correct
- Value card labels: rendered as `<p>` not headings — intentional, no H4 depth warranted on single-page site
- JSON-LD LocalBusiness.description updated to align with Nosotros copy: includes "contratistas", "noroeste de México", "para obra" — removes "proyectos arquitectónicos" (not audience language)
- Nosotros body copy: "Sinaloa" keyword added inside "Presencia regional" value card ("estamos en Sinaloa, no en un call center") — creates secondary location anchor in body text

## Open items

- [ ] Confirm real domain and update `astro.config.mjs` site field
- [ ] Get physical address + geo coordinates for JSON-LD
- [ ] Client confirmation on brand colors before locking palette
- [x] Move product images from `public/images/` → `src/assets/` when catalog section starts — triggered by Productos UX spec; @ui-experto must migrate before implementation

## Log

### 2026-04-27 — scaffold
- Initialized Astro 5 + Tailwind v4 + @astrojs/sitemap
- Created BaseLayout, global.css, empty index.astro
- Copied 34 product .webp images to public/images/
- Build: clean

### 2026-04-27 — image rename
- Renamed all 34 images in seed/images/ and public/images/ to kebab-case without accents
- Fixed data error in catalog.csv: Imagen column was shifted one row for Cubiertas/Tejas/Accesorios categories
- Simplified catalog.csv to 4 columns (removed empty columns 4-8)
- 4 products confirmed without image: Ladrillo rojo, Piedra braza, Cal hidratada, Vigueta pretensada

### 2026-04-27 — Hero UX spec (@ux-experto)
- Delivered full UX spec for Hero section (objective, content hierarchy, copy, mobile/desktop behavior, UI notes)
- Background: solid primary (#1a3a5c), no product imagery
- H1 placed in Hero — only H1 on page
- Primary CTA: WhatsApp (`wa.me/526313035892`); secondary: phone (`tel:6313035892`)
- Trust tokens (3 inline items) placed below CTAs, above fold not required for tokens
- Component path decided: `src/sections/Hero.astro`
- Decorative bottom transition deferred to @ui-experto; constraint documented

### 2026-04-27 — Hero section (@ui-experto)
- Created `src/sections/Hero.astro` — full UX spec implemented
- Mobile: full-bleed bg-[#1a3a5c], min-h-svh, centered column, logo pt-6, H1 28px, WhatsApp CTA h-52px bg-accent, phone ghost border-white h-44px, 3 trust tokens stacked
- Desktop: lg nav bar (logo left, "Llamar: 631 303 5892" right), two-col layout (55% content / 45% accent panel), CTAs inline, trust tokens horizontal row
- Desktop right panel: bg-[#f97316] with geometric CSS treatment (diagonal hatch pattern + decorative circles + rotated square, all CSS/inline-style, no images)
- Updated `src/pages/index.astro`: title and description aligned to SEO spec from context.md
- Build: clean, 1 page, 0 errors, 0 warnings

### 2026-04-27 — SEO layer Wave 1 (@seo-experto)
- Implemented JSON-LD LocalBusiness schema in `src/pages/index.astro` via `<slot name="head">` block; schema built in frontmatter as a JS object to allow TODO comment markers for address/geo
- Added `og:image` meta tag to `BaseLayout.astro` pointing to `/images/og-default.png` (placeholder — file not yet created)
- Added full Twitter Card block to `BaseLayout.astro` (summary_large_image, title, description, image)
- Created `public/robots.txt` — allows all crawlers, Sitemap points to `https://norsonsupplies.com/sitemap-index.xml`
- Build: clean — 1 page, 0 errors, 0 warnings; sitemap-index.xml confirmed generated
- Verified emitted HTML: title (56 chars), description (154 chars), canonical, all OG tags, Twitter Card, and JSON-LD script all present in dist/index.html
- Open: og-default.png image still to be created; address/geo blocks pending client data

### 2026-04-27 — Nosotros UX spec (@ux-experto)
- Delivered full UX spec for Nosotros section (objective, hierarchy, copy, mobile/desktop, UI notes)
- Section background: --color-surface for visual alternation from Hero
- H2 defined: "Una distribuidora que trabaja para que tu obra no se detenga" — first H2 on page
- Mission/Vision rewritten as client-facing copy; removed "digital tools" framing (not relevant to target client)
- 6 value cards with icon+label+description; "Servicio al cliente" renamed "Atencion directa"
- Micro-CTA links to WhatsApp using ghost button (primary border, not accent orange)
- Trade-off documented: seed copy fidelity sacrificed for conversion relevance
- Component path decided: src/sections/Nosotros.astro

### 2026-04-27 — Nosotros section (@ui-experto)
- Created `src/sections/Nosotros.astro` — full UX spec implemented
- Eyebrow "SOBRE NOSOTROS" as decorative `<p>` (not heading), small uppercase tracking-widest muted
- H2 centered, max-w-2xl, text-2xl mobile / text-4xl desktop
- Misión/Visión: 2 stacked cards on mobile → 2-col grid on md+; border-l-4 accent, bg-white, rounded-r-lg, shadow-sm; h3 inside each
- 6 value cards: 2-col grid mobile → 3-col md+; bg-white rounded-lg shadow-sm; icon (inline SVG Feather/Heroicons-style, stroke #1a3a5c) + label + description
- Micro-CTA: ghost button, max-w-[280px] full-width mobile / auto desktop; border-2 primary color, hover fills primary bg
- Updated `src/pages/index.astro`: imported Nosotros, placed after Hero
- Build: clean — 1 page, 0 errors, 0 warnings

### 2026-04-27 — Nosotros SEO review (@seo-experto)
- Heading hierarchy confirmed correct — H1 > H2 > H3 chain has no skipped levels, value labels as `<p>` is correct
- Copy analysis: "contratista", "noroeste de México", "materiales de construcción de calidad" all present — strong keyword support for commercial-investigation queries
- Gap identified: "Sinaloa" not present in Nosotros body text — fixed by editing "Presencia regional" value description ("aquí" → "en Sinaloa")
- JSON-LD LocalBusiness.description updated to align with Nosotros entity language: added "contratistas", "noroeste de México", replaced "proyectos arquitectónicos" with "para obra"
- Title tag and meta description: no change needed — both remain within spec and accurate
- No new schema type required for Nosotros section (trust/about content, not a product/service/review entity)
- Build: clean — 1 page, 0 errors, 0 warnings; JSON-LD verified in dist/index.html

### 2026-04-27 — Productos UX spec (@ux-experto)
- Delivered full UX spec for Productos/Catalogo section
- H2 defined: "Todo lo que necesita tu obra, en un solo lugar" — second H2 on page
- Section background: white (#ffffff) — alternates with Nosotros surface (#f8fafc)
- Filter strategy: Island JS mínimo preferred — cards static at build time, island only drives show/hide via data-categoria attribute
- 12 filter tabs rendered as a horizontal scroll row on mobile (no wrap), pill buttons; sticky below the section header
- "Todos" tab is the default active state — shows all 39 products on load
- Product card anatomy: image (1:1 ratio, object-cover), category badge, product name (bold), short description (2 lines max, truncated), WhatsApp CTA button
- 4 products without image (Ladrillo rojo, Piedra braza, Cal hidratada, Vigueta pretensada): placeholder treatment — primary color (#1a3a5c) background + product initial letter in white + category label, NO broken image
- CTA per card: "Cotizar por WhatsApp" — links to wa.me/526313035892 with pre-filled message including product name
- Grid: 1 column on mobile, 2 columns on sm, 3 columns on md, 4 columns on lg
- Section-level CTA: secondary "Hablar con un asesor" (phone link) below the grid as fallback for non-WhatsApp users
- Image migration: images move from public/images/ to src/assets/ when @ui-experto implements this section
- Component path decided: src/sections/Productos.astro + src/components/ProductCard.astro + src/islands/CatalogFilter.ts (or .astro with client:load)

### 2026-04-27 — landing page kickoff plan (orquestador)
- Produced full delegation plan for landing page build — no sections existed at kickoff
- Wave 1 (conversion critical): Hero (@ux-experto → @ui-experto) + Foundation SEO (@seo-experto in parallel)
- Wave 2 (trust + product): Trust bar and Catalog section (@ux-experto → @ui-experto); image migration to src/assets/ triggered at catalog start
- Wave 3 (lead capture + close): Contact/quote form and Footer (@ux-experto → @ui-experto); final SEO pass (@seo-experto)
- Escalations flagged: real domain, physical address, form backend, brand color confirmation, trust signal data — all required from client before respective waves complete
