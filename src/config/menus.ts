import { bookmarksCopy, notesCopy, contactCopy, vocabCopy } from './copy'

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
    title: bookmarksCopy.description,
    label: bookmarksCopy.title,
    href: '/bookmarks',
  },
  {
    title: notesCopy.description,
    label: notesCopy.title,
    href: '/notes',
  },
  {
    title: vocabCopy.description,
    label: vocabCopy.title,
    href: '/vocabulary',
  },
  {
    title: contactCopy.description,
    label: contactCopy.title,
    href: '/contact',
  },
  {
    title: 'Source code of this website',
    label: 'Source Code',
    href: 'https://github.com/altaywtf/altay-dot-wtf',
  },
] as const
