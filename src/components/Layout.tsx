import { MOBILE_BREAKPOINT } from 'theme'
import { Box } from 'rebass'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => (
  <Box width={MOBILE_BREAKPOINT} maxWidth="100%" marginX="auto" paddingX={[2, 2, 0]}>
    <Header />
    <Box m={6} mt={[6, 6, 7]} />
    {children}
    <Box m={6} />
    <Footer />
  </Box>
)

export default Layout
