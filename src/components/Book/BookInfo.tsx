import type { Book } from 'types'
import { Box, Text, Link } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { CgArrowTopRight } from 'react-icons/cg'
import StarRatingComponent from 'react-star-rating-component'

type Props = {
  bookMeta: Book['meta']
  short?: boolean
  spacing?: number | number[]
  fontSize?: number | number[]
}

const BookInfo: React.FC<Props> = ({ bookMeta, spacing, fontSize, short }) => {
  const info = [
    {
      key: 'date',
      component: (
        <Text
          title={format(new Date(bookMeta.date), 'PPP')}
          color="textTertiary"
          fontSize={fontSize}
        >
          Finished {formatDistanceToNow(new Date(bookMeta.date), { addSuffix: true })},
        </Text>
      ),
    },
    {
      key: 'rating',
      component: (
        <Box marginBottom={typeof spacing === 'number' ? -spacing : spacing?.map((s) => -s)}>
          <StarRatingComponent
            name="rating"
            value={parseInt(bookMeta.rating.split('/')[0], 10)}
            starCount={5}
            editing={false}
            starColor="#F7C744"
          />
        </Box>
      ),
    },
    {
      key: 'isbn',
      component: (
        <Link
          title="Open Open Library Page"
          href={`https://openlibrary.org/isbn/${bookMeta.isbn}`}
          target="_blank"
          rel="noopener"
          color="textTertiary"
          fontSize={fontSize}
        >
          <code>ISBN:{bookMeta.isbn}</code>

          <Text display="inline" fontSize={0}>
            <CgArrowTopRight />
          </Text>
        </Link>
      ),
    },
  ]

  return (
    <Box>
      {info
        .filter((i) => (short ? i.key !== 'isbn' : true))
        .map((i) => (
          <Box key={i.key} sx={{ marginY: spacing }}>
            {i.component}
          </Box>
        ))}
    </Box>
  )
}

export default BookInfo
