import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Flex, Box, Heading } from 'rebass'
import { getStaticPathsFromSlugs, getContent, getBookMeta } from '../../common/api'
import { Book } from '../../types'
import BookCover from '../../ui/BookCover'
import BookInfo from '../../ui/BookInfo'
import Markdown from '../../ui/Markdown'
import Tags from '../../ui/Tags'

export const getStaticPaths = getStaticPathsFromSlugs('book')

export const getStaticProps: GetStaticProps<
  { data: undefined } | { data: Book },
  { slug: string }
> = async ({ params }) => {
  if (!params?.slug) {
    return { props: { data: undefined } }
  }

  const data = getContent<Book>('book', params.slug)
  const meta = await getBookMeta(params.slug)

  return { props: { data: { ...data, meta } } }
}

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  if (!data) return null

  return (
    <>
      <Flex>
        <BookCover bookMeta={data.meta} />

        <Box margin={2} />

        <Box>
          <Heading fontSize={[1, 2, 4]}>{data.meta.title}</Heading>
          <Box my={2} />
          <BookInfo bookMeta={data.meta} spacing={[0, 0, 1]} fontSize={[0, 1, 2]} />
          <Tags tags={data.meta.tags} />
        </Box>
      </Flex>

      <Box margin={3} />

      <Markdown>{data.markdown}</Markdown>
    </>
  )
}

export default BookPage
