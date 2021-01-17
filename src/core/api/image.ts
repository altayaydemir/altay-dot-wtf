import type { MetaImage } from 'types'
import { META_IMAGE_WIDTH, META_IMAGE_HEIGHT, SITE_URL } from 'config'
import fs from 'fs'
import sharp from 'sharp'
import { createCanvas, loadImage } from 'canvas'
import { getBlurhash } from 'next-blurhash'
import { PUBLIC_FOLDER_PATH } from './constants'

type ImageData = {
  buffer: Buffer
  ratio: number
  width: number
  height: number
  blurhash: string
}

export const getImageData = async (url: string): Promise<ImageData> => {
  const buffer = fs.readFileSync(PUBLIC_FOLDER_PATH + url)
  const { width, height } = await sharp(buffer).metadata()

  if (!width || !height) {
    throw new Error('Could not get image data')
  }

  const blurhash = await getBlurhash(url)
  return { buffer, ratio: width / height, width, height, blurhash }
}

const META_IMAGE_BG_FILL_COLOR = '#111111'

export const generateMetaImage = async ({
  publicPath,
  data,
  scale = 1,
}: {
  publicPath: string
  data: ImageData
  scale?: number
}): Promise<MetaImage> => {
  const absolutePath = `${PUBLIC_FOLDER_PATH}/${publicPath}`

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

  return { url: SITE_URL + publicPath, width: META_IMAGE_WIDTH, height: META_IMAGE_HEIGHT }
}
