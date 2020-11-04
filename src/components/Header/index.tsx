import dynamic from 'next/dynamic'
import { useWindowSize } from 'react-use'
import { useRouter } from 'next/router'
import { Box } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import { headerStyle } from './style'

const HeaderDesktop = dynamic(() => import('./HeaderDesktop'))
const HeaderMobile = dynamic(() => import('./HeaderMobile'))

const Header: React.FC = () => {
  const router = useRouter()
  const { width } = useWindowSize()

  return (
    <Box as="header" sx={headerStyle}>
      {width > MOBILE_BREAKPOINT ? (
        <HeaderDesktop currentPathname={router.pathname} />
      ) : (
        <HeaderMobile currentPathname={router.pathname} />
      )}
    </Box>
  )
}

export default Header
