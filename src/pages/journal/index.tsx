import type { InferGetStaticPropsType } from 'next'
import type { Journal } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import { CgArrowRight } from 'react-icons/cg'

export const getStaticProps = getStaticPropsForContentList<Journal>('journal')

const JournalPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader icon="📓" title={`Journal`} description={`What I've been doing, in detail.`} />

    <Box m={2} />

    <>
      {data.map((d) => (
        <Box key={d.slug}>
          <NextLink href={`/journal/${d.slug}`}>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center', mb: 1 }}>
                <Text mr={1} fontSize={1}>
                  {format(new Date(d.slug), 'MMMM yyyy')}
                </Text>

                <CgArrowRight />
              </Box>
            </Link>
          </NextLink>
        </Box>
      ))}
    </>
  </>
)

export default JournalPage
