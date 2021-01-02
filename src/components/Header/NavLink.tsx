import NextLink from 'next/link'
import { Link, Text, SxStyleProp } from 'rebass'

type Props = {
  href: string
  label: string
  style: SxStyleProp
  active: boolean
}

const NavLink: React.FC<Props> = ({ href, label, active, style }) => (
  <NextLink href={href} passHref>
    <Link color="text">
      <Text
        sx={{
          ...style,
          fontWeight: 'bold',
          borderRadius: 6,
          color: active ? 'linkPrimary' : 'inherit',
          backgroundColor: active ? 'linkBackground' : 'headerBackground',
        }}
      >
        {label}
      </Text>
    </Link>
  </NextLink>
)

export default NavLink
