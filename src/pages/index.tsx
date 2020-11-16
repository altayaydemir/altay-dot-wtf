import type { BlogPost, Content } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Heading, Text, Link } from 'rebass'
import { CgArrowRight } from 'react-icons/cg'
import { getContentList } from 'core/api/content'
import BlogPostList from 'components/BlogPost/BlogPostList'
import PageHeader from 'components/PageHeader'

type HomeSection = {
  title: string
  data: Content[]
}

export const getStaticProps: GetStaticProps<{ sections: HomeSection[] }> = async () => {
  const blogPosts = await getContentList<BlogPost>('blog-post')
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
        <Box key={link.href}>
          <NextLink href={link.href} passHref>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center', mb: 1 }}>
                <Text mr={1}>{link.label}</Text>
                <CgArrowRight />
              </Box>
            </Link>
          </NextLink>
        </Box>
      ))}
    </Box>

    {sections.map((section) => (
      <Box key={section.title} my={5}>
        <Heading as="h3" fontSize={3}>
          {section.title}
        </Heading>

        <Box my={2} />

        <BlogPostList data={section.data as BlogPost[]} />
      </Box>
    ))}
  </>
)

export default Home
