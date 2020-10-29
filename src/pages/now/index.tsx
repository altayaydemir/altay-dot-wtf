import { InferGetStaticPropsType } from 'next'
import { Box, Text } from 'rebass'
import { format } from 'date-fns'

import { getSlugs, getMarkdownContentWithMeta } from '../../common/api'
import { NowMeta } from '../../types'
import Markdown from '../../ui/Markdown'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = async () => {
  const [latest, ...archiveItems] = getSlugs('now').reverse()
  const { content, meta } = getMarkdownContentWithMeta<NowMeta>('now', latest)

  return {
    props: {
      latest,
      meta,
      content,
      archiveItems: archiveItems,
    },
  }
}

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
  archiveItems,
  meta,
}) => {
  return (
    <>
      <PageHeader
        title="what am I doing now"
        description={`this is a [now page](https://nownownow.com) inspired from [Derek Sivers](https://sive.rs) as most of the things around here. I'm trying to update this page every month and keep the history.`}
      />

      <Box margin={4} />

      <Markdown>{content}</Markdown>

      <Box margin={4} />

      <Text fontSize={0}>Last updated at {format(new Date(meta.date), 'PPP')}</Text>

      {archiveItems.length > 1 ? (
        <>
          <h4>archive:</h4>

          <ul>
            {archiveItems.map((i) => (
              <li key={i}>
                <a href={`/now/${i}`}>{i}</a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  )
}

export default NowPage
