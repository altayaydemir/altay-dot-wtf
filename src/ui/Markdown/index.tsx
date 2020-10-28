import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import ReactMarkdown, { renderers } from 'react-markdown'
import gfm from 'remark-gfm'
import { Box, Image, Text } from 'rebass'
import Link from '../Link'
import Paragraph from '../Paragraph'

const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))

const MDImage: React.FC<Record<string, unknown>> = (props) => (
  <Box>
    <Image {...props} />
  </Box>
)

const MDInlineCode: React.FC = ({ children }) => (
  <Text display="inline" fontFamily="monospace" fontSize={1} sx={{ color: 'textInlineCode' }}>
    {children}
  </Text>
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
      inlineCode: MDInlineCode,
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
