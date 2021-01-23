import type { Post } from 'types'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link, Heading } from 'rebass'

type Props = {
  data: Post[]
}

const PostList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((b) => (
      <Box key={b.slug} mb={4}>
        <NextLink href={`/blog/${b.slug}`} passHref>
          <Link>
            <Heading as="h3" fontSize={[1, 2]}>
              {b.meta.title}
            </Heading>
          </Link>
        </NextLink>

        <Box m={1} />

        <Text fontSize={0} color="textSecondary">
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
