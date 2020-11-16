import { TaggedItem, TaggedContent, isTaggedContent } from 'types'
import { Box, Text, Link, SxStyleProp } from 'rebass'
import NextLink from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { CgArrowTopRight } from 'react-icons/cg'

type TaggedItemProps = {
  tag: string
  data: TaggedItem
}

const getTitle = (item: TaggedItem) => {
  switch (item.type) {
    case 'note':
    case 'book':
    case 'blog-post':
      return item.meta.title

    case 'bookmark':
      return item.title

    default:
      return '__NEVER__'
  }
}

const getURLForContent = (content: TaggedContent, tag: string) => {
  switch (content.type) {
    case 'blog-post':
      return `/blog/${content.slug}?source=${tag}`

    case 'book':
      return `/books/${content.slug}?source=${tag}`

    default:
      return `/notes/${content.slug}?source=${tag}`
  }
}

const TaggedItemHeading: React.FC<TaggedItemProps> = ({ tag, data }) => {
  const linkStyle: SxStyleProp = {
    display: 'inline-block',
    fontSize: 2,
    fontWeight: 'bold',
  }

  if (isTaggedContent(data)) {
    return (
      <Box>
        <NextLink href={getURLForContent(data, tag)} passHref scroll={false}>
          <Link sx={linkStyle}>{getTitle(data)}</Link>
        </NextLink>
      </Box>
    )
  }

  if (data.type === 'bookmark') {
    return (
      <Box>
        <Link
          display="inline-flex"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ ...linkStyle, alignItems: 'center' }}
        >
          <Text>{getTitle(data)}</Text>
          <CgArrowTopRight />
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

const Item: React.FC<TaggedItemProps> = ({ data, tag }) => (
  <Box my={3}>
    <TaggedItemHeading tag={tag} data={data} />

    <Text color="textSecondary" display="inline" fontSize={1}>
      {data.type.split('-').join(' ')}
    </Text>

    <Text color="textSecondary" display="inline-block" mx={1}>
      ·
    </Text>

    <Text color="textTertiary" display="inline" fontSize={1}>
      {getSubtitle(data)}
    </Text>
  </Box>
)

const TaggedItems: React.FC<{ tag: string; data: TaggedItem[] }> = ({ tag, data }) => (
  <>
    {data.map((taggedItem, index) => (
      <Item key={index} data={taggedItem} tag={tag} />
    ))}
  </>
)

export default TaggedItems
