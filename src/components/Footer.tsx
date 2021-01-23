import { Flex, Box, Link, Text } from 'rebass'
import { FOOTER } from 'config/menus'

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
      {FOOTER.map((link, index) => (
        <Box key={link.href} display="inline-block">
          <Link
            title={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            paddingRight={2}
            paddingLeft={index === 0 ? 0 : 2}
            fontSize={0}
            sx={{ color: 'textTertiary', '&:hover': { color: 'linkPrimary' } }}
          >
            {link.label}
          </Link>

          {index === FOOTER.length - 1 ? null : (
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
