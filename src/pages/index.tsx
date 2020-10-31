import NextLink from 'next/link'
import { Box, Text, Link, Flex } from 'rebass'
import { VscArrowRight } from 'react-icons/vsc'
import { HOME } from '../config'
import PageHeader from '../ui/PageHeader'

const Home: React.FC = () => (
  <>
    <PageHeader title={HOME.title} />

    <Box m={3} />

    {HOME.description.map((i) => (
      <Text key={i} color="textSecondary">
        {i}
      </Text>
    ))}

    <Box m={3} />

    <>
      {HOME.links.map((link) => (
        <Box key={link.href}>
          <NextLink href={link.href} passHref>
            <Link>
              <Flex alignItems="center">
                <Text mr={1}>{link.label}</Text>
                <VscArrowRight />
              </Flex>
            </Link>
          </NextLink>
        </Box>
      ))}
    </>
  </>
)

export default Home
