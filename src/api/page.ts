import { GetStaticProps, GetStaticPaths } from 'next'
import { Content, ContentType } from 'types'
import { getMarkdownFileNames } from './fs'
import { getContentDetails, getContentList } from './content'
import { sortContentByDate } from './utils'

export const getStaticPathsForContent = (contentType: ContentType): GetStaticPaths => async () => {
  const data = await getContentList(contentType)

  return {
    paths: data.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

type ContentDetailsProps<T> = { data: T } | { data: undefined }

export const getStaticPropsForContentDetails = <T extends Content>(
  contentType: ContentType,
): GetStaticProps<ContentDetailsProps<T>> => async ({ params }) => {
  const slug = getMarkdownFileNames(contentType).find((s) => s === params?.slug)

  if (!slug) return { props: { data: undefined } }

  return {
    props: {
      data: await getContentDetails<T>(contentType, slug),
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
      data: sortContentByDate(data),
    },
  }
}
