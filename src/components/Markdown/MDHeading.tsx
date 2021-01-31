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
  '& > h1, h2': {
    marginTop: 5,
  },
  '& > h3, h4': {
    marginTop: 4,
  },
  '& > h5, h6': {
    margintop: 3,
  },
}

const MDHeading: React.FC<Props> = (props) => {
  const content = createElement('h' + props.level, { id: props.node.data.id }, props.children)
  return <Box sx={MDHeadingStyle}>{content}</Box>
}

export default MDHeading
