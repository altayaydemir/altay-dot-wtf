import { InferGetStaticPropsType } from 'next'
import { Heading, Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsFromSlugs, getStaticPropsWithContent } from '../../common/api'
import { Article } from '../../types'
import Markdown from '../../ui/Markdown'

export const getStaticPaths = getStaticPathsFromSlugs('article')
export const getStaticProps = getStaticPropsWithContent<Article>('article')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <Heading>{data.meta.title}</Heading>

      <Box my={1} />

      <Text fontSize={1} color="textCaption">
        {format(new Date(data.meta.date), 'PPP')} (
        {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })})
      </Text>

      <Box my={3} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default ArticlePage
