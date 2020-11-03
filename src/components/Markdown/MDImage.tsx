import { Box } from 'rebass'
import Image from 'next/image'
import { useTheme } from 'emotion-theming'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Theme } from '../../theme/create'

type Props = {
  alt: string
  src: string
}

const MDImage: React.FC<Props> = ({ src, alt }) => {
  const theme = useTheme<Theme>()

  return (
    <Box my={3}>
      <Zoom zoomMargin={96} overlayBgColorEnd={theme.colors.imageBackground}>
        <Image alt={alt} src={src} unsized className="image-lazy image-markdown" sizes="100%" />
      </Zoom>
    </Box>
  )
}

export default MDImage
