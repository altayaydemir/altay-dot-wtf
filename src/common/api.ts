import { GetStaticProps, GetStaticPaths } from 'next'
import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { calculateImageAspectRatio } from './image'
import { Book, Content, ContentType, TaggedContent } from '../types'

const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'about':
      return 'about'
    case 'article':
      return 'articles'
    case 'book':
      return 'books'
    case 'home':
      return 'home'
    case 'note':
      return 'notes'
    case 'now':
      return 'now'
  }
}

const getContentDirectoryPath = (contentType: ContentType) =>
  join(process.cwd(), 'data', getContentDirectoryForType(contentType))

const getMarkdownFile = (contentType: ContentType, fileName: string) => {
  const directory = getContentDirectoryPath(contentType)
  return fs.readFileSync(`${directory}/${fileName}.md`, 'utf-8')
}

export const getSlugs = (contentType: ContentType) => {
  const directory = getContentDirectoryPath(contentType)
  return fs
    .readdirSync(directory, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)
}

export const getStaticPathsFromSlugs = (contentType: ContentType): GetStaticPaths => async () => ({
  paths: getSlugs(contentType).map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getMeta = <T extends Content>(contentType: ContentType, fileName: string) => {
  const md = getMarkdownFile(contentType, fileName)
  const { data } = matter(md)
  return data as T['meta']
}

export const getBookMeta = async (fileName: string): Promise<Book['meta']> => {
  const meta = getMeta<Book>('book', fileName)
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${meta.isbn}`

  const response = await fetch(url)
  const json = await response.json()

  if (!json || !json.totalItems) {
    throw new Error(`Could not fetch meta for book: ${fileName} - ${url}`)
  }

  const [book] = json.items
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

export const getContent = <T extends Content>(contentType: ContentType, fileName: string) => {
  const md = getMarkdownFile(contentType, fileName)
  const { content, data } = matter(md)
  return { type: contentType, markdown: content, meta: data, slug: fileName } as T
}

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

const TAGGED_CONTENT_TYPES: ContentType[] = ['article', 'book']

const getSlugsAndMetaByContentType = (contentType: ContentType) =>
  getSlugs(contentType).map((slug) => ({
    type: contentType,
    slug,
    meta: getMeta(contentType, slug),
  }))

export const getAllTags = () => {
  const tags = TAGGED_CONTENT_TYPES.map(getSlugsAndMetaByContentType)
    .flat()
    .map(({ meta }) => meta?.tags || [])
    .filter((tags) => tags.length)
    .flat()
    .reduce<Set<string>>((tags, tag) => {
      if (!tags.has(tag)) tags.add(tag)
      return tags
    }, new Set())

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
}

export const getContentsByTag = (tag: string) =>
  TAGGED_CONTENT_TYPES.map(getSlugsAndMetaByContentType)
    .flat()
    .filter(({ meta }) => meta?.tags?.includes(tag)) as TaggedContent[]
