import { Flex, Box, Link } from 'rebass'

const links = [
  {
    label: 'email',
    href: 'mailto:altay@aydemir.io',
  },
  {
    label: 'twitter',
    href: 'https://twitter.com/altayaydemir',
  },
  {
    label: 'github',
    href: 'https://github.com/altayaydemir',
  },
]

const Footer = () => (
  <Flex
    justifyContent="space-between"
    sx={{
      borderTop: '1px solid',
      borderColor: 'borderMenu',
      paddingY: 3,
    }}
  >
    <Box>
      {links.map((link, index) => (
        <Box key={link.href} display="inline-block">
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            paddingRight={1}
            paddingLeft={index === 0 ? 0 : 1}
            fontSize={1}
          >
            {link.label}
          </Link>

          {index === links.length - 1 ? null : '·'}
        </Box>
      ))}
    </Box>
  </Flex>
)

export default Footer
