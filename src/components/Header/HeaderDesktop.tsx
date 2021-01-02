import { HEADER } from 'config'
import { Flex, Box } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import NavLink from './NavLink'

const HeaderDesktop: React.FC<{ currentPathname: string }> = ({ currentPathname }) => (
  <Flex margin="auto" alignItems="center" justifyContent="space-between" width={MOBILE_BREAKPOINT}>
    {HEADER.links.map(({ label, href }) => (
      <Box key={href} display="inline">
        <NavLink
          href={href}
          label={label}
          active={href === '/' ? currentPathname === href : currentPathname.startsWith(href)}
          style={{
            display: 'inline-block',
            fontWeight: 'bold',
            fontSize: 1,
            paddingX: 3,
            paddingY: 2,
            lineHeight: 1,
          }}
        />
      </Box>
    ))}
  </Flex>
)

export default HeaderDesktop
