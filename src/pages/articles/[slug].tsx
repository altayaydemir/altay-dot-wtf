import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsFromSlugs, getStaticPropsWithContent } from '../../common/api'
import { Article } from '../../types'
import Markdown from '../../ui/Markdown'
import Tags from '../../ui/Tags'

export const getStaticPaths = getStaticPathsFromSlugs('article')
export const getStaticProps = getStaticPropsWithContent<Article>('article')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  const title = data.meta.title
  const description = data.meta.oneliner

  return (
    <>
      <NextSeo title={title} description={description} openGraph={{ title, description }} />

      <Heading fontSize={[3, 4]}>{title}</Heading>

      <Box my={1} />

      <Text fontSize={1} color="textTertiary">
        {format(new Date(data.meta.date), 'PPP')} (
        {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })})
      </Text>

      <Tags tags={data.meta.tags} />

      <Box my={3} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default ArticlePage
