import { HEADER } from 'config'
import { useToggle } from 'react-use'
import { useEffect } from 'react'
import { Flex, Box, Heading } from 'rebass'
import { CgMenu, CgClose } from 'react-icons/cg'
import NavLink from './NavLink'
import { headerStyle } from './style'

const menuButtonStyle = { background: 'transparent', border: 'none', padding: 0 }

const isActive = (currentPathname: string, href: string) =>
  href === '/' ? currentPathname === href : currentPathname.startsWith(href)

const HeaderMobile: React.FC<{ currentPathname: string }> = ({ currentPathname }) => {
  const [showMenu, toggleShowMenu] = useToggle(false)
  const activeLink = HEADER.find((link) => isActive(currentPathname, link.href))

  useEffect(() => {
    toggleShowMenu(false)
  }, [currentPathname])

  return (
    <>
      <Flex alignItems="center" paddingX={2}>
        <button type="button" name="menu-button" onClick={toggleShowMenu} style={menuButtonStyle}>
          <Box color="text" padding={0} margin={0} fontSize={3} sx={{ lineHeight: 0 }}>
            {showMenu ? <CgClose /> : <CgMenu />}
          </Box>
        </button>

        <Box mx={2} />

        <Heading as="span" fontSize={1} color="text">
          {activeLink?.label}
        </Heading>
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
        {HEADER.map(({ label, href }) => (
          <Box key={href}>
            <NavLink
              active={isActive(currentPathname, href)}
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
