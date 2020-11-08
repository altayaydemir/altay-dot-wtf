import { Content } from 'types'
import { Box, Text, Flex, SxStyleProp, Heading, Link } from 'rebass'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'

type LinkedItemProps = {
  slug: string
  data: Content
}

const getTitle = (item: Content) => {
  switch (item.type) {
    case 'book':
      return `${item.meta.title} by ${item.meta.authors.join(', ')}`

    case 'note':
      return item.meta.title

    case 'article':
      return item.meta.title

    default:
      return '__NEVER__'
  }
}

const getURLForContent = (content: Content, slug: string) => {
  switch (content.type) {
    case 'article':
      return `/articles/${content.slug}?source=${slug}`

    case 'book':
      return `/books/${content.slug}?source=${slug}`

    case 'note':
      return `/notes/${content.slug}?source=${slug}`

    default:
      return '__NEVER__'
  }
}

const getSubtitle = (item: Content) => {
  return `updated ${formatDistanceToNow(new Date(item.meta.date), { addSuffix: true })}`
}

const itemStyle: SxStyleProp = {
  borderRadius: 8,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'backgroundHeader',
  },
}

const Item: React.FC<LinkedItemProps> = ({ data, slug }) => (
  <NextLink href={getURLForContent(data, slug)} passHref>
    <Link href={getURLForContent(data, slug)} sx={{ '&:hover': { textDecoration: 'none' } }}>
      <Box sx={itemStyle} p={2}>
        <Text color="linkPrimary" fontSize={1} fontWeight="bold">
          {getTitle(data)}
        </Text>

        <Text color="textSecondary" display="inline" fontSize={0}>
          {data.type}
        </Text>

        <Text color="textSecondary" display="inline-block" mx={1}>
          ·
        </Text>

        <Text color="textTertiary" display="inline" fontSize={0}>
          {getSubtitle(data)}
        </Text>
      </Box>
    </Link>
  </NextLink>
)

const LinkedItems: React.FC<{ slug: string; data: Content[] }> = ({ slug, data }) =>
  data.length ? (
    <Box backgroundColor="backgroundSecondary" p={3} sx={{ borderRadius: 8 }}>
      <Heading fontSize={2}>mentioned in </Heading>

      <Flex mx={-3} alignItems="flex-start">
        {data.map((item, index) => (
          <Box width={[1, 1, 1 / 2]} key={index} mt={1} px={2}>
            <Item data={item} slug={slug} />
          </Box>
        ))}
      </Flex>
    </Box>
  ) : null

export default LinkedItems
