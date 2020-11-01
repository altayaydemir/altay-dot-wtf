// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import { Theme as BaseTheme } from 'styled-system'

export type ThemeOptions = { dark: boolean }

const COLORS_LIGHT = {
  background: '#fcfcfc',
  backgroundSecondary: '#f6f6f9',
  text: '#050505',
  textSecondary: '#2f3037',
  textTertiary: '#686B78',
  textInlineCode: '#2f3037',
  linkPrimary: '#007AFF',
  linkBackground: '#F1F5FC',
  borderHR: '#F1F5FC',
  borderPrimary: 'rgba(241, 245, 252)',
  imageBackground: 'rgba(255, 255, 255, 0.75)',
}

type Colors = typeof COLORS_LIGHT

const COLORS_DARK: Colors = {
  background: '#050505',
  backgroundSecondary: 'rgba(255, 255, 255, 0.1)',
  text: '#fbfbfc',
  textSecondary: '#DEDFE5',
  textTertiary: '#9094A6',
  textInlineCode: '#DEDFE5',
  linkPrimary: '#fdce45',
  linkBackground: '#222222',
  borderHR: '#565656',
  borderPrimary: 'rgba(130, 130, 130, 0.2)',
  imageBackground: 'rgba(0, 0, 0, 0.75)',
}

export type Theme = BaseTheme & {
  dark: boolean
  colors: Colors
}

export const createTheme = (options: ThemeOptions) => ({
  ...preset,
  ...options,
  variants: {},
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [14, 16, 18, 24, 32, 48, 64],
  breakpoints: ['360px', '640px', '960px'],
  colors: options.dark ? COLORS_DARK : COLORS_LIGHT,
})
