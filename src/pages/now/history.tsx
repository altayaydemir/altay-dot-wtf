import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { Flex, Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { VscChevronRight } from 'react-icons/vsc'
import { getSlugs } from '../../common/api'
import PageHeader from '../../ui/PageHeader'

export const getStaticProps = async () => ({
  props: { data: getSlugs('now').reverse() },
})

const NowHistory: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  return (
    <>
      <PageHeader title={`history`} description={`what I've been doing`} />

      <Box margin={2} />

      <Box>
        {data.map((d) => (
          <NextLink key={d} href={`/now/${d}`}>
            <Link>
              <Flex alignItems="center" mb={1}>
                <Text mr={1} fontSize={1}>
                  {format(new Date(d), 'MMMM yyyy')}
                </Text>

                <VscChevronRight />
              </Flex>
            </Link>
          </NextLink>
        ))}
      </Box>
    </>
  )
}

export default NowHistory
