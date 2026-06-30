export interface Bookmark {
  url: string
  title: string
  description: string
  icon: string
  category: string
  subcategory?: string
  tags?: string[]
}

export interface Category {
  name: string
  subcategories?: Category[]
  bookmarks: Bookmark[]
}

export interface BookmarkData {
  categories: Category[]
}
