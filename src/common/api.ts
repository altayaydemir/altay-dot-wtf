import { GetStaticProps, GetStaticPaths } from 'next'
import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { calculateImageAspectRatio } from './image'
import { Book, Content, ContentType } from '../types'

const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'article':
      return 'articles'
    case 'book':
      return 'books'
    case 'note':
      return 'notes'
    case 'now':
      return 'now'
    case 'about':
      return 'about'
    case 'home':
      return 'home'
  }
}

const getContentDirectoryPath = (contentType: ContentType) =>
  join(process.cwd(), 'data', getContentDirectoryForType(contentType))

export const getSlugs = (contentType: ContentType) => {
  const directory = getContentDirectoryPath(contentType)
  return fs
    .readdirSync(directory, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)
}

const getMarkdownFile = (contentType: ContentType, fileName: string) => {
  const directory = getContentDirectoryPath(contentType)
  return fs.readFileSync(`${directory}/${fileName}.md`, 'utf-8')
}

export const getMeta = <T extends Content>(contentType: ContentType, fileName: string) => {
  const md = getMarkdownFile(contentType, fileName)
  const { data } = matter(md)
  return data as T['meta']
}

export const getContent = <T extends Content>(contentType: ContentType, fileName: string) => {
  const md = getMarkdownFile(contentType, fileName)
  const { content, data } = matter(md)
  return { type: contentType, markdown: content, meta: data, slug: fileName } as T
}

export const getStaticPathsFromSlugs = (contentType: ContentType): GetStaticPaths => async () => ({
  paths: getSlugs(contentType).map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticPropsWithContent = <T extends Content>(
  contentType: ContentType,
): GetStaticProps<{ data: T } | { data: undefined }> => async ({ params }) => {
  const slug = getSlugs(contentType).find((s) => s === params?.slug)

  if (!slug) {
    return { props: { data: undefined } }
  }

  return {
    props: { data: getContent<T>(contentType, slug) },
  }
}

export const fetchBookMeta = async (fileName: string): Promise<Book['meta']> => {
  const meta = getMeta<Book>('book', fileName)
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${meta.isbn}`)
  const json = await response.json()
  const [book] = json.items

  if (!book) {
    throw new Error(`Could not fetch meta for book: ${fileName}`)
  }

  const FALLBACK_ASPECT_RATIO = 0.66
  const coverImageURL = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
  const aspectRatio = (await calculateImageAspectRatio(coverImageURL)) || FALLBACK_ASPECT_RATIO

  return {
    ...meta,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
    coverImageURL,
    coverImageAspectRatio: aspectRatio,
  }
}
