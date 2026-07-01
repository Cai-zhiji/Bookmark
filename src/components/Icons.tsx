interface IconProps {
  className?: string
}

/* ── Functional Icons ── */

export function Search({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  )
}

export function Menu({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="4" x2="20" y1="5.5" y2="5.5" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18.5" y2="18.5" />
    </svg>
  )
}

export function Close({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7L17 17" />
      <path d="M17 7L7 17" />
    </svg>
  )
}

export function External({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M21 3l-9 9" />
      <path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
  )
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 9l5 5 5-5" />
    </svg>
  )
}

export function BookmarkIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.5 21l-6-3.5L6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5L18.5 21Z" />
    </svg>
  )
}

/* ── Search Engine Icons ── */

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M14.5 8.18c0-.5-.04-1-.13-1.48H8v2.82h3.65a3.14 3.14 0 0 1-1.36 2.07v1.7h2.2c1.28-1.18 2.01-2.92 2.01-5.11Z" fill="#4285F4" />
      <path d="M8 14.9c1.83 0 3.37-.6 4.49-1.64l-2.2-1.7c-.6.41-1.38.66-2.29.66-1.76 0-3.25-1.2-3.78-2.8H1.94v1.77A6.75 6.75 0 0 0 8 14.9Z" fill="#34A853" />
      <path d="M4.22 9.42a4.03 4.03 0 0 1 0-2.58V5.07H1.94a6.74 6.74 0 0 0 0 6.12l2.28-1.77Z" fill="#FBBC05" />
      <path d="M8 3.84c1 0 1.89.34 2.6 1.01l1.94-1.94A6.7 6.7 0 0 0 8 1.1 6.75 6.75 0 0 0 1.94 5.07l2.28 1.77C4.75 5.04 6.24 3.84 8 3.84Z" fill="#EA4335" />
    </svg>
  )
}

export function BingIcon({ className }: IconProps) {
  const bingSrc = `${import.meta.env.BASE_URL}icons/bing-color.png`
  return (
    <img
      src={bingSrc}
      alt="Bing"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

/* ── Category Icons (compact, for sidebar nav) ── */

export function CategorySparkle({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5l.9 2.7a.5.5 0 0 0 .47.34l2.84.12-2.2 1.8a.5.5 0 0 0-.16.5l.7 2.76L8.4 8.6a.5.5 0 0 0-.55-.12l-2.68 1 1.47-2.44a.5.5 0 0 0-.02-.53L5.07 4.2l2.8-.36A.5.5 0 0 0 8.3 3.5L8 1.5Z" />
    </svg>
  )
}

export function CategoryLeaf({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14.5C8 14.5 2 10 2 5.5C2 3.5 3.5 1.5 8 1.5C12.5 1.5 14 3.5 14 5.5C14 10 8 14.5 8 14.5Z" />
      <path d="M8 14.5V8" />
    </svg>
  )
}

export function CategoryGrid({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
    </svg>
  )
}

export function CategoryFilm({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
      <line x1="1.5" y1="10.5" x2="14.5" y2="10.5" />
      <line x1="6" y1="2.5" x2="6" y2="5.5" />
      <line x1="6" y1="10.5" x2="6" y2="13.5" />
      <line x1="10.5" y1="2.5" x2="10.5" y2="5.5" />
      <line x1="10.5" y1="10.5" x2="10.5" y2="13.5" />
    </svg>
  )
}

export function CategoryBook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12.5V2.5C2 2 2.5 1.5 3 1.5H6L8 3.5L10 1.5H13C13.5 1.5 14 2 14 2.5V12.5C14 13 13.5 14 13 13.5H8L6 11.5L4 13.5H3C2.5 13.5 2 13 2 12.5Z" />
    </svg>
  )
}

export function CategoryBot({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="9" rx="2" />
      <line x1="5" y1="7" x2="5" y2="7.01" />
      <line x1="11" y1="7" x2="11" y2="7.01" />
      <line x1="5.5" y1="10" x2="10.5" y2="10" />
      <circle cx="8" cy="1.5" r="1" />
    </svg>
  )
}

export function CategoryPackage({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1L1.5 4.5V11.5L8 15L14.5 11.5V4.5L8 1Z" />
      <path d="M8 8L14.5 4.5" />
      <path d="M8 8V15" />
      <path d="M1.5 4.5L8 8" />
    </svg>
  )
}

export function CategoryCloud({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12H3.5A3 3 0 0 1 3.5 6C3.7 4 5.5 2 8 2C10 2 11.5 3.5 11.8 5.5H12.5A3 3 0 0 1 12.5 11.5H11" />
      <path d="M8 8V14" />
      <path d="M5.5 11.5L8 14L10.5 11.5" />
    </svg>
  )
}

export function CategoryApp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
      <circle cx="4" cy="4" r="0.75" fill="currentColor" />
      <circle cx="6" cy="4" r="0.75" fill="currentColor" />
      <circle cx="8" cy="4" r="0.75" fill="currentColor" />
    </svg>
  )
}

export function CategoryPresentation({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="13" height="9" rx="1.5" />
      <line x1="8" y1="10.5" x2="8" y2="14.5" />
      <line x1="4" y1="14.5" x2="12" y2="14.5" />
      <path d="M5 6.5l2.5-2.5L10 6.5" />
    </svg>
  )
}

export function CategoryGame({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="4" width="13" height="8" rx="3" />
      <line x1="6.5" y1="4" x2="6.5" y2="12" />
      <line x1="9.5" y1="4" x2="9.5" y2="12" />
      <circle cx="4.5" cy="8" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <path d="M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  )
}

export function CategoryFileText({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 1.5H9L13 5.5V14.5H3V1.5Z" />
      <path d="M9 1.5V5.5H13" />
      <line x1="5" y1="8" x2="11" y2="8" />
      <line x1="5" y1="10.5" x2="11" y2="10.5" />
      <line x1="5" y1="13" x2="9" y2="13" />
    </svg>
  )
}

export function CategoryCode({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5,5 1.5,8 5,11" />
      <polyline points="11,5 14.5,8 11,11" />
      <line x1="7" y1="4" x2="9" y2="12" />
    </svg>
  )
}

export function CategoryUsers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="5" r="2.25" />
      <circle cx="11" cy="5.5" r="1.75" />
      <path d="M1 14c0-2.5 2-4.5 4.5-4.5S10 11.5 10 14" />
      <path d="M10 12.5c0-1.5 1.5-3 3-3s3 1.5 3 3.5" />
    </svg>
  )
}

export function CategoryShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L2.5 4V8.5C2.5 11.5 8 14.5 8 14.5C8 14.5 13.5 11.5 13.5 8.5V4L8 1.5Z" />
      <path d="M5.5 8L7 9.5L10.5 6" />
    </svg>
  )
}

export function CategoryWrench({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 13.5L9.5 9.5" />
      <path d="M5.5 2C3 2 2 4.5 3 6.5L5.5 6L6 8.5L3.5 9.5C4.5 11.5 6.5 12 8.5 11L11 13.5C11.5 14 12.5 14 13 13.5C13.5 13 13.5 12 13 11.5L10.5 9L7.5 8L8.5 5.5L11 5C9 3 7 2 5.5 2Z" />
    </svg>
  )
}

export function CategoryGlobe({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" />
      <line x1="1.5" y1="8" x2="14.5" y2="8" />
    </svg>
  )
}

/* ── Icon resolver: map category name → matching icon component ── */

const CATEGORY_ICON_MAP: Record<string, React.FC<IconProps>> = {
  ai: CategorySparkle,
  'ai 工具': CategoryBot,
  中医: CategoryLeaf,
  资源聚合: CategoryGrid,
  影视: CategoryFilm,
  电子书: CategoryBook,
  综合资源: CategoryPackage,
  网盘资源搜索: CategoryCloud,
  软件: CategoryApp,
  ppt: CategoryPresentation,
  游戏: CategoryGame,
  文献: CategoryFileText,
  编程: CategoryCode,
  社区: CategoryUsers,
  vpn: CategoryShield,
  工具箱: CategoryWrench,
  全部: CategoryGlobe,
}

export function getCategoryIcon(name: string): React.FC<IconProps> | null {
  const key = name.toLowerCase().trim()
  if (CATEGORY_ICON_MAP[key]) return CATEGORY_ICON_MAP[key]

  // Fallback: keyword matching
  if (/ai|人工智能|机器学习|深度/.test(key)) return CategorySparkle
  if (/中医|医药|健康|医疗|养生/.test(key)) return CategoryLeaf
  if (/影视|电影|视频|播放/.test(key)) return CategoryFilm
  if (/书|读|文献|论文|期刊|标准/.test(key)) return CategoryFileText
  if (/编程|开发|代码|前端|后端/.test(key)) return CategoryCode
  if (/游戏|电竞/.test(key)) return CategoryGame
  if (/社区|论坛|社交/.test(key)) return CategoryUsers
  if (/网盘|云|搜索/.test(key)) return CategoryCloud
  if (/软件|应用|app|工具/.test(key)) return CategoryApp
  if (/vpn|网络|代理|安全/.test(key)) return CategoryShield
  if (/资源|聚合|综合/.test(key)) return CategoryGrid
  if (/ppt|演示|幻灯片/.test(key)) return CategoryPresentation
  if (/办公|行政/.test(key)) return CategoryFileText
  if (/工具|箱/.test(key)) return CategoryWrench

  // Default: generic category icon
  return CategoryGrid
}
