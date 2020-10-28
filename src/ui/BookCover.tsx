import Image from 'next/image'
import { Box } from 'rebass'
import { useCallback, useState } from 'react'

type Props = {
  title: string
  src: string
  width?: number
}

const MAX_WIDTH = 144
const RATIO = 0.66

const BookCover: React.FC<Props> = ({ title, src, width = MAX_WIDTH }) => {
  const [ratio, setRatio] = useState(RATIO)

  const onLoad = useCallback(
    (e) => {
      setRatio(e.target.naturalWidth / e.target.naturalHeight)
    },
    [setRatio],
  )

  return (
    <Box sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'border' }}>
      <Image alt={title} src={src} height={width / ratio} width={width} onLoad={onLoad} />
    </Box>
  )
}

export default BookCover
