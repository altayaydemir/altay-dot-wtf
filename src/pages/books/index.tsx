import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading, Box, Flex, Text, Link } from 'rebass'
import { getBookMeta, getSlugs } from '../../common/api'
import { sortMetaByDate } from '../../common/utils'
import PageHeader from '../../ui/PageHeader'
import BookCover from '../../ui/Book/BookCover'
import BookInfo from '../../ui/Book/BookInfo'

export const getStaticProps = async () => {
  const slugs = getSlugs('book')
  const metas = await Promise.all(slugs.map(getBookMeta))
  const books = slugs.map((slug, i) => ({ slug, ...metas[i] }))

  return {
    props: {
      books: sortMetaByDate(books),
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
              <a title={book.title}>
                <BookCover bookMeta={book} width={120} />
              </a>
            </NextLink>

            <Box margin={2} />

            <Box>
              <NextLink href={`/books/${book.slug}`} passHref>
                <Link title={book.title}>
                  <Heading fontSize={[1, 2]}>{book.title}</Heading>
                </Link>
              </NextLink>

              <Box margin={1} />

              <BookInfo short bookMeta={book} fontSize={[0, 1]} spacing={0} />

              <Box margin={1} />

              {book.oneliner ? (
                <Box display="inline-block">
                  <hr style={{ width: '10%', marginLeft: 0, opacity: 0.5 }} />

                  <Text fontSize={[0, 1]} fontStyle="italic" color="textTertiary">
                    {book.oneliner}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  </>
)

export default BooksPage
