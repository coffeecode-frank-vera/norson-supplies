import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'norson-supplies.coffeecode.com.mx',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  }
})
