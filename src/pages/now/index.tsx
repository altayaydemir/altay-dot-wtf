import { InferGetStaticPropsType } from 'next'
import { Box, Text } from 'rebass'
import { format } from 'date-fns'
import { getSlugs, getContent } from '../../common/api'
import { Now } from '../../types'
import Markdown from '../../ui/Markdown'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = async () => {
  const [latest] = getSlugs('now').reverse()
  const { markdown, meta } = getContent<Now>('now', latest)

  return {
    props: {
      latest,
      meta,
      markdown,
    },
  }
}

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown, meta }) => {
  const formattedDate = format(new Date(meta.date), 'PPP')

  return (
    <>
      <PageHeader
        title="what am I doing now"
        description={`this is a [now page](https://nownownow.com) inspired from [Derek Sivers](https://sive.rs) as most of the things around here. I'm trying to structure this page as monthly entries and keep the [history](/now/history).`}
        metaDescription={`what am I doing as of ${formattedDate}`}
      />

      <Box margin={4} />

      <Markdown>{markdown}</Markdown>

      <Box margin={4} />

      <Text fontSize={0} color="textTertiary">
        Last updated at {formattedDate}
      </Text>
    </>
  )
}

export default NowPage
