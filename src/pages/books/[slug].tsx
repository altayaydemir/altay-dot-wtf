import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { Flex, Box, Image, Heading, Text } from 'rebass'
import {
  StaticPropsWithMarkdownContent,
  getStaticPathsFromSlugs,
  getMarkdownContentWithMeta,
  fetchBookMeta,
} from '../../common/api'
import { BookMeta } from '../../types'
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
        <Box>
          <Image src={meta.coverImage} style={{ border: '1px solid #ddd' }} />
        </Box>

        <Box margin={2} />

        <Box>
          <Heading>{meta.title}</Heading>

          <Box my={2} />

          <Text>
            {meta.authors.length > 1 ? 'authors' : 'author'}: <b>{meta.authors.join(', ')}</b>
          </Text>

          <Box my={1} />

          <Text>
            date read: <b>{meta.date}</b>
          </Text>

          <Box my={1} />

          <Text>
            my rating: <b>{meta.rating}</b>
          </Text>

          <Box my={1} />

          <Text>
            ISBN:{' '}
            <Link
              href={`https://amazon.com/dp/${meta.isbn}`}
              target="_blank"
              title="Open Amazon Page"
            >
              <b>{meta.isbn}</b>
            </Link>
          </Text>
        </Box>
      </Flex>

      <Box margin={3} />

      <Markdown>{content}</Markdown>
    </>
  )
}

export default BookPage
