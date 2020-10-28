// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import { Theme as BaseTheme } from 'styled-system'

export type ThemeOptions = { dark: boolean }

const colors = {
  background: '#fff',
  gray: '#dddddf',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  muted: '#f6f6f9',
  primary: '#07c',
  secondary: '#30c',
  textInlineCode: '#EB5757',
  text: '#000',
  textGray: '#333',
  border: '#ccc',
} as const

export type Theme = BaseTheme & { dark: boolean; colors: typeof colors }

export const createTheme = (options: ThemeOptions = { dark: false }): Theme => ({
  ...preset,
  ...options,
  breakpoints: ['360px', '640px', '960px'],
  colors,
})
