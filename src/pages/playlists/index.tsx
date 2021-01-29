import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import type { Playlist } from 'types'
import { playlistsCopy } from 'config/copy'
import { fetchPlaylists } from 'core/api/playlists'
import PageHeader from 'components/PageHeader'
import { Flex, Box, Link, Heading, Text } from 'rebass'

export const getStaticProps: GetStaticProps<{ data: Playlist[] }> = async () => ({
  props: { data: await fetchPlaylists() },
  revalidate: 60 * 60,
})

const PlaylistsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...playlistsCopy} />

    <Box m={4} />

    <Flex sx={{ flexWrap: 'wrap' }}>
      {data.map((playlist) => (
        <Box key={playlist.id} width={[240, 300]} mb={4}>
          <Link href={playlist.url} target="new" rel="noopener noreferrer">
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  border: '0.15rem solid',
                  borderColor: 'black',
                  backgroundImage: `url(${playlist.image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover': {
                    transform: `translate3d(0.3rem, -0.3rem, 0px)`,
                    transitionDelay: '75ms',
                  },
                }}
                width={[220, 256]}
                height={[220, 256]}
              />
              <Box
                width={[220, 256]}
                height={[220, 256]}
                sx={{
                  backgroundColor: 'yellow',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              />
            </Box>

            <Box m={2} />

            <Heading as="h3" fontSize={1}>
              {playlist.name}
            </Heading>
          </Link>

          <Box m={1} />

          <Text fontSize={0} color="textTertiary">
            {playlist.description}
          </Text>
        </Box>
      ))}
    </Flex>
  </>
)

export default PlaylistsPage
