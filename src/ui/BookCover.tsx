import Image from 'next/image'
import { Box } from 'rebass'
import { Book } from '../types'

type Props = {
  bookMeta: Book['meta']
  width?: number
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ bookMeta, width = MAX_WIDTH }) => (
  <Box
    height="100%"
    sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'border', backgroundColor: 'muted' }}
  >
    <Image
      alt={bookMeta.title}
      src={bookMeta.coverImageURL}
      width={width}
      height={width / bookMeta.coverImageAspectRatio}
    />
  </Box>
)

export default BookCover
