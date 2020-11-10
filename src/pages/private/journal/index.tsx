import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { VscChevronRight } from 'react-icons/vsc'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import type { Journal } from 'types'

export const getStaticProps = getStaticPropsForContentList<Journal>('journal')

const JournalPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={`journal`} description={`what I've been doing, in detail.`} />

    <Box m={3} />

    <>
      {data.map((d) => (
        <Box key={d.slug}>
          <NextLink href={`/private/journal/${d.slug}`}>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center', mb: 1 }}>
                <Text mr={1} fontSize={1}>
                  {format(new Date(d.slug), 'MMMM yyyy')}
                </Text>

                <VscChevronRight />
              </Box>
            </Link>
          </NextLink>
        </Box>
      ))}
    </>
  </>
)

export default JournalPage
