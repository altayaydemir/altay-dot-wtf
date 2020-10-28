import { Box, Heading } from 'rebass'
import Markdown from './Markdown'

type Props = {
  title: string
  description?: string
}

const PageHeader: React.FC<Props> = ({ title, description }) => (
  <>
    <Heading>{title}</Heading>
    <Box m={2} />
    {description ? <Markdown>{description}</Markdown> : null}
  </>
)

export default PageHeader
