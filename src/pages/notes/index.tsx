import type { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { notesCopy } from 'config/copy'
import { getContentDetails } from 'core/api/content'
import PageHeader from 'components/PageHeader'

export const getStaticProps = async () => ({
  props: await getContentDetails<Note>('note', 'notes'),
})

const NotesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <PageHeader {...notesCopy} description={markdown} />
)

export default NotesPage
