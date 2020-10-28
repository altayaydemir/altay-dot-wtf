import { InferGetStaticPropsType } from 'next'
import Markdown from '../ui/Markdown'
import { getMarkdownContent } from '../common/api'

export const getStaticProps = async () => ({
  props: {
    content: getMarkdownContent('about', 'about'),
  },
})

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ content }) => (
  <Markdown>{content}</Markdown>
)

export default About
