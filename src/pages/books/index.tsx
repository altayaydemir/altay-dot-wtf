import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading, Box, Flex, Image, Text } from 'rebass'
import Link from '../../ui/Link'
import { fetchBookMeta, getSlugs } from '../../common/api'
import { sortByDate } from '../../common/utils'
import description from './description.md'
import Markdown from '../../ui/Markdown'

export const getStaticProps = async () => ({
  props: {
    books: sortByDate(await Promise.all(getSlugs('books').map(fetchBookMeta))),
  },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => (
  <>
    <Markdown>{description}</Markdown>

    <hr />

    <Box>
      {books.map((book) => (
        <Box key={book.slug} marginY={4}>
          <Flex>
            <NextLink href={`/books/${book.slug}`}>
              <Image
                src={book.coverImage}
                style={{ border: '1px solid #ddd', cursor: 'pointer' }}
                height={132}
              />
            </NextLink>

            <Box margin={2} />

            <Box>
              <NextLink href={`/books/${book.slug}`}>
                <Link>
                  <Heading fontSize={3}>{book.title}</Heading>
                </Link>
              </NextLink>

              <Box margin={2} />

              <Box>
                <Text fontSize={14}>
                  {book.authors.length > 1 ? 'authors' : 'author'}: <b>{book.authors.join(', ')}</b>
                </Text>

                <Text fontSize={14}>
                  date read: <b>{book.date}</b>
                </Text>

                <Text fontSize={14}>
                  my rating: <b>{book.rating}</b>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  </>
)

export default BooksPage
