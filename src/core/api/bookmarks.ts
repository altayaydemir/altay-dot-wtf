import type { BookmarkJSON, Bookmark } from 'types'
import { SITE_URL } from 'config'
import { readJSONFile } from 'core/api/fs'

const formatBookmark = (bookmark: BookmarkJSON): Bookmark => {
  const url = new URL(bookmark.url)
  const formattedURL = 'https://' + url.hostname + url.pathname + `?ref=${SITE_URL}`

  return {
    ...bookmark,
    type: 'bookmark',
    host: url.hostname,
    url: formattedURL,
    tags: bookmark.tags || [],
  }
}

export const getBookmarks = () => {
  return (readJSONFile('bookmarks/bookmarks.json') as BookmarkJSON[]).map(formatBookmark)
}
