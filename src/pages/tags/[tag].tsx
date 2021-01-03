import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import type { TaggedItem } from 'types'
import { Box } from 'rebass'
import { tagsCopy } from 'config/copy'
import { getAllTags, getTaggedItemsByTag } from 'core/api/tags'
import TaggedItems from 'components/Tag/TaggedItems'
import PageHeader from 'components/PageHeader'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getAllTags()).map((tag) => ({ params: { tag } })),
  fallback: false,
})

type TagContent = { tag: string; data: undefined } | { tag: string; data: TaggedItem[] }

export const getStaticProps: GetStaticProps<TagContent, { tag: string }> = async ({ params }) => {
  if (!params?.tag) {
    return { props: { data: undefined, tag: '' } }
  }

  return {
    props: {
      tag: params.tag,
      data: await getTaggedItemsByTag(params.tag),
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

  return (
    <>
      <PageHeader {...tagsCopy} title={tag} description={getDescription(data.length)} />
      <Box my={4} />
      <TaggedItems tag={tag} data={data} />
    </>
  )
}

export default TagPage
