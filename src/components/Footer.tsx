export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-whisper)] py-6 px-4">
      <div className="text-center space-y-2">
        <p
          className="text-[12px] text-[var(--color-text-muted)]/60 italic tracking-[0.02em]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          &ldquo;Stay hungry, stay foolish.&rdquo;
        </p>
        <p
          className="text-[10px] text-[var(--color-text-muted)]/35 tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          — Steve Jobs, 2005
        </p>
      </div>
    </footer>
  )
}
