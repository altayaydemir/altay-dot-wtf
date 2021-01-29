import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import type { Bookmark } from 'types'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks } from 'core/api/bookmarks'
import PageHeader from 'components/PageHeader'
import { Box, Text, Link, Heading } from 'rebass'

export const getStaticProps: GetStaticProps<{ data: Bookmark[] }> = async () => ({
  props: { data: await fetchBookmarks() },
  revalidate: 60 * 60,
})

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...bookmarksCopy} />

    <Box m={4} />

    <>
      {data.map((bookmark) => (
        <Box key={bookmark.url} mb={5}>
          <Link href={bookmark.url} target="new" rel="noopener noreferrer">
            <Heading as="h3" fontSize={1}>
              {bookmark.title}
            </Heading>
          </Link>

          <Box my={1}>
            <Text as="blockquote" fontSize={1} color="textSecondary">
              {bookmark.description}
            </Text>
          </Box>

          <Text fontSize={0} color="textTertiary">
            {bookmark.host}
          </Text>
        </Box>
      ))}
    </>
  </>
)

export default BookmarksPage
