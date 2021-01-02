import type { InferGetStaticPropsType } from 'next'
import type { Journal } from 'types'
import { Box } from 'rebass'
import { format } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'

export const getStaticPaths = getStaticPathsForContent('journal')
export const getStaticProps = getStaticPropsForContentDetails<Journal>('journal')

const JournalArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader
        icon="📓"
        title="Journal"
        description={`What I was doing around ${format(new Date(data.meta.date), 'MMMM yyyy')}`}
      />

      <Box m={4} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default JournalArchivePage
