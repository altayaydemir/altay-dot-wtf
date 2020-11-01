import { Box, Text, Link } from 'rebass'
import NextLink from 'next/link'

type Props = {
  tags: undefined | string[]
  fontSize?: number | number[]
  spacing?: number | number[]
}

const Tags: React.FC<Props> = ({ tags, fontSize = 0, spacing = 1 }) => {
  if (!tags || tags.length === 0) return null

  return (
    <Box display="inline-block">
      {tags
        .sort((a, b) => a.localeCompare(b))
        .map((tag) => (
          <NextLink key={tag} href={`/tags/${tag}`} passHref>
            <Link color="textTertiary">
              <Text fontSize={fontSize} display="inline-block" marginRight={spacing}>
                #{tag}
              </Text>
            </Link>
          </NextLink>
        ))}
    </Box>
  )
}

export default Tags
