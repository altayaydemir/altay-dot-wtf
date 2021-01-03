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
  posts: {
    href: '/blog',
    title: 'Recent blog posts',
    viewAll: 'View all blog posts',
  },
  books: {
    href: '/book',
    title: 'Recent book notes',
    viewAll: 'View all book notes',
  },
} as const

export const aboutCopy = {
  icon: '👋',
  title: "Hi, I'm Altay",
}

export const blogCopy = {
  icon: '🥸',
  title: 'Blog',
  description: 'Learnings worth sharing.',
} as const

export const bookmarksCopy = {
  icon: '📑',
  title: 'Bookmarks',
  description: 'Cool things all over the interweb.',
}

export const booksCopy = {
  icon: '📚',
  title: 'Books',
  description:
    'Notes from the [books I read.](https://www.notion.so/altayaydemir/cd6811e25c5443c9a4a61d223b6d1f89?v=81827357d6064186860d2b10c90390fb)',
}

export const journalCopy = {
  icon: '📓',
  title: 'Journal',
  description: "What I've been doing, in detail.",
}

export const notesCopy = {
  icon: '📝',
  title: `Notes`,
  description: `Random thoughts and references.`,
}

export const nowCopy = {
  icon: '🕒',
  title: "What I'm doing now",
  description:
    "This is a [monthly](/now/history) updated [now page](https://nownownow.com), and it's inspired by [Derek Sivers.](https://sive.rs)",
}

export const nowHistoryCopy = {
  icon: '🗓',
  title: 'History',
  description: `What I've been doing`,
}

export const tagsCopy = {
  icon: '#️⃣',
  title: 'Tags',
}

export const vocabCopy = {
  icon: '📖',
  title: 'Vocabulary',
  description: 'Some interesting elements I came across while reading.',
}
