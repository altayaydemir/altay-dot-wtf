import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'emotion-theming'
import { SEO, HOSTNAME } from '../config'
import { createTheme } from '../ui/theme/create'
import Layout from '../ui/Layout'
import '../ui/styles/globals.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PlausibleProvider domain={HOSTNAME}>
      <ThemeProvider theme={createTheme()}>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <DefaultSeo {...SEO} />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default App
