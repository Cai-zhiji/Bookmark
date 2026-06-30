import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Category } from '../types/bookmark'
import { getCategoryIcon } from './Icons'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface SidebarProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (name: string | null) => void
  isOpen: boolean
  onClose: () => void
}

function countAll(categories: Category[]): number {
  let n = 0
  for (const cat of categories) {
    if (cat.bookmarks) n += cat.bookmarks.length
    if (cat.subcategories) n += countAll(cat.subcategories)
  }
  return n
}

function countCategory(cat: Category): number {
  let n = cat.bookmarks?.length || 0
  if (cat.subcategories) n += countAll(cat.subcategories)
  return n
}

function categoryHasActiveChild(cat: Category, selected: string | null): boolean {
  if (!selected || !cat.subcategories) return false
  return cat.subcategories.some((sub) => sub.name === selected)
}

const sidebarContent = (
  categories: Category[],
  selectedCategory: string | null,
  onSelectCategory: (name: string | null) => void,
  onClose: () => void,
  collapsed: Set<string>,
  onToggle: (name: string) => void,
) => (
  <nav className="py-5 px-3">
    {/* Minimal header */}
    <div className="px-3 mb-5 flex items-baseline gap-1.5">
      <span
        className="text-[28px] font-bold text-[var(--color-foreground)] leading-none"
        style={{ letterSpacing: '-0.03em' }}
      >
        {countAll(categories)}
      </span>
      <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.15em]">
        links
      </span>
    </div>

    {/* All */}
    <button
      onClick={() => {
        onSelectCategory(null)
        onClose()
      }}
      className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium
        transition-all duration-200 mb-0.5 flex items-center gap-2
        ${!selectedCategory
          ? 'bg-[var(--color-canvas-warm)] text-[var(--color-foreground)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-canvas-warm)]/50'
        }`}
    >
      <SidebarCategoryIcon name="全部" active={!selectedCategory} />
      全部
      <span
        className="ml-auto text-[11px] text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {countAll(categories)}
      </span>
    </button>

    <div className="my-3 mx-3 border-t border-[var(--color-border-whisper)]" />

    {categories.map((cat) => {
      const hasSubs = !!(cat.subcategories && cat.subcategories.length > 0)
      const isCollapsed = collapsed.has(cat.name)
      const total = countCategory(cat)

      // If category has no subcategories, it's a simple clickable button
      if (!hasSubs) {
        return (
          <div key={cat.name} className="mb-1">
            <button
              onClick={() => {
                onSelectCategory(cat.name)
                onClose()
              }}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px]
                transition-all duration-200 flex items-center gap-2
                ${selectedCategory === cat.name
                  ? 'bg-[var(--color-canvas-warm)] text-[var(--color-foreground)] font-medium'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-canvas-warm)]/50 font-normal'
                }`}
            >
              <SidebarCategoryIcon name={cat.name} active={selectedCategory === cat.name} />
              <span>{cat.name}</span>
              <span
                className="ml-auto text-[10px] text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {total}
              </span>
            </button>
          </div>
        )
      }

      // Category with subcategories — collapsible header + child list
      const childActive = categoryHasActiveChild(cat, selectedCategory)
      return (
        <div key={cat.name} className="mb-3">
          {/* Collapsible header */}
          <button
            onClick={() => onToggle(cat.name)}
            className={`w-full text-left pl-3 pr-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]
              flex items-center gap-1.5 transition-colors relative
              ${childActive
                ? 'text-[var(--color-foreground)]/70'
                : 'text-[var(--color-text-muted)]/60 hover:text-[var(--color-text-muted)]/80'
              }`}
          >
            {/* Left accent bar when child is active */}
            {childActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-[var(--color-accent)]/60" />
            )}
            <SidebarCategoryIcon name={cat.name} active={false} size="tiny" />
            {cat.name}
            <span
              className="ml-auto text-[9px] text-[var(--color-text-muted)]/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {total}
            </span>
            {/* Chevron */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`flex-shrink-0 transition-transform duration-200 ${
                isCollapsed ? '' : 'rotate-90'
              }`}
            >
              <path d="M3.5 2L6.5 5L3.5 8" />
            </svg>
          </button>

          {/* Subcategory list with collapse animation */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                {cat.subcategories!.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      onSelectCategory(sub.name)
                      onClose()
                    }}
                    className={`w-full text-left pl-5 pr-3 py-1.5 rounded-lg text-[13px]
                      transition-all duration-200 flex items-center gap-2
                      ${selectedCategory === sub.name
                        ? 'bg-[var(--color-canvas-warm)] text-[var(--color-foreground)] font-medium'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-canvas-warm)]/50 font-normal'
                      }`}
                  >
                    <SidebarCategoryIcon name={sub.name} active={selectedCategory === sub.name} />
                    <span>{sub.name}</span>
                    <span
                      className="ml-auto text-[10px] text-[var(--color-text-muted)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {sub.bookmarks?.length || 0}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    })}
  </nav>
)

/* ── Tiny helper: render category icon with appropriate styling ── */

function SidebarCategoryIcon({
  name,
  active,
  size = 'normal',
}: {
  name: string
  active: boolean
  size?: 'normal' | 'tiny'
}) {
  const Icon = getCategoryIcon(name)
  if (!Icon) return null

  const dims = size === 'tiny' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
  const color = active
    ? 'text-[var(--color-accent)]'
    : 'text-[var(--color-text-muted)]/50'

  return (
    <Icon className={`${dims} ${color} flex-shrink-0 transition-colors duration-200`} />
  )
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  isOpen,
  onClose,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const mobileRef = useFocusTrap(isOpen)

  const toggleCategory = (name: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56
        border-r border-[var(--color-border-whisper)] bg-[var(--color-canvas)]/90 backdrop-blur-xl
        z-20 overflow-y-auto"
      >
        {sidebarContent(categories, selectedCategory, onSelectCategory, onClose, collapsed, toggleCategory)}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/15 z-30 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              ref={mobileRef as React.Ref<HTMLElement>}
              id="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="导航菜单"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 h-full w-64 bg-[var(--color-canvas)] border-r
                border-[var(--color-border-whisper)] z-40 lg:hidden overflow-y-auto
                shadow-[var(--shadow-deep)]"
            >
              {sidebarContent(categories, selectedCategory, onSelectCategory, onClose, collapsed, toggleCategory)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
