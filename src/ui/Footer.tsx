import { Box, Heading, Link } from 'rebass'
import { FOOTER } from '../config'

const { title, links } = FOOTER

const Footer = () => (
  <Box>
    <Heading fontSize={2}>{title}</Heading>

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

    <Box m={4} />
  </Box>
)

export default Footer
