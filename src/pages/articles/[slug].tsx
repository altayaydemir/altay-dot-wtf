import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Heading, Text, Box } from 'rebass'
import { format, formatDistanceToNow } from 'date-fns'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from '../../common/page'
import { Article } from '../../types'
import Markdown from '../../ui/Markdown'
import Tags from '../../ui/Tags'
import { SITE_URL } from '../../config'

export const getStaticPaths = getStaticPathsForContent('article')
export const getStaticProps = getStaticPropsForContentDetails<Article>('article')

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

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
          images: data.meta.metaImage
            ? [{ ...data.meta.metaImage, alt: title, url: SITE_URL + data.meta.metaImage.url }]
            : [],
        }}
      />

      {data.meta.metaImage ? (
        <Box mb={4}>
          <Image
            className="image-markdown"
            alt={data.meta.title}
            src={data.meta.metaImage.url}
            width={data.meta.metaImage.width}
            height={data.meta.metaImage.height}
            priority={true}
          />
        </Box>
      ) : null}

      <Heading fontSize={[3, 4]} fontWeight="800">
        {title}
      </Heading>

      <Box my={2} />

      <Tags tags={data.meta.tags} />

      <Text fontSize={1} color="textTertiary" title={format(new Date(data.meta.date), 'PPP')}>
        Updated {formatDistanceToNow(new Date(data.meta.date), { addSuffix: true })}
      </Text>

      <Box my={3} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default ArticlePage
