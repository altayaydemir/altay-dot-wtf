import type { Book } from 'types'
import Image from 'next/image'
import { Box } from 'rebass'
import Blurhash from 'components/Blurhash'

type Props = {
  bookMeta: Book['meta']
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ bookMeta }) => (
  <Box sx={{ position: 'relative', overflow: 'hidden' }} className="border-radius">
    <Blurhash value={bookMeta.coverImage.blurhash} />

    <Image
      alt={bookMeta.title}
      src={bookMeta.coverImage.url}
      width={MAX_WIDTH}
      height={MAX_WIDTH / bookMeta.coverImage.aspectRatio}
      layout="responsive"
    />
  </Box>
)

export default BookCover
