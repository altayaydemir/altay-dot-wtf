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
      label: 'articles',
      href: '/articles',
    },
    {
      label: 'books',
      href: '/books',
    },
    {
      label: 'notes',
      href: '/notes',
    },
    {
      label: 'bookmarks',
      href: '/bookmarks',
    },
    ...(__DEV__
      ? [
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
