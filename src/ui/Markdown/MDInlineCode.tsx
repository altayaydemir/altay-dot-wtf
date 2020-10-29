import { Text } from 'rebass'

const MDInlineCode: React.FC = ({ children }) => (
  <Text display="inline" fontFamily="monospace" fontSize={1} sx={{ color: 'textInlineCode' }}>
    {children}
  </Text>
)

export default MDInlineCode
