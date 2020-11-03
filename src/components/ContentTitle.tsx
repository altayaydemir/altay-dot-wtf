import { Box, Heading, Text } from 'rebass'
import dynamic from 'next/dynamic'
import type { TaggedContent } from 'types'

const LockIcon = dynamic(() => import('components/Icon/Lock'))

type Props = {
  meta: TaggedContent['meta']
  fontSize: number | number[]
  fontWeight?: string
}

const ContentTitle: React.FC<Props> = ({ meta, ...headingProps }) =>
  meta.private ? (
    <Box display="inline-flex" sx={{ alignItems: 'flex-end' }}>
      <Text fontSize={headingProps.fontSize} mr={1} lineHeight={1}>
        <LockIcon />
      </Text>

      <Heading {...headingProps}>{meta.title}</Heading>
    </Box>
  ) : (
    <Heading {...headingProps}>{meta.title}</Heading>
  )

export default ContentTitle
