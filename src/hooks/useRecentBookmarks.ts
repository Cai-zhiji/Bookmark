import { useState, useCallback, useEffect } from 'react'
import { getAllBookmarks } from '../data/loader'
import type { Bookmark } from '../types/bookmark'

const STORAGE_KEY = 'bookmark-recents'
const MAX_RECENT = 9
const publicBookmarks = new Map(getAllBookmarks().map((bookmark) => [bookmark.url, bookmark]))

function loadRecents(): Bookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((entry) => {
      const bookmark = publicBookmarks.get(entry?.url)
      return bookmark ? [bookmark] : []
    }).slice(0, MAX_RECENT)
  } catch {
    return []
  }
}

function saveRecents(recents: Bookmark[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recents))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function useRecentBookmarks() {
  const [recents, setRecents] = useState<Bookmark[]>(loadRecents)

  useEffect(() => saveRecents(recents), [recents])

  const addRecent = useCallback((bookmark: Bookmark) => {
    if (!publicBookmarks.has(bookmark.url)) return
    setRecents((prev) => {
      // 去重：如果已存在，先移除
      const filtered = prev.filter((b) => b.url !== bookmark.url)
      // 新项加到头部，截断到 MAX_RECENT
      return [bookmark, ...filtered].slice(0, MAX_RECENT)
    })
  }, [])

  const clearRecents = useCallback(() => {
    setRecents([])
  }, [])

  return { recents, addRecent, clearRecents }
}
