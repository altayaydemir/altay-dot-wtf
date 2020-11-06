import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import type { PrivateNote } from 'types'

export const getStaticProps = getStaticPropsForContentList<PrivateNote>('private-note')

const JournalPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={`notes`} description={`🤔`} />

    <Box m={3} />

    <>
      {data.map((d) => (
        <Box key={d.slug} my={3}>
          <NextLink href={`/private/notes/${d.slug}`} passHref>
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

export default JournalPage
