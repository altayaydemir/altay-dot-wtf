import type { InferGetStaticPropsType } from 'next'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks } from 'core/api/bookmarks'
import PageHeader from 'components/PageHeader'
import { Box, Text, Link, Heading, SxStyleProp } from 'rebass'

export const getStaticProps = async () => ({ props: { data: await fetchBookmarks() } })

const descriptionStyle: SxStyleProp = {
  paddingLeft: 2,
  borderLeft: '2px solid',
  borderColor: 'borderPrimary',
  fontSize: 1,
  color: 'textTertiary',
}

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...bookmarksCopy} />

    <>
      {data.map((bookmark) => (
        <Box key={bookmark.url} my={4}>
          <Link href={bookmark.url} target="new" rel="noopener noreferrer">
            <Heading as="h3" fontSize={[1, 2]}>
              {bookmark.title}
            </Heading>
          </Link>

          {bookmark.description ? (
            <Box my={2}>
              <Text as="blockquote" sx={descriptionStyle}>
                {bookmark.description}
              </Text>
            </Box>
          ) : (
            <Box my={2} />
          )}

          <Text fontSize={0} color="textTertiary">
            {bookmark.host}
          </Text>
        </Box>
      ))}
    </>
  </>
)

export default BookmarksPage
