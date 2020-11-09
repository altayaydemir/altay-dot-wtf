import type { Article } from 'types'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link } from 'rebass'
import ContentTitle from 'components/ContentTitle'

type Props = {
  data: Article[]
}

const ArticleList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((article) => (
      <Box key={article.slug} mb={4}>
        <NextLink href={`/articles/${article.slug}`} passHref>
          <Link>
            <ContentTitle fontSize={2} meta={article.meta} />
          </Link>
        </NextLink>

        <Box m={1} />

        <Text fontSize={1} color="textSecondary">
          {article.meta.oneliner}
        </Text>

        <Box m={1} />

        <Text fontSize={1} color="textTertiary">
          {'updated '}
          {formatDistanceToNow(new Date(article.meta.date), { addSuffix: true })}
          <Box display="inline" mx={1}>
            ·
          </Box>
          {article.meta.readingTime}
        </Text>
      </Box>
    ))}
  </Box>
)

export default ArticleList
