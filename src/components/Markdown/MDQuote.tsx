import { Box, Text } from 'rebass'

const MDQuote: React.FC = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'backgroundSecondary',
      borderLeftWidth: 2,
      borderLeftColor: 'textTertiary',
      borderLeftStyle: 'solid',
      paddingY: 2,
      paddingX: 4,
    }}
    marginY={[1, 3]}
  >
    <Text>{children}</Text>
  </Box>
)

export default MDQuote
