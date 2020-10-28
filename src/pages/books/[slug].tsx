import { InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { getStaticPathsFromSlugs, getStaticPropsWithMarkdownContent } from '../../core/api'
import { BookMeta } from '../../core/types'

export const getStaticPaths = getStaticPathsFromSlugs('books')
export const getStaticProps = getStaticPropsWithMarkdownContent<BookMeta>('books')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
  content,
}) => {
  if (!content || !meta) return <ErrorPage statusCode={404} />

  return (
    <>
      {JSON.stringify(meta)}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

export default ArticlePage
