import type { InferGetStaticPropsType } from 'next'
import type { Article } from 'types'
import { articlesCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import ArticleList from 'components/Article/ArticleList'

export const getStaticProps = getStaticPropsForContentList<Article>('article')

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={articlesCopy.title} description={articlesCopy.description} />
    <Box m={4} />
    <ArticleList data={data} />
  </>
)

export default ArticlesPage
