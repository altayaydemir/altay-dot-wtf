import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { Flex, Box, Heading } from 'rebass'
import {
  StaticPropsWithMarkdownContent,
  getStaticPathsFromSlugs,
  getMarkdownContentWithMeta,
  fetchBookMeta,
} from '../../common/api'
import { BookMeta } from '../../types'
import BookCover from '../../ui/BookCover'
import BookInfo from '../../ui/BookInfo'
import Markdown from '../../ui/Markdown'

export const getStaticPaths = getStaticPathsFromSlugs('books')
export const getStaticProps: GetStaticProps<
  StaticPropsWithMarkdownContent<BookMeta>,
  { slug: string }
> = async ({ params }) => {
  if (!params?.slug) {
    return { props: { meta: undefined, content: undefined } }
  }

  return {
    props: {
      meta: await fetchBookMeta(params.slug),
      content: getMarkdownContentWithMeta('books', params.slug).content,
    },
  }
}

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ meta, content }) => {
  if (!content || !meta) return <ErrorPage statusCode={404} />

  return (
    <>
      <Flex>
        <BookCover book={meta} />

        <Box margin={2} />

        <Box>
          <Heading>{meta.title}</Heading>
          <Box my={2} />
          <BookInfo book={meta} spacing={1} />
        </Box>
      </Flex>

      <Box margin={3} />

      <Markdown>{content}</Markdown>
    </>
  )
}

export default BookPage
