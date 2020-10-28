import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading, Box, Flex } from 'rebass'
import Link from '../../ui/Link'
import { fetchBookMeta, getSlugs } from '../../common/api'
import { sortByDate } from '../../common/utils'
import PageHeader from '../../ui/PageHeader'
import BookCover from '../../ui/BookCover'
import BookInfoText from '../../ui/BookInfoText'

export const getStaticProps = async () => ({
  props: {
    books: sortByDate(await Promise.all(getSlugs('books').map(fetchBookMeta))),
  },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => (
  <>
    <PageHeader
      title="books"
      description="list of the books I read recently, with my notes and thoughts"
    />

    <Box>
      {books.map((book) => (
        <Box key={book.slug} marginY={4}>
          <Flex>
            <NextLink href={`/books/${book.slug}`}>
              <a>
                <BookCover title={book.title} src={book.coverImage} height={132} />
              </a>
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
                <BookInfoText
                  name={book.authors.length > 1 ? 'authors' : 'author'}
                  value={book.authors.join(', ')}
                  fontSize={1}
                />
                <BookInfoText name="date read" value={book.date} fontSize={1} />
                <BookInfoText name="my rating" value={book.rating} fontSize={1} />
              </Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  </>
)

export default BooksPage
