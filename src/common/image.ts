import imageSize from 'image-size'
import fetch from 'node-fetch'

export const calculateImageAspectRatio = async (url: string): Promise<number | undefined> => {
  try {
    const response = await fetch(url)
    const buffer = await response.buffer()
    const { width, height } = imageSize(buffer)
    if (width && height) return width / height
  } catch (e) {
    return
  }
}
