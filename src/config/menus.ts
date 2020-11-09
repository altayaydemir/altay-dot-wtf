import { SITE_TITLE } from './meta'

const __DEV__ = process.env.NODE_ENV === 'development'

export const HEADER = {
  title: __DEV__ ? 'a.' : SITE_TITLE,
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
