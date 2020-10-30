import { Box, Heading } from 'rebass'
import { NextSeo } from 'next-seo'
import Markdown from './Markdown'

type Props = {
  title: string
  description?: string
  metaDescription?: string
}

const PageHeader: React.FC<Props> = ({ title, description, metaDescription }) => (
  <>
    {metaDescription || description ? (
      <NextSeo title={title} description={metaDescription || description} />
    ) : null}

    <Heading>{title}</Heading>
    <Box m={2} />
    {description ? <Markdown>{description}</Markdown> : null}
  </>
)

export default PageHeader
