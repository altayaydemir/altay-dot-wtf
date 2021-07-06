import { Box } from 'rebass'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'
import { contactCopy } from 'config/copy'

const content = `
- Email: [altay@aydemir.io](mailto:altay@aydemir.io)
- Twitter: [@altaywtf](https://twitter.com/altaywtf)
- Github: [@altaywtf](https://github.com/altaywtf)
`

const ContactPage: React.FC = () => (
  <>
    <PageHeader {...contactCopy} />

    <Box>
      <Markdown>{content}</Markdown>
    </Box>
  </>
)

export default ContactPage
