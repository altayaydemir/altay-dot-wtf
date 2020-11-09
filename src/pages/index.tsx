import type { Article, Content } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy, articlesCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Heading, Text, Link } from 'rebass'
import { VscArrowRight } from 'react-icons/vsc'
import { getContentList } from 'core/api/content'
import ArticleList from 'components/Article/ArticleList'

type HomeSection = {
  title: string
  data: Content[]
}

export const getStaticProps: GetStaticProps<{ sections: HomeSection[] }> = async () => {
  const articles = await getContentList<Article>('article')
  const sections = [
    {
      title: articlesCopy.title,
      data: articles,
    },
  ]

  return { props: { sections } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ sections }) => (
  <>
    <Heading fontSize={3}>{homeCopy.title}</Heading>

    <Box m={3} />

    {homeCopy.description.map((i) => (
      <Text key={i} color="textSecondary">
        {i}
      </Text>
    ))}

    <Box my={3}>
      {homeCopy.links.map((link) => (
        <Box key={link.href}>
          <NextLink href={link.href} passHref>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center', mb: 1 }}>
                <Text mr={1}>{link.label}</Text>
                <VscArrowRight />
              </Box>
            </Link>
          </NextLink>
        </Box>
      ))}
    </Box>

    {sections.map((section) => (
      <Box key={section.title} my={5}>
        <Heading as="h3" fontSize={3}>
          {section.title}
        </Heading>

        <Box my={2} />

        <ArticleList data={section.data as Article[]} />
      </Box>
    ))}
  </>
)

export default Home
