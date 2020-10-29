import { InferGetStaticPropsType } from 'next'
import { getContent } from '../common/api'
import Markdown from '../ui/Markdown'

export const getStaticProps = async () => ({
  props: getContent('home', 'home'),
})

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <Markdown>{markdown}</Markdown>
)

export default Home
