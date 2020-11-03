import matter from 'gray-matter'
import { Content, ContentType } from 'types'
import { getMarkdownFileNames, getMarkdownFile } from './fs'
import { getMeta } from './meta'

export const getContentDetails = async <T extends Content>(
  contentType: ContentType,
  fileName: string,
) => {
  const md = getMarkdownFile(contentType, fileName)
  const { content, data } = matter(md)
  const meta = await getMeta<T>(contentType, fileName, data)

  return {
    type: contentType,
    markdown: content,
    meta,
    slug: fileName,
  } as T
}

const getFilteredContentList = <T extends Content[]>(collection: T) => {
  if (process.env.NODE_ENV === 'production') {
    return collection.filter((c) => !c.meta.draft)
  }

  return collection
}

export const getContentList = async <T extends Content>(
  contentType: ContentType,
  { withMarkdown = false } = {},
) => {
  const fileNames = getMarkdownFileNames(contentType)
  const contentList = await Promise.all(
    fileNames.map((slug) => getContentDetails<T>(contentType, slug)),
  )

  return getFilteredContentList(contentList).map((c) => ({
    ...c,
    markdown: withMarkdown ? c.markdown : '',
  }))
}
