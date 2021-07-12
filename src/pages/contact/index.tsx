import { Box } from 'rebass'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'
import { contactCopy } from 'config/copy'

const content = `
- [altay@aydemir.io](mailto:altay@aydemir.io)
- [twitter.com/altaywtf](https://twitter.com/altaywtf)
- [linkedin.com/in/altaywtf](https://linkedin.com/in/altaywtf)
- [github.com/altaywtf](https://github.com/altaywtf)
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
