import type { InferGetStaticPropsType } from 'next'
import type { Vocabulary } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { getStaticPropsForContentList } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import { CgArrowRight } from 'react-icons/cg'

export const getStaticProps = getStaticPropsForContentList<Vocabulary>('vocabulary')

const VocabularyPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader
      title={`vocabulary`}
      description={`some interesting elements I came across while reading.`}
    />

    <Box m={3} />

    <>
      {data.map((d) => (
        <Box key={d.slug} my={1}>
          <NextLink href={`/vocabulary/${d.slug}`} passHref>
            <Link display="inline-flex" sx={{ alignItems: 'center' }}>
              <Text mr={1}>{d.slug}</Text>
              <CgArrowRight />
            </Link>
          </NextLink>
        </Box>
      ))}
    </>
  </>
)

export default VocabularyPage
