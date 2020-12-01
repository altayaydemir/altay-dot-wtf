import type { MetaImage } from 'types'
import { META_IMAGE_WIDTH, META_IMAGE_HEIGHT, SITE_URL } from 'config'
import { join } from 'path'
import fs from 'fs'
import imageSize from 'image-size'
import { createCanvas, loadImage } from 'canvas'
import { getBlurhash } from 'next-blurhash'

const PUBLIC_FOLDER = join(process.cwd(), 'public')

const getImageDataFromBuffer = (buffer: Buffer) => {
  const { width, height } = imageSize(buffer)

  if (!width || !height) {
    throw new Error('Could not get image data')
  }

  return { buffer, ratio: width / height, width, height }
}

type ImageData = ReturnType<typeof getImageDataFromBuffer> & { blurhash: string }

export const getImageData = async (url: string): Promise<ImageData> => {
  const buffer = fs.readFileSync(PUBLIC_FOLDER + url)
  const blurhash = await getBlurhash(url)

  return {
    blurhash,
    ...getImageDataFromBuffer(buffer),
  }
}

const META_IMAGE_BG_FILL_COLOR = '#111111'

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
