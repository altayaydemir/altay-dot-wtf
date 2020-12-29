import type { Post, Book } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useCallback } from 'react'
import { homeCopy } from 'config/copy'
import { Box, Heading } from 'rebass'
import { getContentList } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import HomeLink from 'components/Home/HomeLink'
import PostList from 'components/Post/PostList'
import BookList from 'components/Book/BookList'

type Sections = [
  {
    title: string
    type: 'posts'
    data: Post[]
  },
  {
    title: string
    type: 'books'
    data: Book[]
  },
]

export const getStaticProps: GetStaticProps<{ sections: Sections }> = async () => {
  const sections: Sections = [
    {
      title: homeCopy.postsTitle,
      type: 'posts',
      data: (await getContentList<Post>('post')).filter((post) => !post.meta.draft).slice(0, 5),
    },
    {
      title: homeCopy.booksTitle,
      type: 'books',
      data: (await getContentList<Book>('book')).slice(0, 5),
    },
  ]

  return { props: { sections } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ sections }) => {
  const renderSection = useCallback((section: Sections[number]) => {
    switch (section.type) {
      case 'posts':
        return (
          <>
            <Box my={2} />
            <PostList data={section.data} />
            <HomeLink label="view all blog posts" href="/blog" />
          </>
        )

      case 'books':
        return (
          <>
            <Box my={3} />
            <BookList data={section.data} />
            <HomeLink label="view all book notes" href="/books" />
          </>
        )
    }
  }, [])

  return (
    <>
      <PageHeader title={homeCopy.title} description={homeCopy.description} />

      <Box my={3}>
        {homeCopy.links.map((link) => (
          <HomeLink key={link.href} {...link} />
        ))}
      </Box>

      {sections.map((section) => (
        <Box key={section.title} my={5}>
          <Heading as="h2" fontSize={3}>
            {section.title}
          </Heading>

          {renderSection(section)}
        </Box>
      ))}
    </>
  )
}

export default Home
