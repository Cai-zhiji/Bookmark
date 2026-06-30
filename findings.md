# Findings & Decisions

## Requirements
- 纯展示型书签导航网站，无后台
- React 技术栈（Vite + React + TypeScript）
- Notion 暖极简设计 + Soft Premium 结构动效
- Tailwind CSS v4 样式
- Framer Motion + CSS 动效
- 书签展示：网站图标（本地缓存）、名称、功能简要描述
- 两级分类层级（顶级分类 + 子分类）
- Notion 式侧边栏 + 卡片网格布局
- 搜索栏（实时过滤书名和描述）
- 响应式移动端适配（汉堡菜单侧边栏）
- 不做暗色模式
- bookmarks.json 数据文件在仓库中
- 构建时自动抓取缺失 favicon 并存本地（public/icons/）
- GitHub Actions CI/CD → push main 自动部署到 gh-pages
- ~60 个书签，中文为主

## Research Findings

### Open Design Templates
- `web-prototype-taste-soft`: Apple-tier premium web prototype. Double-bezel cards, button-in-button CTAs, squircle radii, spring motion, ambient mesh. Selected as structural template.
- Other candidates reviewed: web-prototype (too generic), dashboard (too data-oriented), saas-landing (too marketing), kami-landing (too paper-like).

### Open Design Design Systems
- `notion`: Warm minimalism, warm neutrals with yellow-brown undertones, NotionInter font, Notion Blue accent, whisper borders, multi-layer shadows. Selected.
- `linear-app`: Dark-mode native — mismatch for warm light palette.
- `claude`: Warm but too editorial/artsy.
- `vercel`: Cold precision, not warm enough.
- `warm-editorial`: Nice but too magazine-specific.

### Design Token Tensions (Resolved)
Notion DESIGN.md vs Soft Premium SKILL.md conflicts:
- Canvas: Notion white (#ffffff) wins over Soft Premium cream (#F2F2F0)
- Font: NotionInter/Inter wins (Soft Premium's Inter ban overridden by DESIGN.md authority)
- Radii: Notion 12-16px wins over Soft Premium 28-40px squircles
- Borders: Notion whisper (1px rgba(0,0,0,0.1)) wins
- Shadows: Notion multi-layer low-opacity stacks wins
- Structure: Soft Premium double-bezel, floating pill nav, button-in-button, ambient mesh kept
- Motion: Soft Premium cubic-bezier + spring rules kept

### User's Bookmark Data (Provided 2026-06-30)
Top-level categories:
1. AI (2 items)
2. 中医 / Traditional Chinese Medicine (2 items)
3. 资源聚合 / Resource Aggregation (13 sub-categories, ~40 items)
4. 工具箱 / Toolbox (13 items)

Sub-categories under 资源聚合: 影视, 电子书, AI, 综合, 网盘资源搜索, 软件, PPT, 游戏, 文献, 编程, 社区, VPN

### Favicon Strategy
- Google Favicon API: `https://www.google.com/s2/favicons?domain=<domain>&sz=64`
- Build script: iterate bookmarks.json → extract domain → check public/icons/<domain>.png → fetch if missing
- Local path pattern: `/icons/<domain>.png`
- Manual override: place custom icon at same path, script skips existing files

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Vite + React (not Next.js) | Pure static SPA, no SSR/SSG needed |
| Tailwind CSS v4 | Design tokens map directly, utility-first |
| TypeScript | Type safety for bookmark data and components |
| Framer Motion (not Remotion) | Web animation, not video rendering |
| JSON data file | Simplest, human-editable, native import |
| Google Favicon API | Reliable, consistent, handles edge cases |
| No React Router | Single page, state-driven sidebar navigation |
| No dark mode | User confirmed not needed |
| JamesIves/github-pages-deploy-action | Mature, well-maintained, standard |

## Resources
- Open Design repo: `/Users/zivenjasek/Desktop/Projects/practice-projects/open-design/`
- Notion DESIGN.md: `design-systems/notion/DESIGN.md`
- Soft Premium SKILL.md: `design-templates/web-prototype-taste-soft/SKILL.md`
- Soft Premium example: `design-templates/web-prototype-taste-soft/example.html`
- Project directory: `/Users/zivenjasek/Desktop/Projects/my-projects/Bookmark/`
- `.open-design.json`: bound to notion + web-prototype-taste-soft
- `CONTEXT.md`: Domain glossary with all design decisions
