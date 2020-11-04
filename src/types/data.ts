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

export type Note = BaseMDContent & {
  type: 'note'
  meta: BaseMDMeta & {
    title: string
  }
}

export type Article = BaseMDContent & {
  type: 'article'
  meta: BaseMDMeta & {
    title: string
    oneliner: string
    metaImage: MetaImage | null
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

export type Vocabulary = BaseMDContent & {
  type: 'vocabulary'
}

export type BoookmarkJSON = {
  url: string
  title: string
  description?: string
}

export type Bookmark = {
  type: 'bookmark'
  slug: string
  meta: BaseMeta & BoookmarkJSON
}

export type Content = Now | Note | Article | Book | About | Vocabulary | Journal | Bookmark
export type ContentType = Content['type']

export type TaggedContent = Note | Article | Book
export type TaggedContentType = TaggedContent['type']
