import { HEADER } from 'config'
import { Flex, Box } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import NavLink from './NavLink'

const MAGIC_NUMBER = 8

const HeaderDesktop: React.FC<{ currentPathname: string }> = ({ currentPathname }) => (
  <Flex
    margin="auto"
    alignItems="center"
    justifyContent="space-between"
    width={MOBILE_BREAKPOINT + MAGIC_NUMBER}
  >
    {HEADER.map(({ label, href }) => (
      <Box key={href} flex={1} marginX={`${MAGIC_NUMBER / 4}px`}>
        <NavLink
          href={href}
          label={label}
          active={href === '/' ? currentPathname === href : currentPathname.startsWith(href)}
          style={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 0,
            paddingX: 0,
            paddingY: 2,
            lineHeight: 1,
          }}
        />
      </Box>
    ))}
  </Flex>
)

export default HeaderDesktop
