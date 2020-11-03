import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import useDarkMode from 'use-dark-mode'
import { SEO, HOSTNAME } from '../config'
import { createTheme } from '../theme/create'
import { createGlobalStyles } from '../theme/globalStyles'
import Layout from '../components/Layout'

const Providers: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const { value: dark } = useDarkMode(false, { storageKey: undefined, onChange: () => null })

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = (
    <PlausibleProvider domain={HOSTNAME}>
      <ThemeProvider theme={createTheme({ dark })}>
        <Global styles={createGlobalStyles} />
        {children}
      </ThemeProvider>
    </PlausibleProvider>
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
