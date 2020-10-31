import { GetStaticProps, GetStaticPaths } from 'next'
import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { getImageData, generateMetaImage } from './image'
import { Book, Content, ContentType, TaggedContent, BaseMeta } from '../types'

const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'about':
      return 'about'
    case 'article':
      return 'articles'
    case 'book':
      return 'books'
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

const TAGGED_CONTENT_TYPES: ContentType[] = ['article', 'book', 'note']

const getAllContentByType = (contentType: ContentType) =>
  getSlugs(contentType).map((slug) => getContent(contentType, slug))

const getTagsFromMarkdown = (markdown: string) => {
  const tagLinks = markdown.match(/\(\/tags\/.+\)/g)

  if (!tagLinks) {
    return []
  }

  return tagLinks.map((tagLink) => tagLink.replace('(/tags/', '').replace(')', ''))
}

const getTagsFromMeta = (meta?: BaseMeta) => meta?.tags || []

export const getAllTags = () => {
  const contentsByType = TAGGED_CONTENT_TYPES.map(getAllContentByType).flat()
  const tags = new Set<string>()

  // get tags from meta
  contentsByType
    .map((c) => c.meta)
    .map(getTagsFromMeta)
    .filter((tags) => tags.length)
    .flat()
    .forEach((tag) => (tags.has(tag) ? null : tags.add(tag)))

  // get tags from markdown
  contentsByType
    .map((c) => c.markdown)
    .map(getTagsFromMarkdown)
    .filter((tags) => tags.length)
    .flat()
    .forEach((tag) => (tags.has(tag) ? null : tags.add(tag)))

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
}

export const getContentsByTag = (tag: string) => {
  const contentsByType = TAGGED_CONTENT_TYPES.map(getAllContentByType).flat()

  return contentsByType.filter((content) => {
    const tagsByMeta = getTagsFromMeta(content.meta)
    const tagsByContent = getTagsFromMarkdown(content.markdown)
    return [...tagsByMeta, ...tagsByContent].includes(tag)
  }) as TaggedContent[]
}
