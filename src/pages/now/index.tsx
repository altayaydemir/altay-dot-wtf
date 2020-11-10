import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { getMarkdownFileNames } from 'core/api/fs'
import { getContentDetails } from 'core/api/content'
import type { Now } from 'types'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'

export const getStaticProps = async () => {
  const [latest] = getMarkdownFileNames('now').reverse()

  return {
    props: {
      data: await getContentDetails<Now>('now', latest),
    },
  }
}

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const formattedDate = format(new Date(data.meta.date), 'PPP')

  return (
    <>
      <PageHeader
        title="what am I doing now"
        description={`this is a [now page](https://nownownow.com), and it's inspired by [Derek Sivers.](https://sive.rs)`}
        metaDescription={`what am I doing as of ${formattedDate}`}
      />

      <Box m={4} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={4} />

      <Text fontSize={0} color="textTertiary">
        last updated at {formattedDate}
        <Box display="inline"> · </Box>
        <NextLink href={'/now/history'} passHref>
          <Link href={'/now/history'} color="textTertiary" fontSize={0}>
            history
          </Link>
        </NextLink>
      </Text>
    </>
  )
}

export default NowPage
