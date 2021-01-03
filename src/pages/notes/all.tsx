import type { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { notesCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'

export const getStaticProps = getStaticPropsForContentList<Note>('note')

const NotesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...notesCopy} />
    <Box m={4} />
    <>
      {data.map((d) => (
        <Box key={d.slug} my={3}>
          <NextLink href={`/notes/${d.slug}`} passHref>
            <Link display="inline-block">
              <Text>{d.meta.title}</Text>
            </Link>
          </NextLink>

          <Text color="textTertiary" fontSize={0}>
            {format(new Date(d.meta.date), 'PPP')}
          </Text>
        </Box>
      ))}
    </>
  </>
)

export default NotesPage
