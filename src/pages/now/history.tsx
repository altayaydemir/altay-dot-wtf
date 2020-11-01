import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Flex, Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { VscChevronRight } from 'react-icons/vsc'
import { getStaticPropsForContentList } from '../../common/page'
import PageHeader from '../../ui/PageHeader'
import { Now } from '../../types'

export const getStaticProps = getStaticPropsForContentList<Now>('now')

const NowHistory: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader title={`history`} description={`what I've been doing`} />

    <Box margin={2} />

    <Box>
      {data.map((d) => (
        <NextLink key={d.slug} href={`/now/${d.slug}`}>
          <Link>
            <Flex alignItems="center" mb={1}>
              <Text mr={1} fontSize={1}>
                {format(new Date(d.slug), 'MMMM yyyy')}
              </Text>

              <VscChevronRight />
            </Flex>
          </Link>
        </NextLink>
      ))}
    </Box>
  </>
)

export default NowHistory
