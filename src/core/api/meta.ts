import readingTime from 'reading-time'
import type { Article, Book, Content, ContentType } from 'types'
import { fetchBookData } from './http'
import { getImageData, generateMetaImage } from './image'

const getArticleMeta = async (
  slug: string,
  meta: Article['meta'],
  content: Article['markdown'],
) => {
  let metaImage: Article['meta']['metaImage'] = null

  try {
    const url = `/images/articles/${slug}/${slug}.png`
    const { width, height } = await getImageData(url)
    metaImage = { width, height, url }
  } catch (e) {
    /* no image, all good */
  }

  const readingTimeStats = readingTime(content)

  return { ...meta, metaImage, readingTime: readingTimeStats.text }
}

const getBookMeta = async (slug: string, meta: Book['meta']) => {
  const { coverImageURL, title, authors } = await fetchBookData(meta.isbn)
  const coverImageData = await getImageData(coverImageURL)

  const metaImage = await generateMetaImage({
    directory: 'books',
    fileName: slug,
    data: coverImageData,
    scale: 2,
  })

  return {
    ...meta,
    title,
    authors,
    coverImage: {
      url: coverImageURL,
      aspectRatio: coverImageData.ratio,
    },
    metaImage,
  }
}

export const getMeta = async <T extends Content>(
  contentType: ContentType,
  slug: string,
  rawMeta: Record<string, unknown>,
  rawContent = '',
) => {
  switch (contentType) {
    case 'book':
      return getBookMeta(slug, rawMeta as Book['meta'])

    case 'article':
      return getArticleMeta(slug, rawMeta as Article['meta'], rawContent)

    default:
      return rawMeta as T['meta']
  }
}
