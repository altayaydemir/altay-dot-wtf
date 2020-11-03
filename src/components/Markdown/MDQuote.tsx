import { Box, Text } from 'rebass'

const MDQuote: React.FC = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'backgroundSecondary',
      borderLeftWidth: 2,
      borderLeftColor: 'textTertiary',
      borderLeftStyle: 'solid',
    }}
    padding={[1, 3]}
    paddingLeft={2}
    marginY={[1, 3]}
  >
    <Text
      css={`
        * {
          margin: 0 !important;
        }
      `}
    >
      {children}
    </Text>
  </Box>
)

export default MDQuote
