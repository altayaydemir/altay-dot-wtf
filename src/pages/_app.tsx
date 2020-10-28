import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { Box } from 'rebass'
import { createTheme } from '../ui/theme/create'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import '../ui/styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={createTheme()}>
    <Head>
      <title>altay aydemir</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    <hr style={{ opacity: 0.25 }} />
    <Box height={20} />

    <Component {...pageProps} />

    <Box height={20} />
    <hr style={{ opacity: 0.25 }} />
    <Footer />
  </ThemeProvider>
)

export default MyApp
