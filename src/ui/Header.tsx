import Link from 'next/link'
import { Flex, Box, Link as NavLink } from 'rebass'
import { HEADER_TITLE, HEADER_LINKS } from '../config'

const Header = () => (
  <Box>
    <Flex alignItems="flex-end" justifyContent="space-between">
      <Box>
        <Link href="/">
          <Flex alignItems="center" style={{ cursor: 'pointer' }}>
            <h1 style={{ margin: 0, padding: 0 }}>{HEADER_TITLE}</h1>
          </Flex>
        </Link>
      </Box>

      <Box>
        {HEADER_LINKS.map((link, index) => (
          <Box key={link.href} display="inline-block">
            <Link href={link.href}>
              <NavLink variant="nav" paddingY={1} style={{ cursor: 'pointer' }}>
                {link.label}
              </NavLink>
            </Link>

            {index !== HEADER_LINKS.length - 1 ? '·' : null}
          </Box>
        ))}
      </Box>
    </Flex>
  </Box>
)

export default Header
