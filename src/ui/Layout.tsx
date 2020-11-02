import { Box } from 'rebass'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => (
  <Box width={640} maxWidth="100%" marginX="auto" paddingX={[2, 2, 0]}>
    <Header />
    <hr />
    <Box m={4} />
    {children}
    <Box m={4} />
    <hr />
    <Footer />
  </Box>
)

export default Layout
