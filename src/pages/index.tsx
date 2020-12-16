import type { BlogPost, Content } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import { Box, Heading } from 'rebass'
import { getContentList } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import HomeLink from 'components/Home/HomeLink'
import BlogPostList from 'components/BlogPost/BlogPostList'

type HomeSection = {
  title: string
  data: Content[]
}

export const getStaticProps: GetStaticProps<{ sections: HomeSection[] }> = async () => {
  const blogPosts = (await getContentList<BlogPost>('blog-post'))
    .filter((post) => !post.meta.draft)
    .slice(0, 5)

  const sections = [
    {
      title: homeCopy.blogPostsTitle,
      data: blogPosts,
    },
  ]

  return { props: { sections } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ sections }) => (
  <>
    <PageHeader title={homeCopy.title} description={homeCopy.description} />

    <Box my={3}>
      {homeCopy.links.map((link) => (
        <HomeLink key={link.href} {...link} />
      ))}
    </Box>

    {sections.map((section) => (
      <Box key={section.title} my={5}>
        <Heading as="h2" fontSize={3}>
          {section.title}
        </Heading>

        <Box my={2} />

        <BlogPostList data={section.data as BlogPost[]} />
        <HomeLink label="see all posts" href="/blog" />
      </Box>
    ))}
  </>
)

export default Home
