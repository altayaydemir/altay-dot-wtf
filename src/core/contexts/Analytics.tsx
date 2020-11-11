import { HOSTNAME } from 'config'
import PlausibleProvider from 'next-plausible'

export const AnalyticsProvider: React.FC = ({ children }) => (
  <PlausibleProvider domain={HOSTNAME}>{children}</PlausibleProvider>
)
