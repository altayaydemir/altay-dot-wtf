import { Box, Text, Link } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { VscLinkExternal } from 'react-icons/vsc'
import { Book } from 'types'

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
    { key: 'my rating: ', value: <b>{bookMeta.rating}</b> },
    {
      key: 'ISBN: ',
      value: (
        <Link
          title="Open Amazon page"
          href={`https://amazon.com/dp/${bookMeta.isbn}`}
          target="_blank"
          rel="noopener"
          color="textTertiary"
          fontSize={1}
        >
          <code>{bookMeta.isbn}</code>

          <Text display="inline" ml={1} fontSize={0}>
            <VscLinkExternal />
          </Text>
        </Link>
      ),
    },
  ]

  return (
    <Box>
      {info
        .filter((i) => (short ? !i.key.includes('ISBN') : true))
        .map((i) => (
          <Box key={i.key} sx={{ marginY: spacing }}>
            <Text title={i.title} color="textTertiary" fontSize={fontSize}>
              {i.key} {i.value}
            </Text>
          </Box>
        ))}
    </Box>
  )
}

export default BookInfo
