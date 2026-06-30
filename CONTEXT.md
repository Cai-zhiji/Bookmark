# Bookmark — Domain Glossary

## Design
- **Soft Premium**: Apple-tier visual aesthetic — silver/cream canvas, double-bezel cards, button-in-button CTAs, squircle radii (28-40px), spring motion, ambient depth mesh. Source: `web-prototype-taste-soft` from Open Design.
- **Tech Stack**: Vite + React + Tailwind CSS v4, static SPA, deployed to GitHub Pages. Design tokens from Notion DESIGN.md mapped to Tailwind theme.
- **Bookmark Data**: JSON file (`bookmarks.json`) in repo. Schema: url, title, description, icon (local path), category, tags. Two-level category hierarchy (e.g., "资源聚合 > 影视"). Edited manually → git push → CI deploys.
- **Animation**: Framer Motion (card hover spring, staggered entrance, layout transitions) + CSS keyframes (ambient mesh drift, gradient transitions, subtle background atmospherics).
- **Page Layout**: Notion-style — fixed left sidebar (category tree) + right content area (bookmark card grid). Click category → filter/show bookmarks. Includes search bar (real-time filter by title/description), responsive mobile (hamburger sidebar), no dark mode.
- **CI/CD**: GitHub Actions — push to `main` triggers build (favicon fetch + `npm run build`), deploys to `gh-pages` branch via `JamesIves/github-pages-deploy-action`.
- **Favicon Strategy**: Build-time Node script auto-fetches missing favicons from Google Favicon API → saves to `public/icons/<domain>.png`. Manual override supported (local file exists → skip fetch).
- **Notion Design System**: Warm minimalism — warm white paper canvas, warm neutrals with yellow-brown undertones, NotionInter (modified Inter) font, Notion Blue (`#0075de`) as singular accent, ultra-thin `1px solid rgba(0,0,0,0.1)` borders, multi-layer shadow stacks with sub-0.05 opacity. Design tokens read from Open Design `design-systems/notion/DESIGN.md`.
