import readingTime from 'reading-time'
import type { Article, Book, Content, ContentType } from 'types'
import { fetchBookData, fetchBookImage } from './http'
import { getImageData, generateMetaImage } from './image'

const getArticleMeta = async (
  slug: string,
  meta: Article['meta'],
  content: Article['markdown'],
) => {
  const url = `/images/articles/${slug}/${slug}.png`
  const { width, height, blurhash } = await getImageData(url)
  const metaImage = { width, height, url, blurhash }

  const readingTimeStats = readingTime(content)

  return { ...meta, metaImage, readingTime: readingTimeStats.text }
}

const getBookMeta = async (slug: string, meta: Book['meta']) => {
  const { coverImageURL: remoteCoverImageURL, title, authors } = await fetchBookData(meta.isbn)
  const coverImageURL = await fetchBookImage(slug, remoteCoverImageURL)
  const coverImageData = await getImageData(coverImageURL)
  const metaImage = await generateMetaImage({
    directory: 'books',
    fileName: slug,
    data: coverImageData,
    scale: 2,
  })

  return {
    ...meta,
    title: `${title} by ${authors.join(', ')}`,
    authors,
    coverImage: {
      blurhash: coverImageData.blurhash,
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
