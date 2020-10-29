import { InferGetStaticPropsType } from 'next'
import Markdown from '../ui/Markdown'
import { getContent } from '../common/api'

export const getStaticProps = async () => ({
  props: getContent('about', 'about'),
})

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <Markdown>{markdown}</Markdown>
)

export default About
