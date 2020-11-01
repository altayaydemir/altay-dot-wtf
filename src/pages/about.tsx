import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Box } from 'rebass'
import Markdown from '../ui/Markdown'
import { getContentDetails } from '../common/content'

export const getStaticProps = async () => ({
  props: await getContentDetails('about', 'about'),
})

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <NextSeo title="about" />
    <Box mt={-4}>
      <Markdown>{markdown}</Markdown>
    </Box>
  </>
)

export default About
