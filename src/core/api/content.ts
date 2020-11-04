import matter from 'gray-matter'
import { Content, ContentType } from 'types'
import { getMarkdownFileNames, getMarkdownFile } from './fs'
import { getMeta } from './meta'

const getMarkdownContentDetails = async <T extends Content>(
  contentType: ContentType,
  fileName: string,
) => {
  const md = getMarkdownFile(contentType, fileName)
  const { content, data } = matter(md)
  const meta = await getMeta<T>(contentType, fileName, data)

  return {
    type: contentType,
    slug: fileName,
    markdown: content,
    meta,
  } as T
}

export const getContentDetails = <T extends Content>(
  contentType: ContentType,
  fileName: string,
) => {
  if (contentType === 'bookmark') {
    return {} as T
  }

  return getMarkdownContentDetails<T>(contentType, fileName)
}

const minifyContentListItem = <T extends Content>(data: T) => {
  if (data.type === 'bookmark') {
    return data
  }

  return { ...data, markdown: '' } as T
}

export const getContentList = async <T extends Content>(
  contentType: ContentType,
  { withDetails = false } = {},
) => {
  const fileNames = getMarkdownFileNames(contentType)

  let contentList = (await Promise.all(
    fileNames.map((slug) => getContentDetails<T>(contentType, slug)),
  )) as T[]

  if (process.env.NODE_ENV === 'production') {
    contentList = contentList.filter((c) => !c.meta.draft)
  }

  if (withDetails) {
    return contentList
  }

  return contentList.map(minifyContentListItem)
}
