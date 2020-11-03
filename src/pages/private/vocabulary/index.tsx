import { InferGetStaticPropsType } from 'next'
import { Box, SxStyleProp } from 'rebass'
import { getContentDetails } from 'common/content'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'

export const getStaticProps = async () => ({
  props: await getContentDetails('vocabulary', 'vocabulary'),
})

const sx: SxStyleProp = {
  '& > div > h3': {
    marginTop: 5,
    marginBottom: -2,
  },
  '& > * > a': {
    fontSize: 1,
  },
}

const Vocabulary: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <PageHeader
      title="vocabulary"
      description="words or expressions I read somewhere and would like to keep in mind."
    />

    <Box sx={sx}>
      <Markdown>{markdown}</Markdown>
    </Box>
  </>
)

export default Vocabulary
