import type { Article } from 'types'
import Image from 'next/image'
import { Box } from 'rebass'
import Blurhash from 'components/Blurhash'

type Props = {
  alt: string
  image: Article['meta']['metaImage']
}

const ArticleImage: React.FC<Props> = ({ alt, image }) => (
  <Box className="border-radius" sx={{ position: 'relative', overflow: 'hidden' }}>
    <Blurhash value={image.blurhash} />

    <Image
      className="border-radius"
      alt={alt}
      src={image.url}
      width={image.width}
      height={image.height}
      layout="responsive"
    />
  </Box>
)

export default ArticleImage
