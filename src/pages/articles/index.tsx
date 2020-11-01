import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link, Heading } from 'rebass'
import { getStaticPropsForContentList } from '../../common/page'
import { Article } from '../../types'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = getStaticPropsForContentList<Article>('article')

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title="articles" description="learnings worth sharing, mostly about software." />

    <Box>
      {data.map((article) => (
        <Box key={article.slug} my={4}>
          <NextLink href={`/articles/${article.slug}`} passHref>
            <Link>
              <Heading fontSize={3}>{article.meta.title}</Heading>
            </Link>
          </NextLink>

          <Box m={1} />

          <Text fontSize={1} color="textSecondary">
            {article.meta.oneliner}
          </Text>

          <Box m={1} />

          <Text fontSize={0} color="textTertiary">
            {'written '}
            {formatDistanceToNow(new Date(article.meta.date), { addSuffix: true })}
          </Text>
        </Box>
      ))}
    </Box>
  </>
)

export default ArticlesPage
