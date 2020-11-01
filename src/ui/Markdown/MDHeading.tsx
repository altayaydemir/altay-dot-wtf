import { Box } from 'rebass'
import { renderers } from 'react-markdown'

type Props = { level: number }

const MDHeading: React.FC<Props> = (props) => {
  const heading = renderers.heading as any
  const content = heading(props)

  if (props.level === 2) {
    return (
      <Box mt={4}>
        {content}
        <hr />
      </Box>
    )
  }

  return <Box mt={4}>{content}</Box>
}

export default MDHeading
