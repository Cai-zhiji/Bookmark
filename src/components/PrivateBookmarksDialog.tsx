import { useEffect, useRef, useState, type FormEvent } from 'react'
import { unlockPrivateBookmarks, type PrivateBookmark } from '../data/privateBookmarks'
import { External, Lock } from './Icons'

const secondaryButton = 'rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-canvas-warm)]'

export default function PrivateBookmarksDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const [bookmarks, setBookmarks] = useState<PrivateBookmark[] | null>(null)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const element = dialog.current
    if (element && !element.open) {
      element.showModal()
      passwordInput.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (bookmarks) heading.current?.focus()
  }, [bookmarks])

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
      setBookmarks(await unlockPrivateBookmarks(password))
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
      aria-labelledby="private-bookmarks-title"
      className={`fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] overflow-y-auto
        rounded-2xl border border-[var(--color-border-whisper)] bg-[var(--color-canvas)]
        p-5 text-[var(--color-foreground)] shadow-[var(--shadow-deep)]
        backdrop:bg-black/35 sm:p-6 ${bookmarks ? 'max-w-lg' : 'max-w-sm'}`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[var(--color-canvas-warm)] p-2.5">
          <Lock className="h-5 w-5 text-[var(--color-text-secondary)]" />
        </div>
        <h2 ref={heading} tabIndex={-1} id="private-bookmarks-title" className="text-lg font-semibold focus:outline-none">
          隐私目录
        </h2>
        {bookmarks && (
          <button type="button" onClick={() => dialog.current?.close()} className={`ml-auto ${secondaryButton}`}>
            锁定并关闭
          </button>
        )}
      </div>
      {bookmarks ? (
        <ul className="mt-5 space-y-2" aria-label="隐私书签">
          {bookmarks.map(({ title, url }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-canvas-warm)]
                  px-4 py-3 text-sm font-medium hover:text-[var(--color-accent-hover)]"
              >
                <span className="min-w-0 break-words">{title}</span>
                <External className="h-4 w-4 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
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
            aria-describedby={error ? 'private-bookmarks-error' : undefined}
            className="mt-2 w-full rounded-xl border border-[var(--color-border-whisper)] px-3 py-2.5
              text-base focus:border-[var(--color-accent)] focus:outline-2 focus:outline-[var(--color-accent)]"
          />
          {error && <p id="private-bookmarks-error" role="alert" className="mt-2 text-sm text-[var(--color-text-secondary)]">{error}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => dialog.current?.close()} className={secondaryButton}>取消</button>
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
      )}
    </dialog>
  )
}
