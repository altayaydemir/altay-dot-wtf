import { BaseMeta } from '../types'

export const sortByDate = <Collection extends BaseMeta[]>(collection: Collection) =>
  collection.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))
