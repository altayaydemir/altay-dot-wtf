import { createElement } from 'react'
import { Box, SxStyleProp } from 'rebass'

type Props = {
  level: number
  node: {
    type: 'heading'
    depth: number
    data: {
      id: string
    }
  }
}

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
  const content = createElement('h' + props.level, { id: props.node.data.id }, props.children)
  return <Box sx={MDHeadingStyle}>{content}</Box>
}

export default MDHeading
