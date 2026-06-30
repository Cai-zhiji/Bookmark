import { forwardRef } from 'react'
import { Search } from './Icons'
import { isMacPlatform } from '../hooks/useKeyboardShortcuts'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar({ value, onChange }, ref) {
    const modKey = isMacPlatform() ? '⌘' : 'Ctrl+'

    return (
      <div className="relative w-full">
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]/50
          group-focus-within/search:text-[var(--color-accent)]/60 transition-colors duration-500"
        >
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索..."
          aria-label="搜索书签"
          className="w-full pl-10 pr-12 py-3 text-[15px] leading-[1.4] font-normal
                     bg-white/60 backdrop-blur-md
                     border border-[var(--color-border-whisper)] rounded-2xl
                     placeholder-[var(--color-text-muted)]/40
                     text-[var(--color-foreground)]
                     shadow-[0_2px_12px_rgba(0,0,0,0.015)]
                     focus:outline-none focus:bg-white/90
                     focus:border-[var(--color-accent)]/20
                     focus:shadow-[0_4px_20px_rgba(0,117,222,0.06)]
                     transition-all duration-500"
        />
        {/* Keyboard hint — only when empty */}
        {!value && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5
            pointer-events-none opacity-30"
          >
            <kbd
              className="text-[10px] font-medium text-[var(--color-text-muted)] bg-[var(--color-canvas-warm)]
              px-1.5 py-0.5 rounded-[3px] border border-[var(--color-border-whisper)] leading-none"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {modKey}K
            </kbd>
          </div>
        )}

        {/* Clear button — only when there is content */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('')
              // Re-focus the input after clearing
              if (ref && 'current' in ref) {
                ref.current?.focus()
              }
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
              text-[var(--color-text-muted)]/50 hover:text-[var(--color-text-muted)]/80
              hover:bg-[var(--color-canvas-warm)] transition-colors"
            aria-label="清除搜索"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}
      </div>
    )
  },
)

export default SearchBar
