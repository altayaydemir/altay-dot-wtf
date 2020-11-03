import { InferGetStaticPropsType } from 'next'
import { Box, Text } from 'rebass'
import { format } from 'date-fns'
import { getMarkdownFileNames } from 'core/api/fs'
import { getContentDetails } from 'core/api/content'
import { Now } from 'types'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

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
        description={`this is a [now page](https://nownownow.com) inspired from [Derek Sivers](https://sive.rs) as most of the things around here. I'm trying to structure this page as monthly entries and keep the [history](/now/history).`}
        metaDescription={`what am I doing as of ${formattedDate}`}
      />

      <Box margin={4} />

      <Markdown>{data.markdown}</Markdown>

      <Box margin={4} />

      <Text fontSize={0} color="textTertiary">
        Last updated at {formattedDate}
      </Text>
    </>
  )
}

export default NowPage
