import { getContentList } from './content'
import { TaggedContent, TaggedContentType } from '../types'
import { sortContentByDate } from './utils'

const TAGGED_CONTENT_TYPES: TaggedContentType[] = ['article', 'book', 'note']
const getAllTaggedContents = () =>
  Promise.all(TAGGED_CONTENT_TYPES.map((type) => getContentList(type, { withMarkdown: true })))

const getTagsFromMeta = (content: TaggedContent) => content.meta.tags || []

const getTagsFromMarkdown = (content: TaggedContent) => {
  const tagLinks = content.markdown.match(/\(\/tags\/.+\)/g)
  return tagLinks ? tagLinks.map((tagLink) => tagLink.replace('(/tags/', '').replace(')', '')) : []
}

export const getAllTags = async () => {
  const contents = (await getAllTaggedContents()).flat() as TaggedContent[]
  const tags = new Set<string>()

  contents
    .map(getTagsFromMeta)
    .filter((tags) => tags.length)
    .flat()
    .forEach((tag) => (tags.has(tag) ? null : tags.add(tag)))

  contents
    .map(getTagsFromMarkdown)
    .filter((tags) => tags.length)
    .flat()
    .forEach((tag) => (tags.has(tag) ? null : tags.add(tag)))

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
}

export const getContentsByTag = async (tag: string) => {
  const contents = (await getAllTaggedContents()).flat() as TaggedContent[]

  return sortContentByDate(
    contents.filter((content) =>
      [...getTagsFromMeta(content), ...getTagsFromMarkdown(content)].includes(tag),
    ),
  )
}
