import readingTime from 'reading-time'
import type { BlogPost, Book, Content, ContentType } from 'types'
import { fetchBookData, fetchBookImage } from './http'
import { getImageData, generateMetaImage } from './image'

const getBlogPostMeta = async (
  slug: string,
  meta: BlogPost['meta'],
  content: BlogPost['markdown'],
) => {
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

    case 'blog-post':
      return getBlogPostMeta(slug, rawMeta as BlogPost['meta'], rawContent)

    default:
      return rawMeta as T['meta']
  }
}
