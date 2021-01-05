import { Heading, Box, Text } from 'rebass'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Markdown from './Markdown'

type Props = {
  title: string
  icon?: string
  description?: string
  metaTitle?: string
  metaDescription?: string
}

const PageHeader: React.FC<Props> = ({ icon, title, metaTitle, description, metaDescription }) => {
  const seoTitle = metaTitle || title
  const seoDescription = metaDescription || description

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{ title: seoTitle, description: seoDescription }}
      />

      {icon ? (
        <Box width={64} height={64}>
          <Text fontSize={48}>{icon}</Text>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'black',
          }}
        >
          <Image src="/images/avatar.png" width={64} height={64} layout="responsive" />
        </Box>
      )}

      <Box mb={4} />

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
