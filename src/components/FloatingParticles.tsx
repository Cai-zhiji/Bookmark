import { useEffect, useRef } from 'react'

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const palettes = [
      'rgba(0, 117, 222, 0.10)',
      'rgba(0, 117, 222, 0.05)',
      'rgba(57, 28, 87, 0.06)',
      'rgba(42, 157, 153, 0.05)',
      'rgba(221, 91, 0, 0.04)',
      'rgba(26, 174, 57, 0.04)',
    ]

    const particles: HTMLDivElement[] = []

    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div')
      el.className = 'floating-particle'
      const size = Math.random() * 100 + 30
      const x = Math.random() * 100
      const duration = Math.random() * 35 + 25
      const delay = Math.random() * 25

      el.style.cssText = `
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: ${palettes[Math.floor(Math.random() * palettes.length)]};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        filter: blur(${Math.random() * 35 + 15}px);
      `

      container.appendChild(el)
      particles.push(el)
    }

    return () => particles.forEach((p) => p.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
