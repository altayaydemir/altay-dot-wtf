import { Box, Text } from 'rebass'
import { FOOTER } from '../config'
import Link from './Link'

const { title, links } = FOOTER

const Footer = () => (
  <Box>
    <Text fontWeight="bold">{title}</Text>

    <Box>
      {links.map((link, index) => (
        <Box key={link.href} display="inline-block">
          <Link
            target="_blank"
            rel="noreferrer"
            href={link.href}
            paddingRight={1}
            paddingLeft={index === 0 ? 0 : 1}
            fontSize={14}
          >
            {link.label}
          </Link>

          {index === links.length - 1 ? null : '·'}
        </Box>
      ))}
    </Box>
  </Box>
)

export default Footer
