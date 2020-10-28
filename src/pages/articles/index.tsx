import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Heading } from 'rebass'
import Link from '../../ui/Link'
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
          <NextLink href={`/articles/${i.slug}`}>
            <Link style={{ cursor: 'pointer' }}>{i.title}</Link>
          </NextLink>
        </li>
      ))}
    </ul>
  </>
)

export default ArticlesPage
