import type { InferGetStaticPropsType } from 'next'
import { getAllTags } from 'core/api/tags'
import Tags from 'components/Tag/Tags'
import PageHeader from 'components/PageHeader'
import { Box } from 'rebass'

export const getStaticProps = async () => ({
  props: { tags: await getAllTags() },
})

const TagsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tags }) => (
  <>
    <PageHeader title="tags" />
    <Box m={3} />
    <Tags tags={tags} fontSize={1} spacing={2} />
  </>
)

export default TagsPage
