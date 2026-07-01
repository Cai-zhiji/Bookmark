import { useState, useCallback } from 'react'
import type { Bookmark } from '../types/bookmark'

const STORAGE_KEY = 'bookmark-recents'
const MAX_RECENT = 9

function loadRecents(): Bookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((b: Bookmark) => b && b.url)
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

  const addRecent = useCallback((bookmark: Bookmark) => {
    setRecents((prev) => {
      // 去重：如果已存在，先移除
      const filtered = prev.filter((b) => b.url !== bookmark.url)
      // 新项加到头部，截断到 MAX_RECENT
      const next = [bookmark, ...filtered].slice(0, MAX_RECENT)
      saveRecents(next)
      return next
    })
  }, [])

  const clearRecents = useCallback(() => {
    setRecents([])
    saveRecents([])
  }, [])

  return { recents, addRecent, clearRecents }
}
