import bookmarksData from './bookmarks.json'
import type { Bookmark, Category } from '../types/bookmark'

export function loadBookmarks(): Category[] {
  return bookmarksData.categories as Category[]
}

export function getAllBookmarks(): Bookmark[] {
  const result: Bookmark[] = []
  function walk(categories: Category[]) {
    for (const cat of categories) {
      if (cat.bookmarks) result.push(...cat.bookmarks)
      if (cat.subcategories) walk(cat.subcategories)
    }
  }
  walk(bookmarksData.categories as Category[])
  return result
}

export function searchBookmarks(query: string): Bookmark[] {
  if (!query.trim()) return getAllBookmarks()
  const q = query.toLowerCase()
  return getAllBookmarks().filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.url.toLowerCase().includes(q)
  )
}

export function getCategoryPath(categories: Category[], targetName: string): string[] {
  for (const cat of categories) {
    if (cat.name === targetName) return [cat.name]
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        if (sub.name === targetName) return [cat.name, sub.name]
      }
    }
  }
  return [targetName]
}
