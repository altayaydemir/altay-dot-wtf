import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import { Box, Text } from 'rebass'
import { format } from 'date-fns'
import { getAllTags, getContentsByTag } from '../../common/api'
import { TaggedContent } from '../../types'
import PageHeader from '../../ui/PageHeader'
import Link from '../../ui/Link'

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

  return { props: { data: getContentsByTag(params.tag), tag: params.tag } }
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
    return `sorry, I couldn't find anything tagged with this.`
  }

  if (count === 1) {
    return `hmm, there is only one thing related to this.`
  }

  return `nice, there are ${count} things related to this.`
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

            <Text color="textCaption" fontSize={1}>
              {content.type} · written in {format(new Date(content.meta.date), 'PPP')}
            </Text>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default TagPage
