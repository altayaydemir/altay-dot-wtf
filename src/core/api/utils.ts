import { Content } from 'types'

export const sortContent = <Collection extends Content[]>(collection: Collection) => {
  return collection
    .sort((a, b) => (Date.parse(a.meta.date) > Date.parse(b.meta.date) ? -1 : 1))
    .sort((a, b) => {
      if (a.type === 'private-note' && b.type === 'private-note') {
        return a.meta.pinned ? -1 : 1
      }

      return 1
    })
}
