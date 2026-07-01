import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState<'enter' | 'draw' | 'reveal'>('enter')

  useEffect(() => {
    let completed = false
    const done = () => {
      if (completed) return
      completed = true
      onComplete()
    }

    const t1 = setTimeout(() => setStage('draw'), 350)
    const t2 = setTimeout(() => setStage('reveal'), 1100)
    const t3 = setTimeout(done, 2000)
    // Safety net: force-complete after 5s if animation callback never fires
    const safety = setTimeout(done, 5000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(safety)
    }
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#faf9f7' }}
    >
      {/* ── Ambient glow layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary blue glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px]"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 45%, rgba(0,117,222,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Purple accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="absolute top-[47%] left-[56%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px]"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(57,28,87,0.05) 0%, transparent 65%)',
          }}
        />
        {/* Teal accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[55%] left-[44%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(42,157,153,0.05) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Central content ── */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Bookmark icon with orbiting rings */}
        <div className="relative mb-14">
          {/* Outer orbit — dashed ring rotating clockwise */}
          <motion.svg
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: stage !== 'enter' ? 0.35 : 0,
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 0.7 },
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 160 160"
            width="160"
            height="160"
          >
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="#0075de"
              strokeWidth="0.5"
              strokeDasharray="4 16"
            />
          </motion.svg>

          {/* Middle orbit ring — counter-clockwise */}
          <motion.svg
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: stage !== 'enter' ? 0.25 : 0,
              rotate: -360,
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.12 },
              rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 180 180"
            width="180"
            height="180"
          >
            <circle
              cx="90"
              cy="90"
              r="84"
              fill="none"
              stroke="#2a9d99"
              strokeWidth="0.4"
              strokeDasharray="3 20"
            />
          </motion.svg>

          {/* Innermost ring — very subtle */}
          <motion.svg
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: stage !== 'enter' ? 0.2 : 0,
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.24 },
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 120 120"
            width="120"
            height="120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#391c57"
              strokeWidth="0.35"
              strokeDasharray="2 10"
            />
          </motion.svg>

          {/* ── Bookmark SVG with stroke-draw animation ── */}
          <svg
            width="48"
            height="62"
            viewBox="0 0 48 62"
            fill="none"
            className="relative"
          >
            <defs>
              <linearGradient
                id="lgBookmark"
                x1="8"
                y1="2"
                x2="40"
                y2="60"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0075de" />
                <stop offset="0.5" stopColor="#391c57" />
                <stop offset="1" stopColor="#2a9d99" />
              </linearGradient>
            </defs>

            {/* Subtle fill that blooms after the stroke draws */}
            <motion.path
              d="M8 3.5C8 2.11929 9.11929 1 10.5 1H37.5C38.8807 1 40 2.11929 40 3.5V57L24 47L8 57V3.5Z"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'reveal' ? 0.07 : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              fill="url(#lgBookmark)"
            />

            {/* Stroke draw */}
            <motion.path
              d="M8 3.5C8 2.11929 9.11929 1 10.5 1H37.5C38.8807 1 40 2.11929 40 3.5V57L24 47L8 57V3.5Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: stage !== 'enter' ? 1 : 0 }}
              transition={{
                duration: 0.9,
                ease: [0.32, 0.72, 0, 1],
              }}
              stroke="url(#lgBookmark)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── Quote reveal ── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{
            opacity: stage === 'reveal' ? 1 : 0,
            y: stage === 'reveal' ? 0 : 4,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-black/80">
            Stay hungry, stay foolish.
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)]/50 tracking-[0.05em]">
            求知若饥，虚心若愚
          </span>
        </motion.div>
      </div>

      {/* ── Progress bar ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.7, ease: [0.32, 0.72, 0, 1] }}
        style={{
          background:
            'linear-gradient(to right, #0075de, #391c57, #2a9d99)',
        }}
      />
    </motion.div>
  )
}
