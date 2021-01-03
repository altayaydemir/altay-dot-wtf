import { Box } from 'rebass'

type Props = {
  src: string
}

const MDVideo: React.FC<Props> = ({ src }) => (
  <Box my={3}>
    <video src={src} width="100%" controls style={{ borderRadius: 6 }} />
  </Box>
)

export default MDVideo
