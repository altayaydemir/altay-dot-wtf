import { Box } from 'rebass'

type Props = {
  src: string
}

const MDVideo: React.FC<Props> = ({ src }) => (
  <Box my={3}>
    <video src={src} width="100%" controls style={{ borderRadius: 8 }} />
  </Box>
)

export default MDVideo
