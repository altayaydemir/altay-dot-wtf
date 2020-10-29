import { Box, Text } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { BookMeta } from '../types'

type Props = {
  book: BookMeta
  short?: boolean
  spacing?: number | number[]
  fontSize?: number | number[]
}

const BookInfo: React.FC<Props> = ({ book, spacing, fontSize, short }) => {
  const info = [
    { key: 'written by', value: <b>{book.authors.join(', ')}</b> },
    {
      key: 'read',
      title: format(new Date(book.date), 'PPP'),
      value: formatDistanceToNow(new Date(book.date), { addSuffix: true }),
    },
    { key: 'how strongly I recommend it: ', value: <b>{book.rating}</b> },
    { key: 'ISBN: ', value: <code>{book.isbn}</code> },
  ]

  return (
    <Box>
      {info
        .filter((i) => (short ? !i.key.includes('ISBN') : true))
        .map((i) => (
          <Box key={i.key} marginY={spacing}>
            <Text title={i.title} sx={{ color: 'textCaption' }} fontSize={fontSize}>
              {i.key} {i.value}
            </Text>
          </Box>
        ))}
    </Box>
  )
}

export default BookInfo
