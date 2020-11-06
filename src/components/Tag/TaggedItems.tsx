import { TaggedItem, TaggedContent, isTaggedContent } from 'types'
import { Box, Text, Link, SxStyleProp } from 'rebass'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { VscLinkExternal } from 'react-icons/vsc'

type TaggedItemProps = { data: TaggedItem }

const getTitle = (item: TaggedItem) => {
  switch (item.type) {
    case 'book':
      return `${item.meta.title} by ${item.meta.authors.join(', ')}`

    case 'note':
      return `#${item.slug}`

    case 'article':
      return item.meta.title

    case 'bookmark':
      return item.title

    default:
      return '__NEVER__'
  }
}

const getURLForContent = (content: TaggedContent) => {
  switch (content.type) {
    case 'article':
      return `/articles/${content.slug}`

    case 'book':
      return `/books/${content.slug}`

    default:
      return `/tags/${content.slug}`
  }
}

const TaggedItemHeading: React.FC<TaggedItemProps> = ({ data }) => {
  const linkStyle: SxStyleProp = {
    display: 'inline-block',
    fontSize: 2,
    fontWeight: 'bold',
  }

  if (isTaggedContent(data)) {
    return (
      <Box>
        <NextLink href={getURLForContent(data)} passHref>
          <Link sx={linkStyle}>{getTitle(data)}</Link>
        </NextLink>
      </Box>
    )
  }

  if (data.type === 'bookmark') {
    return (
      <Box>
        <Link href={data.url} target="_blank" rel="noopener noreferrer" sx={linkStyle}>
          {getTitle(data)}

          <Text display="inline" mx={1} fontSize={0}>
            <VscLinkExternal />
          </Text>
        </Link>
      </Box>
    )
  }

  return <code>__NEVER__</code>
}

const getSubtitle = (item: TaggedItem) => {
  if (isTaggedContent(item)) {
    return `updated ${formatDistanceToNow(new Date(item.meta.date), { addSuffix: true })}`
  }

  if (item.type === 'bookmark') {
    return item.host
  }
}

const Item: React.FC<TaggedItemProps> = ({ data }) => (
  <Box my={3}>
    <TaggedItemHeading data={data} />

    <Text color="textSecondary" display="inline" fontSize={1}>
      {data.type}
    </Text>

    <Text color="textSecondary" display="inline-block" mx={1}>
      ·
    </Text>

    <Text color="textTertiary" display="inline" fontSize={1}>
      {getSubtitle(data)}
    </Text>
  </Box>
)

const TaggedItems: React.FC<{ data: TaggedItem[] }> = ({ data }) => (
  <>
    {data.map((taggedItem, index) => (
      <Item key={index} data={taggedItem} />
    ))}
  </>
)

export default TaggedItems
