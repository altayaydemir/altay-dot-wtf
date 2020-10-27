import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Heading } from 'rebass'
import { getMeta, getSlugs } from '../../core/api'
import { ArticleMeta } from '../../core/types'

export const getStaticProps = async () => ({
  props: {
    articles: getSlugs('articles').map((article) => getMeta<ArticleMeta>('articles', article)),
  },
})

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => (
  <>
    <Heading>articles</Heading>

    <ul>
      {articles.map((i) => (
        <li key={i.slug}>
          <Link href={`/articles/${i.slug}`}>
            <a>{i.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </>
)

export default ArticlesPage
