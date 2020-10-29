import { Box } from 'rebass'
import { renderers } from 'react-markdown'

type Props = {
  level: number
}

const MDHeading: React.FC<Props> = (props) => {
  const heading = renderers.heading as any

  if (props.level === 2) {
    return (
      <>
        {heading(props)}
        <hr />
      </>
    )
  }

  return (
    <>
      {heading(props)}
      <Box my={1} />
    </>
  )
}

export default MDHeading
