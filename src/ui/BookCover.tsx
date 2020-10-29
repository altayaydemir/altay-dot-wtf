import Image from 'next/image'
import { Box } from 'rebass'
import { BookMeta } from '../types'

type Props = {
  book: BookMeta
  width?: number
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ book, width = MAX_WIDTH }) => (
  <Box
    sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'border', backgroundColor: 'muted' }}
  >
    <Image
      alt={book.title}
      src={book.coverImageURL}
      width={width}
      height={width / book.coverImageAspectRatio}
    />
  </Box>
)

export default BookCover
