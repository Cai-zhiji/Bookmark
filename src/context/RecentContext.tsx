import { createContext, useContext, type ReactNode } from 'react'
import type { Bookmark } from '../types/bookmark'
import { useRecentBookmarks } from '../hooks/useRecentBookmarks'

interface RecentContextValue {
  recents: Bookmark[]
  addRecent: (bookmark: Bookmark) => void
  clearRecents: () => void
}

const RecentContext = createContext<RecentContextValue | null>(null)

export function RecentProvider({ children }: { children: ReactNode }) {
  const { recents, addRecent, clearRecents } = useRecentBookmarks()
  return (
    <RecentContext.Provider value={{ recents, addRecent, clearRecents }}>
      {children}
    </RecentContext.Provider>
  )
}

export function useRecent(): RecentContextValue {
  const ctx = useContext(RecentContext)
  if (!ctx) {
    // Fallback: no provider — return empty state (avoids crash if used outside provider)
    return { recents: [], addRecent: () => {}, clearRecents: () => {} }
  }
  return ctx
}
