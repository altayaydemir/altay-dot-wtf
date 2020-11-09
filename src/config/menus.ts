import { SITE_TITLE } from './meta'
import { __DEV__ } from './env'

export const HEADER = {
  title: SITE_TITLE,
  links: [
    {
      label: 'about',
      href: '/about',
    },
    {
      label: 'now',
      href: '/now',
    },
    {
      label: 'writing',
      href: '/articles',
    },
    {
      label: 'reading',
      href: '/books',
    },
    {
      label: 'bookmarks',
      href: '/bookmarks',
    },
    ...(__DEV__
      ? [
          {
            label: 'notes',
            href: '/notes',
          },
          {
            label: 'tags',
            href: '/tags',
          },
          {
            label: 'j',
            href: '/private/journal',
          },
          {
            label: 'p',
            href: '/private/notes',
          },
        ]
      : []),
  ],
} as const
