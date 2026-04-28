# Project Context — norson-supplies

Single source of truth for current project state. All agents read this before starting and append to ## Log after completing work.

---

## Current state

**Phase:** Wave 3 complete — 5 sections built (Hero, Nosotros, Productos, Contacto, Footer)
**Build status:** `astro build` passes, zero errors
**Node requirement:** >=20 (use `nvm use 22`)

## Architecture (as-built)

```
src/
  layouts/BaseLayout.astro         head + OG tags + slot name="head"
  pages/index.astro                Hero + Nosotros + Productos + Contacto + Footer wired
  styles/global.css                @theme {} palette confirmed
  components/ProductCard.astro     individual product card (Image + WA CTA)
  sections/Hero.astro              id="inicio" on root element
  sections/Nosotros.astro          id="nosotros" on root element
  sections/Productos.astro         catalog + category filter tabs; id="productos" on root element
  sections/Contacto.astro          contact form + channels + map; id="contacto" on root element
  sections/Footer.astro            primary bg, 3-col desktop grid, static copyright year
  assets/images/                   34 product .webp files (astro:assets optimized)
public/images/                     34 .webp files kept (logo + original copies)
astro.config.mjs                   site=https://norson-supplies.coffeecode.com.mx (preview)
```

## Sections built

- Hero (`src/sections/Hero.astro`) — 2026-04-27
- Nosotros (`src/sections/Nosotros.astro`) — 2026-04-27
- Productos (`src/sections/Productos.astro`) — 2026-04-27
- Contacto (`src/sections/Contacto.astro`) — 2026-04-27
- Footer (`src/sections/Footer.astro`) — 2026-04-27

## Design decisions

- Palette: defaults confirmed (`--color-primary: #1a3a5c`, `--color-accent: #f97316`)
- Font: Inter via system-ui fallback — no external font loaded yet
- Images: product .webp files migrated to `src/assets/images/` — processed by astro:assets with Sharp optimizer; `public/images/` kept for logo and legacy references
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

### Contacto (defined 2026-04-27)
- Section background: `--color-surface` (#f8fafc) — fourth section, resumes alternation after Productos (white)
- H2: "Hablemos de tu proyecto" — third H2 on page
- Eyebrow: "CONTACTO" — decorative `<p>`, same treatment as previous eyebrows
- Form service: Web3Forms — POST to https://api.web3forms.com/submit; `access_key` placeholder `YOUR_WEB3FORMS_KEY`; async fetch submit, no page redirect
- Form fields: Nombre (text, required), Teléfono o WhatsApp (tel, required, minlength=10), Mensaje (textarea 3 rows, optional) — no email field
- Submit island: vanilla <script> in same .astro file; disables button on submit; shows `role="alert"` confirmation; hides form on success
- Channel cards above form: WhatsApp (`wa.me/526313035892`, accent bg) + Phone (`tel:6313035892`, primary bg); both as `<a>` elements, min 56px tap target
- Map: Google Maps embed iframe (coordinates 31.300814,-110.954094), `loading="lazy"`, `title="Ubicación de NorSon Supplies"`, no API key; edge-to-edge on mobile (h-260px), full-width row on desktop below two columns (h-400px)
- Email: `mailto:Yolanda.padilla@galetadistribuidora.com` — displayed as link in data block, secondary element
- Desktop md+: two columns — channels+email left, form right; separator text hidden; map full-width below
- WhatsApp redirect from form: explicitly rejected — breaks user expectation of standard form behavior
- Open item resolved: geo coordinates (31.300814,-110.954094) available for JSON-LD; postal address still pending

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
- OG image: CREATED at `public/images/og-default.png` — 1200x630px, generated via `scripts/generate-og.mjs` using sharp; dark blue (#1a3a5c) bg, accent stripe, brand name + tagline in white/orange; `og:image` in BaseLayout now emits absolute URL using `Astro.url.origin`; `og:image:width` and `og:image:height` added
- Web manifest: CREATED at `public/site.webmanifest` — name/short_name/description/start_url/display/background_color/theme_color/lang/icons (logo-norson.png referenced at 192 and 512 sizes)
- Additional head meta tags ADDED to `BaseLayout.astro`: `meta name="robots"` (index, follow), `link rel="icon"`, `link rel="apple-touch-icon"`, `link rel="manifest"`, `meta name="theme-color"`, `meta name="apple-mobile-web-app-capable"`, `meta name="apple-mobile-web-app-status-bar-style"`, `meta name="apple-mobile-web-app-title"`, `meta property="og:site_name"`, `meta property="og:image:width"`, `meta property="og:image:height"`; no duplicate tags; OG/Twitter image URLs are now absolute
- Twitter Card tags: ADDED to `BaseLayout.astro` (summary_large_image, title, description, image)
- Canonical: BaseLayout derives from `Astro.url.href` — correct for static output
- `<slot name="head">` in BaseLayout: confirmed working — JSON-LD script injected correctly at build time
- H2 strategy for upcoming sections: defined per section below
- Nosotros H2: "Una distribuidora que trabaja para que tu obra no se detenga" — no keyword stuffing required; section relies on body copy for keyword reinforcement
- Nosotros H3s: "Nuestra promesa" and "Nuestro compromiso con la región" — trust labels, not keyword targets; correct
- Value card labels: rendered as `<p>` not headings — intentional, no H4 depth warranted on single-page site
- JSON-LD LocalBusiness.description updated to align with Nosotros copy: includes "contratistas", "noroeste de México", "para obra" — removes "proyectos arquitectónicos" (not audience language)
- Nosotros body copy: "Sinaloa" keyword added inside "Presencia regional" value card ("estamos en Sinaloa, no en un call center") — creates secondary location anchor in body text
- Heading hierarchy confirmed for Productos: H1 (Hero) > H2 (Nosotros) > H2 (Productos) > H3 (product names) — product names promoted from `<p>` to `<h3>` in ProductCard.astro (2026-04-27)
- Product image alt text updated to `{nombre} — {categoria}` pattern — adds category keyword to each image
- LCP guard: first 4 ProductCard images receive `loading="eager"` via prop; all remaining cards lazy — covers full first row at every breakpoint (1-col mobile through 4-col lg)
- ItemList JSON-LD schema added to index.astro head slot — 38 ListItem entries, each with name, description, url pointing to /#productos; parsed from CSV at build time
- Title tag and meta description: no change required after Productos review — category names in body copy provide sufficient keyword coverage; description already references cemento, lámina, acero, block
- Heading hierarchy confirmed for Contacto: H1 > H2 (Nosotros) > H2 (Productos) > H2 (Contacto) > H3 (Nosotros sub-cards + product names) — three H2s on a single-page landing is correct; no skipped levels anywhere in the document
- JSON-LD LocalBusiness.geo added: latitude "31.300814", longitude "-110.954094" — coordinates pending client confirmation (see discrepancy open item in Open items)
- JSON-LD LocalBusiness.contactPoint added: ContactPoint schema type, telephone "+52-631-303-5892", contactType "sales", areaServed "MX", availableLanguage "Spanish"
- Address/geo status updated: geo block now present in schema; address block (streetAddress, addressLocality) still TODO; coordinate discrepancy flagged (see Open items)
- Meta description: no city name added for coordinates location — coordinates provided resolve to Agua Prieta / Sonora area, which contradicts declared areaServed Sinaloa; adding a city name would create keyword/schema conflict; deferred until coordinate discrepancy is resolved with client
- Contacto H2 "Hablemos de tu proyecto": intentionally non-geographic — correct for a conversion-focused closing section; location keyword load is already carried by H1 and body copy in Nosotros/Productos
- Footer landmark: single `<footer>` in document confirmed — BaseLayout has no `<footer>`, only a `<body><slot /></body>` wrapper; no conflict
- Footer `<nav aria-label="Footer">`: anchor links (#inicio, #nosotros, #productos, #contacto) are SEO-neutral for ranking but structurally positive — they create explicit internal link signals between sections in the same document; `aria-label="Footer"` is correct and required because the page has two `<nav>` elements (Hero desktop bar + Footer); the label differentiates both for screen readers and browsers
- Hero desktop `<nav>`: was missing `aria-label` — fixed to `aria-label="Encabezado"` (2026-04-27); two distinct nav landmarks now correctly labeled
- Footer `<address>` element: NOT used — correct decision; `<address>` in HTML5 means contact info for the nearest `<article>` or `<body>` author, not a postal address block; using it with a placeholder location string ("Sinaloa, noroeste de México") would be semantically incorrect and could confuse schema parsers; will upgrade to `<address>` only when full postal address is confirmed and the `<address>` content matches the schema `streetAddress`+`addressLocality` fields
- Sitelinks / SiteSearch schema: NOT applicable — Sitelinks is a Google-generated feature, not a schema type; SiteSearch schema (`SearchAction`) requires a live search endpoint URL parameter; single-page static landing with no search functionality should not implement SearchAction; no action needed
- astro.config.mjs site field: updated from placeholder `https://norsonsupplies.com` to preview domain `https://norson-supplies.coffeecode.com.mx` — canonical and sitemap now emit the preview domain; must be updated again when real production domain is confirmed; JSON-LD `url` field in index.astro frontmatter still uses `https://norsonsupplies.com` (placeholder) — these two values are now out of sync; flagged as open item

## Open items

- [ ] Confirm real production domain — update BOTH `astro.config.mjs` site field AND `url`/`ItemList url` fields in `src/pages/index.astro` JSON-LD frontmatter (currently out of sync: config uses preview domain, JSON-LD still uses `https://norsonsupplies.com`)
- [ ] Get physical street address for JSON-LD — `streetAddress` and `addressLocality` still pending client confirmation; once received, update Footer location line from `<p>` to `<address>` and update JSON-LD schema
- [ ] COORDINATE DISCREPANCY — client-provided coordinates (31.300814, -110.954094) resolve to the Agua Prieta / Sonora border area, not Sinaloa; geo block is in JSON-LD but client must confirm these are correct before indexing; if business is in Sinaloa, new coordinates required
- [ ] Client confirmation on brand colors before locking palette
- [ ] Replace YOUR_WEB3FORMS_KEY placeholder in Contacto.astro — client must register at web3forms.com and provide access_key
- [ ] Confirm whether a white/light version of logo-norson.png exists in public/images/ — Footer uses brightness-0 invert filter if only one version exists
- [ ] Confirm section IDs on built sections match footer nav anchors: #nosotros, #productos, #contacto — @ui-experto must verify and add if missing during Footer implementation
- [x] Move product images from `public/images/` → `src/assets/` when catalog section starts — triggered by Productos UX spec; @ui-experto must migrate before implementation
- [x] Get geo coordinates for JSON-LD — coordinates received (31.300814, -110.954094), geo block added; see discrepancy note above
- [x] Confirm section IDs on built sections match footer nav anchors — all 4 IDs confirmed present in emitted HTML: #inicio (Hero), #nosotros (Nosotros), #productos (Productos), #contacto (Contacto)
- [x] Footer `<nav>` aria-label — `aria-label="Footer"` already present; Hero nav fixed to `aria-label="Encabezado"` — two nav landmarks now uniquely labeled

## UX decisions

### Footer (defined 2026-04-27)
- Background: `--color-primary` (#1a3a5c) — bookends the page with the Hero; creates visual symmetry
- No H2 — block labels ("Contacto", "Navegacion") are `<p>` elements with eyebrow styling (font-semibold, text-sm, uppercase, tracking-widest, white/70), not headings
- Mobile: single column, center-aligned, order: logo+tagline → contact → navigation → divider → copyright
- Desktop md+: three-column grid (40% / 30% / 30%), copyright full-width row below horizontal divider
- Logo: `<img src="/images/logo-norson.png">` (public/images, not astro:assets), `class="brightness-0 invert"` for white rendering on dark bg; verify if a dedicated white version exists
- Tagline copy: "Materiales de construccion en Sinaloa — respaldo, calidad y entrega."
- Contact block: phone (tel:6313035892, display "631 303 5892"), WhatsApp (wa.me/526313035892, target=_blank), email (mailto:Yolanda.padilla@galetadistribuidora.com, display lowercase), location line plain text "Sinaloa, noroeste de Mexico" until address confirmed
- Location line: rendered as `<p>` until postal address confirmed — do NOT use `<address>` with placeholder text
- Navigation links: Inicio (#), Nosotros (#nosotros), Productos (#productos), Contacto (#contacto) — IDs must be set on section root elements
- Copyright: dynamic year via `const year = new Date().getFullYear()` in Astro frontmatter (build-time evaluation, no client JS); copy: "© {year} NorSon Supplies. Todos los derechos reservados."
- Secondary copyright line: "Distribuidora de materiales de construccion en Sinaloa." — include if space allows; @ui-experto decides placement (same row with · separator or second line)
- No icons in contact block — text-only to contrast with icon-heavy Contacto section above
- No client JS anywhere in footer — fully static
- Tap targets: phone/WA/email/nav links all get minimum py-2 to reach 44px height
- Component path: src/sections/Footer.astro

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

### 2026-04-27 — Productos section (@ui-experto)
- Installed `papaparse` + `@types/papaparse` as devDependencies for robust CSV parsing at build time
- Migrated 34 product `.webp` files from `public/images/` to `src/assets/images/` — now processed by `astro:assets` with Sharp optimizer
- Created `src/components/ProductCard.astro` — `<Image />` from `astro:assets`, 1:1 aspect ratio, category badge (abs bottom-left), `line-clamp-2` description, full-width `<a>` WhatsApp CTA with pre-filled message; 4 no-image products get primary bg + initial letter placeholder
- Created `src/sections/Productos.astro` — CSV parsed via papaparse in frontmatter; `import.meta.glob` builds image lookup map; 13 filter tabs (Todos + 12 categories) with sticky horizontal scroll on mobile / wrap on md+; vanilla `<script>` island (~25 lines) handles `aria-pressed` state and `hidden` class toggling; section-footer phone CTA using `--color-primary`
- Updated `src/pages/index.astro`: imported and placed `<Productos />` after `<Nosotros />`
- Build: clean — 1 page, 0 errors, 0 warnings; all 34 images optimized by Sharp

### 2026-04-27 — Productos SEO review (@seo-experto)
- Heading hierarchy: product names were rendered as `<p>` — promoted to `<h3>` in `src/components/ProductCard.astro`; full chain is now H1 > H2 > H2 > H3 with no skipped levels; visual styling unchanged (same Tailwind classes, font-semibold text-base)
- Alt text: updated from `{nombre}` to `{nombre} — {categoria}` — adds category keyword signal to all 34 product images
- LCP / Core Web Vitals: added `eager` boolean prop to ProductCard; first 4 products in Productos.astro pass `eager={true}`, all others lazy — confirmed 6 eager / 30 lazy in dist/index.html
- ItemList schema: added second `<script type="application/ld+json">` in index.astro head slot; 38 ListItem entries built from CSV at compile time; no runtime overhead
- Title tag and meta description: no change — body copy from 12 product categories provides adequate keyword distribution; description already covers primary category terms
- JSON-LD numberOfItems: verified as 38 (matches CSV row count exactly; "Todos" is only a filter tab, not a product)
- Build: clean — 1 page, 0 errors, 0 warnings; both JSON-LD blocks and all H3 tags confirmed in dist/index.html

### 2026-04-27 — Contacto UX spec (@ux-experto)
- Delivered full UX spec for Contacto section — final section before footer
- H2 defined: "Hablemos de tu proyecto" — third H2 on page
- Section background: --color-surface (#f8fafc) — resumes alternation: Hero=primary, Nosotros=surface, Productos=white, Contacto=surface
- Form service decision: Web3Forms (web3forms.com) — POST to https://api.web3forms.com/submit; chosen over Formspree (more generous free plan, simpler activation) and WhatsApp redirect (non-standard UX breaks user expectation)
- Form fields: 3 only — Nombre (required), Teléfono o WhatsApp (required, type=tel), Mensaje (optional textarea); email field intentionally omitted (business operates on phone/WA)
- Form submit: async fetch island (vanilla <script>, same pattern as Productos); disables button during submit; shows role="alert" confirmation message on success; form hides on success
- Placeholder in code: YOUR_WEB3FORMS_KEY — client must activate and supply key
- Channel cards: WhatsApp (accent bg, primary CTA) + Phone (primary bg or ghost) — rendered as <a> elements, placed above form both on mobile and desktop left column
- Map: Google Maps embed iframe, coordinates 31.300814,-110.954094, loading="lazy", no API key required; preferred over OpenStreetMap for brand familiarity with target demographic
- Mobile: single column, WA card → phone card → separator text → form → email → map (edge-to-edge, h-260px)
- Desktop md+: two columns 50/50 (channels+email left / form right); separator text hidden; map as full-width third row below (h-400px)
- SEO handoff flagged: coordinates resolve the "geo coordinates for JSON-LD" open item — @seo-experto must update LocalBusiness.geo in index.astro (latitude: "31.300814", longitude: "-110.954034")
- Component path decided: src/sections/Contacto.astro

### 2026-04-27 — Contacto section (@ui-experto)
- Created `src/sections/Contacto.astro` — full UX spec implemented
- Mobile: single column — eyebrow + H2 + subtitle (centered) → WA card (accent bg) → phone card (ghost primary border) → separator text → form → email fallback → map edge-to-edge (h-260px)
- Desktop md+: two-column 50/50 layout — channels+email left, form right; separator hidden; map full-width below (h-400px); eyebrow/H2/subtitle left-aligned
- WA card: `<a>` full-width, accent bg (#f97316), inline WhatsApp SVG, 3 text lines (label/main/support), min-h-56px
- Phone card: `<a>` full-width, ghost border-2 primary, hover fills primary bg; inline phone SVG, same 3-line layout
- Form: 3 fields (text + tel + textarea), all with explicit `<label for>` linkage, `novalidate`, Web3Forms POST; `access_key` placeholder in hidden input
- Submit button: full-width h-14 accent, disabled state via JS during fetch
- Inline vanilla `<script>`: fetch POST to web3forms API, disables button during submit, shows `role="alert"` success div + hides form on success, shows inline error on failure
- Email fallback: shown below channels on desktop (md:block), below form on mobile
- Map: Google Maps embed iframe, coordinates 31.300814,-110.954094, loading=lazy, h-260px mobile / h-400px desktop
- Updated `src/pages/index.astro`: imported and placed `<Contacto />` after `<Productos />`
- Build: clean — 1 page, 0 errors, 0 warnings
- Open item: client must replace `YOUR_WEB3FORMS_KEY` in Contacto.astro hidden input with real key from web3forms.com

### 2026-04-27 — Contacto SEO review (@seo-experto)
- Reviewed Contacto section and current JSON-LD LocalBusiness schema in `src/pages/index.astro`
- Added `geo` block to LocalBusiness schema: GeoCoordinates, latitude "31.300814", longitude "-110.954094" — per client-provided data
- FLAGGED: coordinates (31.300814, -110.954094) resolve to the Agua Prieta / Sonora border area, not Sinaloa; this contradicts `areaServed: Sinaloa`; geo block added to schema with a code comment warning; client must confirm correct coordinates before publishing for indexing
- Added `contactPoint` block to LocalBusiness schema: ContactPoint type, telephone "+52-631-303-5892", contactType "sales", areaServed "MX", availableLanguage "Spanish"
- Address TODO comment preserved; `streetAddress` and `addressLocality` remain pending client confirmation
- Heading hierarchy audit: H1 (Hero) > H2 (Nosotros) > H2 (Productos) > H2 (Contacto) > H3 (Nosotros promise/commitment cards + 38 product names) — three sibling H2s on a single-page site is correct and crawlable; no skipped levels found
- Contacto H2 "Hablemos de tu proyecto": non-geographic by design; conversion-focused sections do not require location keywords in their heading; Sinaloa keyword load is sufficient in H1 and body copy
- Meta description: no change — coordinates' implied city (Agua Prieta, Sonora) conflicts with declared areaServed (Sinaloa); adding a conflicting city name would harm local entity signals; deferred until coordinate discrepancy resolved
- Build: clean — 1 page, 0 errors, 0 warnings; geo and contactPoint verified in dist/index.html

### 2026-04-27 — Footer UX spec (@ux-experto)
- Delivered full UX spec for Footer section — final element on the page
- Background: --color-primary (#1a3a5c) — visual bookend with Hero; no conversion purpose
- Three blocks: logo+tagline | contact data | navigation anchors; plus copyright row
- Mobile: single column center-aligned, stacking order logo → contact → nav → divider → copyright
- Desktop md+: three-column grid (40/30/30), copyright full-width below hr
- No H2 — block labels are `<p>` with eyebrow styling, not headings; footer is a landmark, not a content section
- Logo: `<img>` from public/images/ with brightness-0 invert filter for white rendering; use white version if available
- Year: `const year = new Date().getFullYear()` in frontmatter, build-time only — no client JS
- Tagline: "Materiales de construccion en Sinaloa — respaldo, calidad y entrega."
- Contact block: phone, WhatsApp (target=_blank), email, location placeholder ("Sinaloa, noroeste de Mexico") as `<p>` until address confirmed
- Navigation: 4 anchors — Inicio (#), Nosotros (#nosotros), Productos (#productos), Contacto (#contacto); section IDs must be verified/added by @ui-experto
- Two new open items added: logo version check, section ID verification
- Component path decided: src/sections/Footer.astro

### 2026-04-27 — Footer section (@ui-experto)
- Created `src/sections/Footer.astro` — full UX spec implemented
- `<footer>` landmark, bg-[#1a3a5c], no H2 — block labels are `<p>` with eyebrow styling
- Three blocks: logo+tagline | contact (`<ul>` phone/WA/email/location) | nav (`<nav aria-label="Footer">` 4 anchors)
- Mobile: single flex column, gap-10; Desktop md+: 3-col grid, gap-12; max-w-6xl container on lg
- Logo: `<img>` from `/images/logo-norson.png` with `brightness-0 invert` for white rendering on dark bg
- Copyright year: `const year = new Date().getFullYear()` in frontmatter — build-time, zero client JS
- Secondary copyright line rendered below primary at text-white/40 text-xs
- All contact and nav links: `py-2 inline-block` for 44px+ tap targets; email uses `break-all` for mobile overflow
- Added `id="inicio"` to `src/sections/Hero.astro` root element
- Added `id="nosotros"` to `src/sections/Nosotros.astro` root element
- Confirmed `id="productos"` already present on `src/sections/Productos.astro` root element
- Confirmed `id="contacto"` already present on `src/sections/Contacto.astro` root element
- Updated `src/pages/index.astro`: imported Footer, placed after `<Contacto />`
- Build: clean — 1 page, 0 errors, 0 warnings

### 2026-04-27 — Footer SEO review (@seo-experto)
- Build verified clean: 1 page, 0 errors, 0 warnings; sitemap-index.xml generated
- Landmark audit: exactly 1 `<footer>` in emitted HTML — BaseLayout wraps only with `<body><slot /></body>`, no second footer; no conflict
- Section ID audit: all 4 anchor targets confirmed present in dist/index.html — id="inicio" (Hero), id="nosotros" (Nosotros), id="productos" (Productos), id="contacto" (Contacto)
- Footer nav anchor links: SEO-neutral for ranking (same-page fragments carry no PageRank weight); structurally positive as explicit crawlable internal links; no change needed
- aria-label gap found and fixed: Hero desktop `<nav>` was missing aria-label — page had two unlabeled nav landmarks; fixed `src/sections/Hero.astro` to `aria-label="Encabezado"`; Footer `<nav aria-label="Footer">` was already correct; build re-confirmed clean
- `<address>` element: correctly absent — placeholder text "Sinaloa, noroeste de México" does not meet the semantic contract for `<address>`; will add when client provides full postal address matching JSON-LD `streetAddress`/`addressLocality`
- SiteSearch schema: not applicable — single-page static landing, no search endpoint; SearchAction requires a live URL template parameter; no implementation needed
- Domain sync issue identified: `astro.config.mjs` site field now set to preview domain `https://norson-supplies.coffeecode.com.mx` but JSON-LD `url` fields in index.astro frontmatter still use `https://norsonsupplies.com`; flagged as open item requiring coordinated update when production domain is confirmed

### 2026-04-27 — OG image, web manifest, head meta tags (@seo-experto)
- Created `scripts/generate-og.mjs` — generates `public/images/og-default.png` using sharp (already in node_modules via astro); outputs 1200x630px PNG; dark blue bg (#1a3a5c), left accent stripe (#f97316), brand name "NorSon Supplies" in white (90px), tagline in accent orange (38px), supporting line in white/65 opacity
- Confirmed sharp is available via the Astro image pipeline — no additional packages installed
- Created `public/site.webmanifest` — name, short_name, description, start_url "/", display standalone, background_color/theme_color #1a3a5c, lang es-MX, icons referencing logo-norson.png at 192 and 512 sizes
- Updated `src/layouts/BaseLayout.astro`:
  - Added `siteOrigin = Astro.url.origin` to compute absolute OG image URL — Open Graph spec requires absolute URLs; social scrapers (Meta, Twitter, WhatsApp) reject relative paths
  - Fixed `og:image` and `twitter:image` from relative `/images/og-default.png` to absolute `${siteOrigin}/images/og-default.png`
  - Removed placeholder comment on og:image (image file now exists)
  - Added `meta name="robots" content="index, follow"`
  - Added `link rel="icon"` pointing to logo-norson.png
  - Added `link rel="apple-touch-icon"` pointing to logo-norson.png
  - Added `link rel="manifest" href="/site.webmanifest"`
  - Added `meta name="theme-color" content="#1a3a5c"`
  - Added `meta name="apple-mobile-web-app-capable" content="yes"`
  - Added `meta name="apple-mobile-web-app-status-bar-style" content="default"`
  - Added `meta name="apple-mobile-web-app-title" content="NorSon Supplies"`
  - Added `meta property="og:site_name" content="NorSon Supplies"`
  - Added `meta property="og:image:width" content="1200"`
  - Added `meta property="og:image:height" content="630"`
  - No duplicate tags — verified full emitted head in dist/index.html
- Build: clean — 1 page, 0 errors, 0 warnings; all new tags confirmed present in dist/index.html

### 2026-04-27 — landing page kickoff plan (orquestador)
- Produced full delegation plan for landing page build — no sections existed at kickoff
- Wave 1 (conversion critical): Hero (@ux-experto → @ui-experto) + Foundation SEO (@seo-experto in parallel)
- Wave 2 (trust + product): Trust bar and Catalog section (@ux-experto → @ui-experto); image migration to src/assets/ triggered at catalog start
- Wave 3 (lead capture + close): Contact/quote form and Footer (@ux-experto → @ui-experto); final SEO pass (@seo-experto)
- Escalations flagged: real domain, physical address, form backend, brand color confirmation, trust signal data — all required from client before respective waves complete
