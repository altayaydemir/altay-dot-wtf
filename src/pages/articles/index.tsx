import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Box, Text, Link, Heading } from 'rebass'
import { getMeta, getSlugs } from '../../common/api'
import { sortMetaByDate } from '../../common/utils'
import { Article } from '../../types'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = async () => {
  const slugs = getSlugs('article')
  const metas = slugs.map((slug) => getMeta<Article>('article', slug))
  const articles = slugs.map((slug, i) => ({ slug, ...metas[i] }))

  return {
    props: {
      articles: sortMetaByDate(articles),
    },
  }
}

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => (
  <>
    <PageHeader title="articles" description="learnings worth sharing, mostly about software." />

    <Box>
      {articles.map((article) => (
        <Box key={article.slug} my={4}>
          <NextLink href={`/articles/${article.slug}`} passHref>
            <Link>
              <Heading fontSize={3}>{article.title}</Heading>
            </Link>
          </NextLink>

          <Box m={1} />

          <Text fontSize={1} color="textSecondary">
            {article.oneliner}
          </Text>

          <Box m={1} />

          <Text fontSize={0} color="textTertiary">
            {'written '}
            {formatDistanceToNow(new Date(article.date), { addSuffix: true })}
          </Text>
        </Box>
      ))}
    </Box>
  </>
)

export default ArticlesPage
