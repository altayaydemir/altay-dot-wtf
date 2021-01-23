import type { Book } from 'types'
import NextLink from 'next/link'
import { Heading, Box, Flex, Text, Link } from 'rebass'
import BookCover from './BookCover'
import BookInfo from './BookInfo'

type Props = {
  data: Book[]
}

const BookList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((book) => (
      <Box key={book.slug} mb={4}>
        <Flex>
          <Box minWidth={[100, 120]}>
            <NextLink href={`/books/${book.slug}`} passHref>
              <a title={book.meta.title}>
                <BookCover bookMeta={book.meta} />
              </a>
            </NextLink>
          </Box>

          <Box m={2} />

          <Box>
            <NextLink href={`/books/${book.slug}`} passHref>
              <Link title={book.meta.title}>
                <Heading as="h3" fontSize={[1, 2]}>
                  {book.meta.title}
                </Heading>
              </Link>
            </NextLink>

            <Box my={1}>
              <BookInfo short bookMeta={book.meta} fontSize={0} spacing={1} />
            </Box>

            <Box my="12px" width="12%" height={1} backgroundColor="borderPrimary" />

            <Text fontSize={0} fontStyle="italic" color="textTertiary">
              &quot;{book.meta.oneliner}&quot;
            </Text>
          </Box>
        </Flex>
      </Box>
    ))}
  </Box>
)

export default BookList
