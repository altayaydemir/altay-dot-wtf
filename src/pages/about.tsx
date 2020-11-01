import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Box } from 'rebass'
import Markdown from '../ui/Markdown'
import { getContentDetails } from '../common/content'

export const getStaticProps = async () => ({
  props: await getContentDetails('about', 'about'),
})

const sx = {
  '& > div:first-of-type > h3': {
    marginTop: '0!important',
  },
  '& > div > h3': {
    fontSize: 3,
    marginTop: 5,
    marginBottom: -2,
  },
}

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <NextSeo title="about" />

    <Box sx={sx}>
      <Markdown>{markdown}</Markdown>
    </Box>
  </>
)

export default About
