import { Box, Link, Text } from 'rebass'
import { FOOTER_TITLE, FOOTER_LINKS } from '../config'

const Footer = () => (
  <Box>
    <Text fontWeight="bold">{FOOTER_TITLE}</Text>

    <Box>
      {FOOTER_LINKS.map((link, index) => (
        <Box key={link.href} display="inline-block">
          <Link
            href={link.href}
            paddingRight={1}
            paddingLeft={index === 0 ? 0 : 1}
            style={{ cursor: 'pointer' }}
            fontSize={14}
            target="_blank"
          >
            {link.label}
          </Link>

          {index !== FOOTER_LINKS.length - 1 ? '·' : null}
        </Box>
      ))}
    </Box>
  </Box>
)

export default Footer
