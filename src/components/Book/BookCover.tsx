import type { Book } from 'types'
import Image from 'next/image'
import { Box } from 'rebass'
import Blurhash from 'components/Blurhash'

type Props = {
  bookMeta: Book['meta']
  width?: number
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ bookMeta, width = MAX_WIDTH }) => (
  <Box
    sx={{ position: 'relative', overflow: 'hidden' }}
    className="border-radius"
    display="inline-block"
    width={width}
    height="auto"
  >
    <Blurhash value={bookMeta.coverImage.blurhash} />

    <Image
      className="border-radius"
      alt={bookMeta.title}
      src={bookMeta.coverImage.url}
      width={width}
      height={width / bookMeta.coverImage.aspectRatio}
      layout="responsive"
    />
  </Box>
)

export default BookCover
