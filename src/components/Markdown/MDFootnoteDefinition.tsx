import { Flex, Box } from 'rebass'

type Props = { identifier: number; label: string }

const MDFootnoteDefinition: React.FC<Props> = (props) => (
  <Flex alignItems="flex-start" marginY={2}>
    {props.label}.
    <Box mx={1} />
    <Box sx={{ '*': { margin: 0 } }}>{props.children}</Box>
  </Flex>
)

export default MDFootnoteDefinition
