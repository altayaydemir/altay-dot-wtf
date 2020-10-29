import { Box, Image } from 'rebass'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const MDImage: React.FC = (props) => (
  <Box>
    <Zoom zoomMargin={96} overlayBgColorEnd={'rgba(255, 255, 255, 0.75)'}>
      <Image {...props} />
    </Zoom>
  </Box>
)

export default MDImage
