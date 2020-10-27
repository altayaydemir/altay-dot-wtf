import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { Box } from 'rebass'
import { theme } from '../ui/theme'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import '../ui/styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>altay aydemir</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <hr />

    <Box height={20} />

    <Component {...pageProps} />

    <Box height={20} />

    <hr />

    <Footer />
  </ThemeProvider>
)

export default MyApp
