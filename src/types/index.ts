export type MetaImage = {
  url: string
  width: number
  height: number
}

export type BaseMeta = {
  tags: string[] | undefined
  draft: boolean
  date: string
}

export type BaseMDMeta = BaseMeta

export type BaseMDContent = {
  slug: string
  markdown: string
  meta: BaseMDMeta
}

export type About = BaseMDContent & {
  type: 'about'
}

export type Now = BaseMDContent & {
  type: 'now'
}

export type Journal = BaseMDContent & {
  type: 'journal'
}

export type Vocabulary = BaseMDContent & {
  type: 'vocabulary'
}

export type Note = BaseMDContent & {
  type: 'note'
  meta: BaseMDMeta & {
    title: string
  }
}

export type PrivateNote = BaseMDContent & {
  type: 'private-note'
  meta: BaseMDMeta & {
    pinned: boolean
    title: string
  }
}

export type Article = BaseMDContent & {
  type: 'article'
  meta: BaseMDMeta & {
    title: string
    oneliner: string
    metaImage: MetaImage | null
    readingTime: string
  }
}

export type Book = BaseMDContent & {
  type: 'book'
  meta: BaseMDMeta & {
    title: string
    oneliner: string
    authors: string[]
    coverImage: {
      url: string
      aspectRatio: number
    }
    metaImage: MetaImage
    isbn: string
    rating: string
  }
}

export type BookmarkJSON = {
  url: string
  title: string
  description?: string
  tags?: string[]
}

export type Bookmark = BookmarkJSON & {
  type: 'bookmark'
  host: string
  tags: string[]
}

export type Content = Now | Note | Article | Book | About | PrivateNote | Journal | Vocabulary
export type ContentType = Content['type']

export type TaggedContent = Note | Article | Book
export const TAGGED_CONTENT_TYPES: TaggedContent['type'][] = ['article', 'book', 'note']

export type TaggedItem = TaggedContent | Bookmark
export type TaggedItemType = TaggedItem['type']

export const isTaggedContent = (taggedItem: TaggedItem | Content): taggedItem is TaggedContent => {
  return (TAGGED_CONTENT_TYPES as string[]).includes(taggedItem.type)
}
