import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import { Box, Text, Link, Heading } from 'rebass'
import { formatDistanceToNow } from 'date-fns'
import { getContentDetails } from '../../common/content'
import { getAllTags, getContentsByTag } from '../../common/tags'
import { TaggedContent, Note } from '../../types'
import Tags from '../../ui/Tags'
import Markdown from '../../ui/Markdown'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getAllTags()).map((tag) => ({ params: { tag } })),
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
    note = await getContentDetails<Note>('note', params.tag)
  } catch (e) {
    /* no note for markdown, np 👍 */
  }

  return {
    props: {
      tag: params.tag,
      data: {
        note,
        items: await getContentsByTag(params.tag),
      },
    },
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

const getURLForContent = (content: TaggedContent) => {
  switch (content.type) {
    case 'article':
      return `/articles/${content.slug}`

    case 'book':
      return `/books/${content.slug}`

    default:
      return `/tags/${content.slug}`
  }
}

const getTitleForContent = (content: TaggedContent) => {
  switch (content.type) {
    case 'book':
      return `${content.meta.title} by ${content.meta.authors.join(', ')}`

    case 'note':
      return `#${content.slug}`

    default:
      return content.meta.title
  }
}

const TagPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, tag }) => {
  if (!data || !tag) return null

  const heading = `#${tag}`
  const description = getDescription(data.items.length)

  return (
    <>
      <NextSeo title={heading} description={description} />

      <Heading fontSize={3} fontWeight="800">
        {heading}
      </Heading>

      {data.note ? <Tags tags={data.note.meta.tags} /> : null}

      <Box my={2}>
        <Markdown>{data.note ? data.note.markdown : description}</Markdown>
      </Box>

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
            <NextLink href={getURLForContent(content)} passHref>
              <Link>
                <Text fontSize={2} fontWeight="bold">
                  {getTitleForContent(content)}
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
