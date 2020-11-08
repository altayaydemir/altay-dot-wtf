import NextLink from 'next/link'
import { Link } from 'rebass'

type Props = { href: string }

const MDTagLink: React.FC<Props> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link
        href={href}
        sx={{
          '&.scrolled-tag-link': {
            backgroundColor: 'linkPrimary',
            color: 'background',
            padding: 1,
            borderRadius: 6,
          },
          '&.scrolled-tag-link:hover': {
            color: 'background',
          },
        }}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const MDExternalLink: React.FC<Props> = ({ href, children }) => (
  <Link href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </Link>
)

const MDLink: React.FC<Props> = ({ href, children }) => {
  if (href.startsWith('/tags')) {
    return <MDTagLink href={href}>{children}</MDTagLink>
  }

  if (href.startsWith('http') || href.endsWith('?target=blank')) {
    return <MDExternalLink href={href}>{children}</MDExternalLink>
  }

  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  )
}

export default MDLink
