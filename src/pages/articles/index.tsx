import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link } from 'rebass'
import { getStaticPropsForContentList } from 'api/page'
import type { Article } from 'types'
import ContentTitle from 'components/ContentTitle'
import PageHeader from 'components/PageHeader'

export const getStaticProps = getStaticPropsForContentList<Article>('article')

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title="articles" description="learnings worth sharing, mostly about software." />

    <Box>
      {data.map((article) => (
        <Box key={article.slug} my={4}>
          <NextLink href={`/articles/${article.slug}`} passHref>
            <Link>
              <ContentTitle fontSize={3} meta={article.meta} />
            </Link>
          </NextLink>

          <Box m={1} />

          <Text fontSize={1} color="textSecondary">
            {article.meta.oneliner}
          </Text>

          <Box m={1} />

          <Text fontSize={0} color="textTertiary">
            {'updated '}
            {formatDistanceToNow(new Date(article.meta.date), { addSuffix: true })}
          </Text>
        </Box>
      ))}
    </Box>
  </>
)

export default ArticlesPage
