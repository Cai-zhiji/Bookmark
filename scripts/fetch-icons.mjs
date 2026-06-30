import { readFileSync, existsSync, mkdirSync, createWriteStream } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'
import http from 'node:http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const BOOKMARKS_PATH = join(PROJECT_ROOT, 'src', 'data', 'bookmarks.json')
const ICONS_DIR = join(PROJECT_ROOT, 'public', 'icons')

function getDomain(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return u.hostname
  } catch {
    return null
  }
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, { timeout: 5000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const file = createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
      file.on('error', reject)
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
  })
}

async function main() {
  console.log('🔍 Fetching bookmark favicons...\n')

  if (!existsSync(BOOKMARKS_PATH)) {
    console.log('⚠️  No bookmarks.json found, skipping.')
    return
  }

  if (!existsSync(ICONS_DIR)) {
    mkdirSync(ICONS_DIR, { recursive: true })
  }

  const raw = JSON.parse(readFileSync(BOOKMARKS_PATH, 'utf-8'))

  // Collect all bookmarks from category tree
  const allBookmarks = []
  function walk(cats) {
    if (!Array.isArray(cats)) return
    for (const cat of cats) {
      if (cat.bookmarks) allBookmarks.push(...cat.bookmarks)
      if (cat.subcategories) walk(cat.subcategories)
    }
  }
  if (raw.categories) {
    walk(raw.categories)
  } else if (Array.isArray(raw)) {
    allBookmarks.push(...raw)
  }

  let fetched = 0
  let skipped = 0
  let failed = 0

  for (const bm of allBookmarks) {
    const domain = getDomain(bm.url)
    if (!domain) {
      console.log(`  ⚠️  Invalid URL: ${bm.url}`)
      failed++
      continue
    }

    const iconPath = join(ICONS_DIR, `${domain}.png`)

    if (existsSync(iconPath)) {
      console.log(`  ⏭️  ${domain} (exists)`)
      skipped++
      continue
    }

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    try {
      await downloadFile(faviconUrl, iconPath)
      console.log(`  ✅ ${domain}`)
      fetched++
    } catch (e) {
      console.log(`  ❌ ${domain} (${e.message})`)
      failed++
    }
  }

  console.log(`\n📊 Done: ${fetched} fetched, ${skipped} skipped, ${failed} failed`)
}

main().catch(console.error)
