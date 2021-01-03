import { Text } from 'rebass'

const Paragraph: React.FC = ({ children }) => (
  <Text marginY={3} marginX={0} color="textSecondary">
    {children}
  </Text>
)

export default Paragraph
