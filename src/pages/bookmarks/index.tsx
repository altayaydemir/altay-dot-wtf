import { SITE_URL } from 'config'
import { InferGetStaticPropsType } from 'next'
import { Box, Text, Link, Heading, SxStyleProp } from 'rebass'
import { readJSONFile } from 'core/api/fs'
import PageHeader from 'components/PageHeader'

type Bookmark = {
  url: string
  title: string
  description?: string
}

const formatBookmark = (bookmark: Bookmark) => {
  const url = new URL(bookmark.url)
  const formattedURL = url.protocol + url.hostname + url.pathname + `?ref=${SITE_URL}`
  return { ...bookmark, host: url.hostname, url: formattedURL }
}

export const getStaticProps = async () => {
  const bookmarks = readJSONFile('bookmarks.json') as Bookmark[]
  const data = bookmarks.map(formatBookmark)
  return { props: { data } }
}

const descriptionStyle: SxStyleProp = {
  paddingLeft: 2,
  borderLeft: '2px solid',
  borderColor: 'borderPrimary',
  fontSize: 1,
  color: 'textTertiary',
}

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title="bookmarks" description="links to the cool things." />

    <>
      {data.map((bookmark) => (
        <Box key={bookmark.url} my={4}>
          <Link display="inline-block" href={bookmark.url} target="new" rel="noopener noreferrer">
            <Heading as="h3" fontSize={2}>
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
