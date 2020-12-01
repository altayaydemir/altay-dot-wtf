import type { InferGetStaticPropsType } from 'next'
import type { Now } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { format } from 'date-fns'
import { getMarkdownFileNames } from 'core/api/fs'
import { getContentDetails } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'
import { CgArrowRight } from 'react-icons/cg'

export const getStaticProps = async () => {
  const [latest] = getMarkdownFileNames('now').reverse()

  return {
    props: {
      data: await getContentDetails<Now>('now', latest),
    },
  }
}

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const formattedDate = format(new Date(data.meta.date), 'PPP')

  return (
    <>
      <PageHeader
        title="what am I doing now"
        description={
          "this is a [now page](https://nownownow.com) updated monthly, and it's inspired by [Derek Sivers.](https://sive.rs)"
        }
        metaDescription={`what am I doing as of ${formattedDate}`}
      />

      <Box m={4} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={4} />

      <Text fontSize={0} color="textTertiary">
        last updated at {formattedDate}
      </Text>

      <NextLink href={'/now/history'} passHref>
        <Link
          href={'/now/history'}
          color="textTertiary"
          fontSize={0}
          display="inline-flex"
          sx={{ alignItems: 'center' }}
        >
          <Text>history</Text>
          <Box width="2px" />
          <CgArrowRight />
        </Link>
      </NextLink>
    </>
  )
}

export default NowPage
