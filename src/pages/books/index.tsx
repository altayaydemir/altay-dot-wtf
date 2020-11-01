import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading, Box, Flex, Text, Link } from 'rebass'
import { getStaticPropsForContentList } from '../../common/page'
import { Book } from '../../types'
import PageHeader from '../../ui/PageHeader'
import BookCover from '../../ui/Book/BookCover'
import BookInfo from '../../ui/Book/BookInfo'

export const getStaticProps = getStaticPropsForContentList<Book>('book')

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title="books" description="notes from the books I read recently." />

    <Box>
      {data.map((book) => (
        <Box key={book.slug} marginY={4}>
          <Flex>
            <NextLink href={`/books/${book.slug}`} passHref>
              <a title={book.meta.title}>
                <BookCover bookMeta={book.meta} width={120} />
              </a>
            </NextLink>

            <Box margin={2} />

            <Box>
              <NextLink href={`/books/${book.slug}`} passHref>
                <Link title={book.meta.title}>
                  <Heading fontSize={[1, 2]}>{book.meta.title}</Heading>
                </Link>
              </NextLink>

              <Box margin={1} />

              <BookInfo short bookMeta={book.meta} fontSize={[0, 1]} spacing={0} />

              <Box margin={1} />

              {book.meta.oneliner ? (
                <Box display="inline-block">
                  <hr style={{ width: '10%', marginLeft: 0, opacity: 0.5 }} />

                  <Text fontSize={[0, 1]} fontStyle="italic" color="textTertiary">
                    {book.meta.oneliner}
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
