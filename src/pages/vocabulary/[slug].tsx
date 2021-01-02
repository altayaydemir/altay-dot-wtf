import type { InferGetStaticPropsType } from 'next'
import type { Vocabulary } from 'types'
import { vocabCopy } from 'config/copy'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('vocabulary')
export const getStaticProps = getStaticPropsForContentDetails<Vocabulary>('vocabulary')

const VocabularyPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader {...vocabCopy} title={data.meta.title} />
      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default VocabularyPage
