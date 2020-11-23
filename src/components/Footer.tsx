import { Flex, Box, Link, Text } from 'rebass'

const links = [
  {
    title: 'Email',
    label: 'altay@aydemir.io',
    href: 'mailto:altay@aydemir.io',
  },
  {
    title: 'Twitter',
    label: '@altayaydemir',
    href: 'https://twitter.com/altayaydemir',
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
            title={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            paddingRight={2}
            paddingLeft={index === 0 ? 0 : 2}
            fontSize={1}
            sx={{ color: 'textTertiary', '&:hover': { color: 'linkPrimary' } }}
          >
            {link.label}
          </Link>

          {index === links.length - 1 ? null : (
            <Text display="inline-block" color="textTertiary">
              ·
            </Text>
          )}
        </Box>
      ))}
    </Box>
  </Flex>
)

export default Footer
