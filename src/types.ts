export type BasicMeta = {
  slug: string
  date: string
}

export type NowMeta = BasicMeta

export type ArticleMeta = BasicMeta & {
  title: string
}

export type MDBookMeta = BasicMeta & {
  isbn: string
  rating: string
}

export type BookMeta = MDBookMeta & {
  title: string
  coverImageURL: string
  coverImageAspectRatio: number
  authors: string[]
}
