import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import useDarkMode from 'use-dark-mode'
import { createTheme } from 'theme'
import { createGlobalStyles } from 'theme/globalStyles'
import { usePlausible } from 'next-plausible'
import { useEffect } from 'react'

type PlausibleEventProperties = { props: Record<string, unknown> }
type PlausibleEventFunction = (eventName: string, properties?: PlausibleEventProperties) => void

export const ThemeProvider: React.FC = ({ children }) => {
  const { value: dark } = useDarkMode(false, { storageKey: undefined, onChange: () => null })
  const plausible = usePlausible() as PlausibleEventFunction

  useEffect(() => {
    plausible('theme', { props: { type: dark ? 'dark' : 'light' } })
  }, [dark])

  return (
    <EmotionThemeProvider theme={createTheme({ dark })}>
      <Global styles={createGlobalStyles} />
      {children}
    </EmotionThemeProvider>
  )
}
