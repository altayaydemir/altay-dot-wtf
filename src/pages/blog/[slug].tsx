import type { InferGetStaticPropsType } from 'next'
import type { BlogPost } from 'types'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import ContentTitle from 'components/ContentTitle'
import Tags from 'components/Tag/Tags'
import Markdown from 'components/Markdown'
import Feedback from 'components/Feedback'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import LinkedItems from 'components/LinkedItems'
import BlogPostImage from 'components/BlogPost/BlogPostImage'

export const getStaticPaths = getStaticPathsForContent('blog-post')
export const getStaticProps = getStaticPropsForContentDetails<BlogPost>('blog-post')

const BlogPostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
  links,
}) => {
  useScrollToSource()

  if (!data || !links) return null

  const title = data.meta.title
  const description = data.meta.oneliner

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [{ ...data.meta.metaImage, alt: title, url: SITE_URL + data.meta.metaImage.url }],
          type: 'article',
          article: {
            authors: ['Altay Aydemir'],
            modifiedTime: data.meta.date,
          },
        }}
      />

      <BlogPostImage alt={title} image={data.meta.metaImage} />

      <Box mb={4} />

      <ContentTitle tag="h1" fontSize={[3, 4]} fontWeight="800" meta={data.meta} />

      <Box my={2} />

      <Tags tags={data.meta.tags} />

      <Text fontSize={1} color="textTertiary" title={format(new Date(data.meta.date), 'PPP')}>
        {'updated '} {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })}
        <Box display="inline" mx={1}>
          ·
        </Box>
        {data.meta.readingTime}
      </Text>

      <Box m={3} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={4} />

      <Feedback />

      <Box m={4} />

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default BlogPostPage
