import { InferGetStaticPropsType } from 'next'
import type { PrivateNote } from 'types'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import { format } from 'date-fns'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticPaths = getStaticPathsForContent('private-note')
export const getStaticProps = getStaticPropsForContentDetails<PrivateNote>('private-note')

const PrivateNotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <PageHeader
        title={data.meta.title}
        description={`updated ${format(new Date(data.meta.date), 'PPP')}`}
      />

      <hr />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default PrivateNotePage
