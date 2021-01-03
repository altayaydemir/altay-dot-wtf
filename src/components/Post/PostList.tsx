import type { Post } from 'types'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link } from 'rebass'
import ContentTitle from 'components/ContentTitle'

type Props = {
  data: Post[]
}

const PostList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((b) => (
      <Box key={b.slug} mb={4}>
        <NextLink href={`/blog/${b.slug}`} passHref>
          <Link>
            <ContentTitle tag="h3" fontSize={2} meta={b.meta} />
          </Link>
        </NextLink>

        <Box m={1} />

        <Text fontSize={1} color="textSecondary">
          {b.meta.oneliner}
        </Text>

        <Box m={1} />

        <Text fontSize={0} color="textTertiary">
          {'Updated '}
          {formatDistanceToNow(new Date(b.meta.date), { addSuffix: true })}
          <Box display="inline" mx={1}>
            ·
          </Box>
          {b.meta.readingTime}
        </Text>
      </Box>
    ))}
  </Box>
)

export default PostList