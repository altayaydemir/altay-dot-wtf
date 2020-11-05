import { Box, Heading, Text } from 'rebass'
import dynamic from 'next/dynamic'
import type { TaggedContent } from 'types'

const Icon = dynamic(() => import('components/Icon/Lock'))

type Props = {
  meta: TaggedContent['meta']
  fontSize: number | number[]
  fontWeight?: string
}

const ContentTitle: React.FC<Props> = ({ meta, ...headingProps }) => (
  <Box display="inline-flex" sx={{ alignItems: 'flex-end' }}>
    {meta.draft ? (
      <Text fontSize={headingProps.fontSize} mr={1} lineHeight={1}>
        <Icon />
      </Text>
    ) : null}

    <Heading {...headingProps}>{meta.title}</Heading>
  </Box>
)

export default ContentTitle
