import { InferGetStaticPropsType } from 'next'
import { getMarkdownContent } from '../core/api'
import Markdown from '../ui/Markdown'

export const getStaticProps = async () => ({
  props: { content: getMarkdownContent('home', 'home') },
})

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ content }) => (
  <Markdown>{content}</Markdown>
)

export default Home
