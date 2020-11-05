import type { Article } from 'types'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link } from 'rebass'
import ContentTitle from 'components/ContentTitle'

type Props = {
  data: Article[]
  itemSpacing?: number | number[]
  elementSpacing?: number | number[]
  titleSize?: number | number[]
  onelinerSize?: number | number[]
  dateSize?: number | number[]
}

const ArticleList: React.FC<Props> = ({
  data,
  itemSpacing = 4,
  elementSpacing = 1,
  titleSize = 3,
  onelinerSize = 1,
  dateSize = 1,
}) => (
  <Box>
    {data.map((article) => (
      <Box key={article.slug} mb={itemSpacing}>
        <NextLink href={`/articles/${article.slug}`} passHref>
          <Link>
            <ContentTitle fontSize={titleSize} meta={article.meta} />
          </Link>
        </NextLink>

        <Box m={elementSpacing} />

        <Text fontSize={onelinerSize} color="textSecondary">
          {article.meta.oneliner}
        </Text>

        <Box m={elementSpacing} />

        <Text fontSize={dateSize} color="textTertiary">
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
