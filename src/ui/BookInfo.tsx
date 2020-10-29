import { Box, Text } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { Book } from '../types'

type Props = {
  bookMeta: Book['meta']
  short?: boolean
  spacing?: number | number[]
  fontSize?: number | number[]
}

const BookInfo: React.FC<Props> = ({ bookMeta, spacing, fontSize, short }) => {
  const info = [
    { key: 'written by', value: <b>{bookMeta.authors.join(', ')}</b> },
    {
      key: 'read',
      title: format(new Date(bookMeta.date), 'PPP'),
      value: formatDistanceToNow(new Date(bookMeta.date), { addSuffix: true }),
    },
    { key: 'how strongly I recommend it: ', value: <b>{bookMeta.rating}</b> },
    { key: 'ISBN: ', value: <code>{bookMeta.isbn}</code> },
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
