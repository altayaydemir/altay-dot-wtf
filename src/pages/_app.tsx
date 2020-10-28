import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { createTheme } from '../ui/theme/create'
import Layout from '../ui/Layout'
import '../ui/styles/globals.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={createTheme()}>
      <Head>
        <title>altay aydemir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
