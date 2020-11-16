import type { InferGetStaticPropsType } from 'next'
import type { BlogPost } from 'types'
import { blogCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import BlogPostList from 'components/BlogPost/BlogPostList'

export const getStaticProps = getStaticPropsForContentList<BlogPost>('blog-post')

const BlogPostsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={blogCopy.title} description={blogCopy.description} />
    <Box m={4} />
    <BlogPostList data={data} />
  </>
)

export default BlogPostsPage
