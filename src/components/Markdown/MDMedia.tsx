import dynamic from 'next/dynamic'

const MDImage = dynamic(() => import('./MDImage'))
const MDVideo = dynamic(() => import('./MDVideo'))

const VIDEO_FILENAME_EXTENSIONS = ['mp4']
const getFileExtension = (fileName: string) => fileName.split('.').reverse()[0]
const isVideo = (fileName: string) => VIDEO_FILENAME_EXTENSIONS.includes(getFileExtension(fileName))

type Props = {
  alt: string
  src: string
}

const MDMedia: React.FC<Props> = ({ src, alt }) =>
  isVideo(src) ? <MDVideo src={src} /> : <MDImage src={src} alt={alt} />

export default MDMedia
