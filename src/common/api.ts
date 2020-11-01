import fetch from 'node-fetch'

const cache: Record<string, unknown> = {}

export const api = {
  get: async (url: string) => {
    if (cache[url]) {
      return cache[url]
    }

    const response = await fetch(url)
    const json = await response.json()

    cache[url] = json

    return json
  },
}
