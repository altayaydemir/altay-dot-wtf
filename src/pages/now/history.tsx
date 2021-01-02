import type { InferGetStaticPropsType } from 'next'
import type { Now } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { CgArrowRight } from 'react-icons/cg'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'

export const getStaticProps = getStaticPropsForContentList<Now>('now')

const NowHistory: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={`History`} description={`What I've been doing`} />

    <Box m={2} />

    <>
      {data.map((d) => (
        <Box key={d.slug}>
          <NextLink href={`/now/${d.slug}`}>
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

export default NowHistory
