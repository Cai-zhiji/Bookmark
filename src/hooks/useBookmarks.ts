import { useState, useMemo } from 'react'
import { loadBookmarks, getAllBookmarks, searchBookmarks } from '../data/loader'
import type { Category, Bookmark } from '../types/bookmark'

export function useBookmarks() {
  const categories = useMemo(() => loadBookmarks(), [])
  const allBookmarks = useMemo(() => getAllBookmarks(), [])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBookmarks = useMemo(() => {
    if (searchQuery.trim()) {
      return searchBookmarks(searchQuery)
    }
    if (!selectedCategory) return allBookmarks

    // Filter by selected category
    const result: Bookmark[] = []
    function find(cats: Category[]) {
      for (const cat of cats) {
        if (cat.name === selectedCategory) {
          if (cat.bookmarks) result.push(...cat.bookmarks)
          return
        }
        if (cat.subcategories) {
          for (const sub of cat.subcategories) {
            if (sub.name === selectedCategory) {
              if (sub.bookmarks) result.push(...sub.bookmarks)
              return
            }
          }
          find(cat.subcategories)
        }
      }
    }
    find(categories)
    return result.length > 0 ? result : allBookmarks
  }, [categories, allBookmarks, selectedCategory, searchQuery])

  return {
    categories,
    allBookmarks,
    filteredBookmarks,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
  }
}
