import { NextSeoProps } from 'next-seo'

export const HOSTNAME = `altay.wtf`
const title = `altay-dot-wtf`
const description = `hi, my name is altay and this is my website.`
const url = `https://${HOSTNAME}`

export const SEO: NextSeoProps = {
  title,
  description,
  twitter: {
    handle: '@altayaydemir',
    cardType: 'summary_large_image',
  },
  openGraph: {
    title,
    description,
    url,
    images: [
      {
        url: `${url}/og-image.jpg`,
        width: 1200,
        height: 628,
        alt: title,
      },
    ],
  },
} as const

export const HEADER = {
  title,
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
      href: 'mailto:altay.aydemir@icloud.com',
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
