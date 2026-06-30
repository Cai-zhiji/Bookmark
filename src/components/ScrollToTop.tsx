import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="回到顶部"
          className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full
            bg-white/80 backdrop-blur-md
            border border-[var(--color-border-whisper)]
            shadow-[0_2px_12px_rgba(0,0,0,0.06)]
            hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
            hover:border-[var(--color-accent)]/20
            flex items-center justify-center
            transition-all duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-text-muted)]/60"
          >
            <path d="M3 9l4-4 4 4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
