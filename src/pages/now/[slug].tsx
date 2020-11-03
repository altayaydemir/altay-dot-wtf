import { InferGetStaticPropsType } from 'next'
import { Box } from 'rebass'
import { format } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from '../../common/page'
import { Now } from '../../types'
import Markdown from '../../components/Markdown'
import PageHeader from '../../components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('now')
export const getStaticProps = getStaticPropsForContentDetails<Now>('now')

const NowArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader
        title={`history`}
        description={`what I was doing around ${format(new Date(data.meta.date), 'MMMM yyyy')}`}
      />

      <Box margin={4} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default NowArchivePage
