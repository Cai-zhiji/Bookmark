import encrypted from './private-bookmarks.encrypted.json'

export const PRIVATE_CATEGORY = '隐私目录'
export const PRIVATE_ACCESS_MINUTES = 30

export interface PrivateBookmark {
  title: string
  url: string
  group?: string
}

function decodeBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
}

function isPrivateBookmark(value: unknown): value is PrivateBookmark {
  if (!value || typeof value !== 'object' || !('title' in value) || !('url' in value)) return false
  if (typeof value.title !== 'string' || typeof value.url !== 'string') return false
  if ('group' in value && typeof value.group !== 'string') return false
  const protocol = new URL(value.url).protocol
  return protocol === 'https:' || protocol === 'http:'
}

export async function unlockPrivateBookmarks(password: string): Promise<PrivateBookmark[]> {
  if (encrypted.version !== 1) throw new Error('Unsupported private bookmark format')

  const { subtle } = globalThis.crypto
  const secret = await subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: decodeBase64(encrypted.salt), iterations: 600_000 },
    secret,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
  const plaintext = await subtle.decrypt(
    { name: 'AES-GCM', iv: decodeBase64(encrypted.iv) },
    key,
    decodeBase64(encrypted.ciphertext),
  )
  const bookmarks: unknown = JSON.parse(new TextDecoder().decode(plaintext))
  if (!Array.isArray(bookmarks) || !bookmarks.every(isPrivateBookmark)) {
    throw new Error('Invalid private bookmark data')
  }
  return bookmarks
}
