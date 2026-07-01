import { motion } from 'framer-motion'
import { useRecent } from '../context/RecentContext'

function getDomain(url: string): string {
  try { return new URL(url).hostname } catch { return '' }
}

export default function RecentSection() {
  const { recents, clearRecents } = useRecent()

  if (recents.length === 0) return null

  return (
    <div className="max-w-[640px] mx-auto mt-4">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[11px] font-semibold text-[var(--color-text-muted)]/70 uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          最近使用
        </span>
        <span className="h-px flex-1 bg-[var(--color-border-whisper)]" />
        <button
          type="button"
          onClick={clearRecents}
          className="text-[10px] text-[var(--color-text-muted)]/40 hover:text-[var(--color-text-muted)]/70
            transition-colors duration-200 px-1 py-0.5"
          aria-label="清空最近使用"
        >
          清空
        </button>
      </div>

      {/* Mini card row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {recents.map((bm, i) => {
          const domain = getDomain(bm.url)
          const iconUrl = `${import.meta.env.BASE_URL}icons/${domain}.png`
          return (
            <motion.a
              key={bm.url}
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
              className="group flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl
                bg-white/50 border border-[var(--color-border-whisper)]
                hover:border-[var(--color-accent)]/15 hover:bg-white
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]
                transition-all duration-300"
            >
              {/* Favicon */}
              <div className="w-6 h-6 rounded-md bg-white border border-[var(--color-border-whisper)]
                flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={iconUrl}
                  alt=""
                  className="w-4 h-4 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              {/* Title */}
              <span className="text-[12px] font-medium text-[var(--color-foreground)]/80
                truncate max-w-[100px] group-hover:text-[var(--color-accent)]
                transition-colors duration-300"
                style={{ letterSpacing: '-0.005em' }}
              >
                {bm.title}
              </span>
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}
