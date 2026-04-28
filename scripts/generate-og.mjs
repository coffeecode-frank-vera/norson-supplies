/**
 * Generates /public/images/og-default.png (1200x630)
 * Uses sharp (already a dependency via astro/image) — no extra packages needed.
 *
 * Run: node scripts/generate-og.mjs
 */

import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const sharp = require(resolve(__dirname, '../node_modules/sharp'))

const W = 1200
const H = 630

// SVG overlay: company name + tagline
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#1a3a5c"/>

  <!-- Accent bar — bottom third diagonal stripe -->
  <polygon points="0,${H} ${W},${H * 0.62} ${W},${H}" fill="#f97316" opacity="0.15"/>

  <!-- Left accent stripe -->
  <rect x="0" y="0" width="8" height="${H}" fill="#f97316"/>

  <!-- Brand name -->
  <text
    x="96"
    y="240"
    font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="90"
    font-weight="700"
    fill="#ffffff"
    letter-spacing="-2"
  >NorSon Supplies</text>

  <!-- Tagline -->
  <text
    x="96"
    y="330"
    font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="38"
    font-weight="400"
    fill="#f97316"
    letter-spacing="1"
  >Materiales de Construcción · Sinaloa</text>

  <!-- Supporting line -->
  <text
    x="96"
    y="390"
    font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif"
    font-size="26"
    font-weight="400"
    fill="rgba(255,255,255,0.65)"
  >Distribuidor regional · 631 303 5892</text>

  <!-- Divider -->
  <rect x="96" y="430" width="120" height="4" fill="#f97316" rx="2"/>
</svg>`

const outPath = resolve(__dirname, '../public/images/og-default.png')

const svgBuffer = Buffer.from(svg)

sharp(svgBuffer)
  .png()
  .toFile(outPath)
  .then(() => {
    console.log(`OG image created: ${outPath}`)
  })
  .catch((err) => {
    console.error('Failed to generate OG image:', err.message)
    process.exit(1)
  })
