import { HEADER } from 'config'
import NextLink from 'next/link'
import { Flex, Box, Heading } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import { HeaderLinkContainer, HeaderLink } from './HeaderLink'

const HeaderDesktop: React.FC<{ currentPathname: string }> = ({ currentPathname }) => (
  <Flex margin="auto" alignItems="center" justifyContent="space-between" width={MOBILE_BREAKPOINT}>
    <NextLink href="/">
      <HeaderLinkContainer>
        <Heading fontSize={2} color="text">
          {HEADER.title}
        </Heading>
      </HeaderLinkContainer>
    </NextLink>

    <Box>
      {HEADER.links.map(({ label, href }) => (
        <Box key={href} display="inline">
          <NextLink href={href} passHref>
            <HeaderLink
              href={href}
              label={label}
              active={currentPathname.includes(href)}
              style={{
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: 1,
                paddingX: 2,
                paddingY: '6px',
                marginLeft: 1,
                lineHeight: 1,
                borderRadius: 3,
              }}
            />
          </NextLink>
        </Box>
      ))}
    </Box>
  </Flex>
)

export default HeaderDesktop
