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
      label: 'blog',
      href: '/blog',
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
            label: 'v',
            href: '/vocabulary',
          },
        ]
      : []),
  ],
} as const
