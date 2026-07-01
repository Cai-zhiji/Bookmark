import { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookmarks } from './hooks/useBookmarks'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchEngineToggle from './components/SearchEngineToggle'
import RecentSection from './components/RecentSection'
import { RecentProvider } from './context/RecentContext'
import CategorySection from './components/CategorySection'
import BookmarkCard from './components/BookmarkCard'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'
import LoadingScreen from './components/LoadingScreen'
import type { Bookmark, SearchEngine } from './types/bookmark'
import NoiseOverlay from './components/NoiseOverlay'
import QuoteCarousel from './components/QuoteCarousel'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const {
    categories,
    filteredBookmarks,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
  } = useBookmarks()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchEngine, setSearchEngine] = useState<SearchEngine>('bookmarks')
  const isSearching = searchEngine === 'bookmarks' && searchQuery.trim().length > 0
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleLoadingComplete = useCallback(() => setLoading(false), [])

  const handleEngineChange = useCallback((engine: SearchEngine) => {
    setSearchEngine(engine)
    setSearchQuery('')
  }, [setSearchQuery])

  const ENGINE_ORDER: SearchEngine[] = ['bookmarks', 'google', 'bing', 'yandex']

  const handleTabCycle = useCallback(() => {
    setSearchEngine((prev) => {
      const idx = ENGINE_ORDER.indexOf(prev)
      return ENGINE_ORDER[(idx + 1) % ENGINE_ORDER.length]
    })
    setSearchQuery('')
  }, [setSearchQuery])

  const handleEnterSearch = useCallback(() => {
    const q = encodeURIComponent(searchQuery.trim())
    if (!q) return
    const urls: Record<string, string> = {
      google: `https://www.google.com/search?q=${q}`,
      bing: `https://www.bing.com/search?q=${q}`,
      yandex: `https://yandex.com/search/?text=${q}`,
    }
    const url = urls[searchEngine]
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }, [searchEngine, searchQuery])

  // ── Keyboard shortcuts ──
  useKeyboardShortcuts({
    onFocusSearch: () => searchInputRef.current?.focus(),
    onClearSearch: () => setSearchQuery(''),
    onCloseSidebar: () => setSidebarOpen(false),
    searchQuery,
    sidebarOpen,
  })

  // Group bookmarks by subcategory when showing all
  const groupedByCategory = useMemo(() => {
    if (isSearching || selectedCategory) return null
    const result: { categoryName: string; eyebrow?: string; bookmarks: Bookmark[] }[] = []
    for (const cat of categories) {
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          if (sub.bookmarks && sub.bookmarks.length > 0) {
            result.push({ categoryName: sub.name, eyebrow: cat.name, bookmarks: sub.bookmarks })
          }
        }
      } else if (cat.bookmarks && cat.bookmarks.length > 0) {
        result.push({ categoryName: cat.name, bookmarks: cat.bookmarks })
      }
    }
    return result
  }, [categories, isSearching, selectedCategory])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
      ) : (
        <RecentProvider>
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="min-h-screen bg-[var(--color-canvas)] overflow-x-hidden">
      {/* Ambient Mesh */}
      <div className="ambient-mesh" />
      {/* Floating particles */}
      <FloatingParticles />
      <NoiseOverlay />

      {/* Mobile Header */}
      <Header onMenuToggle={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />

      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="relative z-[1] lg:ml-56 min-h-screen">
        {/* === Persistent Search Bar (never unmounts — fixes focus loss bug) === */}
        <div className="sticky top-0 z-10 px-4 lg:px-6 pt-6 lg:pt-8 pb-0">
          <div className="max-w-[640px] mx-auto">
            {/* Search engine toggle — top-left above the search bar */}
            <div className="mb-2.5">
              <SearchEngineToggle engine={searchEngine} onChange={handleEngineChange} />
            </div>
            {/* Search bar with glow ring */}
            <div className="relative group/search">
              <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-[var(--color-accent)]/20 via-purple-400/10 to-cyan-400/10 blur-md opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500" />
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                engine={searchEngine}
                onEnter={handleEnterSearch}
                onTabCycle={handleTabCycle}
                ref={searchInputRef}
              />
            </div>
          </div>
          {/* Category back button */}
          {selectedCategory && !isSearching && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-2 mx-auto block text-[12px] font-medium text-[var(--color-text-muted)]
                hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ← 全部
            </button>
          )}

          {/* Quote carousel — below search, only when idle */}
          {!isSearching && !selectedCategory && (
            <div className="mt-1.5 max-w-[640px] mx-auto">
              <QuoteCarousel />
            </div>
          )}
        </div>

        {/* === Content area === */}
        <div className="px-4 lg:px-6 pb-12">
          {/* Recently used bookmarks — only when idle */}
          {!isSearching && !selectedCategory && <RecentSection />}
          {/* Searching state */}
          {isSearching && (
            <div className="pt-1">
              <p className="text-[13px] font-medium text-[var(--color-text-muted)] mb-5"
                style={{ fontFamily: 'var(--font-mono)' }}>
                &ldquo;{searchQuery}&rdquo; — {filteredBookmarks.length} 个结果
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
                >
                  {filteredBookmarks.map((bm, i) => (
                    <BookmarkCard key={bm.url} bookmark={bm} index={i} searchQuery={searchQuery.trim()} />
                  ))}
                </motion.div>
              </AnimatePresence>
              {filteredBookmarks.length === 0 && (
                <div className="text-center py-20 space-y-3">
                  <p className="text-[15px] text-[var(--color-text-muted)]">
                    无结果
                  </p>
                  <p className="text-[12px] text-[var(--color-text-muted)]/40 italic"
                    style={{ fontFamily: 'var(--font-sans)' }}>
                    &ldquo;Stay hungry, stay foolish.&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Category filtered view */}
          {!isSearching && selectedCategory && (
            <div className="pt-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  <CategorySection
                    title={selectedCategory}
                    bookmarks={filteredBookmarks}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Default: all categories */}
          {!isSearching && !selectedCategory && groupedByCategory && (
            <div className="">
              {groupedByCategory.map((group, idx) => (
                <CategorySection
                  key={group.categoryName + (group.eyebrow || '')}
                  title={group.categoryName}
                  eyebrow={group.eyebrow}
                  bookmarks={group.bookmarks}
                  alternateBg={idx % 2 === 1}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />
        <ScrollToTop />
      </main>
        </motion.div>
        </RecentProvider>
      )}
    </AnimatePresence>
  )
}
