import Image from 'next/image'
import { Box } from 'rebass'
import { Book } from '../../types'

type Props = {
  bookMeta: Book['meta']
  width?: number
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ bookMeta, width = MAX_WIDTH }) => (
  <Box display="inline-block">
    <Image
      className="image-lazy image-book-cover "
      alt={bookMeta.title}
      src={bookMeta.coverImage.url}
      width={width}
      height={width / bookMeta.coverImage.aspectRatio}
    />
  </Box>
)

export default BookCover
