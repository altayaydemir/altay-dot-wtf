import { api } from './api'
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
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${meta.isbn}`
  const json = await api.get(url)

  if (!json || !json.totalItems) {
    throw new Error(`Could not fetch meta for book: ${slug} - ${url}`)
  }

  const [fetchedBook] = json.items
  const coverImageURL = fetchedBook.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
  const coverImageData = await getRemoteImageData(coverImageURL)
  const metaImage = await generateMetaImage({
    directory: 'books',
    fileName: slug,
    data: coverImageData,
    scale: 2,
  })

  return {
    ...meta,
    title: fetchedBook.volumeInfo.title,
    authors: fetchedBook.volumeInfo.authors,
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
