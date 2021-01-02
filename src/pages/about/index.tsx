import type { InferGetStaticPropsType } from 'next'
import type { About } from 'types'
import { Box, SxStyleProp } from 'rebass'
import { getContentDetails } from 'core/api/content'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'
import { aboutCopy } from 'config/copy'

export const getStaticProps = async () => ({
  props: await getContentDetails<About>('about', 'about'),
})

const sx: SxStyleProp = {
  '& > ul': {
    marginY: 3,
  },
  '& > * > li': {
    marginY: 3,
  },
}

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <PageHeader {...aboutCopy} />

    <Box sx={sx}>
      <Markdown>{markdown}</Markdown>
    </Box>
  </>
)

export default AboutPage
