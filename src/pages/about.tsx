import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Box } from 'rebass'
import Markdown from '../ui/Markdown'
import { getContent } from '../common/api'

export const getStaticProps = async () => ({
  props: getContent('about', 'about'),
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
