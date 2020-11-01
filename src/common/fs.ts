import { join } from 'path'
import fs from 'fs'
import { ContentType } from '../types'

const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'article':
      return 'articles'
    case 'book':
      return 'books'
    case 'note':
      return 'notes'
    default:
      return type
  }
}

export const getContentDirectoryPath = (contentType: ContentType) => {
  return join(process.cwd(), 'data', getContentDirectoryForType(contentType))
}

export const getMarkdownFileNames = (contentType: ContentType) => {
  const directory = getContentDirectoryPath(contentType)

  return fs
    .readdirSync(directory, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)
}

export const getMarkdownFile = (contentType: ContentType, fileName: string) => {
  const directory = getContentDirectoryPath(contentType)
  return fs.readFileSync(`${directory}/${fileName}.md`, 'utf-8')
}
