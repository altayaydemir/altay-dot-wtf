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

export const HOME = {
  title: 'hi, my name is altay.',
  description: [
    `thanks for visiting my website.`,
    `I am a software engineer currently living in berlin.`,
    `I like building things that are solving problems I empathize with.`,
  ],
  links: [
    {
      label: 'more about me',
      href: '/about',
    },
    {
      label: 'what am I doing now',
      href: '/now',
    },
  ],
} as const
