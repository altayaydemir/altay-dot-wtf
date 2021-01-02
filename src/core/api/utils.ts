import type { Content } from 'types'

export const sortContent = <Collection extends Content[]>(collection: Collection) =>
  collection.sort((a, b) => (Date.parse(a.meta.date) > Date.parse(b.meta.date) ? -1 : 1))
