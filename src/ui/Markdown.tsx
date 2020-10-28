import NextLink from 'next/link'
import ReactMarkdown, { renderers } from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import { Box, Image, Text } from 'rebass'
import Link from './Link'
import Paragraph from './Paragraph'

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

const MDHeading: React.FC<{ level: number }> = (props) => {
  const heading = renderers.heading as any

  if (props.level === 2) {
    return (
      <>
        {heading(props)}
        <hr />
      </>
    )
  }

  return (
    <>
      {heading(props)}
      <Box my={1} />
    </>
  )
}

const MDQuote: React.FC = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'muted',
      borderLeftWidth: 2,
      borderLeftColor: 'textGray',
      borderLeftStyle: 'solid',
    }}
    padding={[1, 3]}
    paddingLeft={[2, 4]}
    marginBottom={[1, 3]}
  >
    <Text
      css={`
        * {
          margin: 0 !important;
        }
      `}
    >
      {children}
    </Text>
  </Box>
)

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm]}
    escapeHtml={true}
    renderers={{
      code: MDCodeBlock,
      link: MDLink,
      image: MDImage,
      paragraph: Paragraph,
      heading: MDHeading,
      blockquote: MDQuote,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
