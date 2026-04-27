import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://coffeecode-frank-vera.github.io',
  base: '/norson-supplies',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  }
})
