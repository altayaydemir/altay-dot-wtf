import { Flex, Box } from 'rebass'

type Props = { identifier: number; label: string }

const MDFootnoteDefinition: React.FC<Props> = (props) => (
  <Flex alignItems="center" marginTop={-2} marginBottom={-3}>
    {props.label}. <Box mx={1} /> {props.children}
  </Flex>
)

export default MDFootnoteDefinition
