import type { Playlist } from 'types'
import axios from 'axios'

type SpotifyAuthorizationResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

const authorize = async () => {
  const body = new URLSearchParams()
  body.append('grant_type', 'client_credentials')

  const {
    data: { access_token, token_type },
  } = await axios.post<SpotifyAuthorizationResponse>(
    `https://accounts.spotify.com/api/token`,
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.SPOTIFY_CLIENT_ID as string,
        password: process.env.SPOTIFY_CLIENT_SECRET as string,
      },
    },
  )

  return `${token_type} ${access_token}`
}

type SpotifyPlaylist = {
  id: string
  name: string
  description: string
  external_urls: { spotify: string }
  images: Array<{ url: string }>
}

type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[]
}

export const fetchPlaylists = async (): Promise<Playlist[]> => {
  try {
    const authorization = await authorize()

    const { data } = await axios.get<SpotifyPlaylistsResponse>(
      `https://api.spotify.com/v1/users/zebrasinpyjamas/playlists`,
      {
        headers: { authorization },
      },
    )

    return data.items.map((i) => ({
      ...i,
      type: 'playlist',
      url: i.external_urls.spotify,
      image: { url: i.images[0].url },
    }))
  } catch (error) {
    return []
  }
}
