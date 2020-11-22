import { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import { Box, Heading } from 'rebass'
import { NextSeo } from 'next-seo'
import Markdown from 'components/Markdown'
import Tags from 'components/Tag/Tags'
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

      {data.meta.tags ? <Tags tags={data.meta.tags} /> : null}

      <Box m={2} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={6} />

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default NotePage
