import { join } from 'path'
import fs from 'fs'
import fetch from 'node-fetch'
import imageSize from 'image-size'
import { createCanvas, loadImage } from 'canvas'
import { META_IMAGE_WIDTH, META_IMAGE_HEIGHT, SITE_URL } from 'config'
import { MetaImage } from 'types'

const PUBLIC_FOLDER = join(process.cwd(), 'public')

const getImageDataFromBuffer = (buffer: Buffer) => {
  const { width, height } = imageSize(buffer)

  if (!width || !height) {
    throw new Error('Could not get image data')
  }

  return { buffer, ratio: width / height, width, height }
}

type ImageData = ReturnType<typeof getImageDataFromBuffer>

const getLocalImageData = async (url: string): Promise<ImageData> => {
  const buffer = fs.readFileSync(PUBLIC_FOLDER + url)
  return getImageDataFromBuffer(buffer)
}

const getRemoteImageData = async (url: string): Promise<ImageData> => {
  const response = await fetch(url)
  const buffer = await response.buffer()
  return getImageDataFromBuffer(buffer)
}

export const getImageData = (url: string) =>
  url.startsWith('/') ? getLocalImageData(url) : getRemoteImageData(url)

const META_IMAGE_BG_FILL_COLOR = '#050505'

export const generateMetaImage = async ({
  directory,
  fileName,
  data,
  scale = 1,
}: {
  directory: string
  fileName: string
  data: ImageData
  scale?: number
}): Promise<MetaImage> => {
  const relativePath = `/images/meta/${directory}/${fileName}.png`
  const absolutePath = `${PUBLIC_FOLDER}/${relativePath}`

  if (!fs.existsSync(absolutePath)) {
    const canvas = createCanvas(META_IMAGE_WIDTH, META_IMAGE_HEIGHT)
    const context = canvas.getContext('2d')
    context.fillStyle = META_IMAGE_BG_FILL_COLOR
    context.fillRect(0, 0, META_IMAGE_WIDTH, META_IMAGE_HEIGHT)

    const image = await loadImage(data.buffer)
    const imageWidth = data.width * scale
    const imageHeight = data.height * scale

    const coordinates = {
      x: (META_IMAGE_WIDTH - imageWidth) / 2,
      y: (META_IMAGE_HEIGHT - imageHeight) / 2,
    }

    context.drawImage(image, coordinates.x, coordinates.y, imageWidth, imageHeight)
    fs.writeFileSync(absolutePath, canvas.toBuffer('image/png'))
  }

  return { url: SITE_URL + relativePath, width: META_IMAGE_WIDTH, height: META_IMAGE_HEIGHT }
}
