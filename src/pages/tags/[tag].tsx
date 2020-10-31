import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { formatDistanceToNow } from 'date-fns'
import { getAllTags, getContentsByTag } from '../../common/api'
import { sortContentByDate } from '../../common/utils'
import { TaggedContent } from '../../types'
import PageHeader from '../../ui/PageHeader'

type TaggedContentWithoutMarkdown = Omit<TaggedContent, 'markdown'>

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllTags().map((tag) => ({ params: { tag } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<
  { data: undefined; tag: string } | { data: TaggedContentWithoutMarkdown[]; tag: string },
  { tag: string }
> = async ({ params }) => {
  if (!params?.tag) {
    return { props: { data: undefined, tag: '' } }
  }

  return { props: { data: sortContentByDate(getContentsByTag(params.tag)), tag: params.tag } }
}

const getURLForContentPage = (content: TaggedContentWithoutMarkdown) => {
  switch (content.type) {
    case 'article':
      return `/articles/${content.slug}`

    case 'book':
      return `/books/${content.slug}`

    default:
      return '/'
  }
}

const getDescription = (count: number) => {
  if (count === 0) {
    return `sorry, I couldn't find anything tagged with that.`
  }

  if (count === 1) {
    return `there is only one thing related to that.`
  }

  return `there are ${count} things related to that.`
}

const TagPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, tag }) => {
  if (!data || !tag) return null

  return (
    <>
      <PageHeader title={`#${tag}`} description={getDescription(data.length)} />

      <Box>
        {data.map((content) => (
          <Box key={content.type + content.slug} my={4}>
            <NextLink href={getURLForContentPage(content)} passHref>
              <Link>
                <Text fontSize={3} fontWeight="bold">
                  {content.slug}
                </Text>
              </Link>
            </NextLink>

            <Box>
              <Text color="textSecondary" display="inline" fontSize={1}>
                {content.type}
              </Text>

              <Text color="textSecondary" display="inline-block" mx={1}>
                ·
              </Text>

              <Text color="textTertiary" display="inline" fontSize={1}>
                {'added '}
                {formatDistanceToNow(new Date(content.meta.date), { addSuffix: true })}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default TagPage
