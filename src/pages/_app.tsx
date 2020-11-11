import type { AppProps } from 'next/app'
import { SEO } from 'config'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { AnalyticsProvider } from 'core/contexts/Analytics'
import { ThemeProvider } from 'core/contexts/Theme'
import { useMounted } from 'core/hooks/useMounted'
import Layout from 'components/Layout'

const Providers: React.FC = ({ children }) => {
  const mounted = useMounted()

  const body = (
    <AnalyticsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AnalyticsProvider>
  )

  return mounted ? body : <div style={{ visibility: 'hidden' }}>{body}</div>
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Providers>
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>

    <DefaultSeo {...SEO} />

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Providers>
)

export default App
