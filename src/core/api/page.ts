import type { GetStaticProps, GetStaticPaths } from 'next'
import { Content, ContentType, isTaggedContent } from 'types'
import { getMarkdownFileNames } from './fs'
import { getContentDetails, getContentList } from './content'
import { getLinksToContent } from './tags'

export const getStaticPathsForContent = (contentType: ContentType): GetStaticPaths => async () => {
  const data = await getContentList(contentType)

  return {
    paths: data.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

type ContentDetailsProps<T> = { data: T; links: Content[] } | { data: undefined; links: undefined }

export const getStaticPropsForContentDetails = <T extends Content>(
  contentType: ContentType,
): GetStaticProps<ContentDetailsProps<T>> => async ({ params }) => {
  const slug = getMarkdownFileNames(contentType).find((s) => s === params?.slug)

  if (!slug) return { props: { data: undefined, links: undefined } }

  const data = await getContentDetails<T>(contentType, slug)
  const links = isTaggedContent(data) ? await getLinksToContent(data) : []

  return {
    props: {
      data,
      links,
    },
  }
}

type ContentListProps<T> = { data: T[] }

export const getStaticPropsForContentList = <T extends Content>(
  contentType: ContentType,
): GetStaticProps<ContentListProps<T>> => async () => {
  const data = await getContentList<T>(contentType)

  return {
    props: {
      data,
    },
  }
}
