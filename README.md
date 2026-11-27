# Judo Belt Grades Guide

Every technique from the 2026 Belt Grades Guide, each linked to its official Kodokan video.

- `index.html` — page markup (HTML Living Standard)
- `src/styles.css` — modern CSS (nesting, `light-dark()`, `@layer`, container queries); Bun compiles it for older browsers
- `src/data.ts` — the grades and techniques (edit here)
- `src/render.ts` — the chart and grade lists as HTML (written into the page at build time)
- `src/main.ts` — search and grade-tab tracking
- `src/progression.ts`, `progression/` — the grading pathway page (IJF colour-belt programme 2026)
- `public/` — robots.txt, sitemap.xml and the link-preview image
- `AGENTS.md` — rules and checklist for collaborators and AI coding agents (start here)
- `PRODUCT.md` — who the site is for and what it must do
- `DESIGN.md` — the visual system (Hashimoto Gahō landscape style); `.impeccable/` holds its sidecar and the design brief

## Commands

```sh
bun install          # once
bun run dev          # local preview with live reload
bun run typecheck    # TypeScript strict check
bun run build        # production site in dist/
```

Upload the contents of `dist/` to any static host.

## Publishing

Every push to `main` builds the site with Bun and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). In the repository, set Settings → Pages → Source to "GitHub Actions".
