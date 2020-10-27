import { InferGetStaticPropsType } from 'next'
import { getMeta, getSlugs } from '../../core/api'
import { BookMeta } from '../../core/types'

export const getStaticProps = async () => ({
  props: {
    books: getSlugs('books').map((article) => getMeta<BookMeta>('books', article)),
  },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => {
  return (
    <div>
      <h1>books</h1>

      <ul>
        {books.map((i) => (
          <li key={i.slug}>
            <a href={`/books/${i.slug}`}>{i.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksPage
