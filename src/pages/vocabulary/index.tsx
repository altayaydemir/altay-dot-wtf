import type { InferGetStaticPropsType } from 'next'
import type { Vocabulary } from 'types'
import Markdown from 'components/Markdown'
import { getContentDetails } from 'core/api/content'
import PageHeader from 'components/PageHeader'

export const getStaticProps = async () => ({
  props: await getContentDetails<Vocabulary>('vocabulary', 'vocabulary'),
})

const VocabularyPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <PageHeader title="vocabulary" />
    <Markdown>{markdown}</Markdown>
  </>
)

export default VocabularyPage
