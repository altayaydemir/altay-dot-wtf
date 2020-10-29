import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading, Box, Flex } from 'rebass'
import Link from '../../ui/Link'
import { getBookMeta, getSlugs } from '../../common/api'
import { sortByDate } from '../../common/utils'
import PageHeader from '../../ui/PageHeader'
import BookCover from '../../ui/BookCover'
import BookInfo from '../../ui/BookInfo'

export const getStaticProps = async () => {
  const slugs = getSlugs('book')
  const metas = await Promise.all(slugs.map(getBookMeta))
  const books = slugs.map((slug, i) => ({ slug, ...metas[i] }))

  return {
    props: {
      books: sortByDate(books),
    },
  }
}

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => (
  <>
    <PageHeader title="books" description="notes from the books I read recently." />

    <Box>
      {books.map((book) => (
        <Box key={book.slug} marginY={4}>
          <Flex>
            <NextLink href={`/books/${book.slug}`} passHref>
              <a>
                <BookCover bookMeta={book} width={96} />
              </a>
            </NextLink>

            <Box margin={2} />

            <Box>
              <NextLink href={`/books/${book}`} passHref>
                <Link>
                  <Heading fontSize={3}>{book.title}</Heading>
                </Link>
              </NextLink>

              <Box margin={2} />

              <BookInfo short bookMeta={book} fontSize={1} spacing={0} />
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  </>
)

export default BooksPage
