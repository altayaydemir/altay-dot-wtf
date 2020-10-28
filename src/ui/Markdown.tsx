import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import Link from './Link'
import Paragraph from './Paragraph'
import { Box, Image, Text } from 'rebass'

const MDImage: React.FC<Record<string, unknown>> = (props) => (
  <Box>
    <Image {...props} />
  </Box>
)

const MDCodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => (
  <Prism style={dark} showLineNumbers={true} language={language}>
    {value}
  </Prism>
)

const MDLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  if (href.startsWith('http')) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        {children}
      </Link>
    )
  }

  return (
    <NextLink href={href}>
      <Link>{children}</Link>
    </NextLink>
  )
}

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm]}
    escapeHtml={true}
    renderers={{
      code: MDCodeBlock,
      link: MDLink,
      image: MDImage,
      paragraph: Paragraph,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
