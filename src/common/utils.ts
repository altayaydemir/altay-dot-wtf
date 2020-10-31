import { BaseMeta, TaggedContent } from '../types'

export const sortMetaByDate = <Collection extends BaseMeta[]>(collection: Collection) =>
  collection.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))

export const sortContentByDate = <Collection extends TaggedContent[]>(collection: Collection) =>
  collection.sort((a, b) => (Date.parse(a.meta.date) > Date.parse(b.meta.date) ? -1 : 1))
