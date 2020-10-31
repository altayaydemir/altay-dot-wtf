import NextLink from 'next/link'
import { Link } from 'rebass'

type Props = {
  href: string
}

const MDLink: React.FC<Props> = ({ href, children }) => {
  if (href.startsWith('http')) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
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
