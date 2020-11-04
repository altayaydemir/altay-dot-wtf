import { SITE_TITLE } from './meta'

export const HEADER = {
  title: SITE_TITLE,
  links:
    process.env.NODE_ENV === 'production'
      ? [
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
        ]
      : [
          {
            label: 'journal',
            href: '/private/journal',
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
            label: 'tags',
            href: '/tags',
          },
          {
            label: 'vocabulary',
            href: '/private/vocabulary',
          },
          {
            label: 'bookmarks',
            href: '/bookmarks',
          },
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
