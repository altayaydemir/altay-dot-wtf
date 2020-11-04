import { InferGetStaticPropsType } from 'next'
import { Box, SxStyleProp } from 'rebass'
import { format } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import type { Journal } from 'types'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('journal')
export const getStaticProps = getStaticPropsForContentDetails<Journal>('journal')

const sx: SxStyleProp = {
  '& > * ul': {
    marginY: 1,
    paddingY: 0,
  },
  '& > * li': {
    marginY: 0,
  },
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
        description={`what I've been doing in detail, from ${format(
          new Date(data.meta.date),
          'MMMM yyyy',
        )}`}
      />

      <Box margin={4} />

      <Box sx={sx}>
        <Markdown>{data.markdown}</Markdown>
      </Box>

      <Box margin={6} />
    </>
  )
}

export default JournalDetailPage
