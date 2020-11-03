import { NextSeoProps } from 'next-seo'

export const HOSTNAME = `altay.wtf`
export const SITE_TITLE = `altay-dot-wtf`
export const SITE_DESCRIPTION = `hi, my name is altay and this is my website.`
export const SITE_URL = `https://${HOSTNAME}`

export const META_IMAGE_WIDTH = 1200
export const META_IMAGE_HEIGHT = 628
export const DEFAULT_IMETA_IMAGE_PATH = '/images/meta/main.jpg'

export const SEO: NextSeoProps = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  twitter: {
    handle: '@altayaydemir',
    cardType: 'summary_large_image',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: SITE_URL + DEFAULT_IMETA_IMAGE_PATH,
        width: META_IMAGE_WIDTH,
        height: META_IMAGE_HEIGHT,
        alt: SITE_TITLE,
      },
    ],
  },
} as const

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
        ]
      : [
          {
            label: 'about',
            href: '/about',
          },
          {
            label: 'now',
            href: '/now',
          },
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
