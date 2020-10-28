import { Box } from 'rebass'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => (
  <Box width={640} maxWidth="100%" marginX="auto" marginY={20} paddingX={[2, 2, 0]}>
    <Header />
    <hr style={{ opacity: 0.25 }} />
    <Box height={20} />
    {children}
    <Box height={20} />
    <hr style={{ opacity: 0.25 }} />
    <Footer />
  </Box>
)

export default Layout
