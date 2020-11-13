import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Flex, Box } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import type { Book } from 'types'
import ContentTitle from 'components/ContentTitle'
import BookCover from 'components/Book/BookCover'
import BookInfo from 'components/Book/BookInfo'
import Markdown from 'components/Markdown'
import Tags from 'components/Tag/Tags'
import LinkedItems from 'components/LinkedItems'
import { useScrollToSource } from 'core/hooks/useScrollToSource'

export const getStaticPaths = getStaticPathsForContent('book')
export const getStaticProps = getStaticPropsForContentDetails<Book>('book')

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
  useScrollToSource()

  if (!data || !links) return null

  return (
    <>
      <Flex>
        <NextSeo
          title={data.meta.title}
          description={data.meta.oneliner}
          openGraph={{
            title: data.meta.title,
            description: data.meta.oneliner,
            images: [{ alt: data.meta.title, ...data.meta.metaImage }],
          }}
        />

        <BookCover bookMeta={data.meta} />

        <Box m={2} />

        <Box>
          <ContentTitle fontSize={[1, 2, 3]} fontWeight="800" meta={data.meta} />
          <Box my={2} />
          <BookInfo bookMeta={data.meta} spacing={[0, 1, 1]} fontSize={[0, 1]} />
          <Tags tags={data.meta.tags} />
        </Box>
      </Flex>

      <Box m={3} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={6} />

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default BookPage
