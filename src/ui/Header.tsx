import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { Flex, Box, Link, LinkProps, Heading } from 'rebass'
import { useTheme } from 'emotion-theming'
import { HEADER } from '../config'
import { Theme } from './theme/create'

type NavLinkProps = LinkProps & { active: boolean }

const NavLink: React.FC<NavLinkProps> = forwardRef(({ active, ...rest }, ref) => {
  const theme = useTheme<Theme>()
  const style = {
    cursor: 'pointer',
    color: active ? theme.colors.primary : 'initial',
  }

  return (
    <Link
      ref={ref}
      variant="nav"
      paddingX={[1, 1, 2]}
      paddingY={0}
      fontSize={[0, 1, 2]}
      style={style}
      css={`
        &:hover {
          text-decoration: underline;
        }
      `}
      {...rest}
    />
  )
})

NavLink.displayName = 'NavLink'

const { title, links } = HEADER

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Box>
          <NextLink href="/">
            <a style={{ textDecoration: 'none', color: 'initial' }}>
              <Heading fontSize={[2, 3, 5]}>{title}</Heading>
            </a>
          </NextLink>
        </Box>

        <Box>
          {links.map((link, index) => (
            <Box key={link.href} display="inline-block">
              <NextLink href={link.href}>
                <NavLink active={router.pathname.includes(link.href)}>{link.label}</NavLink>
              </NextLink>

              {index === links.length - 1 ? null : '·'}
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}

export default Header
