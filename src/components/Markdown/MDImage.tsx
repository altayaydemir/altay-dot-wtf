import type { Theme } from 'theme'
import { Box } from 'rebass'
import Image from 'next/image'
import { useTheme } from 'emotion-theming'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  alt: string
  src: string
}

const MDImage: React.FC<Props> = ({ src, alt }) => {
  const theme = useTheme<Theme>()

  return (
    <Box my={3}>
      <Zoom zoomMargin={96} overlayBgColorEnd={theme.colors.imageZoomBackground}>
        <Box sx={{ position: 'relative', width: 640, height: 400 }}>
          <Image alt={alt} src={src} layout="fill" className="image-markdown" />
        </Box>
      </Zoom>
    </Box>
  )
}

export default MDImage
