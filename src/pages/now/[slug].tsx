import { InferGetStaticPropsType } from 'next'
import { Box } from 'rebass'
import { format } from 'date-fns'
import { getStaticPathsFromSlugs, getStaticPropsWithContent } from '../../common/api'
import { Now } from '../../types'
import Markdown from '../../ui/Markdown'
import PageHeader from '../../ui/PageHeader'

export const getStaticPaths = getStaticPathsFromSlugs('now')
export const getStaticProps = getStaticPropsWithContent<Now>('now')

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
