import { Box, SxStyleProp } from 'rebass'
import { renderers } from 'react-markdown'

type Props = { level: number }

const MDHeadingStyle: SxStyleProp = {
  '& > h1, h2, h3, h4, h5, h6': {
    marginTop: 4,
  },
  '& > h3': {
    marginTop: 5,
  },
  '& > h2': {
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'borderPrimary',
  },
}

const MDHeading: React.FC<Props> = (props) => {
  const heading = renderers.heading as any
  const content = heading(props)
  return <Box sx={MDHeadingStyle}>{content}</Box>
}

export default MDHeading
