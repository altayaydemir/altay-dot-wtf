import { InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { getStaticPathsFromSlugs, getStaticPropsWithMarkdownContent } from '../../core/api'

export const getStaticPaths = getStaticPathsFromSlugs('now')
export const getStaticProps = getStaticPropsWithMarkdownContent('now')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
  content,
}) => {
  if (!content) return <ErrorPage statusCode={404} />

  return (
    <>
      {JSON.stringify(meta)}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

export default ArticlePage
