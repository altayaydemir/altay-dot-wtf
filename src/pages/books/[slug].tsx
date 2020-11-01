import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from '../../common/page'
import { Book } from '../../types'
import BookCover from '../../ui/Book/BookCover'
import BookInfo from '../../ui/Book/BookInfo'
import Markdown from '../../ui/Markdown'
import Tags from '../../ui/Tags'

export const getStaticPaths = getStaticPathsForContent('book')
export const getStaticProps = getStaticPropsForContentDetails<Book>('book')

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
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

        <Box margin={2} />

        <Box>
          <Heading fontSize={[1, 2, 3]}>{data.meta.title}</Heading>
          <Box my={2} />
          <BookInfo bookMeta={data.meta} spacing={[0, 1, 1]} fontSize={[0, 1]} />
          <Tags tags={data.meta.tags} />
        </Box>
      </Flex>

      <Box margin={3} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default BookPage
