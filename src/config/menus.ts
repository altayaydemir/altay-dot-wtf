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
      label: 'articles',
      href: '/articles',
    },
    {
      label: 'notes',
      href: '/notes',
    },
    {
      label: 'books',
      href: '/books',
    },
    {
      label: 'bookmarks',
      href: '/bookmarks',
    },
    ...(__DEV__
      ? [
          {
            label: 't',
            href: '/tags',
          },
          {
            label: 'j',
            href: '/private-journal',
          },
          {
            label: 'p',
            href: '/private-notes',
          },
          {
            label: 'v',
            href: '/vocabulary',
          },
        ]
      : []),
  ],
} as const
