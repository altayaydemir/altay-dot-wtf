import { TaggedItem, TaggedContent, isTaggedContent, Bookmark, TAGGED_CONTENT_TYPES } from 'types'
import { getBookmarks } from './bookmarks'
import { getContentList } from './content'
import { sortContent } from './utils'

const getTaggedContents = async () => {
  const fetcher = TAGGED_CONTENT_TYPES.map((type) => getContentList(type, { withDetails: true }))
  const markdownContents = (await Promise.all(fetcher)).flat() as TaggedContent[]
  return sortContent(markdownContents)
}

const getTaggedBookmarks = (): Bookmark[] => {
  return getBookmarks().filter((b) => b.tags.length > 0)
}

const getTaggedItems = async (): Promise<TaggedItem[]> => {
  const taggedBookmarks = getTaggedBookmarks()
  const taggedContents = await getTaggedContents()
  return [...taggedContents, ...taggedBookmarks]
}

const getTagsFromMeta = (item: TaggedItem) => {
  if (isTaggedContent(item)) {
    return item.meta.tags || []
  }

  return []
}

const transformMarkdownTagLink = (tagLink: string) => {
  const extractedLink = tagLink.split('(/tags/')[1].split(')')[0]
  // `?target=blank`
  return extractedLink.includes('?') ? extractedLink.split('?')[0] : extractedLink
}

const getTagsFromMarkdown = (content: TaggedContent) => {
  const tagLinks = content.markdown.match(/\(\/tags\/[^)]*\)/g)
  return tagLinks ? tagLinks.map(transformMarkdownTagLink) : []
}

const getTaggedItemTags = (item: TaggedItem) => {
  if (isTaggedContent(item)) {
    const tagsFromMeta = getTagsFromMeta(item)
    const tagsFromMarkdown = getTagsFromMarkdown(item)
    return tagsFromMeta.concat(tagsFromMarkdown)
  }

  return item.tags
}

export const getAllTags = async () => {
  const items = await getTaggedItems()
  const tags = new Set<string>()

  items
    .map(getTaggedItemTags)
    .filter((tags) => tags.length)
    .flat()
    .forEach((tag) => !tags.has(tag) && tags.add(tag))

  return Array.from(tags).sort((a, b) => a.localeCompare(b))
}

export const getTaggedItemsByTag = async (tag: string) => {
  const taggedItems = await getTaggedItems()
  return taggedItems.filter((taggedItem) => getTaggedItemTags(taggedItem).includes(tag))
}

const getTargetContentLinkRegex = (content: TaggedContent) => {
  switch (content.type) {
    case 'blog-post':
      return `/blog/${content.slug}`
    case 'book':
      return `/books/${content.slug}`
    case 'note':
      return `/notes/${content.slug}`
    default:
      return '__'
  }
}

const getLinks = (source: TaggedContent, target: TaggedContent) => {
  const regex = getTargetContentLinkRegex(target)
  const linked = source.markdown.includes(regex)
  return linked
}

export const getLinksToContent = async (content: TaggedContent) => {
  const taggedContents = await getTaggedContents()
  return taggedContents.filter((c) => c.slug !== content.slug).filter((c) => getLinks(c, content))
}
