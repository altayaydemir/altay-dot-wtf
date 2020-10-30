import { InferGetStaticPropsType } from 'next'
import { Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsFromSlugs, getStaticPropsWithContent } from '../../common/api'
import { Now } from '../../types'
import Markdown from '../../ui/Markdown'
import PageHeader from '../../ui/PageHeader'

export const getStaticPaths = getStaticPathsFromSlugs('now')
export const getStaticProps = getStaticPropsWithContent<Now>('now')

const NowArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  const formattedDate = format(new Date(data.meta.date), 'MMMM yyyy')
  const relativeDate = formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })

  return (
    <>
      <PageHeader
        title="what I was doing around"
        description={`${formattedDate} (${relativeDate})`}
        metaDescription={`what I was doing around ${formattedDate}`}
      />
      <Box margin={4} />
      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default NowArchivePage
