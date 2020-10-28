import Image from 'next/image'
import { Box } from 'rebass'

type Props = {
  title: string
  src: string
  height?: number
}

export const MAX_HEIGHT = 193
const RATIO = 0.66

const BookCover: React.FC<Props> = ({ title, src, height = MAX_HEIGHT }) => {
  return (
    <Box sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'border' }}>
      <Image alt={title} src={src} height={height} width={height * RATIO} />
    </Box>
  )
}

export default BookCover
