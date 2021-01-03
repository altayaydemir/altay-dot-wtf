import type { Bookmark } from 'types'
import { SITE_URL } from 'config'
import fetch from 'node-fetch'

type RaindropBookmark = {
  title: string
  excerpt: string
  link: string
  domain: string
}

type RaindropResponse = {
  items: RaindropBookmark[]
}

const formatBookmark = (bookmark: RaindropBookmark): Bookmark => ({
  type: 'bookmark',
  title: bookmark.title,
  description: bookmark.excerpt,
  host: bookmark.domain,
  url: `${bookmark.link}?ref=${SITE_URL}`,
})

export const fetchBookmarks = async () => {
  try {
    const response = await fetch(
      'https://api.raindrop.io/rest/v1/raindrops/0?search=[{"key": "tag", "val": "altay-dot-wtf"}]',
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${process.env.RAINDROP_API_KEY}`,
        },
      },
    )

    const json = (await response.json()) as RaindropResponse

    return json.items.map(formatBookmark)
  } catch (error) {
    return []
  }
}
