import NextLink from 'next/link'
import { Link } from 'rebass'

type Props = {
  href: string
}

const TagLink: React.FC<Props> = ({ href, children }) => {
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

const MDLink: React.FC<Props> = ({ href, children }) => {
  if (href.startsWith('/tags')) {
    return <TagLink href={href}>{children}</TagLink>
  }

  if (href.startsWith('http') || href.endsWith('?target=blank')) {
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </Link>
    )
  }

  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  )
}

export default MDLink
