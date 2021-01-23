// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import { SxStyleProp } from 'rebass'
import { Theme as BaseTheme } from 'styled-system'
import { Colors, COLORS_DARK, COLORS_LIGHT } from './colors'

export type ThemeOptions = {
  dark: boolean
}

export type Theme = BaseTheme & {
  dark: boolean
  colors: Colors
}

const formInputStyle: SxStyleProp = {
  backgroundColor: 'background',
  borderColor: 'inputPlaceholder',
  fontSize: 1,
  boxShadow: 'rgba(0, 0, 0, 0.04) 0px 1px 1px 0px;',
  '::placeholder': {
    color: 'inputPlaceholder',
  },
}

export const MOBILE_BREAKPOINT = 640

export const createTheme = (options: ThemeOptions) => ({
  ...preset,
  ...options,
  variants: {},
  space: [0, 4, 8, 16, 32, 48, 64, 80, 128, 256, 512],
  fontSizes: [16, 18, 20, 24, 32],
  breakpoints: ['480px', '640px', '960px'],
  colors: options.dark ? COLORS_DARK : COLORS_LIGHT,
  forms: {
    input: formInputStyle,
    textarea: formInputStyle,
  },
})
