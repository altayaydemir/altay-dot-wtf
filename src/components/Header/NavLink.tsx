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
    <Link
      color="text"
      sx={{
        '&:hover': {
          cursor: active ? 'default' : 'pointer',
        },
      }}
    >
      <Text
        sx={{
          ...style,
          fontWeight: 'bold',
          borderRadius: 4,
          color: active ? 'linkPrimary' : 'text',
          backgroundColor: active ? 'linkBackground' : 'transparent',
          '&:hover': {
            backgroundColor: active ? 'linkBackground' : 'linkHoverBackground',
          },
        }}
      >
        {label}
      </Text>
    </Link>
  </NextLink>
)

export default NavLink
