import { booksCopy } from 'config/copy'
import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Box, Flex, Text, Link } from 'rebass'
import { getStaticPropsForContentList } from 'core/api/page'
import type { Book } from 'types'
import PageHeader from 'components/PageHeader'
import ContentTitle from 'components/ContentTitle'
import BookCover from 'components/Book/BookCover'
import BookInfo from 'components/Book/BookInfo'

export const getStaticProps = getStaticPropsForContentList<Book>('book')

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={booksCopy.title} description={booksCopy.description} />

    <Box>
      {data.map((book) => (
        <Box key={book.slug} my={4}>
          <Flex>
            <NextLink href={`/books/${book.slug}`} passHref>
              <a title={book.meta.title}>
                <BookCover bookMeta={book.meta} width={120} />
              </a>
            </NextLink>

            <Box m={2} />

            <Box>
              <NextLink href={`/books/${book.slug}`} passHref>
                <Link title={book.meta.title}>
                  <ContentTitle fontSize={[1, 2]} meta={book.meta} />
                </Link>
              </NextLink>

              <Box m={1} />

              <BookInfo short bookMeta={book.meta} fontSize={[0, 1]} spacing={0} />

              <Box m={1} />

              {book.meta.oneliner ? (
                <Box display="inline-block">
                  <hr style={{ width: '10%', marginLeft: 0 }} />

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
