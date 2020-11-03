export type MetaImage = {
  url: string
  width: number
  height: number
}

export type BaseMeta = {
  private: boolean
  date: string
  tags: string[] | undefined
}

export type BaseContent = {
  slug: string
  markdown: string
  meta: BaseMeta
}

export type About = BaseContent & {
  type: 'about'
}

export type Now = BaseContent & {
  type: 'now'
}

export type Note = BaseContent & {
  type: 'note'
  meta: BaseMeta & {
    title: string
  }
}

export type Article = BaseContent & {
  type: 'article'
  meta: BaseMeta & {
    title: string
    oneliner: string
    metaImage: MetaImage | null
  }
}

export type Book = BaseContent & {
  type: 'book'
  meta: BaseMeta & {
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

export type Vocabulary = BaseContent & {
  type: 'vocabulary'
}

export type Content = Now | Note | Article | Book | About | Vocabulary
export type ContentType = Content['type']

export type TaggedContent = Note | Article | Book
export type TaggedContentType = TaggedContent['type']
