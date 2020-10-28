import { InferGetStaticPropsType } from 'next'
import { Box, Text } from 'rebass'
import { getSlugs, getMarkdownContentWithMeta } from '../../common/api'
import { NowMeta } from '../../types'
import Markdown from '../../ui/Markdown'
import description from './description.md'

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
      <Markdown>{description}</Markdown>

      <Box margin={4} />

      <Markdown>{content}</Markdown>

      <Box margin={4} />

      <Text fontSize={12}>Last update: {meta.date}</Text>

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
