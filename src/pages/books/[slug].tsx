import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import type { Book } from 'types'
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
      <NextSeo
        title={data.meta.title}
        description={data.meta.oneliner}
        openGraph={{
          title: data.meta.title,
          description: data.meta.oneliner,
          images: [{ alt: data.meta.title, ...data.meta.metaImage }],
        }}
      />

      <Flex>
        <Box minWidth={[120, 140]}>
          <BookCover bookMeta={data.meta} />
        </Box>

        <Box m={2} />

        <Box>
          <Heading as="h1" fontSize={3}>
            {data.meta.title}
          </Heading>
          <Box my={2} />
          <BookInfo bookMeta={data.meta} spacing={[0, 1, 1]} fontSize={0} />
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
