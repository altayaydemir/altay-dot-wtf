import { join } from 'path'
import fs from 'fs'
import fetch from 'node-fetch'
import imageSize from 'image-size'
import sharp from 'sharp'
import { createCanvas, loadImage, Image } from 'canvas'
import { META_IMAGE_WIDTH, META_IMAGE_HEIGHT, SITE_URL } from '../config'

type ImageData = {
  buffer: Buffer
  ratio: number
  width: number
  height: number
}

export const getImageData = async (url: string): Promise<ImageData> => {
  const response = await fetch(url)
  const buffer = await response.buffer()
  const { width, height } = imageSize(buffer)

  if (!width || !height) {
    throw new Error('')
  }

  return { buffer, ratio: width / height, width, height }
}

const PUBLIC_FOLDER = join(process.cwd(), 'public')

type MetaImage = {
  url: string
  width: number
  height: number
}

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
  const filePath = `/images/meta/${directory}/${fileName}.png`

  if (!fs.existsSync(`${PUBLIC_FOLDER}/${filePath}`)) {
    const canvas = createCanvas(META_IMAGE_WIDTH, META_IMAGE_HEIGHT)
    const context = canvas.getContext('2d')
    context.fillStyle = '#050505'
    context.fillRect(0, 0, META_IMAGE_WIDTH, META_IMAGE_HEIGHT)

    let image: Image

    if (scale !== 1) {
      const scaledWidth = Math.floor(data.width * scale)
      const scaledHeight = Math.floor(data.height * scale)
      const scaledImage = sharp(data.buffer).resize(scaledWidth, scaledHeight)
      data.width = scaledWidth
      data.height = scaledHeight
      image = await loadImage(await scaledImage.toBuffer())
    } else {
      image = await loadImage(data.buffer)
    }

    const coordinates = {
      x: (META_IMAGE_WIDTH - data.width) / 2,
      y: (META_IMAGE_HEIGHT - data.height) / 2,
    }
    context.drawImage(image, coordinates.x, coordinates.y)

    fs.writeFileSync(filePath, canvas.toBuffer('image/png'))
  }

  return { url: SITE_URL + filePath, width: META_IMAGE_WIDTH, height: META_IMAGE_HEIGHT }
}
