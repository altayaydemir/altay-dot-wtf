import { join } from 'path'
import fs from 'fs'
import { ContentType } from 'types'

const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'blog-post':
      return 'blog'
    case 'book':
      return 'books'
    case 'note':
      return 'notes'
    case 'private-note':
      return 'private-notes'
    case 'journal':
      return 'private-journal'
    default:
      return type
  }
}

export const getContentDirectoryPath = (contentType: ContentType) => {
  return join(process.cwd(), 'data', getContentDirectoryForType(contentType))
}

export const getMarkdownFileNames = (contentType: ContentType) => {
  const directory = getContentDirectoryPath(contentType)

  try {
    return fs
      .readdirSync(directory, 'utf-8')
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.split('.md'))
      .map(([fileName]) => fileName)
  } catch (e) {
    return []
  }
}

const transformRelativeMarkdownLinks = (contentType: ContentType, markdown: string) => {
  const regexMdLinks = /\[([^[]+)\](\(.[^)]*\))/gm
  const regexMDLinkURL = /(\(.*\))/gm
  const mdLinks = markdown.match(regexMdLinks)

  if (mdLinks?.length) {
    const relativeMdLinks = mdLinks.filter((mdLink) => {
      const url = mdLink.match(regexMDLinkURL)
      return url?.length && url[0].startsWith('(.')
    })

    relativeMdLinks.forEach((mdLink) => {
      const [matchedURL] = mdLink.match(regexMDLinkURL) as [string]
      let url = matchedURL.split('(')[1].split(')')[0]

      if (url.startsWith('..')) {
        url = url
          .split('..')
          .filter((i) => i !== '..')
          .join('')
      } else if (url.startsWith('.')) {
        url = url.replace('.', `/${getContentDirectoryForType(contentType)}`)
      }

      url = url.replace('.md', '')
      const newMdLink = mdLink.replace(matchedURL, `(${url})`)
      markdown = markdown.replace(mdLink, newMdLink)
    })
  }

  return markdown
}

export const readMarkdownFile = (contentType: ContentType, fileName: string) => {
  const directory = getContentDirectoryPath(contentType)
  const filePath = `${directory}/${fileName}.md`

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return transformRelativeMarkdownLinks(contentType, content)
  } catch (e) {
    return ''
  }
}

export const readJSONFile = (fileName: string) => {
  const directory = join(process.cwd(), 'data', fileName)
  return JSON.parse(fs.readFileSync(directory, 'utf-8'))
}
