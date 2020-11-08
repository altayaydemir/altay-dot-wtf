import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import footnotes from 'remark-footnotes'
import dynamic from 'next/dynamic'

import MDHeading from './MDHeading'
import MDParagraph from './MDParagraph'
import MDLink from './MDLink'

const MDMedia = dynamic(() => import('./MDMedia'))
const MDQuote = dynamic(() => import('./MDQuote'))
const MDInlineCode = dynamic(() => import('./MDInlineCode'))
const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))
const MDFootnoteDefinition = dynamic(() => import('./MDFootnoteDefinition'))
const MDFootnoteReference = dynamic(() => import('./MDFootnoteReference'))

export type Props = {
  children: string
}

const Markdown: React.FC<Props> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm, footnotes]}
    escapeHtml={true}
    renderers={{
      paragraph: MDParagraph,
      heading: MDHeading,
      link: MDLink,
      image: MDMedia,
      blockquote: MDQuote,
      inlineCode: MDInlineCode,
      code: MDCodeBlock,
      footnoteReference: MDFootnoteReference,
      footnoteDefinition: MDFootnoteDefinition,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
