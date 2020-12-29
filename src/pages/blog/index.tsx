import type { InferGetStaticPropsType } from 'next'
import type { Post } from 'types'
import { blogCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import PostList from 'components/Post/PostList'

export const getStaticProps = getStaticPropsForContentList<Post>('post')

const PostsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={blogCopy.title} description={blogCopy.description} />
    <Box m={4} />
    <PostList data={data} />
  </>
)

export default PostsPage
