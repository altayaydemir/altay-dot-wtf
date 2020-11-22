import { Heading, Text } from 'rebass'
import { NextSeo } from 'next-seo'
import Markdown from './Markdown'

type Props = {
  title: string
  description?: string
  metaTitle?: string
  metaDescription?: string
}

const PageHeader: React.FC<Props> = ({ title, metaTitle, description, metaDescription }) => {
  const seoTitle = metaTitle || title
  const seoDescription = metaDescription || description

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{ title: seoTitle, description: seoDescription }}
      />

      <Heading as="h1" fontSize={3}>
        {title}
      </Heading>

      {description ? (
        <Text fontSize={[1, 2]} sx={{ div: { color: 'textTertiary' } }}>
          <Markdown>{description}</Markdown>
        </Text>
      ) : null}
    </>
  )
}

export default PageHeader
