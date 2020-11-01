import { fetchBookData } from './api'
import { getRemoteImageData, getLocalImageData, generateMetaImage } from './image'
import { Article, Book, Content, ContentType } from '../types'

const getArticleMeta = async (slug: string, meta: Article['meta']) => {
  let metaImage: Article['meta']['metaImage'] = null

  try {
    const url = `/images/articles/${slug}/${slug}.png`
    const { width, height } = await getLocalImageData(url)
    metaImage = { width, height, url }
  } catch (e) {
    /* no image, all good */
  }

  return { ...meta, metaImage }
}

const getBookMeta = async (slug: string, meta: Book['meta']) => {
  const { coverImageURL, title, authors } = await fetchBookData(meta.isbn)
  const coverImageData = await getRemoteImageData(coverImageURL)
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
) => {
  switch (contentType) {
    case 'book':
      return getBookMeta(slug, rawMeta as Book['meta'])

    case 'article':
      return getArticleMeta(slug, rawMeta as Article['meta'])

    default:
      return rawMeta as T['meta']
  }
}
