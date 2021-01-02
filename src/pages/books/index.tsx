import type { InferGetStaticPropsType } from 'next'
import type { Book } from 'types'
import { booksCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import BookList from 'components/Book/BookList'

export const getStaticProps = getStaticPropsForContentList<Book>('book')

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...booksCopy} />
    <Box m={4} />
    <BookList data={data} />
  </>
)

export default BooksPage
