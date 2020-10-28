import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { Flex, Box, Link, LinkProps } from 'rebass'
import { useTheme } from 'emotion-theming'
import { HEADER_TITLE, HEADER_LINKS } from '../config'
import { Theme } from './theme/create'

type NavLinkProps = LinkProps & { active: boolean }

const NavLink: React.FC<NavLinkProps> = forwardRef(({ active, ...rest }, ref) => {
  const theme = useTheme<Theme>()
  const style = {
    cursor: 'pointer',
    color: active ? theme.colors.primary : 'initial',
  }

  return <Link variant="nav" marginY={1} style={style} ref={ref} {...rest} />
})

NavLink.displayName = 'NavLink'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Box>
          <NextLink href="/">
            <Flex alignItems="center" style={{ cursor: 'pointer' }}>
              <h1 style={{ margin: 0, padding: 0 }}>{HEADER_TITLE}</h1>
            </Flex>
          </NextLink>
        </Box>

        <Box>
          {HEADER_LINKS.map((link, index) => (
            <Box key={link.href} display="inline-block">
              <NextLink href={link.href}>
                <NavLink active={router.pathname.includes(link.href)}>{link.label}</NavLink>
              </NextLink>

              {index === HEADER_LINKS.length - 1 ? null : '·'}
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}

export default Header
