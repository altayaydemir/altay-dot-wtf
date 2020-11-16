import type { InferGetStaticPropsType } from 'next'
import { getContentDetails } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import type { Note } from 'types'

export const getStaticProps = async () => ({
  props: await getContentDetails<Note>('note', 'notes'),
})

const NotesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <PageHeader title={`notes`} description={markdown} />
)

export default NotesPage
