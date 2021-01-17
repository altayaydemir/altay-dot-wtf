import type { Post, Book, Content, ContentType } from 'types'
import readingTime from 'reading-time'
import { fetchBookData, fetchBookImage } from './books'
import { getImageData, generateMetaImage } from './image'

const getPostMeta = async (slug: string, meta: Post['meta'], content: Post['markdown']) => {
  const url = `/images/blog/${slug}/${slug}.png`
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
    publicPath: `/images/books/${slug}/cover-meta.png`,
    data: coverImageData,
    scale: 1.5,
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

    case 'post':
      return getPostMeta(slug, rawMeta as Post['meta'], rawContent)

    default:
      return rawMeta as T['meta']
  }
}
