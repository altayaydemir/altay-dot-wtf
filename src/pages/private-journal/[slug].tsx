import type { InferGetStaticPropsType } from 'next'
import type { Journal } from 'types'
import { Box, SxStyleProp } from 'rebass'
import { format } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('journal')
export const getStaticProps = getStaticPropsForContentDetails<Journal>('journal')

const sx: SxStyleProp = {
  '& > hr': {
    marginTop: 5,
    opacity: 0.1,
  },
}

const JournalDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader
        title={`journal`}
        description={`details from ${format(new Date(data.meta.date), 'MMMM yyyy')}`}
      />

      <Box m={4} />

      <Box sx={sx}>
        <Markdown>{data.markdown}</Markdown>
      </Box>

      <Box m={6} />
    </>
  )
}

export default JournalDetailPage
