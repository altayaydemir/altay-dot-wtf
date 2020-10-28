import { InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { Heading, Text } from 'rebass'
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

      <Text marginY={2} fontSize={14}>
        {meta.date}
      </Text>

      <Markdown>{content}</Markdown>
    </>
  )
}

export default ArticlePage
