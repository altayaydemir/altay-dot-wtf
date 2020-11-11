import { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import { Box, Heading, Text } from 'rebass'
import { NextSeo } from 'next-seo'
import Markdown from 'components/Markdown'
import Tags from 'components/Tag/Tags'
import { format, formatDistanceToNow } from 'date-fns'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import LinkedItems from 'components/LinkedItems'

export const getStaticPaths = getStaticPathsForContent('note')
export const getStaticProps = getStaticPropsForContentDetails<Note>('note')

const NotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
  useScrollToSource()

  if (!data || !links) return null

  return (
    <>
      <NextSeo title={data.meta.title} />

      <Heading fontSize={3} fontWeight="800">
        {data.meta.title}
      </Heading>

      <Box my={1} />

      <Text fontSize={1} color="textTertiary" title={format(new Date(data.meta.date), 'PPP')}>
        {'updated '} {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })}
      </Text>

      {data.meta.tags ? <Tags tags={data.meta.tags} /> : null}

      <Markdown>{data.markdown}</Markdown>

      <Box m={6} />

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default NotePage
