import { InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { Heading, Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'

import { getStaticPathsFromSlugs, getStaticPropsWithMarkdownContent } from '../../common/api'
import { ArticleMeta } from '../../types'
import Markdown from '../../ui/Markdown'

export const getStaticPaths = getStaticPathsFromSlugs('articles')
export const getStaticProps = getStaticPropsWithMarkdownContent<ArticleMeta>('articles')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
  content,
}) => {
  if (!content || !meta) return <ErrorPage statusCode={404} />

  return (
    <>
      <Heading>{meta.title}</Heading>

      <Box my={1} />

      <Text fontSize={1} color="textCaption">
        {format(new Date(meta.date), 'PPP')} (
        {formatDistanceToNow(new Date(meta.date), { addSuffix: true })})
      </Text>

      <Box my={3} />

      <Markdown>{content}</Markdown>
    </>
  )
}

export default ArticlePage
