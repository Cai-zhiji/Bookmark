import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Bookmark } from '../types/bookmark'
import BookmarkCard from './BookmarkCard'

interface CategorySectionProps {
  title: string
  eyebrow?: string
  bookmarks: Bookmark[]
  alternateBg?: boolean
}

export default function CategorySection({ title, eyebrow, bookmarks, alternateBg }: CategorySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (bookmarks.length === 0) return null

  return (
    <section
      ref={ref}
      className={`px-4 lg:px-6 py-6 lg:py-8 rounded-2xl transition-colors duration-500
        ${alternateBg ? 'bg-[var(--color-canvas-warm)]' : ''}`}
    >
      {/* Heading — subtle, elegant */}
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-[13px] font-semibold text-[var(--color-foreground)]/60 uppercase tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-mono)' }}>
          {eyebrow && <span className="text-[var(--color-text-muted)]/40">{eyebrow} / </span>}
          {title}
        </h2>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="h-px flex-1 bg-[var(--color-border-whisper)] origin-left"
        />
        <span className="text-[10px] text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}>
          {bookmarks.length}
        </span>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
      >
        {bookmarks.map((bm, i) => (
          <BookmarkCard key={bm.url} bookmark={bm} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
