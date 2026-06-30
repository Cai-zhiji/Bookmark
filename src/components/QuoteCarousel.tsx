import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs', zh: '求知若饥，虚心若愚' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', zh: '成就伟业的唯一途径是热爱你所做的事' },
  { text: 'Think different.', author: 'Apple', zh: '非同凡想' },
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs', zh: '设计不只是外观和感觉，设计在于它如何运作' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', zh: '至繁归于至简' },
  { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker', zh: '预测未来的最好方式就是去创造它' },
  { text: 'Details matter. It\'s worth waiting to get it right.', author: 'Steve Jobs', zh: '细节至关重要，值得等待把它做好' },
  { text: 'Less is more.', author: 'Mies van der Rohe', zh: '少即是多' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs', zh: '创新是领导者和追随者的分水岭' },
  { text: 'Have the courage to follow your heart and intuition.', author: 'Steve Jobs', zh: '要有勇气追随你的内心和直觉' },
  { text: 'The journey is the reward.', author: 'Steve Jobs', zh: '过程即是奖励' },
  { text: 'Good artists copy, great artists steal.', author: 'Pablo Picasso', zh: '能者摹形，大师窃意' },
]

export default function QuoteCarousel() {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % QUOTES.length)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(advance, 7000)
    return () => clearInterval(timer)
  }, [advance, isHovered])

  const quote = QUOTES[index]

  return (
    <div
      className="flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col items-center gap-0.5"
        >
          <p
            className="text-[13px] leading-relaxed text-[var(--color-text-muted)]/55 italic text-center"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            &ldquo;{quote.text}&rdquo;
          </p>
          <p
            className="text-[10px] text-[var(--color-text-muted)]/30 tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            — {quote.author}
            {quote.zh && (
              <span className="ml-1.5 text-[var(--color-text-muted)]/25">/ {quote.zh}</span>
            )}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
