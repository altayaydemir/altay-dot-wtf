import { HEADER } from 'config'
import { useToggle } from 'react-use'
import { useEffect } from 'react'
import Link from 'next/link'
import { Flex, Box, Heading } from 'rebass'
import { VscMenu, VscClose } from 'react-icons/vsc'
import NavLink from './NavLink'
import { headerStyle } from './style'

const HeaderMobile: React.FC<{ currentPathname: string }> = ({ currentPathname }) => {
  const [showMenu, toggleShowMenu] = useToggle(false)

  useEffect(() => {
    toggleShowMenu(false)
  }, [currentPathname])

  return (
    <>
      <Flex alignItems="center">
        <button
          onClick={toggleShowMenu}
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        >
          <Box color="text" padding={0} margin={0} fontSize={3} sx={{ lineHeight: 0 }}>
            {showMenu ? <VscClose /> : <VscMenu />}
          </Box>
        </button>

        <Box mx={2} />

        <Link href="/" passHref>
          <Heading fontSize={1} color="text" sx={{ cursor: 'pointer' }}>
            {HEADER.title}
          </Heading>
        </Link>
      </Flex>

      <Box
        sx={{
          ...headerStyle,
          position: 'absolute',
          width: '100%',
          left: 0,
          top: 45,
          paddingX: 2,
          paddingY: 2,
          visibility: showMenu ? 'visible' : 'hidden',
        }}
      >
        {HEADER.links.map(({ label, href }) => (
          <Box key={href}>
            <NavLink
              active={currentPathname.includes(href)}
              href={href}
              label={label}
              style={{
                fontSize: 1,
                paddingX: 2,
                paddingY: 2,
                marginY: 2,
                marginX: 1,
              }}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default HeaderMobile
