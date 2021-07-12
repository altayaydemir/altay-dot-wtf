import { FOOTER } from 'config/menus'
import NextLink from 'next/link'
import { Flex, Box, Link, Text } from 'rebass'
import { CgArrowTopRight } from 'react-icons/cg'

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
          <NextLink href={link.href} passHref>
            <Link
              title={link.title}
              paddingRight={2}
              paddingLeft={index === 0 ? 0 : 2}
              fontSize={0}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'textTertiary',
                '&:hover': { color: 'linkPrimary' },
              }}
            >
              {link.label}

              {link.href.startsWith('/') ? null : (
                <>
                  <Box width="2px" />
                  <CgArrowTopRight />
                </>
              )}
            </Link>
          </NextLink>

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
