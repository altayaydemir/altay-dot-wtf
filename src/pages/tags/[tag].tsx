import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link, Heading } from 'rebass'
import { formatDistanceToNow } from 'date-fns'
import { getAllTags, getContent, getContentsByTag } from '../../common/api'
import { sortContentByDate } from '../../common/utils'
import { TaggedContent, Note } from '../../types'
import PageHeader from '../../ui/PageHeader'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllTags().map((tag) => ({ params: { tag } })),
  fallback: false,
})

type TagContent =
  | { tag: string; data: undefined }
  | { tag: string; data: { note: Note | null; items: TaggedContent[] } }

export const getStaticProps: GetStaticProps<TagContent, { tag: string }> = async ({ params }) => {
  if (!params?.tag) {
    return { props: { data: undefined, tag: '' } }
  }

  let note: Note | null = null
  try {
    note = getContent<Note>('note', params.tag)
  } catch (e) {
    /* no note for markdown, np 👍 */
  }

  return {
    props: {
      tag: params.tag,
      data: {
        note,
        items: sortContentByDate(getContentsByTag(params.tag)),
      },
    },
  }
}

const getURLForContentPage = (content: TaggedContent) => {
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
      <PageHeader
        title={`#${tag}`}
        description={data.note ? data.note.markdown : getDescription(data.items.length)}
      />

      <Box my={2} />

      <Box>
        {data.note ? (
          <Box mt={4} mb={2}>
            <Heading fontSize={3} color="textSecondary">
              mentioned in
            </Heading>
            <hr />
          </Box>
        ) : null}

        {data.items.map((content) => (
          <Box key={content.type + content.slug} mb={3}>
            <NextLink href={getURLForContentPage(content)} passHref>
              <Link>
                <Text fontSize={2} fontWeight="bold">
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
