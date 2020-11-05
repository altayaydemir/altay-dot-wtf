import { HEADER } from 'config'
import Link from 'next/link'
import { Flex, Box, Heading } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import NavLink from './NavLink'

const HeaderDesktop: React.FC<{ currentPathname: string }> = ({ currentPathname }) => (
  <Flex margin="auto" alignItems="center" justifyContent="space-between" width={MOBILE_BREAKPOINT}>
    <Link href="/" passHref>
      <Heading fontSize={2} color="text" sx={{ cursor: 'pointer' }}>
        {HEADER.title}
      </Heading>
    </Link>

    <Box>
      {HEADER.links.map(({ label, href }) => (
        <Box key={href} display="inline">
          <NavLink
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
        </Box>
      ))}
    </Box>
  </Flex>
)

export default HeaderDesktop
