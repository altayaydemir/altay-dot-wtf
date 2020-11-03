import NextLink from 'next/link'
import { Box, Heading, Text, Link } from 'rebass'
import { VscArrowRight } from 'react-icons/vsc'

const data = {
  title: 'hi, my name is altay.',
  description: [
    `thanks for visiting my website.`,
    `I am a software engineer currently living in berlin.`,
    `I enjoy building things that are solving problems I empathize with.`,
  ],
  links: [
    {
      label: 'more about me',
      href: '/about',
    },
    {
      label: 'what am I doing now',
      href: '/now',
    },
  ],
} as const

const Home: React.FC = () => (
  <>
    <Heading fontSize={3}>{data.title}</Heading>

    <Box m={3} />

    {data.description.map((i) => (
      <Text key={i} color="textSecondary">
        {i}
      </Text>
    ))}

    <Box m={3} />

    <>
      {data.links.map((link) => (
        <Box key={link.href}>
          <NextLink href={link.href} passHref>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center' }}>
                <Text mr={1}>{link.label}</Text>
                <VscArrowRight />
              </Box>
            </Link>
          </NextLink>
        </Box>
      ))}
    </>
  </>
)

export default Home
