import { NextSeoProps } from 'next-seo'
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  DEFAULT_IMETA_IMAGE_PATH,
  META_IMAGE_HEIGHT,
  META_IMAGE_WIDTH,
} from './meta'

export const SEO: NextSeoProps = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  twitter: {
    handle: '@altaywtf',
    cardType: 'summary_large_image',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: SITE_URL + DEFAULT_IMETA_IMAGE_PATH,
        width: META_IMAGE_WIDTH,
        height: META_IMAGE_HEIGHT,
        alt: SITE_TITLE,
      },
    ],
  },
} as const
