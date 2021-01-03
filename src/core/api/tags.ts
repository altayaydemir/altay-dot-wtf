import { TaggedItem, TAGGED_ITEM_TYPES } from 'types'
import { getContentList } from './content'
import { sortContent } from './utils'

const getTaggedItems = async () => {
  const fetcher = TAGGED_ITEM_TYPES.map((type) => getContentList(type, { withDetails: true }))
  const markdownContents = (await Promise.all(fetcher)).flat() as TaggedItem[]
  return sortContent(markdownContents)
}

const getTagsFromMeta = (item: TaggedItem) => item.meta.tags || []

const transformMarkdownTagLink = (tagLink: string) => {
  const extractedLink = tagLink.split('(/tags/')[1].split(')')[0]
  // `?target=blank`
  return extractedLink.includes('?') ? extractedLink.split('?')[0] : extractedLink
}

const getTagsFromMarkdown = (content: TaggedItem) => {
  const tagLinks = content.markdown.match(/\(\/tags\/[^)]*\)/g)
  return tagLinks ? tagLinks.map(transformMarkdownTagLink) : []
}

const getTaggedItemTags = (item: TaggedItem) => {
  const tagsFromMeta = getTagsFromMeta(item)
  const tagsFromMarkdown = getTagsFromMarkdown(item)
  return tagsFromMeta.concat(tagsFromMarkdown)
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

const getTargetContentLinkRegex = (content: TaggedItem) => {
  switch (content.type) {
    case 'post':
      return `/blog/${content.slug}`
    case 'book':
      return `/books/${content.slug}`
    case 'note':
      return `/notes/${content.slug}`
    default:
      return '__'
  }
}

const getLinks = (source: TaggedItem, target: TaggedItem) => {
  const regex = getTargetContentLinkRegex(target)
  const linked = source.markdown.includes(regex)
  return linked
}

export const getLinksToContent = async (content: TaggedItem) => {
  const items = await getTaggedItems()
  return items
    .filter((c) => c.slug !== content.slug)
    .filter((c) => getLinks(c, content))
    .sort((a, b) => {
      if (a.type === b.type) return a.slug > b.slug ? 1 : -1

      switch (b.type) {
        case 'book':
          return 1

        case 'post':
          return 0

        case 'note':
          return -1
      }
    })
}
