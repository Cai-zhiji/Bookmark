import { Menu } from './Icons'

interface HeaderProps {
  onMenuToggle: () => void
  sidebarOpen: boolean
}

export default function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  return (
    <header className="lg:hidden sticky top-0 z-10 px-4 py-2.5 bg-[var(--color-canvas)]/80 backdrop-blur-xl border-b border-[var(--color-border-whisper)]">
      <button
        onClick={onMenuToggle}
        className="p-1.5 -ml-1.5 rounded-lg hover:bg-[var(--color-canvas-warm)] transition-colors"
        aria-label={sidebarOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={sidebarOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="w-5 h-5 text-[var(--color-foreground)]/70" />
      </button>
    </header>
  )
}
