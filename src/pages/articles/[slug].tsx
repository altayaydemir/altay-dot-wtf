import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from '../../common/page'
import { Article } from '../../types'
import Markdown from '../../ui/Markdown'
import Tags from '../../ui/Tags'

export const getStaticPaths = getStaticPathsForContent('article')
export const getStaticProps = getStaticPropsForContentDetails<Article>('article')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  const title = data.meta.title
  const description = data.meta.oneliner

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ title, description }} />

      <Heading fontSize={[3, 4]}>{title}</Heading>

      <Box my={2} />

      <Text fontSize={1} color="textTertiary">
        {format(new Date(data.meta.date), 'PPP')} (
        {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })})
      </Text>

      <Tags tags={data.meta.tags} />

      <Box my={2} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default ArticlePage
