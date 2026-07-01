import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Bookmark } from '../types/bookmark'
import { External } from './Icons'
import { highlightMatch } from '../utils/highlight'
import { useRecent } from '../context/RecentContext'

interface BookmarkCardProps {
  bookmark: Bookmark
  index: number
  searchQuery?: string
}

function getDomain(url: string): string {
  try { return new URL(url).hostname } catch { return '' }
}

// Subtle varied card backgrounds — soft warm tints
const CARD_TINTS = [
  'bg-white',
  'bg-[#fafaf9]',
  'bg-[#f8f7f4]',
  'bg-[#faf9f7]',
  'bg-[#f7f6f3]',
  'bg-[#faf8f5]',
]

export default function BookmarkCard({ bookmark, index, searchQuery }: BookmarkCardProps) {
  const domain = getDomain(bookmark.url)
  const iconUrl = `${import.meta.env.BASE_URL}icons/${domain}.png`
  const [imgFailed, setImgFailed] = useState(false)
  const tint = CARD_TINTS[index % CARD_TINTS.length]
  const { addRecent } = useRecent()

  return (
    <motion.a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.32, 0.72, 0, 1],
      }}
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => addRecent(bookmark)}
      className="group block"
    >
      <div className={`
        ${tint}
        relative overflow-hidden
        rounded-2xl border border-[var(--color-border-whisper)]
        px-4 py-3.5
        transition-all duration-300
        group-hover:border-[var(--color-accent)]/15
        group-hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]
      `}>
        {/* Subtle top accent line on hover */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center gap-3">
          {/* Favicon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-white border border-[var(--color-border-whisper)]
            flex items-center justify-center overflow-hidden
            group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            {!imgFailed ? (
              <img
                src={iconUrl} alt=""
                className="w-5 h-5 object-contain"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <span className="text-[10px] font-bold text-[var(--color-text-muted)]/50 uppercase">
                {domain.replace('www.', '').slice(0, 2)}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-[15px] font-semibold leading-[1.35] text-[var(--color-foreground)]
                truncate group-hover:text-[var(--color-accent)] transition-colors duration-300"
                style={{ letterSpacing: '-0.008em' }}>
                {searchQuery ? highlightMatch(bookmark.title, searchQuery) : bookmark.title}
              </h3>
              <External className="w-3 h-3 flex-shrink-0 text-[var(--color-text-muted)]/40
                opacity-0 group-hover:opacity-100 transition-all duration-300
                -translate-x-1 group-hover:translate-x-0" />
            </div>
            <p className="text-[12px] leading-[1.5] text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
              {searchQuery ? highlightMatch(bookmark.description, searchQuery) : bookmark.description}
            </p>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
