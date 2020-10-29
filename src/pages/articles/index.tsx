import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { format } from 'date-fns'
import { Box, Text } from 'rebass'
import Link from '../../ui/Link'
import { getMeta, getSlugs } from '../../common/api'
import { sortByDate } from '../../common/utils'
import { ArticleMeta } from '../../types'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = async () => ({
  props: {
    articles: sortByDate(
      getSlugs('articles').map((article) => getMeta<ArticleMeta>('articles', article)),
    ),
  },
})

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => (
  <>
    <PageHeader title="articles" description="learnings worth sharing." />

    <Box>
      {articles.map((article) => (
        <Box key={article.slug} my={4}>
          <NextLink href={`/articles/${article.slug}`} passHref>
            <Link>
              <Text fontSize={3} fontWeight="bold">
                {article.title}
              </Text>
            </Link>
          </NextLink>

          <Box m={1} />

          <Text fontSize={0} color="textCaption">
            {format(new Date(article.date), 'PPP')}
          </Text>

          <Text fontSize={1}>{article.oneliner}</Text>
        </Box>
      ))}
    </Box>
  </>
)

export default ArticlesPage
