import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import type { TaggedItem, Note } from 'types'
import { NextSeo } from 'next-seo'
import { Box, Heading } from 'rebass'
import { getContentDetails } from 'core/api/content'
import { getAllTags, getTaggedItemsByTag } from 'core/api/tags'
import Tags from 'components/Tag/Tags'
import TaggedItems from 'components/Tag/TaggedItems'
import Markdown from 'components/Markdown'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getAllTags()).map((tag) => ({ params: { tag } })),
  fallback: false,
})

type TagContent =
  | { tag: string; data: undefined }
  | { tag: string; data: { note: Note; items: TaggedItem[] } }

export const getStaticProps: GetStaticProps<TagContent, { tag: string }> = async ({ params }) => {
  if (!params?.tag) {
    return { props: { data: undefined, tag: '' } }
  }

  return {
    props: {
      tag: params.tag,
      data: {
        note: await getContentDetails<Note>('note', params.tag),
        items: await getTaggedItemsByTag(params.tag),
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

      {data.note.meta.tags ? <Tags tags={data.note.meta.tags} /> : null}

      <Box my={3} />

      <Markdown>{data.note.markdown ? data.note.markdown : description}</Markdown>

      {data.items.length ? (
        <Box>
          {data.note.markdown ? (
            <Box mt={6}>
              <Heading fontSize={3} color="textSecondary">
                mentioned in
              </Heading>
              <hr />
            </Box>
          ) : null}

          <TaggedItems data={data.items} />
        </Box>
      ) : null}
    </>
  )
}

export default TagPage
