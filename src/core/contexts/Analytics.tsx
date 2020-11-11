import { HOSTNAME } from 'config'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import PlausibleProvider from 'next-plausible'

export const AnalyticsProvider: React.FC = ({ children }) => {
  const [disabled] = useLocalStorage<boolean>('disableAnalytics')

  useEffect(() => {
    if (disabled) {
      console.log('[🦓] - analytics disabled')
    }
  }, [disabled])

  if (disabled) {
    return <>{children}</>
  }

  return <PlausibleProvider domain={HOSTNAME}>{children}</PlausibleProvider>
}
