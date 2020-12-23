import type { Article, Book } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useCallback } from 'react'
import { homeCopy } from 'config/copy'
import { Box, Heading } from 'rebass'
import { getContentList } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import HomeLink from 'components/Home/HomeLink'
import ArticleList from 'components/Article/ArticleList'
import BookList from 'components/Book/BookList'

type Sections = [
  {
    title: string
    type: 'articles'
    data: Article[]
  },
  {
    title: string
    type: 'books'
    data: Book[]
  },
]

export const getStaticProps: GetStaticProps<{ sections: Sections }> = async () => {
  const Articles = (await getContentList<Article>('article'))
    .filter((post) => !post.meta.draft)
    .slice(0, 5)

  const books = (await getContentList<Book>('book')).slice(0, 5)

  const sections: Sections = [
    {
      title: homeCopy.articlesTitle,
      type: 'articles',
      data: Articles,
    },
    {
      title: homeCopy.booksTitle,
      type: 'books',
      data: books,
    },
  ]

  return { props: { sections } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ sections }) => {
  const renderSection = useCallback((section: Sections[number]) => {
    switch (section.type) {
      case 'articles':
        return (
          <>
            <Box my={2} />
            <ArticleList data={section.data} />
            <HomeLink label="view all articles" href="/articles" />
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
