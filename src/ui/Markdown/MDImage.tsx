import { Box, Image } from 'rebass'
import { useTheme } from 'emotion-theming'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Theme } from '../theme/create'

const MDImage: React.FC = (props) => {
  const theme = useTheme<Theme>()

  return (
    <Box>
      <Zoom zoomMargin={96} overlayBgColorEnd={theme.colors.imageBackground}>
        <Image {...props} />
      </Zoom>
    </Box>
  )
}

export default MDImage
