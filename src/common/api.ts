import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import imageSize from 'image-size'
import fetch from 'node-fetch'
import { GetStaticProps, GetStaticPaths } from 'next'
import { BasicMeta, BookMeta, MDBookMeta } from '../types'

type ContentDirectory = 'home' | 'about' | 'now' | 'articles' | 'books'

const getContentDirectoryPath = (contentDirectory: ContentDirectory) =>
  join(process.cwd(), 'data', contentDirectory)

export const getSlugs = (contentDirectory: ContentDirectory) => {
  const directory = getContentDirectoryPath(contentDirectory)
  return fs
    .readdirSync(directory, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)
}

export const getMarkdownContent = (contentDirectory: ContentDirectory, fileName: string) => {
  const directory = getContentDirectoryPath(contentDirectory)
  return fs.readFileSync(`${directory}/${fileName}.md`, 'utf-8')
}

export const getMeta = <Meta extends { slug: string }>(
  contentDirectory: ContentDirectory,
  fileName: string,
) => {
  const markdown = getMarkdownContent(contentDirectory, fileName)
  const { data } = matter(markdown)
  return { ...data, slug: fileName } as Meta
}

export const getMarkdownContentWithMeta = <Meta extends { slug: string }>(
  contentDirectory: ContentDirectory,
  fileName: string,
) => {
  const markdown = getMarkdownContent(contentDirectory, fileName)
  const { data, content } = matter(markdown)
  return { content, meta: { ...data, slug: fileName } as Meta }
}

export const getStaticPathsFromSlugs = (
  contentDirectory: ContentDirectory,
): GetStaticPaths => async () => ({
  paths: getSlugs(contentDirectory).map((slug) => ({ params: { slug } })),
  fallback: false,
})

export type StaticPropsWithMarkdownContent<Meta> =
  | { meta: undefined; content: undefined }
  | { meta: Meta; content: string }

export const getStaticPropsWithMarkdownContent = <Meta extends BasicMeta>(
  contentDirectory: ContentDirectory,
): GetStaticProps<StaticPropsWithMarkdownContent<Meta>, { slug: string }> => async ({ params }) => {
  const slug = getSlugs(contentDirectory).find((s) => s === params?.slug)

  if (!slug) {
    return { props: { meta: undefined, content: undefined } }
  }

  return {
    props: getMarkdownContentWithMeta<Meta>(contentDirectory, slug),
  }
}

const calculateImageAspectRatio = async (url: string): Promise<number | undefined> => {
  try {
    const response = await fetch(url)
    const buffer = await response.buffer()
    const { width, height } = imageSize(buffer)
    if (width && height) return width / height
  } catch (e) {
    return
  }
}

export const fetchBookMeta = async (fileName: string): Promise<BookMeta> => {
  const meta = getMeta<MDBookMeta>('books', fileName)
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
