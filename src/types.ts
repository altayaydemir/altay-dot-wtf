export type BaseMeta = {
  date: string
  tags: string[] | undefined
}

export type BaseContent = {
  slug: string
  markdown: string
}

export type About = BaseContent & {
  type: 'about'
  meta: undefined
}

export type Now = BaseContent & {
  type: 'now'
  meta: BaseMeta
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
    metaImage: {
      url: string
      width: number
      height: number
    }
    isbn: string
    rating: string
  }
}

export type Content = Now | Note | Article | Book | About
export type ContentType = Content['type']
export type TaggedContent = Note | Article | Book
