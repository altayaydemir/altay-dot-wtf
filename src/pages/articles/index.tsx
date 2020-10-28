import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import Link from '../../ui/Link'
import { getMeta, getSlugs } from '../../common/api'
import { sortByDate } from '../../common/utils'
import { ArticleMeta } from '../../types'
import description from './description.md'
import Markdown from '../../ui/Markdown'

export const getStaticProps = async () => ({
  props: {
    articles: sortByDate(
      getSlugs('articles').map((article) => getMeta<ArticleMeta>('articles', article)),
    ),
  },
})

const ArticlesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => (
  <>
    <Markdown>{description}</Markdown>

    <ul>
      {articles.map((i) => (
        <li key={i.slug}>
          <NextLink href={`/articles/${i.slug}`}>
            <Link>{i.title}</Link>
          </NextLink>
        </li>
      ))}
    </ul>
  </>
)

export default ArticlesPage
