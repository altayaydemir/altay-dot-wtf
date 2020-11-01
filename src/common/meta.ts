import { api } from './api'
import { getImageData, generateMetaImage } from './image'
import { Book, Content, ContentType } from '../types'

const getBookMeta = async (fileName: string, meta: Book['meta']): Promise<Book['meta']> => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${meta.isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  const json = await api.get(url)

  if (!json || !json.totalItems) {
    throw new Error(`Could not fetch meta for book: ${fileName} - ${url}`)
  }

  const [fetchedBook] = json.items
  const coverImageURL = fetchedBook.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
  const coverImageData = await getImageData(coverImageURL)
  const metaImage = await generateMetaImage({
    directory: 'books',
    fileName,
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
  fileName: string,
  rawMeta: Record<string, unknown>,
) => {
  switch (contentType) {
    case 'book':
      return getBookMeta(fileName, rawMeta as Book['meta'])

    default:
      return rawMeta as T['meta']
  }
}
