import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Box, SxStyleProp } from 'rebass'
import Markdown from 'components/Markdown'
import { getContentDetails } from 'core/api/content'
import type { About } from 'types'

export const getStaticProps = async () => ({
  props: await getContentDetails<About>('about', 'about'),
})

const sx: SxStyleProp = {
  '& > *:first-of-type > h3': {
    marginTop: '0!important',
  },
  '& > * > h3': {
    fontSize: 3,
  },
  '& > ul': {
    marginY: 3,
  },
  '& > * > li': {
    marginY: 3,
  },
}

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <NextSeo title="about" />

    <Box sx={sx}>
      <Markdown>{markdown}</Markdown>
    </Box>
  </>
)

export default AboutPage
