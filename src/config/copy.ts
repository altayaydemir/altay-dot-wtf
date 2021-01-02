export const homeCopy = {
  title: "Hi, I'm Altay",
  description: 'Thanks for visiting my website.',
  links: [
    {
      label: 'More about me',
      href: '/about',
    },
    {
      label: 'What am I doing now',
      href: '/now',
    },
  ],
  postsTitle: 'Recent blog posts',
  booksTitle: 'Recent book notes',
} as const

export const blogCopy = {
  title: 'Blog',
  description: 'Learnings worth sharing.',
} as const

export const booksCopy = {
  title: 'Books',
  description:
    'Notes from the [books I read.](https://www.notion.so/altayaydemir/cd6811e25c5443c9a4a61d223b6d1f89?v=81827357d6064186860d2b10c90390fb)',
}
