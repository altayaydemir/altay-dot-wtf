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
import BookInfoText from '../../ui/BookInfoText'
import Markdown from '../../ui/Markdown'
import Link from '../../ui/Link'

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

          <BookInfoText
            name={meta.authors.length > 1 ? 'authors' : 'author'}
            value={meta.authors.join(', ')}
          />

          <Box my={1} />

          <BookInfoText name="date read" value={meta.date} />

          <Box my={1} />

          <BookInfoText name="my rating" value={meta.rating} />

          <Box my={1} />

          <BookInfoText
            name="ISBN"
            value={
              <Link
                href={`https://amazon.com/dp/${meta.isbn}`}
                target="_blank"
                title="Open Amazon Page"
              >
                {meta.isbn}
              </Link>
            }
          />
        </Box>
      </Flex>

      <Box margin={3} />

      <Markdown>{content}</Markdown>
    </>
  )
}

export default BookPage
