import { InferGetStaticPropsType } from 'next'
import { getAllTags } from '../../common/api'
import Tags from '../../ui/Tags'

export const getStaticProps = async () => ({
  props: { tags: getAllTags() },
})

const TagsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tags }) => (
  <Tags tags={tags} fontSize={1} spacing={2} />
)

export default TagsPage
