import { Text } from 'rebass'
import styled from 'theme/styled'

const Paragraph = styled(Text)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export default Paragraph
