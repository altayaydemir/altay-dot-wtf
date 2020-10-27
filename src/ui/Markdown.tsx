import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

const CodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => (
  <Prism style={dark} showLineNumbers={true} language={language}>
    {value}
  </Prism>
)

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  if (href.startsWith('http')) {
    return (
      <a target="_blank" href={href} rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  )
}

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown plugins={[gfm]} escapeHtml={true} renderers={{ code: CodeBlock, link: Link }}>
    {children}
  </ReactMarkdown>
)

export default Markdown
