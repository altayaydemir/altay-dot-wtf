import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, Box, Heading, Link, Text } from 'rebass'
import { HEADER } from 'config'
import styled from 'theme/styled'

const { title, links } = HEADER

const HeaderLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <Flex alignItems="flex-end" justifyContent="space-between">
      <Box>
        <NextLink href="/">
          <HeaderLink>
            <Heading fontSize={[1, 2]} color="text">
              {title}
            </Heading>
          </HeaderLink>
        </NextLink>
      </Box>

      <Box>
        {links.map(({ label, href }) => (
          <Box key={href} display="inline">
            <NextLink href={href} passHref>
              <HeaderLink display="inline-block" color="text">
                <Text
                  sx={{
                    fontWeight: 'bold',
                    fontSize: [0, 0, 1],
                    paddingX: [0, 1, 2],
                    paddingY: [0, 1, 1],
                    marginLeft: 1,
                    lineHeight: 1,
                    borderRadius: 3,
                    color: router.route.includes(href) ? 'linkPrimary' : 'inherit',
                    backgroundColor: router.route.includes(href) ? 'linkBackground' : 'background',
                  }}
                >
                  {label}
                </Text>
              </HeaderLink>
            </NextLink>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default Header
