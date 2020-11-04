import NextLink from 'next/link'
import { Link, Text, SxStyleProp } from 'rebass'
import styled from 'theme/styled'

export const HeaderLinkContainer = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

type Props = {
  href: string
  label: string
  style: SxStyleProp
  active: boolean
}

export const HeaderLink: React.FC<Props> = ({ href, label, active, style }) => (
  <NextLink href={href} passHref>
    <HeaderLinkContainer color="text">
      <Text
        sx={{
          ...style,
          fontWeight: 'bold',
          borderRadius: 3,
          color: active ? 'linkPrimary' : 'inherit',
          backgroundColor: active ? 'linkBackground' : 'headerBackground',
        }}
      >
        {label}
      </Text>
    </HeaderLinkContainer>
  </NextLink>
)
