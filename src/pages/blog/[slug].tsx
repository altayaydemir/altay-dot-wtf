import type { InferGetStaticPropsType } from 'next'
import type { Post } from 'types'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import ContentTitle from 'components/ContentTitle'
import Tags from 'components/Tag/Tags'
import Markdown from 'components/Markdown'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import LinkedItems from 'components/LinkedItems'
import PostImage from 'components/Post/PostImage'

export const getStaticPaths = getStaticPathsForContent('post')
export const getStaticProps = getStaticPropsForContentDetails<Post>('post')

const PostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
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

      <PostImage alt={title} image={data.meta.metaImage} />

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

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default PostPage
