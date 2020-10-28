import { Box, Text } from 'rebass'
import { FOOTER_TITLE, FOOTER_LINKS } from '../config'
import Link from './Link'

const Footer = () => (
  <Box>
    <Text fontWeight="bold">{FOOTER_TITLE}</Text>

    <Box>
      {FOOTER_LINKS.map((link, index) => (
        <Box key={link.href} display="inline-block">
          <Link
            target="_blank"
            href={link.href}
            paddingRight={1}
            paddingLeft={index === 0 ? 0 : 1}
            fontSize={14}
          >
            {link.label}
          </Link>

          {index === FOOTER_LINKS.length - 1 ? null : '·'}
        </Box>
      ))}
    </Box>
  </Box>
)

export default Footer
