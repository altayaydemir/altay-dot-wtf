import { InferGetStaticPropsType } from 'next'
import { getAllTags } from 'core/api/tags'
import Tags from 'components/Tags'

export const getStaticProps = async () => ({
  props: { tags: await getAllTags() },
})

const TagsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tags }) => (
  <Tags tags={tags} fontSize={1} spacing={2} />
)

export default TagsPage
