import type { InferGetStaticPropsType } from 'next'
import type { Vocabulary } from 'types'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('vocabulary')
export const getStaticProps = getStaticPropsForContentDetails<Vocabulary>('vocabulary')

const VocabularyPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader title={data.slug} />
      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default VocabularyPage
