export type BasicMeta = {
  slug: string
  date: string
}

export type NowMeta = BasicMeta

export type ArticleMeta = BasicMeta & { title: string }

export type BookMeta = BasicMeta & {
  title: string
  ISBN: string
  coverImageURL: string
  author: string | string[]
}
