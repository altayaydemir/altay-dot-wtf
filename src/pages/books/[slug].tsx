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
import { useScrollToTag } from 'hooks/useScrollToTag'

export const getStaticPaths = getStaticPathsForContent('book')
export const getStaticProps = getStaticPropsForContentDetails<Book>('book')

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  useScrollToTag()

  if (!data) return null

  const seoTitle = `${data.meta.title} by ${data.meta.authors.join(', ')}`
  const seoDescription = `"${data.meta.oneliner}"`

  return (
    <>
      <Flex>
        <NextSeo
          title={seoTitle}
          description={seoDescription}
          openGraph={{
            title: seoTitle,
            description: seoDescription,
            images: [{ alt: seoTitle, ...data.meta.metaImage }],
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
    </>
  )
}

export default BookPage
