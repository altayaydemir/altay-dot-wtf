import { Box } from 'rebass'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

type Props = {
  language: string
  value: string
}

const MDCodeBlock: React.FC<Props> = ({ language, value }) => (
  <Box my={3}>
    <Prism style={dark} showLineNumbers={language !== 'text'} language={language}>
      {value}
    </Prism>
  </Box>
)

export default MDCodeBlock
