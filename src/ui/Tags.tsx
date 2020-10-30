import { Box, Text } from 'rebass'
import NextLink from 'next/link'
import Link from './Link'

type Props = {
  tags: undefined | string[]
  fontSize?: number | number[]
  spacing?: number | number[]
}

const Tags: React.FC<Props> = ({ tags, fontSize = 0, spacing = 1 }) => {
  if (!tags || tags.length === 0) return null

  return (
    <Box display="inline-block">
      {tags.map((tag) => (
        <NextLink key={tag} href={`/tags/${tag}`} passHref>
          <Link color="tag">
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
