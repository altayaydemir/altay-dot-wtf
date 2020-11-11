import { useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import useDarkMode from 'use-dark-mode'
import { createTheme } from 'theme'
import { createGlobalStyles } from 'theme/globalStyles'
import { usePlausible } from 'next-plausible'

export const ThemeProvider: React.FC = ({ children }) => {
  const { value: dark } = useDarkMode(false, { storageKey: undefined, onChange: () => null })
  const plausible = usePlausible()

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
