import { SITE_URL } from 'config'
import { readJSONFile } from 'core/api/fs'

type BookmarkJSON = {
  url: string
  title: string
  description?: string
  tags?: string[]
}

export type Bookmark = BookmarkJSON & {
  type: 'bookmark'
  host: string
  tags: string[]
}

const formatBookmark = (bookmark: BookmarkJSON): Bookmark => {
  const url = new URL(bookmark.url)
  const formattedURL = 'https://' + url.hostname + url.pathname + `?ref=${SITE_URL}`

  return {
    ...bookmark,
    type: 'bookmark',
    host: url.hostname,
    url: formattedURL,
    tags: [],
  }
}

export const getBookmarks = () =>
  (readJSONFile('bookmarks/bookmarks.json') as BookmarkJSON[]).map(formatBookmark)
