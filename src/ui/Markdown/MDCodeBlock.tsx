import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

type Props = {
  language: string
  value: string
}

const MDCodeBlock: React.FC<Props> = ({ language, value }) => (
  <Prism style={dark} showLineNumbers={language !== 'text'} language={language}>
    {value}
  </Prism>
)

export default MDCodeBlock
