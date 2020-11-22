import { BaseProps, Box, Heading, Text } from 'rebass'
import dynamic from 'next/dynamic'
import type { TaggedContent } from 'types'

const Icon = dynamic(() => import('components/Icon/Lock'))

type Props = {
  tag: BaseProps['as']
  meta: TaggedContent['meta']
  fontSize: number | number[]
  fontWeight?: string
}

const ContentTitle: React.FC<Props> = ({ tag, meta, ...headingProps }) => (
  <Box display="inline-flex">
    {meta.draft ? (
      <Text fontSize={headingProps.fontSize} mr={1}>
        <Icon />
      </Text>
    ) : null}

    <Heading as={tag} {...headingProps}>
      {meta.title}
    </Heading>
  </Box>
)

export default ContentTitle
