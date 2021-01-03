import { Box } from 'rebass'
import { PrismLight } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

PrismLight.registerLanguage('jsx', jsx)
PrismLight.registerLanguage('tsx', tsx)

type Props = { language: string; value: string }

const MDCodeBlock: React.FC<Props> = ({ language, value }) => (
  <Box my={3}>
    <PrismLight style={dark} language={language} customStyle={{ borderRadius: 4 }}>
      {value}
    </PrismLight>
  </Box>
)

export default MDCodeBlock
