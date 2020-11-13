import fs from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const BOOK_JSON_FOLDER = join(process.cwd(), 'data', 'books', 'json')

type BookData = {
  isbn: string
  title: string
  authors: string[]
  coverImageURL: string
}

type GoogleBooksQueryResult = {
  totalItems: number
  items: Array<{
    volumeInfo: {
      title: string
      authors: string[]
      imageLinks: {
        thumbnail: string
      }
    }
  }>
}

const decodeGoogleBooksResponse = (isbn: string, json: GoogleBooksQueryResult): BookData => {
  if (!json || !json.totalItems) {
    throw new Error(`Could not decode GoogleBooks response for: ${isbn}`)
  }

  return {
    isbn,
    title: json.items[0].volumeInfo.title,
    authors: json.items[0].volumeInfo.authors,
    coverImageURL: json.items[0].volumeInfo.imageLinks.thumbnail.replace('http://', 'https://'),
  }
}

export const fetchBookData = async (isbn: string) => {
  const cachedJSONPath = `${BOOK_JSON_FOLDER}/${isbn}.json`

  if (fs.existsSync(cachedJSONPath)) {
    return JSON.parse(fs.readFileSync(cachedJSONPath, 'utf-8')) as BookData
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  const response = await fetch(url)
  const json = await response.json()
  const bookData = decodeGoogleBooksResponse(isbn, json)

  fs.writeFileSync(cachedJSONPath, JSON.stringify(bookData, null, ' '))

  return bookData
}

const PUBLIC_PATH = join(process.cwd(), 'public')

export const fetchBookImage = async (slug: string, url: string) => {
  const bookFolderPath = `/images/books/${slug}`
  const coverImagePath = bookFolderPath + `/cover.png`

  if (fs.existsSync(`${PUBLIC_PATH}/${coverImagePath}`)) {
    return coverImagePath
  }

  const response = await fetch(url)
  const buffer = await response.buffer()

  if (!fs.existsSync(`${PUBLIC_PATH}/${bookFolderPath}`)) {
    fs.mkdirSync(`${PUBLIC_PATH}/${bookFolderPath}`)
  }

  fs.writeFileSync(`${PUBLIC_PATH}/${coverImagePath}`, buffer)

  return coverImagePath
}
