import type { ReactNode } from 'react'

/**
 * Split text by a case-insensitive query, wrapping matches in <mark> spans.
 * Returns plain text if query is empty or has no match.
 */
export function highlightMatch(text: string, query: string): ReactNode {
  if (!query.trim() || !text) return text

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  if (parts.length === 1) return text

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-[var(--color-accent)]/12 text-[var(--color-accent)] rounded-[2px] px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
