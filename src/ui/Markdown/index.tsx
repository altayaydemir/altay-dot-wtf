import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import dynamic from 'next/dynamic'

const MDParagraph = dynamic(() => import('./MDParagraph'))
const MDHeading = dynamic(() => import('./MDHeading'))
const MDInlineCode = dynamic(() => import('./MDInlineCode'))
const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))
const MDImage = dynamic(() => import('./MDImage'))
const MDLink = dynamic(() => import('./MDLink'))
const MDQuote = dynamic(() => import('./MDQuote'))

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm]}
    escapeHtml={true}
    renderers={{
      inlineCode: MDInlineCode,
      code: MDCodeBlock,
      link: MDLink,
      image: MDImage,
      paragraph: MDParagraph,
      heading: MDHeading,
      blockquote: MDQuote,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
