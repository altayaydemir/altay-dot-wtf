import { InferGetStaticPropsType } from 'next'
import ErrorPage from 'next/error'
import { getStaticPathsFromSlugs, getStaticPropsWithMarkdownContent } from '../../core/api'
import { Heading, Box } from 'rebass'
import { NowMeta } from '../../core/types'
import Markdown from '../../ui/Markdown'

export const getStaticPaths = getStaticPathsFromSlugs('now')
export const getStaticProps = getStaticPropsWithMarkdownContent<NowMeta>('now')

const NowArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
  content,
}) => {
  if (!content || !meta) return <ErrorPage statusCode={404} />

  return (
    <>
      <Heading>
        what I was doing around <code>{meta.slug}</code>
      </Heading>

      <Box width={1} margin={4} />

      <Markdown>{content}</Markdown>
    </>
  )
}

export default NowArchivePage
