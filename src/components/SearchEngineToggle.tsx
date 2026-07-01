import { motion } from 'framer-motion'
import type { SearchEngine } from '../types/bookmark'
import { BookmarkIcon, GoogleIcon, BingIcon } from './Icons'

interface SearchEngineToggleProps {
  engine: SearchEngine
  onChange: (engine: SearchEngine) => void
}

interface EngineOption {
  key: SearchEngine
  label: string
  Icon: React.FC<{ className?: string }>
}

const ENGINES: EngineOption[] = [
  { key: 'bookmarks', label: '书签', Icon: BookmarkIcon },
  { key: 'google', label: 'Google', Icon: GoogleIcon },
  { key: 'bing', label: 'Bing', Icon: BingIcon },
]

export default function SearchEngineToggle({ engine, onChange }: SearchEngineToggleProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {ENGINES.map(({ key, label, Icon }) => {
        const isActive = engine === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`
              relative flex items-center gap-1.5 px-3 py-1.5 rounded-full
              text-[11px] font-medium leading-none select-none
              transition-colors duration-200
              ${isActive
                ? 'text-white'
                : 'text-[var(--color-text-muted)]/60 hover:text-[var(--color-text-muted)] hover:bg-black/[0.03]'
              }
            `}
            aria-pressed={isActive}
            aria-label={`${label}搜索`}
          >
            {/* Shared layout pill — always rendered, hidden when inactive */}
            <motion.div
              layoutId="engine-pill"
              className="absolute inset-0 rounded-full"
              style={{
                background: 'var(--color-accent)',
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 540,
                damping: 32,
                mass: 0.5,
              }}
            />
            <span
              className="relative z-[1]"
              style={isActive && key === 'bing' ? { filter: 'brightness(0) invert(1)', display: 'flex' } : { display: 'flex' }}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive && key !== 'bing' ? 'text-white' : ''}`} />
            </span>
            <span className="relative z-[1]">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
