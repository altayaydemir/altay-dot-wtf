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
            label: 'journal',
            href: '/private/journal',
          },
          {
            label: 'notes',
            href: '/private/notes',
          },
        ]
      : []),
  ],
} as const

export const FOOTER = {
  title: `me on the internets`,
  links: [
    {
      label: 'email',
      href: 'mailto:altay@aydemir.io',
    },
    {
      label: 'twitter',
      href: 'https://twitter.com/altayaydemir',
    },
    {
      label: 'github',
      href: 'https://github.com/altayaydemir',
    },
  ],
} as const
