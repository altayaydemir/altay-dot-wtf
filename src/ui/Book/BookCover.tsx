import Image from 'next/image'
import { Box } from 'rebass'
import { Book } from '../../types'

type Props = {
  bookMeta: Book['meta']
  width?: number
}

const MAX_WIDTH = 144
const BORDER_WIDTH = 1

const BookCover: React.FC<Props> = ({ bookMeta, width = MAX_WIDTH }) => (
  <Box
    height={(width / (bookMeta.coverImage.aspectRatio + BORDER_WIDTH)) * 2}
    sx={{
      display: 'inline-block',
      borderWidth: BORDER_WIDTH,
      borderStyle: 'solid',
      borderColor: 'borderPrimary',
      backgroundColor: 'backgroundSecondary',
    }}
  >
    <Image
      alt={bookMeta.title}
      src={bookMeta.coverImage.url}
      width={width}
      height={width / bookMeta.coverImage.aspectRatio}
    />
  </Box>
)

export default BookCover
