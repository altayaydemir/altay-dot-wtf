import { Box } from 'rebass'
import { renderers } from 'react-markdown'

type Props = {
  level: number
}

const MDHeading: React.FC<Props> = (props) => {
  const heading = renderers.heading as any

  if (props.level === 2) {
    return (
      <Box mt={4}>
        {heading(props)}
        <hr />
      </Box>
    )
  }

  return <Box>{heading(props)}</Box>
}

export default MDHeading
