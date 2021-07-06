import { bookmarksCopy, contactCopy } from './copy'

export const HEADER = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Now',
    href: '/now',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Books',
    href: '/books',
  },
] as const

export const FOOTER = [
  {
    title: contactCopy.description,
    label: contactCopy.title,
    href: '/contact',
  },
  {
    title: bookmarksCopy.description,
    label: bookmarksCopy.title,
    href: '/bookmarks',
  },
  {
    title: 'Source code of this website',
    label: 'Source',
    href: 'https://github.com/altaywtf/altay-dot-wtf',
  },
] as const
