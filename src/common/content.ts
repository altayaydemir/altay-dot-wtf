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

export const getContentList = async <T extends Content>(
  contentType: ContentType,
  { withMarkdown = false } = {},
) => {
  let contentList = await Promise.all(
    getMarkdownFileNames(contentType).map((slug) => getContentDetails<T>(contentType, slug)),
  )

  if (process.env.NODE_ENV === 'production') {
    contentList = contentList.filter((c) => !c.meta.private)
  }

  return contentList.map((c) => ({ ...c, markdown: withMarkdown ? c.markdown : '' }))
}
