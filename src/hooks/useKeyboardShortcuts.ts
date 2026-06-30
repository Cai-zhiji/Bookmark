import { useEffect, useRef, useCallback } from 'react'

interface ShortcutHandlers {
  /** Focus the search input */
  onFocusSearch: () => void
  /** Clear search query */
  onClearSearch: () => void
  /** Close mobile sidebar */
  onCloseSidebar: () => void
  /** Current search value */
  searchQuery: string
  /** Whether sidebar is open */
  sidebarOpen: boolean
}

export function useKeyboardShortcuts({
  onFocusSearch,
  onClearSearch,
  onCloseSidebar,
  searchQuery,
  sidebarOpen,
}: ShortcutHandlers) {
  // Track whether the meta key was pressed (to avoid stuck-modifier issues)
  const metaPressed = useRef(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey
      const isEscape = e.key === 'Escape'

      // ── ⌘K / Ctrl+K — focus search ──
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onFocusSearch()
        return
      }

      // ── Escape — clear search, or close sidebar ──
      if (isEscape) {
        // If search has content, clear it first
        if (searchQuery.trim().length > 0) {
          e.preventDefault()
          onClearSearch()
          return
        }
        // If sidebar is open, close it
        if (sidebarOpen) {
          e.preventDefault()
          onCloseSidebar()
          return
        }
      }
    },
    [onFocusSearch, onClearSearch, onCloseSidebar, searchQuery, sidebarOpen],
  )

  // Track meta key up/down to handle edge cases
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Meta' || e.key === 'Control') {
      metaPressed.current = false
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
}

/** Detect whether the user is on macOS (for showing ⌘ vs Ctrl in hints) */
export function isMacPlatform(): boolean {
  if (typeof navigator === 'undefined') return true
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
}
