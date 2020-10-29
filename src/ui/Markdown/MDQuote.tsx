import { Box, Text } from 'rebass'

const MDQuote: React.FC = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'muted',
      borderLeftWidth: 2,
      borderLeftColor: 'textCaption',
      borderLeftStyle: 'solid',
    }}
    padding={[1, 3]}
    paddingLeft={[2, 4]}
    marginBottom={[1, 3]}
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
