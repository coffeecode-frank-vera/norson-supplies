Run the full pipeline to add a new section to the norson-supplies landing page.

## Steps

1. Read `.claude/context.md` to understand what sections already exist and any relevant prior decisions. Do not re-create sections that are already built.

2. Ask the user: "¿Cuál es el nombre de la sección y su objetivo principal?" — wait for the answer before continuing.

3. Call @ux-experto with the section name, goal, and the relevant context from step 1. Ask it to deliver the full spec: objective, content hierarchy, suggested copy, mobile behavior, desktop behavior, and notes for UI.

4. Once @ux-experto responds, call @ui-experto with the UX spec as input. Ask it to implement the Astro component in `src/sections/` and wire it into `src/pages/index.astro`, following all mobile-first and Tailwind v4 rules.

5. Once @ui-experto responds, call @seo-experto with the section name, the H-level it will use, and the copy from the UX spec. Ask it to provide heading strategy and any structured data or meta changes needed.

6. Update `.claude/context.md`:
   - Add the section to `## Sections built` with its file path and a one-line description
   - Record any new UX or SEO decisions in their respective sections
   - Append a dated entry to `## Log`

7. Summarize to the user: section file path, components created, index.astro changes, and any open items added.
