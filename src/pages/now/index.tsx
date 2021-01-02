import type { InferGetStaticPropsType } from 'next'
import type { Now } from 'types'
import { Box, Text } from 'rebass'
import { format } from 'date-fns'
import { getMarkdownFileNames } from 'core/api/fs'
import { getContentDetails } from 'core/api/content'
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
        title="What I'm doing now"
        description={
          "This is a [monthly](/now/history) updated [now page](https://nownownow.com), and it's inspired by [Derek Sivers.](https://sive.rs)"
        }
        metaDescription={`What am I doing as of ${formattedDate}`}
      />

      <Box m={4} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={4} />

      <Text fontSize={0} color="textTertiary">
        Last updated at {formattedDate}
      </Text>
    </>
  )
}

export default NowPage
