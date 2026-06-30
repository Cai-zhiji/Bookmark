# Task Plan: Bookmark — 书签导航网站

## Goal
构建一个 Notion 式侧边栏布局的个人书签导航网站：Vite + React + Tailwind CSS v4 + Framer Motion，Notion 暖极简设计 + Soft Premium 结构动效，bookmarks.json 数据驱动，构建时自动抓取 favicon，GitHub Actions CI/CD 部署到 GitHub Pages，响应式移动端 + 搜索栏。

## Current Phase
Complete ✅

## Phases

### Phase 1: Project Scaffold & Configuration
- [x] Initialize Vite + React + TypeScript project
- [x] Install dependencies (tailwind v4, framer-motion, react)
- [x] Configure Tailwind CSS v4 with Notion design tokens
- [x] Set up project directory structure
- [x] Create package.json scripts (dev, build, preview, fetch-icons)
- **Status:** complete

### Phase 2: Design Token Integration
- [x] Map Notion color palette → Tailwind theme (warm neutrals, Notion Blue, semantic colors)
- [x] Set up NotionInter typography scale via Inter Google Font
- [x] Set up Notion shadow/border/depth system (4-layer card, 5-layer deep, whisper borders)
- [x] Resolve Notion vs Soft Premium conflicts (DESIGN.md tokens win, SKILL.md structure stays)
- [x] Define Tailwind utility classes for common patterns (card-base, double-bezel, whisper-border, ambient-mesh)
- **Status:** complete

### Phase 3: Bookmark Data & Favicon System
- [x] Create `bookmarks.json` with user's ~60 categorized bookmarks
- [x] Define TypeScript types (Bookmark, Category)
- [x] Create data loading utility with category tree builder
- [x] Build favicon fetch Node script (Google Favicon API → public/icons/)
- [x] Wire favicon script into package.json scripts
- [x] Create placeholder icons directory; script tested and working
- **Status:** complete

### Phase 4: Core UI Components
- [x] `BookmarkCard` — double-bezel card with Notion whisper border + Soft Premium entrance animation
- [x] `Sidebar` — Notion-style category tree with two-level hierarchy + mobile drawer
- [x] `SearchBar` — real-time filter with Notion input styling
- [x] `CategorySection` — section header with Soft Premium eyebrow tag + bookmark grid
- [x] `Header` — mobile sticky nav with hamburger toggle
- [x] `Footer` — monospace meta with Notion styling
- [x] `HeroSection` — asymmetric hero with ambient mesh blob
- [x] `Icons` — SVG icon components (Search, Menu, Close, External, Bookmark, ArrowDown)
- **Status:** complete

### Phase 5: Layout, Responsive & Animation
- [x] Main `App` layout — sidebar + scrollable content area
- [x] Framer Motion: scroll-triggered card entrance (staggered, blur → clear)
- [x] Framer Motion: card hover spring animation (y: -2)
- [x] Framer Motion: sidebar mobile expand/collapse (slide + overlay)
- [x] Framer Motion: category view transition (AnimatePresence)
- [x] CSS: ambient mesh blob drift keyframe (28s infinite)
- [x] Responsive: mobile header + hamburger sidebar (<lg)
- [x] Responsive: single → 2 → 3 column grid (md, xl breakpoints)
- [x] Floating pill navbar on desktop with backdrop-blur-2xl
- **Status:** complete

### Phase 6: CI/CD Setup
- [x] Create `.github/workflows/deploy.yml`
- [x] GitHub Actions: checkout → setup Node → npm ci → fetch-icons → build → deploy to gh-pages
- [x] Configure `vite.config.ts` base path for GitHub Pages (`/Bookmark/`)
- [x] Create `.gitignore`
- [x] Verify build output (TypeScript passes, Vite builds in <500ms)
- **Status:** complete

### Phase 7: Polish & Verification
- [x] All ~60 bookmark links structured in JSON
- [x] Search filtering (title + description + URL)
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Favicon auto-fetching tested (most sites fetch, some 404 expected)
- [x] Final production build: 356KB total (CSS 23KB + JS 282KB gzipped to ~96KB)
- [x] Dev server verified running at localhost:5173/Bookmark/
- **Status:** complete

## Design Token Resolution (Notion DESIGN.md vs Soft Premium SKILL.md)
| Conflict | Winner | Resolution |
|----------|--------|------------|
| Canvas color | Notion | `#ffffff` page, `#f6f5f4` alt sections |
| Font family | Notion | Inter (Soft Premium's Inter ban overridden) |
| Card border-radius | Notion | 12px standard (not 28-40px squircles) |
| Border style | Notion | `1px solid rgba(0,0,0,0.1)` whisper |
| Shadow system | Notion | 4-layer card, 5-layer deep stacks |
| Accent color | Notion | Notion Blue `#0075de` |
| Card structure | Soft Premium | Double-bezel (outer shell + inner core) KEPT |
| Navbar | Soft Premium | Floating pill with backdrop-blur KEPT |
| Motion | Soft Premium | cubic-bezier(0.32, 0.72, 0, 1) + spring physics KEPT |
| Ambient mesh | Soft Premium | Hero mesh blob drift KEPT |
| Eyebrow tags | Soft Premium | Uppercase mono pill tags KEPT |

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Vite over Next.js | Pure static SPA, no SSR/SSG needed |
| Tailwind v4 over CSS Modules | Design tokens map directly to @theme |
| JSON data over Markdown/TS | Simplest, human-editable, native JS import |
| Google Favicon API over site scraping | Reliable, consistent sizing |
| No React Router | Single-page app, state-driven navigation |
| No dark mode | User confirmed not needed |
| 3-column grid on xl, 2 on md, 1 on mobile | Matches Notion responsive breakpoints |

## Files Created (22 files)
```
Bookmark/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── .gitignore
├── .open-design.json
├── CONTEXT.md
├── task_plan.md
├── findings.md
├── progress.md
├── .github/workflows/deploy.yml
├── public/favicon.svg
├── scripts/fetch-icons.mjs
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css          (Tailwind + Notion tokens + Soft Premium CSS)
    ├── vite-env.d.ts
    ├── types/bookmark.ts
    ├── data/
    │   ├── bookmarks.json (60+ bookmarks, 4 categories)
    │   └── loader.ts
    ├── hooks/useBookmarks.ts
    └── components/
        ├── BookmarkCard.tsx
        ├── CategorySection.tsx
        ├── Footer.tsx
        ├── Header.tsx
        ├── HeroSection.tsx
        ├── Icons.tsx
        ├── SearchBar.tsx
        └── Sidebar.tsx
```

## Notes
- Dev server running at http://localhost:5173/Bookmark/
- To deploy: push to `main` branch on GitHub, set Pages source to `gh-pages` branch
- `npm run fetch-icons` to grab missing favicons (run before build or let CI handle)
