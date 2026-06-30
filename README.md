# Bookmark

个人书签导航站 — 精致的静态书签管理页面。受 Notion 设计语言启发，采用温润克制的极简美学，专为日常高频使用而设计。

> *"Stay hungry, stay foolish."*
> 求知若饥，虚心若愚 — Steve Jobs, 2005

## 功能特性

- **分类导航** — 侧边栏按分类/子分类组织书签，支持折叠展开，父级高亮指示当前位置
- **即时搜索** — 全客户端搜索，匹配标题、描述与 URL，关键词高亮
- **键盘快捷键** — `⌘K` / `Ctrl+K` 聚焦搜索，`Escape` 清空或关闭侧边栏
- **响应式布局** — 桌面端固定侧边栏 + 三列网格，移动端抽屉导航 + 单列
- **加载动画** — 品牌渐变色书签描边绘制 + 轨道光环 + 名言揭示
- **名言轮播** — 首页搜索栏下方展示乔布斯与各界名言，7 秒自动轮播
- **焦点锁定** — 移动端抽屉打开时 Tab 焦点在侧边栏内循环，关闭后回归触发按钮
- **回到顶部** — 滚动超过一屏自动出现，平滑滚动
- **质感细节** — 环境光网格、浮动粒子、噪点纹理、卡片微动效

## 技术栈

| 层面 | 选型 |
|------|------|
| 框架 | React 18 + TypeScript 5.6 |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 4 (CSS-first configuration) |
| 动画 | Framer Motion 11 |
| 字体 | Inter (正文) + JetBrains Mono (等宽) |
| 数据 | 静态 JSON，零后端依赖 |

## 项目结构

```
Bookmark/
├── public/
│   ├── favicon.svg              # 浏览器标签图标
│   └── icons/                   # 网站 favicon 缓存 (PNG)
├── scripts/
│   └── fetch-icons.mjs          # 自动抓取书签网站 favicon
├── src/
│   ├── main.tsx                 # 应用入口
│   ├── App.tsx                  # 根组件，状态与布局编排
│   ├── index.css                # 全局样式，Tailwind + 设计 Token
│   ├── components/
│   │   ├── BookmarkCard.tsx      # 书签卡片 (favicon、标题、描述、外链)
│   │   ├── CategorySection.tsx   # 分类区块 (标题、计数、卡片网格)
│   │   ├── FloatingParticles.tsx # 浮动装饰粒子
│   │   ├── Footer.tsx            # 页脚 (Jobs 名言)
│   │   ├── Header.tsx            # 移动端顶栏 (汉堡菜单)
│   │   ├── Icons.tsx             # SVG 图标库 (功能图标 + 分类图标 + 解析器)
│   │   ├── LoadingScreen.tsx     # 进场加载动画
│   │   ├── NoiseOverlay.tsx      # 噪点纹理覆盖层
│   │   ├── QuoteCarousel.tsx     # 名言轮播组件
│   │   ├── ScrollToTop.tsx       # 回到顶部按钮
│   │   ├── SearchBar.tsx         # 搜索输入框 (含 ⌘K 提示与清除按钮)
│   │   └── Sidebar.tsx           # 侧边栏导航 (折叠、图标、焦点锁定)
│   ├── data/
│   │   ├── bookmarks.json        # 书签数据 (分类、子分类、书签列表)
│   │   └── loader.ts             # 数据加载、搜索、路径解析
│   ├── hooks/
│   │   ├── useBookmarks.ts       # 书签状态管理 (搜索、筛选、分组)
│   │   ├── useFocusTrap.ts       # 焦点锁定 Hook
│   │   └── useKeyboardShortcuts.ts # 全局键盘快捷键
│   ├── types/
│   │   └── bookmark.ts           # TypeScript 类型定义
│   └── utils/
│       └── highlight.tsx         # 搜索关键词高亮工具
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:5173/Bookmark/)
npm run dev

# 抓取书签网站 favicon (首次使用或更新图标时)
npm run fetch-icons

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 数据格式

书签数据存储在 `src/data/bookmarks.json`，结构如下：

```json
{
  "categories": [
    {
      "name": "AI",
      "bookmarks": [
        {
          "url": "https://chat.deepseek.com/",
          "title": "DeepSeek",
          "description": "深度求索 AI 对话平台",
          "icon": "/icons/chat.deepseek.com.png"
        }
      ]
    },
    {
      "name": "资源聚合",
      "bookmarks": [],
      "subcategories": [
        {
          "name": "影视",
          "bookmarks": [...]
        }
      ]
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `categories[].name` | `string` | ✅ | 分类名称 |
| `categories[].bookmarks` | `Bookmark[]` | ✅ | 书签列表（无直接书签时传空数组） |
| `categories[].subcategories` | `Category[]` | ❌ | 子分类列表 |
| `bookmarks[].url` | `string` | ✅ | 书签 URL |
| `bookmarks[].title` | `string` | ✅ | 书签标题 |
| `bookmarks[].description` | `string` | ✅ | 简短描述 |
| `bookmarks[].icon` | `string` | ❌ | 图标路径，默认为 `/icons/{domain}.png` |

### 添加新书签

1. 在 `src/data/bookmarks.json` 对应分类下添加条目
2. 运行 `npm run fetch-icons` 自动抓取 favicon
3. 或手动将 PNG 图标放入 `public/icons/`，命名为 `{域名}.png`

## 设计系统

设计语言受 Notion 启发，强调温润、克制、留白。

### 色彩

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-canvas` | `#ffffff` | 主背景 |
| `--color-canvas-warm` | `#f6f5f4` | 暖调次级背景 |
| `--color-foreground` | `rgba(0,0,0,0.95)` | 主文字 |
| `--color-text-secondary` | `#615d59` | 次要文字 |
| `--color-text-muted` | `#a39e98` | 辅助/弱化文字 |
| `--color-accent` | `#0075de` | 品牌蓝 (Notion Blue) |
| `--color-purple` | `#391c57` | 紫色点缀 |
| `--color-teal` | `#2a9d99` | 青色点缀 |
| `--color-border-whisper` | `rgba(0,0,0,0.1)` | 极淡描边 |

### 排版

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| 大数 | 28px | 700 | 侧边栏总数 |
| 卡片标题 | 15px | 600 | 书签卡片标题 |
| 正文 | 13px | 400/500 | 按钮、正文、搜索结果 |
| 辅助 | 12px | 400 | 卡片描述 |
| 标签 | 10-11px | 500/600 | 分类头、计数、快捷键提示 |

### 动效

全局使用统一的缓动曲线 `cubic-bezier(0.32, 0.72, 0, 1)`，确保所有过渡手感一致。动画时长从 0.2s（微交互）到 0.9s（进场绘制）不等。

## 键盘快捷键

| 快捷键 | 操作 |
|--------|------|
| `⌘K` / `Ctrl+K` | 聚焦搜索框 |
| `Escape` | 清空搜索内容 → 关闭移动端侧边栏 |

## 浏览器支持

支持所有现代浏览器 (Chrome、Firefox、Safari、Edge)。滚动条样式仅 WebKit 浏览器生效。

## 部署

项目通过 Vite 构建为纯静态文件，可部署到任何静态托管服务：

```bash
npm run build   # 输出到 dist/
```

`vite.config.ts` 中 `base` 配置为 `/Bookmark/`，部署到子目录时无需修改；部署到根目录时改为 `'/'`。

## License

MIT
