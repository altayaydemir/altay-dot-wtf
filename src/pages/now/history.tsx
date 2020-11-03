import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { VscChevronRight } from 'react-icons/vsc'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import { Now } from 'types'

export const getStaticProps = getStaticPropsForContentList<Now>('now')

const NowHistory: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={`history`} description={`what I've been doing`} />

    <Box margin={2} />

    <>
      {data.map((d) => (
        <Box key={d.slug}>
          <NextLink href={`/now/${d.slug}`}>
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

export default NowHistory
