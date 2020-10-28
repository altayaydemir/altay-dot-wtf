// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import { Theme as BaseTheme } from 'styled-system'

export type ThemeOptions = { dark: boolean }
export type Theme = BaseTheme & { dark: boolean }

export const createTheme = (options: ThemeOptions = { dark: false }): Theme => ({
  ...preset,
  ...options,
})
