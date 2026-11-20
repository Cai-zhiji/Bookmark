import { useEffect, useRef, useState, type FormEvent } from 'react'
import { PRIVATE_ACCESS_MINUTES, PRIVATE_CATEGORY, unlockPrivateBookmarks, type PrivateBookmark } from '../data/privateBookmarks'
import { Lock } from './Icons'

interface PrivateBookmarksDialogProps {
  onClose: () => void
  onUnlock: (bookmarks: PrivateBookmark[]) => void
}

export default function PrivateBookmarksDialog({ onClose, onUnlock }: PrivateBookmarksDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const element = dialog.current
    if (element && !element.open) {
      element.showModal()
      passwordInput.current?.focus()
    }
  }, [])

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = passwordInput.current
    if (isUnlocking || !input?.value) return
    if (!globalThis.crypto?.subtle) {
      setError('当前浏览器无法解锁。请在支持加密功能的浏览器中通过 HTTPS 打开。')
      return
    }

    const password = input.value.trim()
    input.value = ''
    setError('')
    setIsUnlocking(true)
    try {
      const bookmarks = await unlockPrivateBookmarks(password)
      if (dialog.current?.open) onUnlock(bookmarks)
    } catch {
      setError('密码不正确，或目录暂时无法解锁。')
      input.focus()
    } finally {
      setIsUnlocking(false)
    }
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="private-dialog-title"
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-sm overflow-y-auto
        rounded-2xl border border-[var(--color-border-whisper)] bg-[var(--color-canvas)]
        p-5 text-[var(--color-foreground)] shadow-[var(--shadow-deep)]
        backdrop:bg-black/35 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[var(--color-canvas-warm)] p-2.5">
          <Lock className="h-5 w-5 text-[var(--color-text-secondary)]" />
        </div>
        <h2 id="private-dialog-title" className="text-lg font-semibold">{PRIVATE_CATEGORY}</h2>
      </div>
      <form method="dialog" autoComplete="off" onSubmit={handleUnlock} className="mt-5">
        <label htmlFor="private-bookmarks-password" className="block text-sm font-medium text-[var(--color-text-secondary)]">
          访问密码
        </label>
        <input
          ref={passwordInput}
          id="private-bookmarks-password"
          type="password"
          autoComplete="off"
          required
          readOnly={isUnlocking}
          aria-invalid={!!error}
          aria-describedby={error ? 'private-bookmarks-error' : 'private-bookmarks-hint'}
          className="mt-2 w-full rounded-xl border border-[var(--color-border-whisper)] px-3 py-2.5
            text-base focus:border-[var(--color-accent)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />
        {error && (
          <p id="private-bookmarks-error" role="alert" className="mt-2 text-sm text-[var(--color-text-secondary)]">{error}</p>
        )}
        <p id="private-bookmarks-hint" className="mt-2 text-xs text-[var(--color-text-secondary)]">
          解锁后可阅览 {PRIVATE_ACCESS_MINUTES} 分钟，刷新页面会重新锁定。
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-canvas-warm)]"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isUnlocking}
            className="rounded-xl bg-[var(--color-accent-hover)] px-4 py-2.5 text-sm font-semibold
              text-white hover:bg-[var(--color-accent)] disabled:opacity-70"
          >
            {isUnlocking ? '正在解锁…' : '解锁'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
