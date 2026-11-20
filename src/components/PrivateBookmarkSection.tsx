import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { PRIVATE_CATEGORY, type PrivateBookmark } from '../data/privateBookmarks'
import type { Bookmark } from '../types/bookmark'
import CategorySection from './CategorySection'
import { Lock } from './Icons'
import SearchBar from './SearchBar'

interface PrivateBookmarkSectionProps {
  bookmarks: PrivateBookmark[]
  expiresAt: number
  query: string
  onQueryChange: (query: string) => void
  searchInputRef: RefObject<HTMLInputElement>
  onLock: () => void
}

export default function PrivateBookmarkSection({
  bookmarks,
  expiresAt,
  query,
  onQueryChange,
  searchInputRef,
  onLock,
}: PrivateBookmarkSectionProps) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus()
  }, [])

  const groups = useMemo(() => {
    const filtered = new Map<string, Bookmark[]>()
    const search = query.trim().toLowerCase()
    for (const { title, url, group = '书签' } of bookmarks) {
      const domain = new URL(url).hostname
      if (search && ![title, group, url].some((value) => value.toLowerCase().includes(search))) continue

      const card = { title, url, description: domain, category: PRIVATE_CATEGORY, icon: '' }
      const entries = filtered.get(group)
      if (entries) entries.push(card)
      else filtered.set(group, [card])
    }
    return filtered
  }, [bookmarks, query])

  const lockTime = new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit' }).format(expiresAt)

  return (
    <>
      <div className="sticky top-14 z-10 border-b border-[var(--color-border-whisper)] bg-white/90 px-4 py-4 backdrop-blur-xl lg:top-0 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 ref={heading} tabIndex={-1} className="text-lg font-semibold focus:outline-none">{PRIVATE_CATEGORY}</h1>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {bookmarks.length} 条书签 · {lockTime} 自动锁定
            </p>
          </div>
          <button
            type="button"
            onClick={onLock}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-whisper)]
              px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-canvas-warm)]"
          >
            <Lock className="h-4 w-4" />
            立即锁定
          </button>
        </div>
        <div className="group/search mt-4 max-w-lg">
          <SearchBar
            ref={searchInputRef}
            value={query}
            onChange={onQueryChange}
            placeholder="搜索隐私书签..."
          />
        </div>
      </div>
      <div className="px-4 pb-12 lg:px-6">
        {Array.from(groups, ([group, entries]) => (
          <CategorySection key={group} title={group} bookmarks={entries} privateMode />
        ))}
        {groups.size === 0 && (
          <p role="status" className="py-16 text-center text-sm text-[var(--color-text-secondary)]">
            {query.trim() ? '未找到匹配的隐私书签' : '隐私目录暂无书签'}
          </p>
        )}
      </div>
    </>
  )
}
