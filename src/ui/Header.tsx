import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { Flex, Box, LinkProps, Heading } from 'rebass'
import { HEADER } from '../config'
import Link from './Link'

const { title, links } = HEADER

const NavLink: React.FC<LinkProps & { active: boolean }> = forwardRef(
  ({ active, ...rest }, ref) => {
    const style = {
      color: 'initial',
      fontWeight: active ? 'bold' : 'initial',
      textDecoration: 'none',
    } as const

    return (
      <Link
        ref={ref}
        margin={0}
        paddingX={['2px', 1, 2]}
        fontSize={[0, 1, 2]}
        style={style}
        {...rest}
      />
    )
  },
)

NavLink.displayName = 'NavLink'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <Box>
          <NextLink href="/" passHref>
            <a style={{ textDecoration: 'none', color: 'initial' }}>
              <Heading fontSize={[2, 3, 4]}>{title}</Heading>
            </a>
          </NextLink>
        </Box>

        <Box>
          {links.map((link, index) => (
            <Box key={link.href} display="inline">
              <NextLink href={link.href} passHref>
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
