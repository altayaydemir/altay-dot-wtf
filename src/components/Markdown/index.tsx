import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import dynamic from 'next/dynamic'

import MDHeading from './MDHeading'
import MDParagraph from './MDParagraph'
import MDLink from './MDLink'

const MDImage = dynamic(() => import('./MDImage'))
const MDQuote = dynamic(() => import('./MDQuote'))
const MDInlineCode = dynamic(() => import('./MDInlineCode'))
const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm]}
    escapeHtml={true}
    renderers={{
      paragraph: MDParagraph,
      heading: MDHeading,
      link: MDLink,
      image: MDImage,
      blockquote: MDQuote,
      inlineCode: MDInlineCode,
      code: MDCodeBlock,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
